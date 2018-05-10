const axios = require('axios');

const updateCurrentUser = require('./js/updateCurrentUser');
const saveTime = require('./js/saveTime');

const userWelcome = document.getElementById('userWelcome');

const employeesEndpoint = 'https://api.airtable.com/v0/appvpsjOd4ayHeMgI/Employees';
const timesheetsEndpoint = 'https://api.airtable.com/v0/appvpsjOd4ayHeMgI/Time%20Entries';
const config = {
  headers: {
    'Authorization': 'Bearer keySUYSjrGGJlTGCE'
  },
}


axios.get(employeesEndpoint, config).then(response => {

  const employees = response.data.records;
  console.log(employees);
  const userSelect = document.getElementById('userSelect');
  employees.forEach(employee => {
    const option = document.createElement('OPTION');
    option.value = employee.id;
    option.innerText = `${employee.fields["first-name"]} ${employee.fields["last-name"]}`;
    userSelect.appendChild(option);
  });
  userSelect.addEventListener('change', updateCurrentUser);

});


const saveTimeButton = document.getElementById('saveTime');
// console.log(saveTimeButton);
saveTimeButton.addEventListener('click', saveTime);
