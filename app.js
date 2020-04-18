'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;


const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(express.static('uploads'));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./remote')(app, port);
} else {
  //require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
  require('./localhost')(app, port);
}

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.use('/', (req,res)=>{
  res.send(`Hello secure? ${req.secure}`);
})

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))

