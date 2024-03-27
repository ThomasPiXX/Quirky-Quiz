const express = require('express');
const LogoutRouter = express.Router();



LogoutRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err){
            console.log(err);
        }
    });
    console.log(req.user);
});


module.exports = {
    LogoutRouter
}