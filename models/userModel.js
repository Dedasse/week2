'use strict';
//const pool = require('../database/db');
const promisePool = require('../database/db').promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT user_id, name, email FROM users');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT user_id, name, email,isAdmin FROM users WHERE user_id = ?', [ id ]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  try {
    console.log('insert user?', user);
    const [rows] = await promisePool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', user);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

/*const insertUser = async (user) => {
  try {
    console.log('insert user?', user);
    const [rows] = await promisePool.query('INSERT INTO user (name, email, password, isAdmin) VALUES (?, ?, ?, ?)', user);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};*/

const updateUser = async (user) => {
  try {
    console.log('insert user?', user);
    const [rows] = await promisePool.query('UPDATE users SET name = ?, email = ?, password = ?, isAdmin = ? WHERE users.user_id = ?', [ user.name, user.email, user.passwd, user.isAdmin, user.id ]);
    return rows;
  } catch (e) {
    console.error('updateUser model crash', e.message);
  }
};

const deleteUser = async (id) => {
  try {
    console.log('delete user', id);
    const [rows] = await promisePool.query('DELETE FROM users WHERE user.user_id = ?', [ id ]);
    console.log('deleted?', rows);
    return rows;
  } catch (e) {
    console.error('deleteUser model', e.message);
  }
}

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM users WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  getUserLogin,
};
