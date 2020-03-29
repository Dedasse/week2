'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  res.json(users);
};

const user_get = async(req, res) => {
  console.log('user id parameter', req.params);
  
  const user = await userModel.getUser(req.params.id);
  delete user.password;
  res.json(user);
};

const user_post = async(req, res) => {
  console.log('data from form', req.body, );
  const inUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await userModel.addUser(inUser);
    console.log('inserted', user);
    res.send(`added user: ${user}`);
  } catch (e) {
    console.error('problem with cat_post in catController', e);
    res.status(500).send(`database insert error: ${e.message}`);
  }
  
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
};
