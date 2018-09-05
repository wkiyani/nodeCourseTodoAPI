const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

//Todo.remove (pass in a query and removes multiple or none)
//To remove all we need to pass in ({})

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

Todo.findOneAndRemove("5b8ed564f35f36632e0f41c0").then((result) => {
	console.log(result);
});

// Todo.findByIdAndRemove(.then(result) => {
// 	console.log(result);
// });