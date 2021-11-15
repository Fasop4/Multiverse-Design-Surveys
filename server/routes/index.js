var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');
const { displayHomePage } = require('../controllers/survey');


/* GET home page. 
router.get('/', displayHomePage(req, res, next) => {
    res.render('home', { 
        title: 'Home' 
    })
});
*/

/*
// /* GET Survey page. 
router.get('/survey', function(req, res, next) {
    res.render('survey-list', { title: 'Survey' });
});*/

module.exports = router;