
function addRow(date) {
  // param 'date': single custom post type object from wp api

  // get the list field where the camp date options go
  const datesElem = document.querySelector('tbody.ui-sortable');
  const dateRow = datesElem.querySelector('tr:last-child');
  const dateRowInput = dateRow.querySelector('input');

  // copy the last list item that's already there, fill in the camp date title, and stick it in.
  const newRow = dateRow.cloneNode(true);
  const newRowInput = newRow.querySelector('input');
  const addButtons = newRow.querySelector('.gfield_list_icons');

  newRowInput.value = date.title.rendered;
  newRowInput.setAttribute('readonly', 'true');
  datesElem.appendChild(newRow);

  // if the item we copied was the empty placeholder, remove it.
  if (dateRowInput.value == "") {
    datesElem.removeChild(dateRow);
    // console.log('removed one item');
  }
}

const appForm = document.querySelector('[data-app-for]');

if (appForm) {
  const ageGroupField = document.querySelector('.gfield.age-group .gfield_select');
  const appFor = appForm.dataset.appFor;
  ageGroupField.addEventListener('change', e => {
    console.log(e);
    // remove any existing campDate rows, except one, since we need it to make the new ones
    const datesElem = document.querySelector('tbody.ui-sortable');
    const allDateRows = datesElem.querySelectorAll('tr:not(:last-child)');
    allDateRows.forEach(dateRow => datesElem.removeChild(dateRow));
    // remove this one's value so it'll be removed later
    const lastDateRowStanding = datesElem.querySelector('tr');
    lastDateRowStanding.querySelector('input').value = "";

    // get the value of the age group selection (the id of the tax term)
    const termId = e.target.value;
    // get all the camp dates
    const endpoint = 'http://www.creativedistillery.com/clients/campdownrange/wp-json/wp/v2/camp_dates?filter[camp_type]=' + appFor;
    console.log(endpoint);
    fetch(endpoint)
      .then(response => response.json())
      .then(campDates => {

        campDates.forEach(date => {
          console.log(date);
          // if the camp date includes the age group that was selected, show it
          date.age_group.forEach(groupId => {
            if (groupId == termId) {
              addRow(date);
            }
          });

        });

    });

  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Add a slider that populates the household income number field.

  const incomeContainer = document.querySelector('.household-income .ginput_container_number');
  if (incomeContainer) {
    const incomeField = document.querySelector('.household-income .ginput_container_number input');
    // Create the slider.
    const incomeSlider = document.createElement('INPUT');
    incomeSlider.setAttribute('type', 'range');
    incomeSlider.setAttribute('id', 'incomeSlider');
    incomeSlider.classList.add('income-slider');
    incomeSlider.setAttribute('min', '40000');
    incomeSlider.setAttribute('max', '80000');
    incomeSlider.setAttribute('step', '1000');
    incomeSlider.setAttribute('value', '40000');
    // Insert the slider.
    incomeContainer.appendChild(incomeSlider);
    // Make the income field read-only.
    incomeField.setAttribute('readonly', 'true');
    incomeField.classList.add('income-field');
    incomeField.setAttribute('value', '$' + numberWithCommas(40000));

    // When slider is changed, update the income field's value and the cost.

    // Get the cost field.
    const costField = document.querySelector('.gfield.cost .ginput_container_number input');

    function updateCost() {
      let cost;
      if (incomeSlider.value < 50000) {
        cost = 50;
      } else if (incomeSlider.value < 60000 && incomeSlider.value >= 50000) {
        cost = 100;
      } else if (incomeSlider.value < 80000 && incomeSlider.value >= 60000) {
        cost = 150;
      } else if (incomeSlider.value >= 80000) {
        cost = 200;
      }
      costField.value = '$' + cost.toString();
    }

    function updateIncome() {
      incomeField.value = '$' + numberWithCommas(incomeSlider.value);
      updateCost();
    }
    incomeSlider.addEventListener('change', updateIncome);
    incomeSlider.addEventListener('mousemove', updateIncome);

  }

}
