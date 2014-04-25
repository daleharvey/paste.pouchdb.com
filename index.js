'use strict';

var fs = require('fs');

var PouchDB = require('pouchdb');
var multiline = require('multiline');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var dbs = {};

// Ugh? well screw you
var index = fs.readFileSync(__dirname + '/www/index.tpl').toString();

var defaultTemplate = multiline(function(){/*
<html>
  <script src="http://cdn.jsdelivr.net/pouchdb/2.1.2/pouchdb.min.js"></script>
  <script>
    var db = new PouchDB('test');
    db.post({a: 'doc'}, function(err, doc) {
      console.log('I POSTED!', doc);
    });
  </script>
</html>
*/});

app.get('/', function (req, res, next) {
  res.send(index.replace('{{code}}', defaultTemplate));
});

app.use(bodyParser.json());
app.use(express.static('www'));

app.get('/paste/:id', function (req, res, next) {
  var db = new PouchDB('pastes');
  db.get(req.params.id).then(function(paste) {
    res.send(index.replace('{{code}}', paste.code));
  });
});

app.put('/db/pastes/:id', function (req, res, next) {
  new PouchDB('pastes').then(function(db) {
    return db.put(req.body);
  }).then(function (response) {
    res.send(201, response);
  }).catch(function (err) {
    res.send(err.status, err);
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port %d', server.address().port);
});
