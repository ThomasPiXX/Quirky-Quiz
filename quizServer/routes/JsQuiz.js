const sqlite3 = require('sqlite3');
const express = require('express');
const dbQuiz = new sqlite3.Database('./quiz.db');
const jsRoute = express.Router();



jsRoute.get('/jsquiz', (req, res) => {
    console.log('Route hit: /jsquiz');
    dbQuiz.all('SELECT * FROM questionsJS', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('send back')
        res.json(rows);
    });
});

module.exports = {
    jsRoute,
}
