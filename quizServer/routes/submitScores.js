const express = require('express');
const SubmitScoresRouter = express.Router();
const sqlite3 = require('sqlite3');
const statDb = new sqlite3.Database('./user.db');


SubmitScoresRouter.post('/submitScores', (req, res) =>{

})



module.exports = {
    SubmitScoresRouter,
}