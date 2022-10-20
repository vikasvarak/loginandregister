const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');


router.get('/login', (req, res) => res.render('users/login'));
router.post('/login', (req, res, next) => {
    if (req.body.username == 'vikasvarak' && req.body.password == 'Vikas@123') {
        passport.authenticate('local', {
            successRedirect: '/admindashboard',
            failureRedirect: '/users/login'
        })(req, res, next);
    } else {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login'
        })(req, res, next);
    }
});



router.get('/register', (req, res) => res.render('users/register'));
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    let errors = [];
    if (!username || !email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            username,
            email,
            password
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('users/register', {
                    errors,
                    username,
                    email,
                    password
                });
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        res.redirect('/users/login');
    });
});

module.exports = router;