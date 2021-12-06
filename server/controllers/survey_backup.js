// creating express reference
let express = require('express');

// creating reference of Router
let router = express.Router();

// Creating a reference object of mongoose
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('survey/list', {
                title: 'Surveys',
                SurveyList: surveyList
                    //,displayName: req.user ? req.user.displayName:''
            });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', { title: 'Add Survey' })
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "contactno": req.body.contactno,
        "email": req.body.email,
        "accomplish": req.body.accomplish,
        "recommend": req.body.recommend,
        "bestmatch": req.body.bestmatch,
        "easyuse": req.body.easyuse,
        "satisfied": req.body.satisfied,
        "competitive": req.body.competitive,
        "oftenuse": req.body.oftenuse,
        "comments": req.body.comments
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('survey/edit', {
                title: 'Edit Survey',
                survey: surveyToEdit
                    //,displayName: req.user ? req.user.displayName:''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "contactno": req.body.contactno,
        "email": req.body.email,
        "accomplish": req.body.accomplish,
        "recommend": req.body.recommend,
        "bestmatch": req.body.bestmatch,
        "easyuse": req.body.easyuse,
        "satisfied": req.body.satisfied,
        "competitive": req.body.competitive,
        "oftenuse": req.body.oftenuse,
        "comments": req.body.comments
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contact list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contact list
            res.redirect('/survey-list');
        }
    });
}