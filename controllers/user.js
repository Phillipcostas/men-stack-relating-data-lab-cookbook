const express = require('express');
const router = express.Router();

const User = require('../models/user.js')


router.get('/index', async (req, res) => {
    res.render('users/index.ejs')
});

module.exports = router; 