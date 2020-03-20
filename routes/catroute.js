'use strict';

const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    const cat = {
      'name': 'Frank',
      'age': 6,
      'weight': 5,
    }
    res.json(cat);
  })
  .post((req, res) => {
    console.log('HTTP POST with body params', req.body);
    res.send(`catinfo with HTTP POST 😊, usually insert, with name: ${req.body.name} and age: ${req.body.age}`);
  })
  .patch((req, res) => {
    console.log('HTTP PATCH with body params', req.body);
    res.send('this is PATCH (usually for partial update)');
  });

module.exports = router;
