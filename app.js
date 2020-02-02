var express = require('express');
var path = require('path');
const cors = require('cors');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const oauthRouter = require('./routes/google_auth');
const apiRouter = require('./routes/api');

var app = express();
require('dotenv').config()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"]
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session())
require('./config/auth');
// app.use(express.static(path.join(__dirname, '/client/build')));


// if(process.env.STATE === 'prod') {
//   app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'))
//   })
// }

const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hoyahacks-9hcub.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 

mongoose.connect(db) 
  .then(() => console.log('success')) 
  .catch(e => console.error(e)); 


  app.use('/auth', oauthRouter);
  app.use('/api', apiRouter);

  if(process.env.STATE === 'PROD') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(process.env.PORT || 8080)

module.exports = app;
