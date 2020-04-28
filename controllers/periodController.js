'use strict';
const periodModel = require('../models/periodModel');
const {validationResult} = require('express-validator');


//const period = periodModel.cat;

const period_list_get = async (req, res) => {
  const periods = await periodModel.getAllPeriods();
  res.json(periods);
};

const period_get = async (req, res) => {
  console.log('period id parameter', req.params);
  const period = await periodModel.getperiod(req.params.id);
  res.json(period);
};

module.exports = {
  period_list_get,
  period_get
};