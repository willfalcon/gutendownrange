module.exports = timeString => {

  let time12;
  let amPm;
  if (timeString.length == 6) {
    // if the time is before 10 (i.e. 9:30) the string will only have 6 chars
    time12 = '0' + timeString.substring(0, 4);

    amPm = timeString.substring(4);
  } else {
    // if the time is 10 or after it'll have 7 chars.
    time12 = timeString.substring(0, 5);
    amPm = timeString.substring(5);
  }


  const hour12 = time12.substring(0, 2);
  const minutes = time12.substring(3, 5);

  let formattedTime;
  let hour24;

  if (amPm == 'pm' && hour12 != '12') {

    hour24 = parseInt(hour12) + 12;
    formattedTime = hour24.toString() + ':' + minutes;
  } else if (amPm == 'am' && hour12 == '12') {
    hour24 = parseInt(hour12) - 12;
    formattedTime = hour24.toString() + ':' + minutes;
  } else {
    formattedTime = time12;
  }

  return formattedTime + ':' + '00';

}
