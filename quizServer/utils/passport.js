const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./user.db')

passport.serializeUser((user, done) => {
    console.log('Serialized user:', user);
    done(null, user.user_name);
});

passport.deserializeUser((username, done) => {
    db.get('SELECT * FROM users WHERE user_name = ?', [username], (error, row) => {
        if(error){
            return done(error);
        }
        if(!row){
            return done(null, false);
        }
        const user = {
            name: row.userName,

        }
        db.get('SELECT * WHERE userID JOIN userState WITH users.userID = userStat.userID');
        if(error) {
          return done(error);
        }
        if(!row){
          return done(null, false);
        }
        const userState = {
          ethStat:row.eth_stats,
          jsStat: row.js_stats,
          average: row.average_stat,
        }
        console.log('Deserialized User:', user);
        return done(null, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    db.get("SELECT * FROM users WHERE userName = ?", [username], (error, rows ) => {
        if(error){
            return done(error);
        }
        if(!rows) {
            return done(null, false,)
        }

        bcrypt.compare(password, rows.password, (error, isMatch) => {
            if(error) {
                return done(error);
            }
            if(!isMatch) {
                return done(null, false,);
            }
            })
    })
}))


module.exports = {
    passport,
}