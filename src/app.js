const express = require('express');
const glob = require('glob');
const bodyParser = require('body-parser');
const pug = require('pug');

module.exports = function(app) {

  // Configure view engine to render PUG templates
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  
  // include all the controllers
  let controllers = glob.sync(__dirname + '/controllers/*.js');
  controllers.forEach(function(controllerFileName){
    require(controllerFileName)(app);
  });

}
