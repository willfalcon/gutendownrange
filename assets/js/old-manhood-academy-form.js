function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();

// need to figure out how to make sure I get JSON back from the request.
//Google XMLHttpRequest

  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.response);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}


var ageRangeField = document.getElementById('input_3_12');
var campDates = document.getElementById('campDates');

ageRangeField.addEventListener('change', function(e) {
  // console.log(e);
  var newValue = e.target.value;
  campDates.innerHTML = '';
  httpGetAsync('http://localhost/campdownrange.dev/wp-json/wp/v2/camp_dates?filter[camp_type]=manhood-academy', function(response) {
    //do stuff with the posts returned
    response = JSON.parse(response);
    console.log(response);
    var draggies = [];
    for (i=0;i<response.length;i++) {
      var match = false;
      // console.log(response[i].age_group[0]);

      for (j=0;j<response[i].age_group.length;j++){
        if (response[i].age_group[j] == newValue) {
          match = true;
        }
      }
      if (match) {

        //make an input
        var textInput = document.createElement('INPUT');
        //add all the stuff to the input
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('name', 'camp_date_' + i);
        textInput.setAttribute('value', response[i].title.rendered);
        textInput.setAttribute('class', 'camp-dates__date')
        textInput.setAttribute('tabindex', '32');

        var hiddenInput = document.createElement('INPUT');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', response[i].title.rendered);
        hiddenInput.setAttribute('value', 'preference-level-' + (i + 1));
        hiddenInput.setAttribute('class', 'camp-dates__order');


        //make a div
        var div = document.createElement('DIV');
        div.setAttribute('class', 'camp-dates__date-container');
        //stick the input in the div
        div.appendChild(textInput);
        div.appendChild(hiddenInput);

        //stick the div in with the other camp dates
        campDates.appendChild(div);

        var draggie = new Draggabilly( div, {
          // options...
        });
        draggies.push( draggie );
      }
    }

    var pckry = new Packery( campDates, {
      // options
      itemSelector: '.camp-dates__date-container',
      percentPosition: true

    });

    for (x=0;x<draggies.length;x++) {
      pckry.bindDraggabillyEvents( draggies[x] );
    }

    pckry.on( 'layoutComplete', function() {
      pckry.getItemElements().forEach(function(itemElem, i) {
        itemElem.querySelector('.camp-dates__order').setAttribute('value', 'preference-level-' + (i + 1));
      });
    });
    pckry.on( 'dragItemPositioned', function() {
      pckry.getItemElements().forEach(function(itemElem, i) {
        itemElem.querySelector('.camp-dates__order').setAttribute('value', 'preference-level-' + (i + 1));
      });
    });

  });




});
