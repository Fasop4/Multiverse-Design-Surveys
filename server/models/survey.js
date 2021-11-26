/*
Author: Multiverse Design
Date: Nov-12-2021
FileName : survey.js

*/

let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({ //TODO pending to confirm how to pass user logged in as author of the survey
    author: String, // = ????
    surveyName: String,
    description: String,
    enterQuestion1: String,
    enterQuestion2: String,
    enterQuestion3: String
}, {
    collection: "survey"
});

module.exports = mongoose.model('Survey', surveyModel);