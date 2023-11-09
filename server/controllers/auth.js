const bcrypt = require('bcrypt');
const {User} = require('../models/db');

const create = async (req, res) => {

  const { email, password } = req.body;
  // console.log(req.body);

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
    });
    console.log(hash, newUser)
    const user = await newUser.save();
    req.session.uid = user._id;
    // console.log(user)
    res.status(201).send(user);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create user' });
  }
};





module.exports = { create };
