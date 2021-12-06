const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');

// create a model class for submitted survey document
let surveySubmitModel = mongoose.Schema({
    surveyId: String,
    answer: Array
}, {
    collection: "surveysubmit"
});

module.exports = mongoose.model('SurveySubmit', surveySubmitModel);