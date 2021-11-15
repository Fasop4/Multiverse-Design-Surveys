/*
Author: Multiverse Design
Date: Nov-12-2021
FileName : survey.js

*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(surveyList);
            //console.log("inside /survey-list");
            if (req.user) {
                console.log(req.user ? req.user.displayname : '');
            } else {
                console.log("no displayname passed here");

                res.render('index', {
                    title: 'Survey List',
                    page: 'survey/survey-list',
                    SurveyList: surveyList,
                    displayName: req.user ? req.user.displayname : ''
                });
            }
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('index', {
        title: 'Add Survey',
        page: 'survey/survey-add',
        SurveyList: "",
        displayName: req.user ? req.user.displayname : ''
    });
}

module.exports.processAddPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.title);
    console.log(req.body.subtitle);

    let newSurvey = Survey({
        "title": req.body.title,
        "subtitle": req.body.subtitle,
        "description": req.body.description,
        "enterQuestion1": req.body.enterQuestion1,
        "enterQuestion2": req.body.enterQuestion2,
        "enterQuestion3": req.body.enterQuestion3
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the list
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
            //TODO need to check res.render('survey-edit', {title: 'Edit Survey', business: businessToEdit, 
            //displayName: req.user ? req.user.displayName : ''})
            res.render('index', {
                title: 'Edit Survey',
                page: 'survey/survey-edit',
                survey: surveyToEdit,
                displayName: req.user ? req.user.displayname : ''
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "subtitle": req.body.subtitle,
        "description": req.body.description,
        "enterQuestion1": req.body.enterQuestion1,
        "enterQuestion2": req.body.enterQuestion2,
        "enterQuestion3": req.body.enterQuestion3
    });

    Survey.updateOne({
        _id: id
    }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            // refresh the survey list

            res.redirect('/survey-list');
        }
    });
}

/*.sort({
    "firstName": 1
}); // survey list alphabetically sorted */ //TODO for future implementation. Sorting of surveys