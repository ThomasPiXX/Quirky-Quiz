const sqlite3 = require('sqlite3');
const path = require('path');
const express = require('express');
const signUpRouter = express.Router();
const dbPath = path.resolve(__dirname, '../user.db');
const dbUser = new sqlite3.Database(dbPath);
const { passwordHasher }= require('../utils/passwordHasher');

signUpRouter.post('/createAccount', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    
    const { username, password, csrfToken  } = req.body;

    dbUser.run("SELECT * FROM users WHERE userName=?", [username], (error, row) => {
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
                dbUser.run("INSERT INTO users (userName, password) VALUES(?,?)", [username, hashedPassword ], (error) => {
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