/*
Author: Multiverse Design
Date: Nov-12-2021
FileName : survey.js

*/
let mongoose = require('mongoose');

/*let templateSurveyModel = new mongoose.Schema ({
    author: {
        type: String,
        default: '',
        trim: true,
    }, 
    surveyName: {
        type: String,
        default: '', 
        trim: true,
    },
    description: {
        type: String,
        default: ''
    },
    questions: {
        question1: {
            type: String,
            default: ''
        },
        question2: {
            type: String,
            default: ''
        },
        question3: {
            type: String,
            default: ''
        },
    },
    Answers: {
        answerQ1: String,
        answerQ2: String,
        answerQ3: String,
    },
    ExpDate: {
        type: Date,
    }
});
*/

//create a model class
let surveyModel = mongoose.Schema({ 
    author: String, 
    surveyName: String,
    description: String,
    questions: {
        type: [String],
    },
    enterQuestion1: String,
    enterQuestion2: String,
    enterQuestion3: String
}, {
    collection: "survey"
});

module.exports = mongoose.model('Survey', surveyModel);