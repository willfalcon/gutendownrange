const $ = require('jquery');
const moment = require('moment');
const calHeader = require('./calHeader');
const calRow = require('./calrow');
const populateFields = require('./populateFields');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');

module.exports = (user, weekOffset = null) => {

  const cal = document.getElementById('cal');

  const today = moment().day();

  if (weekOffset != 0) {
    const currentOffset = parseInt(cal.dataset.weekOffset);
    const newOffset = currentOffset + weekOffset;
    cal.dataset.weekOffset = newOffset;
  } else if (weekOffset == 0) {
    cal.dataset.weekOffset = 0;
  }

  const offset = parseInt(cal.dataset.weekOffset);

  const daysObj = today < 3 ?
   {
     0: moment().day((3 - 7) + (7 * offset)),
     1: moment().day((4 - 7) + (7 * offset)),
     2: moment().day((5 - 7) + (7 * offset)),
     3: moment().day((6 - 7) + (7 * offset)),
     4: moment().day((7 - 7) + (7 * offset)),
     5: moment().day((8 - 7) + (7 * offset)),
     6: moment().day((9 - 7) + (7 * offset))
   } :
   {
     0: moment().day(3 + (7 * offset)),
     1: moment().day(4 + (7 * offset)),
     2: moment().day(5 + (7 * offset)),
     3: moment().day(6 + (7 * offset)),
     4: moment().day(7 + (7 * offset)),
     5: moment().day(8 + (7 * offset)),
     6: moment().day(9 + (7 * offset))
   };

  let dayIterator = 0;
  let calRows = calHeader;

  for (let i=0; i<7; i++) {

    calRows += calRow(daysObj[i]);

  }


  cal.innerHTML = calRows;

  base('Time Entries').select({
    filterByFormula: `{Employee} = "${user.get('last-name')}"`
  }).eachPage((records, fetchNextPage) => {

    records.forEach(entry => populateFields(entry, user));

    fetchNextPage();

  }, err => {
    if (err) { console.error(err); return; }
  });

  // Initialize timepickers
  $('.calIn').timepicker({
    scrollDefault: 'now',
    step: 15
  });
  $('.calOut').timepicker({
    scrollDefault: 'now',
    step: 15
  });

}
