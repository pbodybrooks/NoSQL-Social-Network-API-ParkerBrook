// add suffix to date
const addDateSuffix = (date) => {
    let dateStr = date.toString();

    // grab last character of date string which can be used to add correct suffix
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === "1" && dateStr !== "11") {
        dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};
  
// format date per assignment instructions
module.exports = (timestamp, { dateSuffix = true } = {}) => {
    const months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    let dayOfMonth;
  
    if (dateSuffix) {
      dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
      dayOfMonth = dateObj.getDate();
    }
  
    const year = dateObj.getFullYear();
  
    let hour;
    if (dateObj.getHours() > 12) {
      hour = Math.floor(dateObj.getHours() / 2);
    } else {
      hour = dateObj.getHours();
    }
  
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = dateObj.getMinutes();
  
    let periodOfDay;
    if (dateObj.getHours() >= 12) {
      periodOfDay = "pm";
    } else {
      periodOfDay = "am";
    }
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
};
  