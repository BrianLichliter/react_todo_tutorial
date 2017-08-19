//import dependency 
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.HOST || '127.0.0.1',
    user : process.env.USER || 'bal',
    password : process.env.PASSWORD || '',
    database : process.env.DATABASE || 'bal'
  }
});

//if the table hasn't been created yet then create it
knex.schema.createTableIfNotExists('todos', function (table) {
  table.increments();
  table.string('text');
  table.timestamps();
}).catch(function(error) {
  console.err(error);
});