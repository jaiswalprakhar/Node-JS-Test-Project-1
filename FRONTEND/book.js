const bookIssuedData = document.getElementById('book-Issued');

export function handleBookSubmit(event){
    event.preventDefault();
    const bookName = event.target.bookName.value;

    let date = new Date();
    const bookIssueDate = date;

    date = new Date(date.setHours(date.getHours() + 1));
    const bookReturnDate = date;

    let myobj = {
        bookName: bookName,
        bookIssueDate: bookIssueDate,
        bookReturnDate: bookReturnDate,
        fine: 0
    }

    event.target.reset();
    createBookIssue(myobj);
}

const createBookIssue = (obj) => {
    axios.post("http://localhost:3000/admin/create-book-issue", obj)
        .then((response) => {
            console.log(response.data.message);
            console.log(response.data.issueBookData);    
            showIssuedBook(response.data.issueBookData);
        })
        .catch((err) => {
            console.log(err);            
        })
}

const showIssuedBook = (issuedbookData) => {
    const issuedate = issuedbookData.bookIssueDate;
    console.log(issuedate.getFullYear())
    const returndate = issuedbookData.bookReturnDate;
    const childNode = `<div id="${issuedbookData.id}" class="g-col-4 bg-dark">
                        <p>Book Name : ${issuedbookData.bookName}</p>
                        <p>Book taken on : ${issuedate.getDate()}/${issuedate.getMonth()}/${issuedate.getFullYear()}, ${issuedate.getHours()}:${issuedate.getMinutes()}:${issuedate.getSeconds()}</p>
                        <p>Book return on : ${returndate.getDate()}/${returndate.getMonth()}/${returndate.getFullYear()}, ${returndate.getHours()}:${returndate.getMinutes()}:${returndate.getSeconds()}</p>
                        <p>Current Fine: ${issuedbookData.fine}</p>
                        <button class="btn btn-success" onclick = returnBook('${issuedbookData.id}')> Return Book </button>
                        </div>`;

    bookIssuedData.innerHTML = bookIssuedData.innerHTML + childNode;
}

/*const returnBook = (bookId) => {
    axios.delete(`http://localhost:3000/admin/delete-expense/${expenseId}`)
    .then((response) => {
        console.log(response.message);
        removeExpense(expenseId);
    })
    .catch((err) => {
        console.log(err.errorMessage);
    })
}*/