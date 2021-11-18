/*
Author: Multiverse Design
Date: Nov-11-2021
FileName : index.js
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let pass = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias for user model

//home page
module.exports.displayHomePage = (req, res, next) => {

    res.render('index', {
        title: 'Home',
        page: 'home'
    });
}

//login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

//TODO work in progress user authentication
module.exports.processLoginPage = (req, res, next) => {
    pass.authenticate('local', //local method to authenticate
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

            return res.redirect('/survey-list');
        });
    })(req, res, next);
}

//register page
module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {

            return pass.authenticate('local')(req, res, () => {
                res.redirect('/survey-list')
            });
        }
    });
}

//logout
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}