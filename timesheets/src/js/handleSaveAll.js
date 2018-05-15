const convertTime = require('./convertTime');
const validateDurationField = require('./validateDurationField');
const userWelcome = document.getElementById('userWelcome');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');
const moment = require('moment');

module.exports = e => {

  const updatedEntries = document.querySelectorAll('input[data-entry]');

  if (updatedEntries) {
    updatedEntries.forEach(entry => {

      const entryDate = entry.dataset.date;
      const userId = document.getElementById('userWelcome').dataset.id;
      const inField = document.querySelector(`.calIn[data-for='${entryDate}']`);
      const outField = document.querySelector(`.calOut[data-for='${entryDate}']`);
      const campHoursField = document.querySelector(`.calCampHours[data-for='${entryDate}']`);
      const groundsWorkHoursField = document.querySelector(`.calWorkHours[data-for='${entryDate}']`);


      const campHours = validateDurationField(campHoursField.value);
      console.log('submitted string: ', campHours);
      

      // base('Time Entries').update(entry.dataset.entry, {
      //   "Employee": [userId],
      //   "Time In": moment(inField.value, 'h:mma'),
      //   "Time Out": moment(outField.value, 'h:mma'),
      //   "Basic Training Hours": campHoursField.value * 3600,
      //   "Grounds Work Hours": groundsWorkHoursField.value * 3600
      // }, (err, record) => {
      //   if (err) { console.error(err); return; }
      //   console.log(record);
      //   populateFields
      // });

    });
  }

}
