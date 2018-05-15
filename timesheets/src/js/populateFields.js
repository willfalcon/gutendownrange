const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
const Airtable = require('airtable');

module.exports = (entry, user) => {
  // console.log(entry);
  if (entry.get('Employee')[0] = user.id) {
    const entryDate = entry.get('Entry Date');
    // console.log(entryDate);
    const dateField = document.querySelector(`[data-date='${entryDate}']`);
    const inForEntry = document.querySelector(`.calIn[data-for='${entryDate}']`);
    const outForEntry = document.querySelector(`.calOut[data-for='${entryDate}']`);
    const campHoursField = document.querySelector(`.calCampHours[data-for='${entryDate}']`);
    const groundsWorkHoursField = document.querySelector(`.calWorkHours[data-for='${entryDate}']`);
    const campRateInputs = document.querySelectorAll('.calCampPayrate');
    const groundsRateInputs = document.querySelectorAll('.calGroundsWorkPayrate');
    const totalHoursInput = document.querySelector(`.calTotalHours[data-for='${entryDate}']`);
    const totalAmount = document.querySelector(`.calTotalAmount[data-for='${entryDate}']`);
    // console.log('in: ', inForEntry);
    // console.log('out: ', outForEntry);
    if (dateField) {
      dateField.dataset.entry = entry.id;
    }

    if (inForEntry) {
      const inTime = moment(entry.get('Time In'));
      inForEntry.value = inTime.format('h:mma');
    }
    if (outForEntry) {
      const outTime = moment(entry.get('Time Out'));
      outForEntry.value = outTime.format('h:mma');
    }
    if (campHoursField) {
      campHoursField.value = entry.get('Basic Training Hours') / 3600 || 0;
    }
    if (campRateInputs) {
      campRateInputs.forEach(input => {
        input.value = '$20';
        input.dataset.rate = 20;
      });
    }
    if (groundsWorkHoursField) {
      groundsWorkHoursField.value = entry.get('Grounds Work Hours') / 3600 || 0;
    }
    if (groundsRateInputs) {
      groundsRateInputs.forEach(input => {
        input.value = '$10';
        input.dataset.rate = 10;
      });
    }
    if (totalHoursInput) {
      const totalHours = moment.duration(entry.get('Total Hours'), 'seconds').format('h:mm');
      // console.log('Total Hours: ', totalHours);
      totalHoursInput.value = totalHours;
    }
    if (totalAmount) {
      totalAmount.value = entry.get('Total Amount');
    }


  }
}
