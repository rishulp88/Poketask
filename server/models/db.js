const mongoose = require('mongoose');

//connection to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/soloproject');


// schema for users collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tasks: [{index: Number, text: String, done: Boolean}]
  });
const User = mongoose.model('User', userSchema);

//schema for task lists
// const listSchema = new mongoose.Schema({
//   id: Number,
//   tasks: [{index: Number, text: String, done: Boolean}],
// });
// const List = mongoose.model('List', listSchema);






  module.exports = {
    mongoose, User, userSchema
  };
