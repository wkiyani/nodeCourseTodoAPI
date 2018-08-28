var mongoose = require ('Mongoose');

//adding promises library to mongoose
mongoose.Promise = global.Promise;
//connecting database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};