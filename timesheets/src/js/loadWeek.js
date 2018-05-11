const moment = require('moment');
const calHeader = require('./calHeader');
const calRow = require('./calrow');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');

module.exports = user => {

  const cal = document.getElementById('cal');
  cal.innerHTML = calHeader + calRow + calRow + calRow + calRow + calRow + calRow + calRow;

  const daysObj = {
    0: moment().day(3),
    1: moment().day(4),
    2: moment().day(5),
    3: moment().day(6),
    4: moment().day(7),
    5: moment().day(8),
    6: moment().day(9)
  }

  const dateFields = document.querySelectorAll('.rowDate input');
  let dayIterator = 0;
  dateFields.forEach(input => {
    // console.log(daysObj[dayIterator]);
    // console.log(moment.isMoment(daysObj[dayIterator]));
    input.value = daysObj[dayIterator].format('dddd MMMM Do');
    input.dataset.date = daysObj[dayIterator].format('YYYY-MM-DD');
    dayIterator++;
  });

  const inFields = document.querySelectorAll('.calIn');
  let inIterator = 0;
  inFields.forEach(input =>{
    input.dataset.for = daysObj[inIterator].format('YYYY-MM-DD');
    inIterator++;
  });

  const outFields = document.querySelectorAll('.calOut');
  let outIterator = 0;
  outFields.forEach(input => {
    input.dataset.for = daysObj[outIterator].format('YYYY-MM-DD');
    outIterator++;
  });

  base('Time Entries').select({
    filterByFormula: `{Employee} = "${user.get('last-name')}"`
  }).eachPage(function page(records, fetchNextPage) {

    records.forEach(function(entry) {

      if (entry.get('Employee')[0] = user.id) {
        const entryDate = entry.get('Entry Date');
        console.log(entryDate);
        const inForEntry = document.querySelector(`.calIn[data-for='${entryDate}']`);
        const outForEntry = document.querySelector(`.calOut[data-for='${entryDate}']`);
        console.log('in: ', inForEntry);
        console.log('out: ', outForEntry);
        if (inForEntry) {
          const inTime = moment(entry.get('Time In'));
          inForEntry.value = inTime.format('h:mma');
        }
        if (outForEntry) {
          const outTime = moment(entry.get('Time Out'));
          outForEntry.value = outTime.format('h:mma');
        }
      }

    });

    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; }
  });

}
