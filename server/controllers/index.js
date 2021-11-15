/*
Author: Multiverse Design
Date: Nov-11-2021
FileName : index.js

*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let surveyController = require('../controllers/survey');

/* GET Route for READ Operation */
router.get('/', surveyController.displayHomePage);

/* GET Route for READ Operation */
router.get('/survey-list', surveyController.displaySurveyList);