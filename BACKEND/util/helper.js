/*const formatTime = (date) => {
    return date.toISOString().split('T')[1].split('.')[0]; // Extracts HH:mm:ss
}*/

const issueBookTime = () => {
    const oneHour = (60 * 60 * 1000);
    const currentDateTime = new Date();
    const oneHourLaterCurrentDateTime = new Date(currentDateTime.getTime() + oneHour);
    const currentDate = currentDateTime.toLocaleDateString();
    const currentTime = currentDateTime.toLocaleTimeString();
    //const currentTime = formatTime(currentDateTime);
    const oneHourLaterCurrentDate = oneHourLaterCurrentDateTime.toLocaleDateString();
    const oneHourLaterCurrentTime = oneHourLaterCurrentDateTime.toLocaleTimeString();
    //const oneHourLaterCurrentTime = formatTime(oneHourLaterCurrentDateTime);
    return [oneHour, currentDateTime, oneHourLaterCurrentDateTime, currentDate, currentTime, 
            oneHourLaterCurrentDate, oneHourLaterCurrentTime];
}

const calculateFine = (bookReturningDateTime, fine) => {
    const oneHour = (60 * 60 * 1000);
    const currentDateTime = new Date();
    if(currentDateTime.getTime() > bookReturningDateTime.getTime())
    {
        const time = Math.floor((currentDateTime.getTime() - bookReturningDateTime.getTime()) / oneHour);
        fine = time * 10;
        return fine;
    }
    else  {
        return fine;
    }
}

module.exports = { issueBookTime, calculateFine };