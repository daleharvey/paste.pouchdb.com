'use strict';

var fs = require('fs');

var PouchDB = require('pouchdb');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var dbs = {};

// Ugh? well screw you
var index = fs.readFileSync(__dirname + '/www/index.tpl').toString();

function serveTemplate(res, name) {
  var path = __dirname + '/www/templates/' + name + '.tpl'
  var tpl = fs.readFileSync(path).toString();
  res.send(index.replace('{{code}}', tpl));
}

app.get('/', function (req, res) {
  serveTemplate(res, 'default');
});

app.get('/template/:template', function (req, res, next) {
  if (req.params.template.match(/^[a-z0-9]+$/i)) {
    serveTemplate(res, req.params.template);
  } else {
    res.send(400, 'invalid template');
  }
});


app.use(bodyParser.json());
app.use(express.static('www'));

app.get('/db/pastes/templates', function (req, res, next) {
  res.send(201, fs.readdirSync(__dirname + '/www/templates').map(function(x) {
    return x.split('.').shift();
  }));
});

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
