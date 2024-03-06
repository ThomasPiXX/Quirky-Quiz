const { csrfProtection } = require('../utils/csurf');
const express = require('express');
const csrfTokenRouter = express.Router();


csrfTokenRouter.get('/api/csrfToken', csrfProtection, (req, res) => {
    console.log('csrfToken fetch')
    res.json({ csrfToken: req.csrfToken() });
});

module.exports = {
    csrfTokenRouter,
}