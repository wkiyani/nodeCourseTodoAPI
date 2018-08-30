var mongoose = require ('Mongoose');

//adding promises library to mongoose
mongoose.Promise = global.Promise;
//connecting database

let db = {
	localhost: 'mongodb://localhost:27017/TodoApp',
	mlab: 'mongodb://wasifwk:fullmetal123@ds022228.mlab.com:22228/todoapidb'
}
mongoose.connect(db.localhost || db.mlab);

module.exports = {mongoose};