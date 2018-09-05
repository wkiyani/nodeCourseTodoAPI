const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {Joke} = require('./models/jokes.js');

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

app.post('/jokes', (req,res) => {
	var joke = new Joke({
		content: req.body.content,
		funny: req.body.funny
	});
	joke.save().then((result) => {
		res.send(result);
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.send(400).send(e);
	});
});

app.get('/jokes', (req, res) => {
	Joke.find().then((jokes) => {
		res.send({jokes});
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

app.get('/jokes/:id', (req, res) => {
	var {id} = req.params;
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		res.status(101).send();
	}
	Joke.findById(id).then((joke) => {
		if(!joke){
			res.status(404).send();
		} else {
			res.status(200).send({joke});	
		}
	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	var {id} = req.params;
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			res.status(404).send();
		} else {
			res.status(200).send({todo});
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/jokes/:id', (req, res) => {
	var {id} = req.params;
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		res.status(101).send();
	}
	Joke.findByIdAndRemove(id).then((joke) => {
		if(!joke){
			res.status(400).send();
		} else {
			res.status(200).send({joke});
		}
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/todos/:id', (req,res) => {
	var {id} = req.params;
	var body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		res.status(404).send();
	}
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		} 
		res.send({todo});
	}).catch((e) =>{
		res.status(400).send();
	})
});

app.patch('/jokes/:id', (req, res) => {
	var {id} = req.params;
	var body = _.pick(req.body, ['content', 'funny']);
	if(!ObjectID.isValid(id)){
		console.log('ID not valid');
		res.status(101).send();
	}
	Joke.findByIdAndUpdate(id, {$set: body}, {new: true}).then((joke) => {
		if(!joke){
			res.status(404).send();
		} else {
			res.status(200).send({joke});
		}
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
	console.log('started on port', port);
});

module.exports = {app};