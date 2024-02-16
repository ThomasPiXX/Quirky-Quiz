const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        key: '_csrf-my-app',
        path: '/',
        httpOnly: true,
        secure: process.env.MODE_ENV === 'production',
        maxAge: 3600 // 1hour
    }
});


module.exports ={
    csrfProtection,
}