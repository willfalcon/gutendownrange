const navbar = require('./navbar.js');
const navbarDropdown = require('./navbarDropdown.js');
const processBullets = require('./processBullets.js');
const appForm = require('./application-form.js');
const sliders = require('./sliders.js');
const images = require('./images.js');
const alerts = require('./alerts.js');

navbar();
navbarDropdown();
processBullets();
appForm();
sliders();
images();
alerts();

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
