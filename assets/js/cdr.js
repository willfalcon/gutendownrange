const navbar = require('./navbar.js');
const navbarDropdown = require('./navbarDropdown.js');
const processBullets = require('./processBullets.js');
const appForm = require('./application-form.js');
const sliders = require('./sliders.js');
const images = require('./images.js');

navbar();
navbarDropdown();
processBullets();
appForm();
sliders();
images();

window.addEventListener('resize', processBullets, false);

function isInViewport(el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

var slideDown = document.querySelectorAll('.slide-down');
var slideRight = document.querySelectorAll('.slide-right');

function tryToSlide() {

  slideDown.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

  slideRight.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

}

window.addEventListener('scroll', tryToSlide, false);

tryToSlide();





function setCookie(cname, cvalue, hours) {
  // Sets a cookie. Any cookie really, but for the purposes of the alert bar,
  // it gets the current date, adds 24 hours to it, then sets the cookie name "alertClosed"
  // to "true", sets expiration to 24 hours from now, and sets the path to "/",
  // which makes the cookie apply to all pages on the domain.
  var d = new Date();
  d.setTime(d.getTime() + (hours * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  // Explaination copied from w3schools: (https://www.w3schools.com/js/js_cookies.asp)
  // Take the cookiename as parameter (cname).
  // Create a variable (name) with the text to search for (cname + "=").
  // Decode the cookie string, to handle cookies with special characters, e.g. '$'
  // Split document.cookie on semicolons into an array called ca (ca = decodedCookie.split(';')).
  // Loop through the ca array (i = 0; i < ca.length; i++), and read out each value c = ca[i]).
  // If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length, c.length).
  // If the cookie is not found, return "".
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
  }
  return "";
}

  function checkCookie() {
    // run getCookie to see if the cookie has been set or not.
    // Returns the value of the cookie if set, or "" if not set.
    var closed = getCookie("alertClosed");
    if (closed != "true") {
      var alert = document.querySelector('.alert');
      alert.style.height = '75px';
      alert.style.marginBottom = '10px';
      alert.style.padding = '1rem';
    }
  }

    function removeAlert(e) {
      e.target.removeEventListener('transitionend', removeAlert);
      e.target.parentNode.removeChild(alert);
    }

    function hideAlert(alert) {
      alert.addEventListener('transitionend', removeAlert);
      alert.style.height = '0px';
      alert.style.marginBottom = '0px';
      alert.style.padding = '0rem';
    }
    var alertClose = document.querySelector('.alert__dismiss');
    var alertButton = document.querySelector('.alert__button');

    if (alertClose) {
      alertClose.addEventListener('click', function() {
        var alert = alertClose.parentNode;
        hideAlert(alert);
        setCookie('alertClosed', 'true', 24);
      });
    }
    if (alertButton) {
      alertButton.addEventListener('click', function() {
        setCookie('alertClosed', 'true', 24);
      });
    }


  // ALERT BAR FUNCTIONALITY //
  if (document.querySelector('.alert')) {
    checkCookie();
  }
  // When the alert bar is activated, we only want users to have to dismiss it once,
  // so when it's dismissed, we set a very simple cookie that expires in 24 hours.
  // ('alertClosed=true')
  // Function checkCookie (above, inside jQuery(document).ready) runs a function getCookie(cname)
  // which checks whether the cookie we need has been set.
  // If not, checkCookie runs the setTimeout function, which will trigger the
  // alert to appear after the specified amout of time.
  //
  // Also below is a click listener on the alert's close button which runs a function
  // setCookie(cname, cvalue, hours), which does exactly what you think it does.
