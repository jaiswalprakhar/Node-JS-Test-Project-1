const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/create-book-issue', adminController.postIssueBook);

router.get('/get-book-issue', adminController.getIssueBook);

router.patch('/return-book/:id', adminController.returnIssuedBook);

module.exports = router;