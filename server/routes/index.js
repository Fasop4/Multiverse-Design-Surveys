var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Home' 
    });
});


/*
// /* GET Survey page. 
router.get('/survey', function(req, res, next) {
    res.render('survey-list', { title: 'Survey' });
});*/

module.exports = router;