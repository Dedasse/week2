'use strict';
const express = require('express');
const router = express.Router();
const {body, check} = require('express-validator');
const passport = require('../utils/pass');
const periodController = require('../controllers/periodController');





router.get('/', periodController.period_list_get);

router.get('/:id', periodController.period_get);

module.exports = router;