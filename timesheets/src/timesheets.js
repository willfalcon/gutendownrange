const updateCurrentUser = require('./js/updateCurrentUser');
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keySUYSjrGGJlTGCE'}).base('appvpsjOd4ayHeMgI');

const userWelcome = document.getElementById('userWelcome');
const userSelect = document.getElementById('userSelect');

base('Employees').select().eachPage(function page(records, fetchNextPage) {

  records.forEach(employee => {
      // console.log('Retrieved', employee);
      const option = document.createElement('OPTION');
      option.value = employee.id;
      option.innerText = `${employee.get('first-name')} ${employee.get('last-name')}`;
      userSelect.appendChild(option);
  });

  fetchNextPage();

}, function done(err) {

  if (err) { console.error(err); return; }

  userSelect.addEventListener('change', updateCurrentUser);

});



// console.log(saveTimeButton);
