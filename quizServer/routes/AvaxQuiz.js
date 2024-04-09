const sqlite3 = require('sqlite3');
const express = require('express');
const AvaxQuizRouter = express.Router();
const dbAvax = new sqlite3.Database('./quiz.db');


AvaxQuizRouter.get('/avaxquiz', (req, res) => {
    console.log('avax route hits');
    dbAvax.all('SELECT * FROM questionAvax', (err, rows) => {
        if(err){
            console.error(err.message);
            res.status(500).json({error: 'internal server error'});
            return;
        }
        console.log('send back');
        res.json(rows);
    });
});

module.exports = {
    AvaxQuizRouter,
}