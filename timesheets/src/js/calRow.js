module.exports = day => {

  // console.log(day);

  const airtableFormatDate = day.format('YYYY-MM-DD');
  const displayFormatDate = day.format('dddd MMMM Do');

  return `
    <div class="rowDate">
      <input disabled value="${displayFormatDate}" data-date="${airtableFormatDate}">
    </div>
    <div class="rowIn">
      <input class="calIn" data-for="${airtableFormatDate}">
    </div>
    <div class="rowOut">
      <input class="calOut" data-for="${airtableFormatDate}">
    </div>
    <div class="rowCampHours">
      <input class="calCampHours" data-for="${airtableFormatDate}">
    </div>
    <div class="rowCampPayrate">
      <input class="calCampPayrate" data-for="${airtableFormatDate}">
    </div>
    <div class="rowGroundsWorkHours">
      <input class="calWorkHours" data-for="${airtableFormatDate}">
    </div>
    <div class="rowGroundsWorkPayrate">
      <input class="calGroundsWorkPayrate" data-for="${airtableFormatDate}">
    </div>
    <div class="rowTotalHours">
      <input class="calTotalHours" data-for="${airtableFormatDate}">
    </div>
    <div class="rowTotalAmount">
      <input class="calTotalAmount" data-for="${airtableFormatDate}">
    </div>
  `;

}
