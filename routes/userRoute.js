'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const passport = require('../utils/pass');
const admin = require('../utils/admin');
const {body, sanitizeBody} = require('express-validator');
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/hack', (req, res) => {
  res.send(req.body.search);
});


router.put('/:id',[passport.authenticate('jwt', {session: false}),admin], userController.user_put);

router.update

router.delete('/:id',[passport.authenticate('jwt', {session: false}),admin], userController.user_delete);

module.exports = router;
