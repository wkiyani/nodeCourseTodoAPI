var mongoose = require('mongoose');

//adding promises library to mongoose
mongoose.Promise = global.Promise;
//connecting database

let db = {
	localhost: 'mongodb://localhost:27017/TodoApp',
	mlab: 'mongodb://wasifwk:fullmetal123@ds022228.mlab.com:22228/todoapidb'
}
mongoose.connect(db.mlab || db.localhost);

module.exports = {mongoose};