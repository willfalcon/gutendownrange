const updateCurrentUser = require('./js/updateCurrentUser');

// Record ID corresponding to logged-in employee is stored in data attr
// on user welcome element.
const currentUser = document.querySelector('.user[data-user]').dataset.user;

// If Record ID is found, run updateCurrentUser, which
// Loads timesheet fields for the current week and gets all the existing Entries
// to prepopulate the timesheet.
if (currentUser) {
  updateCurrentUser(currentUser);
}
