const express = require('express');
const router = express.Router();
const fs = require('fs');
const obj = require('../data/transactionList');

module.exports = function(app) {
  app.use('/', router);
}

router.get('/user', function(req, res, next) {
  res.send(obj);
});