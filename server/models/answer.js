const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');

// create a model class

let answerModel = mongoose.Schema({
    surveyid: ObjectId,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String
}, {
    collection: "answers"
});

module.exports = mongoose.model('Answer', answerModel);