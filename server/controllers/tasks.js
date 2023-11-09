const {User} = require('../models/db');

const add = async (req, res) => {
  try {
    const task = req.body;
    const user = req.user;
    const tasks = await user.tasks;
    tasks.push(task);
    user.save();
    res.sendStatus(200);
  } catch (error) {
    res
    .status(500)
    .send({error, massage: 'could not add task'});
  }


}

module.exports = { add };
