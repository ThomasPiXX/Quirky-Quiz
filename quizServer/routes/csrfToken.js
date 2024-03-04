const { csrfProtection } = require('../utils/csurf');
const express = require('express');
const csrfTokenRouter = express.Router();


csrfTokenRouter.get('/api/csrfToken', (req, res) => {
    
    res.json({ csrfToken: req.csrfProtection() });
});

module.exports = {
    csrfTokenRouter,
}