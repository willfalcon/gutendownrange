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
    parent.children[0].innerHTML += ' <i id=subMenuCaret' + i + ' class="fa fa-caret-right"></i>';
    // Add class 'parent' to the <li> item
    parent.classList.add('parent');
    // Add data-child attribute to the <li> item to target the correct sub-menu
    parent.setAttribute('data-child', 'sub_menu_' + i);
    // Add an id to the child <ul> sub-menu matching the data-child attr of the parent.
    parent.children[1].setAttribute('id', 'sub_menu_' + i);
    // Get the natural height of the element and store as a data attr for later.
    var subMenu = document.getElementById('sub_menu_' + i);
    var height = window.getComputedStyle(subMenu)['height'];
    // var caret = document.getElementById('subMenuCaret' + i);
    subMenu.setAttribute('data-height', height);
    // collapse menu only if we're mobile.
    if (document.documentElement.clientWidth < 768) {
      subMenu.style.height = 0;
      subMenu.style.opacity = 0;
      subMenu.style.display = 'none';
      parent.children[0].setAttribute('data-index', i);
      parent.children[0].addEventListener('click', function(event) {
        event.preventDefault();
        var index = this.getAttribute('data-index');
        console.log(index);
        var caret = document.getElementById('subMenuCaret' + index);
        thisSubMenu = document.getElementById('sub_menu_' + index);
        if ( thisSubMenu.classList.contains('open') ) {
          thisSubMenu.classList.remove('open');
          thisSubMenu.style.height = 0;
          thisSubMenu.style.opacity = 0;
          caret.style.transform = 'rotate(0)';
          setTimeout(function() {
            thisSubMenu.style.display = 'none';
          },250);
        } else {
          thisSubMenu.classList.add('open');
          thisSubMenu.style.display = 'block';
          caret.style.transform = 'rotate(90deg)';
          setTimeout(function() {
            thisSubMenu.style.height = thisSubMenu.getAttribute('data-height');
            thisSubMenu.style.opacity = 1;
          },0);
        }
      });

    }

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

window.addEventListener('resize', processBullets, false);


// Time to do some magic on those sub-menus
var menuParents = document.querySelectorAll('.menu-item-has-children');
// Iterate over those menu items with child sub menus.
for (var parent of menuParents) {

  parent.addEventListener('mouseenter', function() {

    var child = document.getElementById(this.getAttribute('data-child'));
    child.classList.add('show');

    function addFlip(i) {
      child.children[i].classList.add('flip');
    }

    for (i=0;i<child.children.length;i++) {

      setTimeout(addFlip, i * 80, i);

    }

  });


  parent.addEventListener('mouseleave', function() {
    var child = document.getElementById(this.getAttribute('data-child'));

    function removeFlip(i) {
      child.children[i].classList.remove('flip');
    }

    for (i=(child.children.length-1);i>=0;i--) {

      setTimeout(removeFlip, (child.children.length - 1 - i) * 80, i);
    }
    setTimeout(function() {
      child.classList.remove('show');
    }, child.children.length *80);


  });
}


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
    checkCookie();
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
