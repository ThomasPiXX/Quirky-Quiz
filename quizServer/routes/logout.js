const express = require('express');
const LogoutRouter = express.Router();



LogoutRouter.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        // If logout was successful, respond with a success message
        res.status(200).json({ message: "Logout successful" });
    });
});



module.exports = {
    LogoutRouter
}