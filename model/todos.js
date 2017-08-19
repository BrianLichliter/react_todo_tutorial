//import dependency 
var knex = require('knex')({
  client: 'pg',
  version: '9.6',
  connection: {
    host : '127.0.0.1',
    user : 'bal',
    password : '',
    database : 'bal'
  }
});

console.log('Creating todos table');

//if the table hasn't been created yet then create it
knex.schema.createTableIfNotExists('todos', function (table) {
  table.increments();
  table.string('text');
  table.timestamps();
  console.log('Todos table created');
}).catch(function(error) {
  console.err(error);
});