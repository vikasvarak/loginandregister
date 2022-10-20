const express = require('express');
const router = express.Router();


router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
});

router.get('/admindashboard', (req, res) => {
    res.render('admindashboard', {
        user: req.user
    })
});

module.exports = router;
