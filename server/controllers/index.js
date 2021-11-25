/*
Author: Multiverse Design
Date: Nov-11-2021
FileName : index.js
*/

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias for user model

//home page
module.exports.displayHomePage = (req, res, next) => {

    res.render('index', {
        title: 'Home',
        page: 'home',
        displayName: req.user ? req.user.displayName : ''
    });
}

//about page
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {
        title: 'About',
        page: 'about',
        displayName: req.user ? req.user.displayName : ''
    });
}

//TODO
module.exports.displayPublicSurveysPage = (req, res, next) => {
    res.render('index', {
        title: 'About',
        page: 'survey/public-surveys',
        displayName: req.user ? req.user.displayName : ''
    });
}
