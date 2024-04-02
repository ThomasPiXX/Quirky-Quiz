const sqlite3 = require('sqlite3');
const path = require('path');
const express = require('express');
const signUpRouter = express.Router();
const dbPath = path.resolve(__dirname, '../user.db');
const dbUser = new sqlite3.Database(dbPath);
const { passwordHasher }= require('../utils/passwordHasher');

signUpRouter.post('/createAccount', (req, res) => {
    
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
                        const userID = this.lastID;
                        const defaultStats = {
                            eth_stats: 0,
                            js_stats: 0,
                            average_stat: 0,
                        };

                        dbUser.run ('INSERT INTO userStat (userID, eth_stats, js_stats, average_stat) VALUES ( ?, ?, ?, ?)',[userID, defaultStats.eth_stats, defaultStats.js_stats, defaultStats.average_stat], (error) => {
                            if(error) {
                                console.error('Error creating default', error);
                            } else {
                                console.log('Default userStat created succesfully');
                            }
                        });
                        console.log("User account created");
                        res.status(201).json({ message: "User acount created" });
                    }
                });
            });
        }
    });
});

module.exports = {
    signUpRouter,
}