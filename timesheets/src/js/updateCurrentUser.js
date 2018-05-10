const axios = require('axios');
const userWelcome = document.getElementById('userWelcome');
const $ = require('jquery');
const timepicker = require('timepicker');
const Pikaday = require('pikaday');
const timeWrap = document.getElementById('timeWrap');
const employeesEndpoint = 'https://api.airtable.com/v0/appvpsjOd4ayHeMgI/Employees';
const config = {
  headers: {
    'Authorization': 'Bearer keySUYSjrGGJlTGCE'
  },
}


module.exports = e => {
  const userId = e.target.value;

  axios.get(`${employeesEndpoint}/${userId}`, config).then(response => {
    console.log(response);
    userWelcome.innerText = `Welcome, ${response.data.fields["first-name"]}!`;
    userWelcome.dataset.id = response.data.id;
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
