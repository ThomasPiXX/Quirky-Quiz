const express = require('express');
const signInRouter = express.Router();
const { passport } = require('../utils/passport');

signInRouter.post('/login', (req, res, next) => {

    passport.authenticate('local', (error, user, info) => {
        if(error){
            return res.status(500).json({error: error.message});
        }
        if(!user) {
            return res.status(401).json({ error: 'Login failed.Look at credential'});
        }
        req.login(user, (error) => {
            if(error) {
                return res.status(500).json({error: error.message});
            }
            return res.status(200).json({message: 'Logged in successfully'});
        });
    })(req, res, next);
})

module.exports = {
    signInRouter,
}