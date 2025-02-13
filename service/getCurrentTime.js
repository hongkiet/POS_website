function getCurrentDateTime() {
    const currentDate = new Date();
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    };
    
    return currentDate.toLocaleTimeString(undefined, options);
  }
const dateTime = getCurrentDateTime();
module.exports = dateTime;
