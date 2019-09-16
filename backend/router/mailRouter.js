const express = require('express');
const router = express.Router();

import mailController from '../controller/mailController';

/**
 * @route   POST /mail
 * @desc    sendEmail
 * @access  Public
 */
router.route('/').post(mailController.sendEmail);

module.exports = router;
