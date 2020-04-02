'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body, sanitizeBody}=require('express-validator');
const upload = multer({dest: './uploads/'});
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/hack', (req, res) => {
  res.send(req.body.search);
});

router.post('/',[
  body('name','Min 3 chars, required').isLength({min: 3}),
], userController.user_post);

router.put('/', userController.user_put);

router.delete('/:id', userController.user_delete);

module.exports = router;
