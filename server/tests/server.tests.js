const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const dummyTodos = [ 
{ _id: new ObjectID(), text: '1st todo'}, 
{ _id: new ObjectID(), text: '2nd todo'}, 
{ _id: new ObjectID(), text: '3rd todo'}
];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		Todo.insertMany(dummyTodos);
	}). then(() => done());
});

describe('POST /todos', () => {

	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
		 .post('/todos')
		 .send({text})
		 .expect(200)
		 .expect((res) => {
		 	expect(res.body.text).toBe(text);
		 })
		 .end((err, res) => {
		 	if(err){
		 		return done(err);
		 	}
		 	Todo.find({text}).then((todos) => {
		 		expect(todos.length).toBe(1);
		 		expect(todos[0].text).toBe(text);
		 		done();
		 	}).catch((e) => done(e));
		 });
	});

	it('should return todo with an invalid body data', (done) => {
		var text = 'Test todo text';

		request(app)
		 .post('/todos')
		 .send({})
		 .expect(400)
		 .end((err, res) => {
		 	if(err){
		 		return done(err);
		 	}
		 	Todo.find().then((todos) => {
		 		expect(todos.length).toBe(3);
		 		done();
		 	}).catch((e) => done(e));
		 });
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) =>{
		request(app)
		 .get('/todos')
		 .expect(200)
		 .expect((res) => {
		 	expect(res.body.todos.length).toBe(3);
		 })
		  .end(done);
	})
});

describe('Get /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
		 .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
		 .expect(200)
		 .expect((res) => {
		 	expect(res.body.todo.text).toBe(dummyTodos[0].text);
		 })
		 .end(done);
	})

	it('should return a 404 if todo not found', (done) => {
		var id = new ObjectID();
		request(app)
		 .get(`/todos/${id.toHexString()}`)
		 .expect(404)
		 .end(done);
	});

	it('should return 404 for a non-object ID', (done) => {
		request(app)
		 .get('/todos/123')
		 .expect(404)
		 .end(done);
	})
})