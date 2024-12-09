const express = require('express');
const sendEmail = require('../controller/email');
const { model } = require('mongoose');
const router = express.Router();

router.post('/subscribe', sendEmail);

module.exports = router;