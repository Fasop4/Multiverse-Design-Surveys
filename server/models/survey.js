let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collectsion: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);