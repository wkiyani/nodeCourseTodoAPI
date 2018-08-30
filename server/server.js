var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//for creating new todos
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((result) => {
		res.send(result)
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.send(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var {id} = req.params;
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		res.status(404).send();
	}
	Todo.findById(id).then((todo) => {
		if(!todo){
			res.status(404).send();
		} else {
			res.status(200).send({todo});
		}
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
	console.log('started on port', port);
})

module.exports = {app};

// var newTodo = new Todo({
// 	text: 'Cook dinner'
// });

// var newTodo = new Todo({
// 	text: "  Edit his video  "
// });

// newTodo.save().then((result) => {
// 	console.log(JSON.stringify(result, undefined, 2));
// }, (err) => {
// 	console.log('Unable to save Todo', err);
// });

// var newUser = new User({
// 	email: " wasifwk@hotmail.com "
// })

// newUser.save().then((result) => {
// 	console.log(JSON.stringify(result, undefined, 2));
// }, (e) => {
// 	console.log('Could not save user', e);
// })
