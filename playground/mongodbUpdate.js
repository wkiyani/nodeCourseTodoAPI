const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Umabel to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').findOneAndUpdate({text: 'Eat Lunch'}, 
	// 	{ $set: {completed: false} }, 
	// 	{ returnOriginal: false })
	// .then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({name: 'Wasif'},
	{ $set: {name: 'Hamza'}, $inc: {age: 1}},
	{ returnOriginal: false })
	.then((result) => {
		console.log(result);
	});

	// db.close();
});