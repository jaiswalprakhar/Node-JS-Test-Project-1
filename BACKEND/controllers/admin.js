const Review = require('../models/book');

exports.issueBook = async (req, res, next) => {
    //console.log(req.body);
    const bookName = req.body.bookName;
    const bookIssueDate = req.body.bookIssueDate;
    const bookReturnDate = req.body.bookReturnDate;
    const fine = req.body.fine;
        try {
            const issueBookData = await Review.create({
                bookName: bookName,
                bookIssueDate: bookIssueDate,
                bookReturnDate: bookReturnDate,
                fine: fine
            })
            res.status(201).json({
                message: 'Book Issued',
                issueBookData: issueBookData
            });
        }
        catch(err) {
            console.log(err.message);
            res.status(500).json({ errorMessage: err});
        }
};

exports.getReview = async (req, res, next) => {
    try {
        const reviewName = req.params.companyName;
        const reviewData = await Review.findAll({where: { name: reviewName }});
        if(reviewData.length > 0) {
            message = 'Fetched all the reviews';
        }
        else {
            message = `${reviewName}'s Company Review Not Present`;
        }
        res.status(200).json({
            message: message,
            reviewData: reviewData
        });
    }
    catch(err) {
        res.status(500).json({errorMessage: err});
    }
};