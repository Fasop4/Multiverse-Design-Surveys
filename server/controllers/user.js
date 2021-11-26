let pass = require("passport");
let jwt = require('jsonwebtoken');

let userModel = require('../models/user');
let User = userModel.User;

//enviroment variables
require('dotenv').config();

//TODO pending
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
        return res.redirect('/');
    }
}

//TODO work in progress user authentication POST 
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
            console.log(user._id);
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('login');
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
                userName: user.userName,
                email: user.email
            }

            const authToken = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 604800 // 1 week
            });

                //TODO pending
            /*res.json({success: true, msg: ' User Logged in Succesfully', user: {
                id: user._id,
                displayName: user.displayName,
                userName: user.userName,
                email: user.email
            }, token: authToken});*/

            return res.redirect('surveys');
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
        userName: req.body.userName,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.firstName +" "+ req.body.lastName
    });
    console.log(newUser);

    User.create(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User" + err);
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
                title: 'Login',
                page: 'auth/login',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //TODO - pending to complete
           res.json({success: true, msg: 'User Registered Successfully'});

            return pass.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}

/*module.exports.processRegisterPage = async (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    newUser.isNew = true;
    
    try {
        console.log(newUser);
        let savedUser = await newUser.save();
        console.log(savedUser);

        if (savedUser) {
            passport.authenticate('signup', {
                    session: false
                }),
                async (req, res, next) => {
                    res.json({
                        message: 'Signup successful',
                        user: req.user
                    });
                }

        }

    } catch (err) {
        console.log(err);
    }
}
*/

//logout
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}