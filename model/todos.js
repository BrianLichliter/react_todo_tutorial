//import dependency 
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host : '127.0.0.1',
    user : 'bal',
    password : '',
    database : 'bal'
  }
});

//if the table hasn't been created yet then create it
knex.schema.createTableIfNotExists('todos', function (table) {
  table.increments();
  table.string('text');
  table.timestamps();
}).catch(function(error) {
  console.log(error);
});