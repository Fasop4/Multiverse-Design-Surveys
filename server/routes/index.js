let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET Route for READ Operation */
router.get('/', indexController.displayHomePage);

module.exports = router;