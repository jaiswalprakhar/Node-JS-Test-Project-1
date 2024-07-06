const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/create-book-issue', adminController.issueBook);

router.get('/get-review/:companyName', adminController.getReview);

module.exports = router;