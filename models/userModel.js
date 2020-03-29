'use strict';
const users = [
  {
    user_id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    user_id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const promisePool = require('../database/db').promise();
const getUsersList = async() => {
  try {
    const [rows] = await promisePool.query('SELECT user_id, name, email FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }

};

const getUser = async(id) => {
  try{
    const [rows]= await promisePool.query('SELECT * FROM wop_user WHERE user_id=?', [id]);
    return rows[0];
  }catch (e){
    console.error('error', e.message);
  }
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

const addUser= async(user)=>{
  try {
    console.log('insert user?', user);
    const [rows] = await promisePool.query('INSERT INTO wop_user( name, email, password ) VALUES (?,?,?)', [ user.name, user.email, user.password ]);
    return rows;
  } catch (e) {
    console.error('updateUser model crash', e.message);
  }
};

module.exports = {
  users,
  getUsersList,
  getUser,
  getUserLogin,
  addUser,
};

