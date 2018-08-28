const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Umabel to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').deleteMany({text: 'Finish my node course'}).then((result) => {
	// 	console.log(result);
	// });

	// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// });	

	// db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').deleteMany({name: 'Jan'}).then((result) => {
		console.log(result);
	});	

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('5b8523355d40802d7cb2d204')
	}).then((result) => {
		console.log(result);
	});

	// db.close();
});