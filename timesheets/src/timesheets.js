const axios = require('axios');
const $ = require('jquery');
const timepicker = require('timepicker');
const Pikaday = require('pikaday');

const endpoint = 'https://api.airtable.com/v0/appvpsjOd4ayHeMgI/Employees';
const config = {
  headers: {
    'Authorization': 'Bearer keySUYSjrGGJlTGCE'
  },
}


axios.get(endpoint, config).then(response => {
  // console.log(response);

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

function updateCurrentUser(e) {
  const userId = e.target.value;
  const userWelcome = document.getElementById('userWelcome');
  const timeWrap = document.getElementById('timeWrap');
  // const timeIn = document.getElementById('timeIn');
  // const timeOut = document.getElementById('timeOut');

  axios.get(`${endpoint}/${userId}`, config).then(response => {
    console.log(response);
    userWelcome.innerText = `Welcome, ${response.data.fields["first-name"]}!`;
    userWelcome.style.display = 'block';
    $('#timeIn').timepicker({
      scrollDefault: 'now'
    });
    $('#timeOut').timepicker({
      scrollDefault: 'now'
    });
    const picker = new Pikaday({ field: document.getElementById('timeDate') });
    timeWrap.style.display = 'block';
  });
}
