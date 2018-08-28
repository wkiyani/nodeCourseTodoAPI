// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'Wasif', age: 22};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Umabel to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert todo', err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// db.collection('Users').insertOne({
	// 	name: 'Talha',
	// 	age: 23,
	// 	location: 'Sharjah'
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert user', err);
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	//id is a 12 byte value, first 4 bytes are a time stamp
	//next three bytes are machine generated for uniqueness
	//next two bytes for process id
	//last three bytes are counters similar to other databases

	db.close();
});