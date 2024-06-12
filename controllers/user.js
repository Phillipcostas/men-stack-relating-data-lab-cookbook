const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
    const user = await User.find()
    res.render('users/index.ejs')
});

module.exports = router; 