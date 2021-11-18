/*
Author: Multiverse Design
Date: Nov-11-2021
FileName : index.js
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias for user model

module.exports.displayHomePage = (req, res, next) => {

    res.render('index', {
        title: 'Home',
        page: 'home'
    });
}

//TODO work in progress user authentication
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', //local method to authenticate with passport
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/survey-list');
        });
    })(req, res, next);
}