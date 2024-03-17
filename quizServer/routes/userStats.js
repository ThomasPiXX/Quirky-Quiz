const express = require('express');
const userStatRouter = express.Router();



userStatRouter.get('/UserStats', (req, res) => {
    console.log('UserStats route got hit');

    if(req.isAuthenticated()){
    const { username, ethStat, jsStat, averageStat } = req.user;
    res.json({
        username,
        ethStat,
        jsStat,
        averageStat,
    });
    }else{
        res.status(403).send('Unauthorized');
    } 
});

module.exports = {
    userStatRouter,
}