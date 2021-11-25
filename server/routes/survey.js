/*
Author: Multiverse Design
Date: Nov-12-2021
FileName : survey.js
Routing for Survey list
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveyController = require('../controllers/survey');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for READ Operation */
router.get('/', requireAuth, surveyController.displaySurveyList);

/* GET Route for CREATE Operation */
router.get('/add', requireAuth, surveyController.displayAddPage);

/* CREATE Operation */
router.post('/add', requireAuth, surveyController.processAddPage);

/* UPDATE Method */
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

/* GET to perform DELETE Operation */
router.get('/delete/:id', requireAuth, surveyController.performDelete);

module.exports = router;