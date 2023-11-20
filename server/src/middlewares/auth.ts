import { Request, Response, NextFunction } from 'express';
import { User as UserModel } from '../models/db';
import { Session } from 'express-session';
import { Types } from 'mongoose';

interface UserDocument {
  _id: Types.ObjectId;
}

interface SessionWithUid extends Session {
  uid: string;
}

interface RequestWithUser extends Request {
  user: UserDocument;
  session: SessionWithUid;
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = (req.session as SessionWithUid).uid;
  if (userId) {
    const user = await UserModel.findById(userId);
    if (user) {
      (req as RequestWithUser).user = user;
      next();
    } else {
      res.status(401).send({ message: 'Not authenticated' });
    }
  } else {
    res.status(401).send({ message: 'Not authenticated' });
  }
}

