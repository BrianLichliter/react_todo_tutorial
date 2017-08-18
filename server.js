//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('./model/todos');
var pg = require('pg');
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'lichliterb',
    password : '',
    database : 'lichliterb'
  }
});

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API is running!'});
});

//adding the /comments route to our /api router
router.route('/todos')
//retrieve all comments from the database
.get(function(req, res) {
  var todos = knex.select().from('todos').timeout(1000);
  res.json(todos)
  // //looks at our Comment Schema
  // Todo.find(function(err, todos) {
  //   if (err)
  //     res.send(err);
  //   //responds with a json object of our database comments.
  //   res.json(todos)
  // });
})
//post new comment to the database
.post(function(req, res) {
  knex('todos').insert({text: req.body.text});
  // var todo = new Todo();
  // //body parser lets us use the req.body
  // todo.text = req.body.text;
  // todo.save(function(err) {
  //   if (err)
  //     res.send(err);
  //   Todo.find(function(err, todos) {
  //     if (err)
  //       res.send(err);
  //     //responds with a json object of our database comments.
  //     res.json(todos)
  //   });
  // });
})

//delete method for removing a comment from our database
router.route('/todos/:id').delete(function(req, res) {
  var Promise = require('bluebird');
  knex.transaction(function(trx) {
    knex.where('_id', req.params.id).del()
  })
  .then(function(resp) {
    var todos = knex.select().from('todos').timeout(1000);
    res.json(todos)
  })
  .catch(function(err) {
    console.error(err);
  });
  // //selects the comment by its ID, then removes it.
  // Todo.remove({ _id: req.params.id  }, function(err, todo) {
  //   if (err)
  //     res.send(err);
  //   Todo.find(function(err, todos) {
  //     if (err)
  //       res.send(err);
  //     //responds with a json object of our database comments.
  //     res.json(todos)
  //   });
  // })
});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});