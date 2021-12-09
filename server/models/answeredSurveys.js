//Mohammad Wahiduzzaman
let mongoose = require('mongoose');

//store Answers of public surveys
let UserAnswersSurvey = new mongoose.Schema({
    surveyId: String,
    answer: [String],
   
}, {
    collection: "answeredSurveys"
});

module.exports = mongoose.model('UserAnswers', UserAnswersSurvey);