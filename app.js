'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const passport = require('./utils/pass');
const admin = require('./utils/admin');
const authRoute = require('./routes/authRoute');
const periodRoute = require('./routes/periodRoute');
const courseRoute = require('./routes/courseRoute');
const userRoute = require('./routes/userRoute');
const teacherRoute = require('./routes/teacherRoute');
const course_infoRoute = require('./routes/course_infoRoute');
const user_noteRoute = require('./routes/user_noteRoute');


app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/teacher', passport.authenticate('jwt',{session: false}), teacherRoute);
app.use('/course_info', passport.authenticate('jwt',{session: false}), course_infoRoute);
app.use('/user_note', passport.authenticate('jwt',{session: false}), user_noteRoute);
app.use('/auth', authRoute);
app.use('/period', periodRoute);
app.use('/course',[passport.authenticate('jwt', {session: false}),admin], courseRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
