
const convertTime = require('./convertTime');
const userWelcome = document.getElementById('userWelcome');
const Airtable = require('airtable');

module.exports = () => {
  console.log('running saveTime');
  const rawDate = document.getElementById('timeDate').value;
  const rawTimeIn = document.getElementById('timeIn').value;
  const rawTimeOut = document.getElementById('timeOut').value;

  const timeIn = rawDate + 'T' + convertTime(rawTimeIn) + '.000Z';
  const timeOut = rawDate + 'T' + convertTime(rawTimeOut) + '.000Z';

  const userId = userWelcome.dataset.id;
  const fields = {
    "Employee": [userId],
    "Time In": timeIn,
    "Time Out": timeOut,
    "Entry Date": rawDate
  }
  console.log(fields);

  const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');
  base('Time Entries').create(fields, (err, record) => {
    if (err) { console.error(err); return; }
    console.log(record);
  });

}
