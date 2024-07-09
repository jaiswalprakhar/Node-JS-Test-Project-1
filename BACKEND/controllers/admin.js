const Book = require('../models/book');
const { issueBookTime, calculateFine } = require('../util/helper');

exports.postIssueBook = async (req, res, next) => {
    /*const { bookName, bookIssuingDate, bookIssuingTime, bookReturningDate, bookReturningTime, 
        bookReturnStatus, bookReturnedDate, bookReturnedTime, fine } = req.body;*/
        try {
            const { bookName, bookReturnStatus, fine } = req.body;
            const [oneHour, currentDateTime, oneHourLaterCurrentDateTime, currentDate, currentTime, 
                oneHourLaterCurrentDate, oneHourLaterCurrentTime] = issueBookTime();

            const issuedBookData = await Book.create({
                bookName: bookName,
                bookIssuingDateTime: currentDateTime,
                bookIssuingDate: currentDate,
                bookIssuingTime: currentTime,
                bookReturningDateTime: oneHourLaterCurrentDateTime,
                bookReturningDate: oneHourLaterCurrentDate,
                bookReturningTime: oneHourLaterCurrentTime,
                bookReturnStatus: bookReturnStatus,
                /*bookReturnedDateTime: bookReturnedDateTime,
                bookReturnedDate: bookReturnedDate,
                bookReturnedTime: bookReturnedTime,*/
                fine: fine
            })
            res.status(201).json({
                message: 'Book Issued',
                issuedBookData: issuedBookData
            });
        }
        catch(err) {
            console.log(err.message);
            res.status(500).json({ errorMessage: err});
        }
};

exports.getIssueBook = async (req, res, next) => {
    try {
        const issuedBookData = await Book.findAll();

        for(let i = 0; i < issuedBookData.length; i++)
        {
            updatedFine = calculateFine(issuedBookData[i].bookReturningDateTime, issuedBookData[i].fine);
            //console.log(calculateFine(issuedBookData[i].bookReturningDateTime, issuedBookData[i].fine));
            if(updatedFine !== issuedBookData[i].fine)
            {
                issuedBookData[i].fine = updatedFine;
                await issuedBookData[i].save();
                console.log("Fine Updated");
            }
        }

        if(issuedBookData) {
            message = 'All book details are fetched';
        }
        else {
            message = `No books are issued`;
        }
        res.status(200).json({
            message: message,
            issuedBookData: issuedBookData
        });
    }
    catch(err) {
        res.status(500).json({errorMessage: err});
    }
};

exports.returnIssuedBook = async (req, res, next) => {
    try {
        const [oneHour, currentDateTime, oneHourLaterCurrentDateTime, currentDate, currentTime, 
            oneHourLaterCurrentDate, oneHourLaterCurrentTime] = issueBookTime();
        console.log(currentDateTime, currentDate, currentTime);
        const issuedBookId = req.params.id;
        const updatedBookReturnStatus = req.body.bookReturnStatus;
        const issuedBookData = await Book.findOne({ where: { id: issuedBookId }});

        if(!issuedBookData)  {
            console.log("Issued Book NOT Present");
            message = "Issued Book NOT Present";           
        }
        else {
            issuedBookData.bookReturnStatus = updatedBookReturnStatus;
            issuedBookData.bookReturnedDateTime = currentDateTime;
            issuedBookData.bookReturnedDate = currentDate;
            issuedBookData.bookReturnedTime = currentTime;
            await issuedBookData.save();
            message = "Book Returned";
            console.log("Status updated");
        }

        res.status(200).json({
            message: message,
            issuedBookData: issuedBookData
        });
    }
    catch(err)  {
        res.status(500).json({errorMessage: err});
    }
}