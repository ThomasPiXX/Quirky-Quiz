const sqlite3 = require('sqlite3');
const express = require('express');
const signUpRouter = express.Router();
const dbUser = new sqlite3.Database('../user.db');

signUpRouter.post('./signUp,', (req, res) => {
    const { username, password } = req.body

    dbUser.run("SELECT * FROM users WHERE user_name=?", [username], (error, row) => {
        if(error) throw error;

        if(row) {
            console.log('User already exists');
            res.status(400).send('User already exists');
        }else{
            passwordHasher(password, (error, hashedPassword) => {
                if(error){
                    console.log('error hashing password', error);
                    res.status(500).send('Error hashing password');
                    return;
                }
                dbUser("INSERT INTO users (user_name, user_password, JsScores, EthScores) VALUES(?,?,?,?)", [username, hashedPassword, 0, 0 ], (error) => {
                    if(error){
                        console.log(error);
                        res.status(400).send('error trying to insert new user to the Database');
                    }else{
                        console.log("User account");
                        res.redirect('./login');
                    }
                });
            });
        }
    });
});

module.exports = {
    signUpRouter,
}