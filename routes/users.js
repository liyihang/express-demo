const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const passport = require('passport')
const router = express.Router();

// load users model
require('../models/users')
const User = mongoose.model('users')
// login route
router.get('/login', (req, res) => {
    res.render('users/login');
});
// register route
router.get('/register', (req, res) => {
    res.render('users/register');
});
// post login form
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/user/login',
        failureFlash: true,
    })(req, res, next);
});
router.post('/register', (req, res) => {
    let errors = []
    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Passwords do not match' })
    }
    if (req.body.password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' })
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            password2: req.body.password2
        })
    } else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'Email already used')
                    res.redirect('/user/register')
                } else {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and login in first');
                                    res.redirect('/user/login')
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            })
    }
});
module.exports = router