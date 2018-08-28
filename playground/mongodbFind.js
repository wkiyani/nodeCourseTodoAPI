const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Umabel to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//returns a cursor which we can use to access data
	// db.collection('Todos').find({
	// 	_id: new ObjectID('5b851bff9d55523b84a515df') 
	// 	// text: "Walk the dog"
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });


	//find returns everything and we can use count to count total
	// db.collection('Todos').find().count().then((count) => {
	// 	console.log('Todos');
	// 	console.log('Todos count:', count);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	db.collection('Users').find({name: 'Jan'}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});
	
	// db.close();
});