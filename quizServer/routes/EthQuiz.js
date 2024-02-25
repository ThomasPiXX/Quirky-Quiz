const sqlite3 = require('sqlite3');
const express = require('express')
const ethRoute = express.Router();
const dbQuiz = new sqlite3.Database('./quiz.db');



ethRoute.get('/ethQuiz', (req, res) => {
    console.log('eth quiz route hit');
    dbQuiz.all('SELECT * FROM questionETH', (err, rows) => {
        if(err) {
            console.error(err.message);
            res.status(500).json({error: 'Internal servor error'});
            return;
        }
        console.log('request send back to front end');
        res.json(rows);
    })
});

module.exports = {
    ethRoute,
}