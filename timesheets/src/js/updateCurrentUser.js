const timepicker = require('timepicker');
const moment = require('moment');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');

const handleSaveAll = require('./handleSaveAll');
const loadWeek = require('./loadWeek');

module.exports = userId => {

  // Get the logged in employee's record from Airtable
  base('Employees').find(userId, (err, user) => {

    if (err) { console.error(err); return; }

    // Fill in the user's name in the welcome area
    const userWelcome = document.getElementById('userWelcome');
    userWelcome.innerText = `Welcome, ${user.get('first-name')}!`;
    userWelcome.dataset.id = user.id;
    userWelcome.style.display = 'block';

    const date = moment().format('YYYY-MM-DD');

    // The returned record contains all of the employee's previous time entries.
    // Pass the record to loadWeek to prepopulate the week's fields.
    loadWeek(user);

    console.log(user);


    // Attach event listener to save time button.
    const saveAllButton = document.getElementById('saveAllFields');
    saveAllButton.addEventListener('click', handleSaveAll);


        const prevWeekButton = document.getElementById('prevWeek');
        const nextWeekButton = document.getElementById('nextWeek');
        const thisWeekButton = document.getElementById('thisWeek');

        prevWeekButton.addEventListener('click', () => {
          loadWeek(user, -1);
        });
        nextWeekButton.addEventListener('click', () => {
          loadWeek(user, 1);
        });
        thisWeekButton.addEventListener('click', () => {
          loadWeek(user, 0);
        });

  }); // base().find()


}
