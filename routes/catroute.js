'use strict';

const router = require('express').Router();
const cats = require('../db/catmodel').cats;

router.route('/')
  .get((req, res) => {
    // select * form ...
    const reduced = cats.reduce((total, item) => total + item.age, 0);
    console.log('reduce total age of all cats', reduced);
    res.json(cats);
  })
  .post((req, res) => {
    console.log('HTTP POST with body params', req.body);
    res.send(`catinfo with HTTP POST 😊, usually insert, with name: ${req.body.name} and age: ${req.body.age}`);
  })
  .patch((req, res) => {
    console.log('HTTP PATCH with body params', req.body);
    // update all items
    const mapped = cats.map(item => {
      item.age++;
      return item;
    });
    //res.send('this is PATCH (usually for partial update)');
    res.json(mapped);
  });
// root v.s. route
router.route('/:id')
  .get((req, res) => {
    // select * from ... where id = ...
    console.log('HTTP GET with URL path param', req.params);
    const filtered = cats.filter(item => item.id == req.params.id);
    res.json(filtered[0]);
  })
  .patch()
  .delete();

module.exports = router;
