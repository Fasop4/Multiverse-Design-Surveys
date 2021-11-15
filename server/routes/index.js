var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Welcome survey' });
});




// /* GET Survey page. */
router.get('/home', function(req, res, next) {
    res.render('survey-list', { title: 'Current Survey List' });
});

// /* GET Survey page. */
router.get('/survey', function(req, res, next) {
    res.render('survey', { title: 'Survey' });
});



module.exports = router;