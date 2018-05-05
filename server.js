const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Passport Middlewear 

app.use(passport.initialize());

//Passport Config 

require(
  './config/passport.js'
)(passport);
// USE ROUTES

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));