const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./user.db')

passport.serializeUser((user, done) => {
    console.log('Serialized user:', user);
    done(null, user.userID);
});

passport.deserializeUser((id, done) => {
    console.log('deserialize part is hit ');
    db.get(`
        SELECT users.*, userStat.eth_stats, userStat.js_stats, userStat.average_stat
        FROM users
        LEFT JOIN userStat ON users.userID = userStat.userID
        WHERE users.userID = ?`, [id], (error, row) => {
        if(error) {
            console.error('Error during deserialization', error);
            return done(error);
        }
        if(!row) {
            console.log('No user found with userID:', id);
            return done(null, false);
        }
        
        const user = {
            id: row.userID,
            username: row.userName,
            ethStat: row.eth_stats,
            jsStat: row.js_stats,
            averageStat: row.average_stat,
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

            done(null, user);
            });
    });
}));


module.exports = {
    passport,
};