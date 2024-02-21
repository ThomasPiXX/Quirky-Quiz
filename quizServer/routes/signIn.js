const express = require('express');
const signInRouter = express.Router();
const { passport } = require('../utils/passport');

signInRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if(error) {
            return next(error);
        }
        if(!user) {
            return res.redirect('/createAccount');
        }
        req.login(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.redirect('/dashboard');
        });
    })(req, res, next);
})

module.exports = {
    signInRouter,
}