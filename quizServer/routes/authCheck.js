const express = require('express');
const AuthCheckRouter = express.Router();


AuthCheckRouter.get('/authCheck', (req, res) => {
    if (req.user){
        res.json({isLoggedIn: true});
    }else{
        res.json({ isLoggedIn: false});
    };
});

module.exports = {
    AuthCheckRouter,
}