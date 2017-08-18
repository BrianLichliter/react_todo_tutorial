//model/comments.js
'use strict';

//import dependency
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

//create new table with columns we need.
knex.schema.createTable('todos', function (table) {
  table.increments();
  table.string('text');
  table.timestamps();
});