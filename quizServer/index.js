const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// SQLite connection db
const dbUser = new sqlite3.Database('user.db');
const dbQuiz = new sqlite3.Database('quiz.db');

app.get('/jsquiz', (req, res) => {
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

//ETH quizz connection 

app.get('/ethQuiz', (req, res) => {
    console.log('eth quiz route hit');
    dbQuiz.all('SELECT * FROM questionEth', (err, rows) => {
        if(err) {
            console.error(err.message);
            res.status(500).json({error: 'Internal servor error'});
            return;
        }
        console.log('request send back to front end');
        res.json(rows);
    })
})

//login request
app.post('/login', (req, res) => {
    console.log('login attempt');

})

//sign up request
app.post('/createAccount', (req, res) => {
    const{ username, password } = req.body;

    dbUser.get("SELECT * FROM users WHERE user_name=?", [username], (error, row) =>{
        if(error) throw error;
        
        if(row){
            console.log("User already exist");
            res.status(400).send('User already exist');
        }else{
            passwordHasher(password), (error, hashedPassword)
        }
    }
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


