//@ts-nocheck

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';

import {router} from './router';

import { MongoParseError } from 'mongodb';

const SECRET: string = process.env.SECRET || 'this is not very secure';

const app = express();
const port: number = 3009;

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsConfig));
app.use(bodyParser.json())
app.use(express.json());
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: 'lax',
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(router);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export {app}