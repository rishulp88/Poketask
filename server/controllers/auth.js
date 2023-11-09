const bcrypt = require('bcrypt');
const {User} = require('../models/db');


const create = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
      tasks: [],
    });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if(!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  };
}

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({error, massage: 'Could not log out, please try again'});
    } else {
      res.clearCookie('sid');
      res.status(200).send({message: 'Logout successful'});
    }
  })
}

const profile = async (req, res) => {
  try {
    const user = req.user;
    const tasks = await user.tasks;
    // console.log(tasks)
    res.status(200).send(tasks);
  } catch (error) {
    res
    .status(500)
    .send({error, massage: 'Could not log tasks, please try again'});
  }
}


module.exports = { create, login, logout, profile };
