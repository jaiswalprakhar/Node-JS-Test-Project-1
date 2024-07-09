const bookIssuedData = document.getElementById('book-Issued');
const bookReturnedData = document.getElementById('returned-Books');

export function handleBookSubmit(event){
    event.preventDefault();
    const bookName = event.target.bookName.value;

    /*const time = (hours, minutes, seconds) => {
        if(hours >= 12) {
         return (`${hours%12}:${minutes}:${seconds} PM`);
        }
        else {
         return (`${hours}:${minutes}:${seconds} AM`);
        }
     }

    const date1 = new Date();
    const bookIssuingDate = date1;
    const bookIssuingTime = time(date1.getHours(), date1.getMinutes(), date1.getSeconds());*/
    /*const bookIssuingDate = `${date1.getDate()}/${date1.getMonth()+1}/${date1.getFullYear()}`;
    console.log(bookIssuingDate);
    console.log(bookIssuingTime);*/

    /*let date2 = new Date();
    const bookReturningDate = new Date(date2.setHours(date2.getHours() + 1));
    const bookReturningTime = time(date2.getHours(), date2.getMinutes(), date2.getSeconds());*/
    /*const bookReturningDate = `${date2.getDate()}/${date2.getMonth()+1}/${date2.getFullYear()}`;
    console.log(bookReturningDate);
    console.log(bookReturningTime);*/

    let myobj = {
        bookName: bookName,
        bookReturnStatus: "NO",
        /*bookIssuingDate: bookIssuingDate,
        bookIssuingTime: bookIssuingTime,
        bookReturningDate: bookReturningDate,
        bookReturningTime: bookReturningTime,
        bookReturnedDate: null,
        bookReturnedTime: null,*/
        fine: 0
    }
    
    //console.log(myobj)
    event.target.reset();
    createBookIssue(myobj);
}

const createBookIssue = (obj) => {
    axios.post("http://localhost:3000/admin/create-book-issue", obj)
        .then((response) => {
            console.log(response.data.message);
            console.log(response.data.issuedBookData);
            showIssuedBook(response.data.issuedBookData);
        })
        .catch((err) => {
            bookIssuedData.innerHTML = bookIssuedData.innerHTML + `<h4>Something went wrong(${err.errorMessage})</h4>`;
            console.log(err);
        })
}

const showIssuedBook = (issuedbookData) => {
    /*const issueDate = new Date(issuedbookData.bookIssuingDate);
    const issueTime = issuedbookData.bookIssuingTime;
    //console.log(issueDate, issueTime);
    
    const returningDate = new Date(issuedbookData.bookReturningDate);
    const returningTime = issuedbookData.bookReturningTime;
    //console.log(returningDate, returningTime);*/
    let childNode;
    if(issuedbookData.fine > 0)
    {
        childNode = `<div id="${issuedbookData.id}" class="col-sm-3 m-3 p-3 bg-dark text-light fw-medium">
                        <p class="text-break">Book Name : ${issuedbookData.bookName}</p>
                        <p>Book taken on : ${issuedbookData.bookIssuingDate}, ${issuedbookData.bookIssuingTime} IST</p>
                        <p>Book return on : ${issuedbookData.bookReturningDate}, ${issuedbookData.bookReturningTime} IST</p>
                        <p>Current Fine: Rs ${issuedbookData.fine}</p>
                        <button class="btn btn-success" onclick="payFine(${issuedbookData.id}, ${issuedbookData.fine})"> Return Book </button>
                        </div>`;
    }
    else {
        childNode = `<div id="${issuedbookData.id}" class="col-sm-3 m-3 p-3 bg-dark text-light fw-medium">
                        <p class="text-break">Book Name : ${issuedbookData.bookName}</p>
                        <p>Book taken on : ${issuedbookData.bookIssuingDate}, ${issuedbookData.bookIssuingTime} IST</p>
                        <p>Book return on : ${issuedbookData.bookReturningDate}, ${issuedbookData.bookReturningTime} IST</p>
                        <p>Current Fine: Rs ${issuedbookData.fine}</p>
                        <button class="btn btn-success" onclick=returnBook('${issuedbookData.id}')> Return Book </button>
                        </div>`;
    }

    bookIssuedData.innerHTML = bookIssuedData.innerHTML + childNode;
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/admin/get-book-issue")
    .then((response) => {
        console.log(response.data.message);
        for(let i = 0; i < response.data.issuedBookData.length; i++)
        {
            if(response.data.issuedBookData[i].bookReturnStatus === "NO")
            {
                showIssuedBook(response.data.issuedBookData[i]);
            }
            else if(response.data.issuedBookData[i].bookReturnStatus === "YES")
            {
                showReturnedBook(response.data.issuedBookData[i]);
            }
        }
        console.log(response.data.message);
    })
    .catch((err) => {
        bookIssuedData.innerHTML = bookIssuedData.innerHTML + `<h4>Something went wrong(${err.errorMessage})</h4>`;
        console.log(err);
    })
});

window.payFine = (bookId, bookFine) => {
    let bookDataId = document.getElementById(`${bookId}`);
    
    const childNode = document.createElement('div');
    childNode.id = bookId;
    childNode.className = 'col-sm-3 m-3 p-3 bg-dark text-light fw-medium';
    childNode.innerHTML = `<input type="text" class="form-control" value="${bookFine}" disabled />
                            <button class="btn btn-success mt-2" onclick=returnBook('${bookId}')> Pay Fine </button>`;
    
    bookIssuedData.replaceChild(childNode, bookDataId);
}

window.returnBook = (bookId) => {
    console.log(bookId)
    const myobj = {
        bookReturnStatus: "YES"
    }
    axios.patch(`http://localhost:3000/admin/return-book/${bookId}`, myobj)
    .then((response) => {
        if(response.data.issuedBookData.bookReturnStatus === "YES")
        {
            removeBook(response.data.issuedBookData)
            console.log(response.data.message);
            console.log(response.data.issuedBookData);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

const removeBook = (book) => {
    const childElement = document.getElementById(`${book.id}`);
    if(childElement) {
        bookIssuedData.removeChild(childElement);
        showReturnedBook(book);
    }
}

const showReturnedBook = (returnedBookData) => {
    const childNode = `<div id="${returnedBookData.id}" class="col-sm-12 p-3 bg-dark text-light fw-medium">
                        <p class="text-break">Book Name : ${returnedBookData.bookName}</p>
                        <p>Fine: Rs ${returnedBookData.fine}</p>
                        <p>Returned on : ${returnedBookData.bookReturnedDate}, ${returnedBookData.bookReturnedTime} IST</p>
                        </div>`;
    
    bookReturnedData.innerHTML += childNode;
}