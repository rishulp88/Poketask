const express = require('express');
const router = require('./router');
const cors = require('cors');
const session = require('express-session');
const bodyparser = require('body-parser')
const { MongoParseError } = require('mongodb');
const SECRET = process.env.SECRET || 'this is not very secure';

const app = express();
const port = 3009;

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsConfig));
app.use(bodyparser.json())
app.use(express.json());
// REMOVE-START
app.use(
  session({
    // the store property, if not specified, defaults to the in-memory store
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: 'lax',
      httpOnly: false,
      // we would want to set secure=true in a production environment
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
