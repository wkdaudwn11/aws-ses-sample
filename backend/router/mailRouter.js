const express = require('express');
const router = express.Router();

import mailController from '../controller/mailController';

/**
 * @route   GET /mail
 * @desc    sendEmail
 * @access  Public
 */
router.route('/').get(mailController.sendEmail);

module.exports = router;
