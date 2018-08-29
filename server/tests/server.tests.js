const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const dummyTodos = [ {text: '1st todo'}, {text: '2nd todo'}, {text: '3rd todo'}];

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