'use strict';
//const pool = require('../database/db');
const promisePool = require('../database/db').promise();

const getAllPeriods = async () => {
  try {
    const [rows] = await promisePool.query('SELECT      opinto_id, Period_name,Courses.course_name  FROM Period INNER JOIN Courses ON opinto_id = belong_id');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};
const getperiod = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT opinto_id,Period_name,Courses.course_name FROM Period INNER JOIN Courses ON belong_id=opinto_id WHERE  belong_id = ? ' , [ id ]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};




module.exports ={
  getAllPeriods,
  getperiod
};