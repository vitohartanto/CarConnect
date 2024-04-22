const showFormattedDate = (timestamp_str) => {
  // Convert timestamp string to Date object
  var timestamp = new Date(timestamp_str);

  // Define months array
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format Date object to desired format
  var formatted_timestamp =
    timestamp.getDate() +
    " " +
    months[timestamp.getMonth()] +
    " " +
    timestamp.getFullYear() +
    " " +
    timestamp.getHours() +
    ":" +
    timestamp.getMinutes() +
    ":" +
    timestamp.getSeconds();

  return formatted_timestamp;
};

export { showFormattedDate };
