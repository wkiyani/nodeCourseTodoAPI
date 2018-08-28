const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

var id = '5b85549256d6498006388edc';

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}


// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	completed: false
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo by ID', todo);
// }).catch((e) => console.log(e)); 

User.findById(id).then((user) => {
	if(!user){
		return console.log('ID not found');
	}
	console.log('User by ID', user);
}).catch((e) => console.log(e)); 
