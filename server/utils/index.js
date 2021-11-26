
let express = require ('express');
let passport = require('passport');
let mongoose = require('mongoose');

// helper function for guard purposes
module.exports.requireAuth = (req, res, next) =>
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/user/login');
    }
    next();
}