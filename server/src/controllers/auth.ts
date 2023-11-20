import bcrypt from 'bcryptjs';
import { User as UserModel } from '../models/db';
import { Request, Response } from 'express';
import { SessionData, Session } from 'express-session';
import { Types } from 'mongoose';

interface UserDocument {
  _id: Types.ObjectId;
  password: string;
  points: number;
  tasks: any[];
}

interface SessionWithUid extends Session {
  uid: string;
}

interface RequestWithSession extends Request {
  session: SessionWithUid;
  user: UserDocument;
}

const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
      points: 0,
      tasks: [],
    });
    const user = await newUser.save();
    (req as RequestWithSession).session.uid = user._id.toString();
    
    res.status(201).send(user);
    
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error();
    const validatedPass = await bcrypt.compare(password, user.password);
    if(!validatedPass) throw new Error();
    (req as RequestWithSession).session.uid = user._id.toString();
    res.status(200).send(user);

  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  };
}

const logout = (req: Request, res: Response) => {
  (req as RequestWithSession).session.destroy((error: Error) => {
    
    if (error) {
      res
        .status(500)
        .send({error, message: 'Could not log out, please try again'});
    } else {
      res.clearCookie('sid');
      res.status(200).send({message: 'Logout successful'});
    }
  })
}

const profile = async (req: Request, res: Response) => {
  try {
    const user = (req as RequestWithSession).user;
    const tasks = await user.tasks;
    res.status(200).send(tasks);
  } catch (error) {
    res
    .status(500)
    .send({error, message: 'Could not log tasks, please try again'});
  }
}

const getPoints = async (req: Request, res: Response) => {
  try {
    const user = (req as RequestWithSession).user;
    const points = [user.points];   
    res.status(200).send(points);

  } catch (error) {
    console.log(error)
    const status =  500;
    res
    .status(status)
    .send({message: 'Could not log points, please try again'});
  }
}

export { logout, profile, getPoints,login,create };