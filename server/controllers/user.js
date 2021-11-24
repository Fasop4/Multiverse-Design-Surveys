let pass = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let userModel = require('../models/user');
let User = userModel.User;

module.exports.userListing = (req, res, next)  =>{
    res.send('Placeholder');
}

//login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('index', 
        {
           title: "Login",
           page: "auth/login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/user/login');
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
            return res.redirect('/user/login');
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

            return res.redirect('/surveys');
        });
    })(req, res, next);
}

//register page
module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('index',
        {
            title: 'Register',
            page: "auth/register",
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
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('index',
            {
                title: 'Register',
                page: 'auth/register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            console.log(newUser);

            return pass.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}

//logout
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}