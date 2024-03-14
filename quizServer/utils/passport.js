const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./user.db')

passport.serializeUser((user, done) => {
    console.log('Serialized user:', user);
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    db.get(`
        SELECT users.*, userState.ethStat, userState.jsStat, userState.averageStat
        FROM users
        LEFT JOIN userState ON users.userID = userState.userID
        WHERE users.userName = ?`, [username], (error, row) => {
        if(error) {
            console.error('Error during deserialization', error);
            return done(error);
        }
        if(!row) {
            console.log('No user found with username:', username);
            return done(null, false);
        }
        
        const user = {
            id: row.userID,
            username: row.userName,
            ethStat: row.ethStat,
            jsStat: row.jsStat,
            averageStat: row.averageStat
        };
        console.log('Deserialized User:', user);
        return done(null, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    db.get("SELECT * FROM users WHERE userName = ?", [username], (error, user) => {
        if(error){
            return done(error);
        }
        if(!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if(error) {
                return done(error);
            }
            if(!isMatch) {
                return done(null, false,{ message: 'Incorrect password '});
            }

            return done(null, user);
            });
    });
}));


module.exports = {
    passport,
}