"use strict";

(function () {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }return e;
})()({ 1: [function (require, module, exports) {
    module.exports = function () {
      function addRow(date) {
        // param 'date': single custom post type object from wp api

        // get the list field where the camp date options go
        var datesElem = document.querySelector('tbody.ui-sortable');
        var dateRow = datesElem.querySelector('tr:last-child');
        var dateRowInput = dateRow.querySelector('input');

        // copy the last list item that's already there, fill in the camp date title, and stick it in.
        var newRow = dateRow.cloneNode(true);
        var newRowInput = newRow.querySelector('input');
        var addButtons = newRow.querySelector('.gfield_list_icons');

        newRowInput.value = date.title.rendered;
        newRowInput.setAttribute('readonly', 'true');
        datesElem.appendChild(newRow);

        // if the item we copied was the empty placeholder, remove it.
        if (dateRowInput.value == "") {
          datesElem.removeChild(dateRow);
          // console.log('removed one item');
        }
      }

      var appForm = document.querySelector('[data-app-for]');

      if (appForm) {
        var numberWithCommas = function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };

        // Add a slider that populates the household income number field.

        var ageGroupField = document.querySelector('.gfield.age-group .gfield_select');
        var appFor = appForm.dataset.appFor;
        ageGroupField.addEventListener('change', function (e) {
          console.log(e);
          // remove any existing campDate rows, except one, since we need it to make the new ones
          var datesElem = document.querySelector('tbody.ui-sortable');
          var allDateRows = datesElem.querySelectorAll('tr:not(:last-child)');
          allDateRows.forEach(function (dateRow) {
            return datesElem.removeChild(dateRow);
          });
          // remove this one's value so it'll be removed later
          var lastDateRowStanding = datesElem.querySelector('tr');
          lastDateRowStanding.querySelector('input').value = "";

          // get the value of the age group selection (the id of the tax term)
          var termId = e.target.value;
          // get all the camp dates
          var endpoint = 'http://www.creativedistillery.com/clients/campdownrange/wp-json/wp/v2/camp_dates?filter[camp_type]=' + appFor;
          console.log(endpoint);
          fetch(endpoint).then(function (response) {
            return response.json();
          }).then(function (campDates) {

            campDates.forEach(function (date) {
              console.log(date);
              // if the camp date includes the age group that was selected, show it
              date.age_group.forEach(function (groupId) {
                if (groupId == termId) {
                  addRow(date);
                }
              });
            });
          });
        });

        var incomeContainer = document.querySelector('.household-income .ginput_container_number');
        if (incomeContainer) {
          var updateCost = function updateCost() {
            var cost = void 0;
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
          };

          var updateIncome = function updateIncome() {
            incomeField.value = '$' + numberWithCommas(incomeSlider.value);
            updateCost();
          };

          var incomeField = document.querySelector('.household-income .ginput_container_number input');
          // Create the slider.
          var incomeSlider = document.createElement('INPUT');
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
          var costField = document.querySelector('.gfield.cost .ginput_container_number input');

          incomeSlider.addEventListener('change', updateIncome);
          incomeSlider.addEventListener('mousemove', updateIncome);
        }
      }
    };
  }, {}], 2: [function (require, module, exports) {
    var navbar = require('./navbar.js');
    var navbarDropdown = require('./navbarDropdown.js');
    var processBullets = require('./processBullets.js');
    var appForm = require('./application-form.js');

    navbar();
    navbarDropdown();
    processBullets();
    appForm();

    window.addEventListener('resize', processBullets, false);

    function isInViewport(el) {

      //special bonus for those using jQuery
      if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
      }

      var rect = el.getBoundingClientRect();

      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
      ;
    }

    var slideDown = document.querySelectorAll('.slide-down');
    var slideRight = document.querySelectorAll('.slide-right');

    function tryToSlide() {

      slideDown.forEach(function (item) {
        if (isInViewport(item)) {
          item.classList.add('show');
        }
      });

      slideRight.forEach(function (item) {
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
      d.setTime(d.getTime() + hours * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
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
      for (var i = 0; i < ca.length; i++) {
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
      alertClose.addEventListener('click', function () {
        var alert = alertClose.parentNode;
        hideAlert(alert);
        setCookie('alertClosed', 'true', 24);
      });
    }
    if (alertButton) {
      alertButton.addEventListener('click', function () {
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
  }, { "./application-form.js": 1, "./navbar.js": 3, "./navbarDropdown.js": 4, "./processBullets.js": 5 }], 3: [function (require, module, exports) {
    module.exports = function () {
      var toggler = document.getElementById('navbarToggler');
      toggler.onclick = function () {
        var nav = document.getElementById('main_nav');
        var toggleTR = document.getElementById('toggleTR');
        var toggleTL = document.getElementById('toggleTL');
        var toggleBR = document.getElementById('toggleBR');
        var toggleBL = document.getElementById('toggleBL');
        var logoDark = document.getElementById('logoDark');
        var logoLight = document.getElementById('logoLight');
        if (toggler.classList.contains('open')) {
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
    };
  }, {}], 4: [function (require, module, exports) {
    module.exports = function () {

      //** Drop-Down Sub-Menu Voodoo **//

      // Put the Imperius Curse on the menu on document ready so we can bend it to our will later.

      // Get all menu items with sub menu items.
      var menuParents = document.querySelectorAll('.menu-item-has-children'); // querySelectorAll has support back to ie9

      // Iterate over those menu items with child sub menus with an index.
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = menuParents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parent = _step.value;

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
            parent.children[0].addEventListener('click', function (event) {
              event.preventDefault();
              var index = this.getAttribute('data-index');
              console.log(index);
              var caret = document.getElementById('subMenuCaret' + index);
              thisSubMenu = document.getElementById('sub_menu_' + index);
              if (thisSubMenu.classList.contains('open')) {
                thisSubMenu.classList.remove('open');
                thisSubMenu.style.height = 0;
                thisSubMenu.style.opacity = 0;
                caret.style.transform = 'rotate(0)';
                setTimeout(function () {
                  thisSubMenu.style.display = 'none';
                }, 250);
              } else {
                thisSubMenu.classList.add('open');
                thisSubMenu.style.display = 'block';
                caret.style.transform = 'rotate(90deg)';
                setTimeout(function () {
                  thisSubMenu.style.height = thisSubMenu.getAttribute('data-height');
                  thisSubMenu.style.opacity = 1;
                }, 0);
              }
            });
          }

          i++;
          // Mischief managed
        }

        // Time to do some magic on those sub-menus
        // var menuParents = document.querySelectorAll('.menu-item-has-children'); // (already did this)
        // Iterate over those menu items with child sub menus.
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = menuParents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var parent = _step2.value;


          parent.addEventListener('mouseenter', function () {

            var child = document.getElementById(this.getAttribute('data-child'));
            child.classList.add('show');

            function addFlip(i) {
              child.children[i].classList.add('flip');
            }

            for (i = 0; i < child.children.length; i++) {

              setTimeout(addFlip, i * 80, i);
            }
          });

          parent.addEventListener('mouseleave', function () {
            var child = document.getElementById(this.getAttribute('data-child'));

            function removeFlip(i) {
              child.children[i].classList.remove('flip');
            }

            for (i = child.children.length - 1; i >= 0; i--) {

              setTimeout(removeFlip, (child.children.length - 1 - i) * 80, i);
            }
            setTimeout(function () {
              child.classList.remove('show');
            }, child.children.length * 80);
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    };
  }, {}], 5: [function (require, module, exports) {
    module.exports = function () {
      var lastElement = false;
      jQuery("br").remove(".tempbreak");
      jQuery(".sponsors__list li").each(function () {
        jQuery(this).removeClass("nobullet");
        if (lastElement && lastElement.offset().top != jQuery(this).offset().top) {
          jQuery(lastElement).addClass("nobullet");
          jQuery(lastElement).append('<br class="tempbreak" />');
        }
        lastElement = jQuery(this);
      }).last().addClass("nobullet");
    };
  }, {}] }, {}, [2]);