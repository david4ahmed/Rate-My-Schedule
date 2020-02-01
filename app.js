var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/123', (req, res) => {
  res.send('asd')
  res.close()
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(process.env.PORT || 8080)

module.exports = app;
