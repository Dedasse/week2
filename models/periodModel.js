'use strict';
//const pool = require('../database/db');
const promisePool = require('../database/db').promise();

const getAllPeriods = async () => {
  try {
    const [rows] = await promisePool.query('SELECT      period_id,periods.name  FROM periods ');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};



const getperiod = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT periods.name,courses.name FROM periods INNER JOIN courses ON fk_period_id=period_id  WHERE  period_id = ? ' , [ id ]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};




module.exports ={
  getAllPeriods,
  getperiod
};