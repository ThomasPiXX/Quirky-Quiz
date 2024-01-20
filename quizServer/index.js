const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// SQLite connection db
const db = new sqlite3.Database('quiz.db');

app.get('/jsquiz', (req, res) => {
    console.log('Route hit: /jsquiz');
    db.all('SELECT * FROM questionsJS', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('send back')
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
