var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET Route for READ Operation */
router.get('/', indexController.displayHomePage);

module.exports = router;