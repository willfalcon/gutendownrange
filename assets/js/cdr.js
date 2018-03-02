jQuery(document).ready(function($) {
  var toggler = document.getElementById('navbarToggler');
  toggler.onclick = function() {
    var nav = document.getElementById('main_nav');
    var toggleTR = document.getElementById('toggleTR');
    var toggleTL = document.getElementById('toggleTL');
    var toggleBR = document.getElementById('toggleBR');
    var toggleBL = document.getElementById('toggleBL');
    var logoDark = document.getElementById('logoDark');
    var logoLight = document.getElementById('logoLight');
    if ( toggler.classList.contains('open') ) {
      nav.style.transform = 'translateY(-100%)';
      toggler.classList.remove('open');
      toggler.setAttribute('aria-expanded', false);
      toggleTR.setAttribute('fill', '#478E41');
      toggleTL.setAttribute('fill', '#478E41');
      toggleBR.setAttribute('fill', '#478E41');
      toggleBL.setAttribute('fill', '#478E41');
      logoLight.style.opacity = '0';
      logoDark.style.opacity = '1';

    } else {
      nav.style.transform = 'translateY(0)';
      toggler.classList.add('open');
      toggler.setAttribute('aria-expanded', true);
      toggleTR.setAttribute('fill', 'white');
      toggleTL.setAttribute('fill', 'white');
      toggleBR.setAttribute('fill', 'white');
      toggleBL.setAttribute('fill', 'white');
      logoLight.style.opacity = '1';
      logoDark.style.opacity = '0';


    }
  };

  var slider = document.querySelector('.slider');
  var flkty = new Flickity( slider, {
    // options
    contain: true,
    cellSelector: '.slide',
    initialIndex: 0,
    imagesLoaded: true,
    autoPlay: 8000,
    arrowShape: {
      x0: 10,
      x1: 40, y1: 30,
      x2: 42.5, y2: 27.5,
      x3: 15
    }
  });
  var imgSlider = document.querySelector('.image-slider');
  var flkty2 = new Flickity( imgSlider, {
    // options
    contain: true,
    cellSelector: '.image-slider__image',
    initialIndex: 0,
    imagesLoaded: true,
    wrapAround: true,
    autoPlay: 5000,
    arrowShape: {
      x0: 10,
      x1: 40, y1: 30,
      x2: 42.5, y2: 27.5,
      x3: 15
    }
  });

  var onLoad = document.querySelectorAll('.on-load');
  for (var item of onLoad) {
    item.classList.add('show');
  }


  processBullets();


  //** Drop-Down Sub-Menu Voodoo **//

  // Put the Imperius Curse on the menu on document ready so we can bend it to our will later.

  // Get all menu items with sub menu items.
  var menuParents = document.querySelectorAll('.menu-item-has-children'); // querySelectorAll has support back to ie9

  // Iterate over those menu items with child sub menus with an index.
  var i = 0;
  for (var parent of menuParents) {
    // Each 'parent' here is a primary <li> with class .menu-item-has-children
    //    The <li> 'parent' will have 2 children
    //    at index[0], the <a> link to the parent page
    //    at index[1], a <ul> with class .sub-menu containing the child menu
    //
    // Add the caret to the <a> element html inside the <li>
    parent.children[0].innerHTML += ' <i class="fa fa-caret-right"></i>';
    // Add class 'parent' to the <li> item
    parent.classList.add('parent');
    // Add data-child attribute to the <li> item to target the correct sub-menu
    parent.setAttribute('data-child', 'sub_menu_' + i);
    // Add an id to the child <ul> sub-menu matching the data-child attr of the parent.
    parent.children[1].setAttribute('id', 'sub_menu_' + i);
    i++;
    // Mischief managed
  }


}); // jQuery.document(ready)

function processBullets() {
  var lastElement = false;
  jQuery("br").remove(".tempbreak");
  jQuery(".sponsors__list li").each(function() {
      jQuery(this).removeClass("nobullet");
      if (lastElement && lastElement.offset().top != jQuery(this).offset().top) {
          jQuery(lastElement).addClass("nobullet");
          jQuery(lastElement).append('<br class="tempbreak" />');
      }
      lastElement = jQuery(this);
  }).last().addClass("nobullet");
}

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
window.addEventListener('scroll', function(event) {

  for (var item of slideDown) {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  }

  for (var item of slideRight) {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  }

}, false);

window.addEventListener('resize', processBullets, false);


// Time to do some magic on those sub-menus
var menuParents = document.querySelectorAll('.menu-item-has-children');
// Iterate over those menu items with child sub menus.
for (var parent of menuParents) {

  parent.addEventListener('mouseover', function() {

    var child = document.getElementById(this.getAttribute('data-child'));
    child.classList.add('show');

    window.setTimeout(function() {
      for (i=0;i<child.children.length;i++) {
        child.children[i].classList.add('flip');
      }
    }, 0);

  });


  parent.addEventListener('mouseleave', function() {
    var child = document.getElementById(this.getAttribute('data-child'));
    window.setTimeout(function() {
      for (i=0;i<child.children.length;i++) {
        child.children[i].classList.remove('flip');
      }
    }, 0);    // window.setTimeout(function() {
    //   child.classList.remove('show');
    // }, 1);
  });
}
