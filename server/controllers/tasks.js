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
    .send({error, message: 'could not add task'});
  }
}

const remove = async(req, res) => {
  try {
    const taskToRemove = req.body;
    let id = taskToRemove.index;
    const user = req.user;
    const tasks = await user.tasks;

    for (let task of tasks){
      if (task.index === id){
        let taskId = tasks.indexOf(task);
        console.log(taskId);
        tasks.splice(taskId, 1);
      }
    }
    user.save();
    res.sendStatus(200);

  } catch (error) {
    console.log(error)
    res
    .status(500)
    .send({error, message: 'could not delete task'});
  }
}

module.exports = { add, remove };
