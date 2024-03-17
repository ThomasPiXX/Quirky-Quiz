const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {cookieHash} = require('./utils/cookieHash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { csrfProtection } = require('./utils/csurf');
const { ethRoute } = require('./routes/EthQuiz');
const { signUpRouter } = require('./routes/signUp');
const { signInRouter } = require('./routes/signIn');
const { jsRoute } = require('./routes/JsQuiz');
const { passport } = require('./utils/passport');
const app = express();
const port = 3001;
const { csrfTokenRouter } = require('./routes/csrfToken');
const { userStatRouter } = require('./routes/userStats');
const { SubmitScoresRouter } = require('./routes/submitScores');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: cookieHash(),
    resave: false,
    saveUninitialized: true,
    cookie:{secure: 'auto', httpOnly: true }
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
};
app.use(cors(corsOptions));

app.use(csrfProtection);

//routes
app.use('/api', ethRoute);
app.use('/api', jsRoute);
app.use('/api', signUpRouter);
app.use('/api', signInRouter);
app.use('/api', csrfTokenRouter);
app.use('/api', userStatRouter);
app.use('/api', SubmitScoresRouter);




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

