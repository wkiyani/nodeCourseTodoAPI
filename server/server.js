var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

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

var port = 3000;
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
