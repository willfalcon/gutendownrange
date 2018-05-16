const loadWeek = require('./loadWeek');
const userWelcome = document.getElementById('userWelcome');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');
const moment = require('moment');

module.exports = e => {

  const userId = document.getElementById('userWelcome').dataset.id;

  const updatedEntries = document.querySelectorAll('input[data-entry]');

  let user;
  base('Employees').find(userId, (err, record) => {
    if (err) { console.error(err); return; }
    user = record;
  });

  if (updatedEntries) {
    updatedEntries.forEach(entry => {

      const entryDate = entry.dataset.date;
      const inField = document.querySelector(`.calIn[data-for='${entryDate}']`);
      const outField = document.querySelector(`.calOut[data-for='${entryDate}']`);
      const campHoursField = document.querySelector(`.calCampHours[data-for='${entryDate}']`);
      const groundsWorkHoursField = document.querySelector(`.calWorkHours[data-for='${entryDate}']`);

      // entryDate : 2018-05-16

      const inTime = moment(inField.value, 'h:mma')
        .year(entry.dataset.date.substring(0, 4))
        .month(parseInt(entry.dataset.date.substring(5, 7)) - 1)
        .date(entry.dataset.date.substring(8, 10));

      const outTime = moment(outField.value, 'h:mma')
        .year(entry.dataset.date.substring(0, 4))
        .month(parseInt(entry.dataset.date.substring(5, 7)) - 1)
        .date(entry.dataset.date.substring(8, 10));

      base('Time Entries').update(entry.dataset.entry, {
        "Employee": [userId],
        "Time In": inTime.toISOString(true),
        "Time Out": outTime.toISOString(true),
        "Basic Training Hours": campHoursField.value * 3600,
        "Grounds Work Hours": groundsWorkHoursField.value * 3600
      }, (err, record) => {
        if (err) { console.error(err); return; }
        loadWeek(user);
      });

    });
  }

  const emptyFields = document.querySelectorAll('input[data-date]:not([data-entry])');

  if (emptyFields) {
    emptyFields.forEach(entry => {

      const entryDate = entry.dataset.date;
      const inField = document.querySelector(`.calIn[data-for='${entryDate}']`);
      const outField = document.querySelector(`.calOut[data-for='${entryDate}']`);
      const campHoursField = document.querySelector(`.calCampHours[data-for='${entryDate}']`);
      const groundsWorkHoursField = document.querySelector(`.calWorkHours[data-for='${entryDate}']`);

      const inTime = inField.value != '' ?
      moment(inField.value, 'h:mma')
        .year(entry.dataset.date.substring(0, 4))
        .month(parseInt(entry.dataset.date.substring(5, 7)) - 1)
        .date(entry.dataset.date.substring(8, 10)).toISOString(true)
      :
      null;

      const outTime = outField.value != '' ?
      moment(outField.value, 'h:mma')
        .year(entry.dataset.date.substring(0, 4))
        .month(parseInt(entry.dataset.date.substring(5, 7)) - 1)
        .date(entry.dataset.date.substring(8, 10)).toISOString(true)
      :
      null;

      const campHours = campHoursField.value != '' ?
      parseInt(campHoursField.value) * 3600
      :
      null;

      const groundsHours = groundsWorkHoursField.value != '' ?
      parseInt(groundsWorkHoursField.value) * 3600
      :
      null;

      if (inTime || outTime || campHours || groundsHours) {
        base('Time Entries').create({
          "Entry Date": entryDate,
          "Employee": [userId],
          "Time In": inTime,
          "Time Out": outTime,
          "Basic Training Hours": campHours,
          "Grounds Work Hours": groundsHours,
          "Camp Pay Rate": 20,
          "Grounds Work Pay Rate": 10
        }, function(err, record) {
            if (err) { console.error(err); return; }
            entry.dataset.entry = record.id;
            loadWeek(user);

        });
      }

    });
  }


}
