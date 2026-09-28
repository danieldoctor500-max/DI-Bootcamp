const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Express.js Homepage!');
});

router.get('/about', (req, res) => {
    res.send('Welcome to the About Us page!');
});

module.exports = router;