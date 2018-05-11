const $ = require('jquery');
const timepicker = require('timepicker');
const moment = require('moment');
const saveTime = require('./saveTime');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');
const handleSaveAll = require('./handleSaveAll');
const loadWeek = require('./loadWeek');

const userWelcome = document.getElementById('userWelcome');
const dateInput = document.getElementById('timeDate');
const timeWrap = document.getElementById('timeWrap');
const saveTimeButton = document.getElementById('saveTime');


module.exports = e => {
  const userId = e.target.value;


  base('Employees').find(userId, function(err, user) {
    if (err) { console.error(err); return; }

    // console.log(response);
    userWelcome.innerText = `Welcome, ${user.get('first-name')}!`;
    userWelcome.dataset.id = user.id;
    userWelcome.style.display = 'block';

    const date = moment().format('YYYY-MM-DD');
    dateInput.value = date;

    timeWrap.style.display = 'block';

    saveTimeButton.addEventListener('click', saveTime);

    loadWeek(user);


    $('.calIn').timepicker({
      scrollDefault: 'now'
    });
    $('.calOut').timepicker({
      scrollDefault: 'now'
    });

    const saveAllButton = document.getElementById('saveAllFields');
    saveAllButton.addEventListener('click', handleSaveAll);

  }); // base().find()

}
