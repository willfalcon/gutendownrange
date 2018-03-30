"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
        }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];return o(n || r);
        }, p, p.exports, r, e, n, t);
      }return n[i].exports;
    }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }return o;
  }return r;
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
        if (ageGroupField) {
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
            var endpoint = 'http://www.camp-down-range.org/wp-json/wp/v2/camp_dates?filter[camp_type]=' + appFor;
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
        }

        var incomeContainer = document.querySelector('.household-income .ginput_container_number');
        if (incomeContainer) {
          var updateCost = function updateCost() {
            var cost = void 0;
            if (incomeSlider.value < 50000) {
              cost = 50;
            } else if (incomeSlider.value < 75000 && incomeSlider.value >= 50000) {
              cost = 150;
            } else if (incomeSlider.value < 100000 && incomeSlider.value >= 75000) {
              cost = 250;
            } else if (incomeSlider.value < 125000 && incomeSlider.value >= 100000) {
              cost = 350;
            } else if (incomeSlider.value >= 125000) {
              cost = 450;
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
          incomeSlider.setAttribute('max', '150000');
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

          costField.setAttribute('readonly', 'true');

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
    var sliders = require('./sliders.js');
    var images = require('./images.js');

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
  }, { "./application-form.js": 1, "./images.js": 3, "./navbar.js": 4, "./navbarDropdown.js": 5, "./processBullets.js": 6, "./sliders.js": 7 }], 3: [function (require, module, exports) {
    module.exports = function () {
      var cloudinary = require('cloudinary-core');

      var cl = new cloudinary.Cloudinary({ cloud_name: "creative-distillery", secure: true });

      var images = document.querySelectorAll('[data-url]');

      images.forEach(function (image) {
        var url = image.getAttribute('data-url');
        var format = image.getAttribute('data-format') || 'auto';
        var mask = image.getAttribute('data-mask') ? {
          overlay: 'circle-mask-2',
          width: 300
        } : '';
        var radius = image.getAttribute('data-mask') ? '' : 'max';
        if (url) {
          image.src = cl.url(url, {
            transformation: [{
              width: 300,
              gravity: 'face',
              crop: 'thumb',
              radius: radius
            }, mask],
            format: format,
            type: 'fetch'
          });
        }
      });
    };
  }, { "cloudinary-core": 10 }], 4: [function (require, module, exports) {
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
  }, {}], 5: [function (require, module, exports) {
    module.exports = function () {

      //** Drop-Down Sub-Menu Voodoo **//

      // Put the Imperius Curse on the menu on document ready so we can bend it to our will later.

      // Get all menu items with sub menu items.
      var menuParents = document.querySelectorAll('.menu-item-has-children'); // querySelectorAll has support back to ie9

      // Iterate over those menu items with child sub menus with an index.
      var i = 0;
      menuParents.forEach(function (parent) {
        // Each 'parent' here is a primary <li> with class .menu-item-has-children
        //    The <li> 'parent' will have 2 children
        //    at index[0], the <a> link to the parent page
        //    at index[1], a <ul> with class .sub-menu containing the child menu
        //
        // Add the caret to the <a> element html inside the <li>
        var childLink = parent.querySelector('a');
        var childMenu = parent.querySelector('ul');
        childLink.innerHTML += ' <i id=subMenuCaret' + i + ' class="fa fa-caret-right"></i>';
        // Add class 'parent' to the <li> item
        parent.classList.add('parent');
        // Add data-child attribute to the <li> item to target the correct sub-menu
        parent.setAttribute('data-child', 'sub_menu_' + i);
        // Add an id to the child <ul> sub-menu matching the data-child attr of the parent.
        childMenu.setAttribute('id', 'sub_menu_' + i);
        // Get the natural height of the element and store as a data attr for later.
        // var subMenu = document.getElementById('sub_menu_' + i);
        var height = window.getComputedStyle(childMenu)['height'];
        // var caret = document.getElementById('subMenuCaret' + i);
        childMenu.setAttribute('data-height', height);
        // collapse menu only if we're mobile.
        if (document.documentElement.clientWidth < 768) {
          childMenu.style.height = 0;
          childMenu.style.opacity = 0;
          childMenu.style.display = 'none';
          childLink.setAttribute('data-index', i);
          childLink.addEventListener('click', function (e) {
            e.preventDefault();
            var index = this.getAttribute('data-index');

            var caret = childLink.querySelector('i');
            if (childMenu.classList.contains('open')) {
              childMenu.classList.remove('open');
              childMenu.style.height = 0;
              childMenu.style.opacity = 0;
              caret.style.transform = 'rotate(0)';
              setTimeout(function () {
                childMenu.style.display = 'none';
              }, 250);
            } else {
              childMenu.classList.add('open');
              childMenu.style.display = 'block';
              caret.style.transform = 'rotate(90deg)';
              setTimeout(function () {
                childMenu.style.height = childMenu.getAttribute('data-height');
                childMenu.style.opacity = 1;
              }, 0);
            }
          });
        }

        i++;
        // Mischief managed
      });

      // Time to do some magic on those sub-menus
      // var menuParents = document.querySelectorAll('.menu-item-has-children'); // (already did this)
      // Iterate over those menu items with child sub menus.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = menuParents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parent = _step.value;


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
    };
  }, {}], 6: [function (require, module, exports) {
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
  }, {}], 7: [function (require, module, exports) {
    module.exports = function () {

      var imgSliders = document.querySelectorAll('.image-slider');

      if (imgSliders.length) {
        imgSliders.forEach(function (imgSlider) {
          var flkty = new Flickity(imgSlider, {
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
        });
      }

      var contentSliders = document.querySelectorAll('.slider');

      if (contentSliders.length) {
        contentSliders.forEach(function (contentSlider) {
          var flkty = new Flickity(contentSlider, {
            // options
            contain: true,
            cellSelector: '.slide',
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
        });
      }
    };
  }, {}], 8: [function (require, module, exports) {
    'use strict';

    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;

    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    // Support decoding URL-safe base64 strings, as Node.js does.
    // See: https://en.wikipedia.org/wiki/Base64#URL_applications
    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    function placeHoldersCount(b64) {
      var len = b64.length;
      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      }

      // the number of equal signs (place holders)
      // if there are two placeholders, than the two characters before it
      // represent one byte
      // if there is only one, then the three characters before it represent 2 bytes
      // this is just a cheap hack to not do indexOf twice
      return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
    }

    function byteLength(b64) {
      // base64 is 4/3 + up to two characters of the original data
      return b64.length * 3 / 4 - placeHoldersCount(b64);
    }

    function toByteArray(b64) {
      var i, l, tmp, placeHolders, arr;
      var len = b64.length;
      placeHolders = placeHoldersCount(b64);

      arr = new Arr(len * 3 / 4 - placeHolders);

      // if there are placeholders, only get up to the last complete 4 chars
      l = placeHolders > 0 ? len - 4 : len;

      var L = 0;

      for (i = 0; i < l; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 0xFF;
        arr[L++] = tmp >> 8 & 0xFF;
        arr[L++] = tmp & 0xFF;
      }

      if (placeHolders === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = tmp & 0xFF;
      } else if (placeHolders === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 0xFF;
        arr[L++] = tmp & 0xFF;
      }

      return arr;
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
    }

    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
      }
      return output.join('');
    }

    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
      var output = '';
      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3

      // go through the array every three bytes, we'll deal with trailing stuff later
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      }

      // pad the end with zeros, but make sure to not forget the extra bytes
      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[tmp << 4 & 0x3F];
        output += '==';
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output += lookup[tmp >> 10];
        output += lookup[tmp >> 4 & 0x3F];
        output += lookup[tmp << 2 & 0x3F];
        output += '=';
      }

      parts.push(output);

      return parts.join('');
    }
  }, {}], 9: [function (require, module, exports) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    /* eslint-disable no-proto */

    'use strict';

    var base64 = require('base64-js');
    var ieee754 = require('ieee754');

    exports.Buffer = Buffer;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;

    var K_MAX_LENGTH = 0x7fffffff;
    exports.kMaxLength = K_MAX_LENGTH;

    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Print warning and recommend using `buffer` v4.x which has an Object
     *               implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * We report that the browser does not support typed arrays if the are not subclassable
     * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
     * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
     * for __proto__ and has a buggy typed array implementation.
     */
    Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

    if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
    }

    function typedArraySupport() {
      // Can typed array instances can be augmented?
      try {
        var arr = new Uint8Array(1);
        arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
            return 42;
          } };
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }

    Object.defineProperty(Buffer.prototype, 'parent', {
      get: function get() {
        if (!(this instanceof Buffer)) {
          return undefined;
        }
        return this.buffer;
      }
    });

    Object.defineProperty(Buffer.prototype, 'offset', {
      get: function get() {
        if (!(this instanceof Buffer)) {
          return undefined;
        }
        return this.byteOffset;
      }
    });

    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('Invalid typed array length');
      }
      // Return an augmented `Uint8Array` instance
      var buf = new Uint8Array(length);
      buf.__proto__ = Buffer.prototype;
      return buf;
    }

    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */

    function Buffer(arg, encodingOrOffset, length) {
      // Common case.
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new Error('If encoding is specified then the first argument must be a string');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }

    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
      Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: true,
        enumerable: false,
        writable: false
      });
    }

    Buffer.poolSize = 8192; // not used by this implementation

    function from(value, encodingOrOffset, length) {
      if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number');
      }

      if (isArrayBuffer(value) || value && isArrayBuffer(value.buffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }

      if (typeof value === 'string') {
        return fromString(value, encodingOrOffset);
      }

      return fromObject(value);
    }

    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/
    Buffer.from = function (value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };

    // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
    // https://github.com/feross/buffer/pull/148
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;

    function assertSize(size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }

    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }

    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/
    Buffer.alloc = function (size, fill, encoding) {
      return alloc(size, fill, encoding);
    };

    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }

    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */
    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(size);
    };
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */
    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(size);
    };

    function fromString(string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
      }

      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
      }

      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);

      var actual = buf.write(string, encoding);

      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        buf = buf.slice(0, actual);
      }

      return buf;
    }

    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }

    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }

      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }

      var buf;
      if (byteOffset === undefined && length === undefined) {
        buf = new Uint8Array(array);
      } else if (length === undefined) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }

      // Return an augmented `Uint8Array` instance
      buf.__proto__ = Buffer.prototype;
      return buf;
    }

    function fromObject(obj) {
      if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);

        if (buf.length === 0) {
          return buf;
        }

        obj.copy(buf, 0, 0, len);
        return buf;
      }

      if (obj) {
        if (ArrayBuffer.isView(obj) || 'length' in obj) {
          if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }

        if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }

      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.');
    }

    function checked(length) {
      // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
      }
      return length | 0;
    }

    function SlowBuffer(length) {
      if (+length != length) {
        // eslint-disable-line eqeqeq
        length = 0;
      }
      return Buffer.alloc(+length);
    }

    Buffer.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true;
    };

    Buffer.compare = function compare(a, b) {
      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('Arguments must be Buffers');
      }

      if (a === b) return 0;

      var x = a.length;
      var y = b.length;

      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };

    Buffer.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true;
        default:
          return false;
      }
    };

    Buffer.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }

      if (list.length === 0) {
        return Buffer.alloc(0);
      }

      var i;
      if (length === undefined) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }

      var buffer = Buffer.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (ArrayBuffer.isView(buf)) {
          buf = Buffer.from(buf);
        }
        if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };

    function byteLength(string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {
        return string.byteLength;
      }
      if (typeof string !== 'string') {
        string = '' + string;
      }

      var len = string.length;
      if (len === 0) return 0;

      // Use a for loop to avoid recursion
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len;
          case 'utf8':
          case 'utf-8':
          case undefined:
            return utf8ToBytes(string).length;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2;
          case 'hex':
            return len >>> 1;
          case 'base64':
            return base64ToBytes(string).length;
          default:
            if (loweredCase) return utf8ToBytes(string).length; // assume utf8
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer.byteLength = byteLength;

    function slowToString(encoding, start, end) {
      var loweredCase = false;

      // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.

      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
      if (start === undefined || start < 0) {
        start = 0;
      }
      // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.
      if (start > this.length) {
        return '';
      }

      if (end === undefined || end > this.length) {
        end = this.length;
      }

      if (end <= 0) {
        return '';
      }

      // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
      end >>>= 0;
      start >>>= 0;

      if (end <= start) {
        return '';
      }

      if (!encoding) encoding = 'utf8';

      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end);

          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end);

          case 'ascii':
            return asciiSlice(this, start, end);

          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end);

          case 'base64':
            return base64Slice(this, start, end);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = (encoding + '').toLowerCase();
            loweredCase = true;
        }
      }
    }

    // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
    // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
    // reliably in a browserify context because there could be multiple different
    // copies of the 'buffer' package in use. This method works even for Buffer
    // instances that were created from another copy of the `buffer` package.
    // See: https://github.com/feross/buffer/issues/154
    Buffer.prototype._isBuffer = true;

    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }

    Buffer.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };

    Buffer.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };

    Buffer.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };

    Buffer.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return '';
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };

    Buffer.prototype.toLocaleString = Buffer.prototype.toString;

    Buffer.prototype.equals = function equals(b) {
      if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
      if (this === b) return true;
      return Buffer.compare(this, b) === 0;
    };

    Buffer.prototype.inspect = function inspect() {
      var str = '';
      var max = exports.INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
        if (this.length > max) str += ' ... ';
      }
      return '<Buffer ' + str + '>';
    };

    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (!Buffer.isBuffer(target)) {
        throw new TypeError('Argument must be a Buffer');
      }

      if (start === undefined) {
        start = 0;
      }
      if (end === undefined) {
        end = target ? target.length : 0;
      }
      if (thisStart === undefined) {
        thisStart = 0;
      }
      if (thisEnd === undefined) {
        thisEnd = this.length;
      }

      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
      }

      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }

      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;

      if (this === target) return 0;

      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);

      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);

      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };

    // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1;

      // Normalize byteOffset
      if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
      }
      byteOffset = +byteOffset; // Coerce to Number.
      if (numberIsNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : buffer.length - 1;
      }

      // Normalize byteOffset: negative offsets start from the end of the buffer
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;else return -1;
      }

      // Normalize val
      if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
      }

      // Finally, search either indexOf (if dir is true) or lastIndexOf
      if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]
        if (typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }

      throw new TypeError('val must be string, number or Buffer');
    }

    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;

      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }

      function read(buf, i) {
        if (indexSize === 1) {
          return buf[i];
        } else {
          return buf.readUInt16BE(i * indexSize);
        }
      }

      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }

      return -1;
    }

    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };

    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };

    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };

    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }

      var strLen = string.length;

      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }

    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }

    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }

    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }

    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }

    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }

    Buffer.prototype.write = function write(string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
        // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
        // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === undefined) encoding = 'utf8';
        } else {
          encoding = length;
          length = undefined;
        }
      } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
      }

      var remaining = this.length - offset;
      if (length === undefined || length > remaining) length = remaining;

      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
      }

      if (!encoding) encoding = 'utf8';

      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length);

          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length);

          case 'ascii':
            return asciiWrite(this, string, offset, length);

          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length);

          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };

    Buffer.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };

    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }

    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];

      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;

          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }

        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD;
          bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000;
          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }

        res.push(codePoint);
        i += bytesPerSequence;
      }

      return decodeCodePointsArray(res);
    }

    // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety
    var MAX_ARGUMENTS_LENGTH = 0x1000;

    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
      }

      // Decode in chunks to avoid "call stack size exceeded".
      var res = '';
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }

    function asciiSlice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F);
      }
      return ret;
    }

    function latin1Slice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }

    function hexSlice(buf, start, end) {
      var len = buf.length;

      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;

      var out = '';
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }
      return out;
    }

    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = '';
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }

    Buffer.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === undefined ? len : ~~end;

      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }

      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }

      if (end < start) end = start;

      var newBuf = this.subarray(start, end);
      // Return an augmented `Uint8Array` instance
      newBuf.__proto__ = Buffer.prototype;
      return newBuf;
    };

    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
    }

    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);

      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      return val;
    };

    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }

      var val = this[offset + --byteLength];
      var mul = 1;
      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul;
      }

      return val;
    };

    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };

    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };

    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };

    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);

      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
    };

    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);

      return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };

    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);

      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }
      mul *= 0x80;

      if (val >= mul) val -= Math.pow(2, 8 * byteLength);

      return val;
    };

    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);

      var i = byteLength;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul;
      }
      mul *= 0x80;

      if (val >= mul) val -= Math.pow(2, 8 * byteLength);

      return val;
    };

    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 0x80)) return this[offset];
      return (0xff - this[offset] + 1) * -1;
    };

    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);

      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };

    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);

      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };

    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };

    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };

    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };

    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };

    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
    }

    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var mul = 1;
      var i = 0;
      this[offset] = value & 0xFF;
      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength = byteLength >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var i = byteLength - 1;
      var mul = 1;
      this[offset + i] = value & 0xFF;
      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
      this[offset] = value & 0xff;
      return offset + 1;
    };

    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };

    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
      return offset + 2;
    };

    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 0xff;
      return offset + 4;
    };

    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
      return offset + 4;
    };

    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);

        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 0xFF;
      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);

        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = byteLength - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 0xFF;
      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
      if (value < 0) value = 0xff + value + 1;
      this[offset] = value & 0xff;
      return offset + 1;
    };

    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };

    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
      return offset + 2;
    };

    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };

    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      if (value < 0) value = 0xffffffff + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
      return offset + 4;
    };

    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
      if (offset < 0) throw new RangeError('Index out of range');
    }

    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }

    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };

    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }

    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };

    // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;

      // Copy 0 bytes; we're done
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;

      // Fatal error conditions
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
      }
      if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
      if (end < 0) throw new RangeError('sourceEnd out of bounds');

      // Are we oob?
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }

      var len = end - start;

      if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        // Use built-in when available, missing from IE11
        this.copyWithin(targetStart, start, end);
      } else if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (var i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }

      return len;
    };

    // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])
    Buffer.prototype.fill = function fill(val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding);
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
            // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
          }
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      }

      // Invalid ranges are not set to a default, so can range check early.
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
      }

      if (end <= start) {
        return this;
      }

      start = start >>> 0;
      end = end === undefined ? this.length : end >>> 0;

      if (!val) val = 0;

      var i;
      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer.isBuffer(val) ? val : new Buffer(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }

      return this;
    };

    // HELPER FUNCTIONS
    // ================

    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

    function base64clean(str) {
      // Node takes equal signs as end of the Base64 encoding
      str = str.split('=')[0];
      // Node strips out invalid characters like \n and \t from the string, base64-js does not
      str = str.trim().replace(INVALID_BASE64_RE, '');
      // Node converts strings with length < 2 to ''
      if (str.length < 2) return '';
      // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
      while (str.length % 4 !== 0) {
        str = str + '=';
      }
      return str;
    }

    function toHex(n) {
      if (n < 16) return '0' + n.toString(16);
      return n.toString(16);
    }

    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];

      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);

        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            }

            // valid lead
            leadSurrogate = codePoint;

            continue;
          }

          // 2 leads in a row
          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            leadSurrogate = codePoint;
            continue;
          }

          // valid surrogate pair
          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }

        leadSurrogate = null;

        // encode utf8
        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
          throw new Error('Invalid code point');
        }
      }

      return bytes;
    }

    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
      }
      return byteArray;
    }

    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;

        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }

      return byteArray;
    }

    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }

    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }

    // ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
    // but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
    function isArrayBuffer(obj) {
      return obj instanceof ArrayBuffer || obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' && typeof obj.byteLength === 'number';
    }

    function numberIsNaN(obj) {
      return obj !== obj; // eslint-disable-line no-self-compare
    }
  }, { "base64-js": 8, "ieee754": 11 }], 10: [function (require, module, exports) {
    (function (process, Buffer) {

      /**
       * Cloudinary's JavaScript library - Version 2.5.0
       * Copyright Cloudinary
       * see https://github.com/cloudinary/cloudinary_js
       *
       */
      var slice = [].slice,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }function ctor() {
          this.constructor = child;
        }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
      },
          hasProp = {}.hasOwnProperty;

      (function (root, factory) {
        var factoryWrapper, name, ref, results, value;
        factoryWrapper = function factoryWrapper(assign, cloneDeep, compact, difference, functions, identity, includes, isArray, isElement, isEmpty, isFunction, isPlainObject, isString, merge, trim) {
          return factory({
            assign: assign,
            cloneDeep: cloneDeep,
            compact: compact,
            difference: difference,
            functions: functions,
            identity: identity,
            includes: includes,
            isArray: isArray,
            isElement: isElement,
            isEmpty: isEmpty,
            isFunction: isFunction,
            isPlainObject: isPlainObject,
            isString: isString,
            merge: merge,
            trim: trim
          });
        };
        if (typeof define === 'function' && define.amd) {
          return define(['lodash/assign', 'lodash/cloneDeep', 'lodash/compact', 'lodash/difference', 'lodash/functions', 'lodash/identity', 'lodash/includes', 'lodash/isArray', 'lodash/isElement', 'lodash/isEmpty', 'lodash/isFunction', 'lodash/isPlainObject', 'lodash/isString', 'lodash/merge', 'lodash/trim'], factoryWrapper);
        } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
          return module.exports = factoryWrapper(require('lodash/assign'), require('lodash/cloneDeep'), require('lodash/compact'), require('lodash/difference'), require('lodash/functions'), require('lodash/identity'), require('lodash/includes'), require('lodash/isArray'), require('lodash/isElement'), require('lodash/isEmpty'), require('lodash/isFunction'), require('lodash/isPlainObject'), require('lodash/isString'), require('lodash/merge'), require('lodash/trim'));
        } else {
          root.cloudinary || (root.cloudinary = {});
          ref = factory(_);
          results = [];
          for (name in ref) {
            value = ref[name];
            results.push(root.cloudinary[name] = value);
          }
          return results;
        }
      })(this, function (_) {

        /*
         * Includes common utility methods and shims
         */

        /**
         * Return true if all items in list are strings
         * @function Util.allString
         * @param {Array} list - an array of items
         */
        var ArrayParam, BaseUtil, ClientHintsMetaTag, Cloudinary, Condition, Configuration, Expression, ExpressionParam, FetchLayer, HtmlTag, ImageTag, Layer, LayerParam, Param, RangeParam, RawParam, SubtitlesLayer, TextLayer, Transformation, TransformationBase, TransformationParam, Util, VideoTag, addClass, allStrings, augmentWidthOrHeight, base64Encode, base64EncodeURL, camelCase, cloudinary, contains, convertKeys, crc32, cssExpand, cssValue, curCSS, defaults, domStyle, funcTag, getAttribute, getData, getStyles, getWidthOrHeight, hasClass, isFunction, isNumberLike, isObject, m, objToString, objectProto, parameters, pnum, reWords, removeAttribute, rnumnonpx, setAttribute, setAttributes, setData, smartEscape, snakeCase, utf8_encode, width, withCamelCaseKeys, withSnakeCaseKeys, without;
        allStrings = function allStrings(list) {
          var item, j, len;
          for (j = 0, len = list.length; j < len; j++) {
            item = list[j];
            if (!Util.isString(item)) {
              return false;
            }
          }
          return true;
        };

        /**
        * Creates a new array without the given item.
        * @function Util.without
        * @param {Array} array - original array
        * @param {*} item - the item to exclude from the new array
        * @return {Array} a new array made of the original array's items except for `item`
         */
        without = function without(array, item) {
          var i, length, newArray;
          newArray = [];
          i = -1;
          length = array.length;
          while (++i < length) {
            if (array[i] !== item) {
              newArray.push(array[i]);
            }
          }
          return newArray;
        };

        /**
        * Return true is value is a number or a string representation of a number.
        * @function Util.isNumberLike
        * @param {*} value
        * @returns {boolean} true if value is a number
        * @example
        *    Util.isNumber(0) // true
        *    Util.isNumber("1.3") // true
        *    Util.isNumber("") // false
        *    Util.isNumber(undefined) // false
         */
        isNumberLike = function isNumberLike(value) {
          return value != null && !isNaN(parseFloat(value));
        };

        /**
         * Escape all characters matching unsafe in the given string
         * @function Util.smartEscape
         * @param {string} string - source string to escape
         * @param {RegExp} unsafe - characters that must be escaped
         * @return {string} escaped string
         */
        smartEscape = function smartEscape(string, unsafe) {
          if (unsafe == null) {
            unsafe = /([^a-zA-Z0-9_.\-\/:]+)/g;
          }
          return string.replace(unsafe, function (match) {
            return match.split("").map(function (c) {
              return "%" + c.charCodeAt(0).toString(16).toUpperCase();
            }).join("");
          });
        };

        /**
         * Assign values from sources if they are not defined in the destination.
         * Once a value is set it does not change
         * @function Util.defaults
         * @param {Object} destination - the object to assign defaults to
         * @param {...Object} source - the source object(s) to assign defaults from
         * @return {Object} destination after it was modified
         */
        defaults = function defaults() {
          var destination, sources;
          destination = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          return sources.reduce(function (dest, source) {
            var key, value;
            for (key in source) {
              value = source[key];
              if (dest[key] === void 0) {
                dest[key] = value;
              }
            }
            return dest;
          }, destination);
        };

        /*********** lodash functions */
        objectProto = Object.prototype;

        /**
         * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
         * of values.
         */
        objToString = objectProto.toString;

        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
        #isObject({});
         * // => true
         *
        #isObject([1, 2, 3]);
         * // => true
         *
        #isObject(1);
         * // => false
         */
        isObject = function isObject(value) {
          var type;
          type = typeof value === "undefined" ? "undefined" : _typeof(value);
          return !!value && (type === 'object' || type === 'function');
        };
        funcTag = '[object Function]';

        /**
        * Checks if `value` is classified as a `Function` object.
        * @function Util.isFunction
        * @param {*} value The value to check.
        * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
        * @example
        *
        * function Foo(){};  
        * isFunction(Foo);
        * // => true
        *
        * isFunction(/abc/);
        * // => false
         */
        isFunction = function isFunction(value) {
          return isObject(value) && objToString.call(value) === funcTag;
        };

        /*********** lodash functions */

        /** Used to match words to create compound words. */
        reWords = function () {
          var lower, upper;
          upper = '[A-Z]';
          lower = '[a-z]+';
          return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
        }();

        /**
        * Convert string to camelCase
        * @function Util.camelCase
        * @param {string} string - the string to convert
        * @return {string} in camelCase format
         */
        camelCase = function camelCase(source) {
          var i, word, words;
          words = source.match(reWords);
          words = function () {
            var j, len, results;
            results = [];
            for (i = j = 0, len = words.length; j < len; i = ++j) {
              word = words[i];
              word = word.toLocaleLowerCase();
              if (i) {
                results.push(word.charAt(0).toLocaleUpperCase() + word.slice(1));
              } else {
                results.push(word);
              }
            }
            return results;
          }();
          return words.join('');
        };

        /**
         * Convert string to snake_case
         * @function Util.snakeCase
         * @param {string} string - the string to convert
         * @return {string} in snake_case format
         */
        snakeCase = function snakeCase(source) {
          var i, word, words;
          words = source.match(reWords);
          words = function () {
            var j, len, results;
            results = [];
            for (i = j = 0, len = words.length; j < len; i = ++j) {
              word = words[i];
              results.push(word.toLocaleLowerCase());
            }
            return results;
          }();
          return words.join('_');
        };
        convertKeys = function convertKeys(source, converter) {
          var key, result, value;
          if (converter == null) {
            converter = Util.identity;
          }
          result = {};
          for (key in source) {
            value = source[key];
            key = converter(key);
            if (!Util.isEmpty(key)) {
              result[key] = value;
            }
          }
          return result;
        };

        /**
         * Create a copy of the source object with all keys in camelCase
         * @function Util.withCamelCaseKeys
         * @param {Object} value - the object to copy
         * @return {Object} a new object
         */
        withCamelCaseKeys = function withCamelCaseKeys(source) {
          return convertKeys(source, Util.camelCase);
        };

        /**
         * Create a copy of the source object with all keys in snake_case
         * @function Util.withSnakeCaseKeys
         * @param {Object} value - the object to copy
         * @return {Object} a new object
         */
        withSnakeCaseKeys = function withSnakeCaseKeys(source) {
          return convertKeys(source, Util.snakeCase);
        };
        base64Encode = typeof btoa !== 'undefined' && isFunction(btoa) ? btoa : typeof Buffer !== 'undefined' && isFunction(Buffer) ? function (input) {
          if (!(input instanceof Buffer)) {
            input = new Buffer.from(String(input), 'binary');
          }
          return input.toString('base64');
        } : function (input) {
          throw new Error("No base64 encoding function found");
        };

        /**
        * Returns the Base64-decoded version of url.<br>
        * This method delegates to `btoa` if present. Otherwise it tries `Buffer`.
        * @function Util.base64EncodeURL
        * @param {string} url - the url to encode. the value is URIdecoded and then re-encoded before converting to base64 representation
        * @return {string} the base64 representation of the URL
         */
        base64EncodeURL = function base64EncodeURL(input) {
          var error1, ignore;
          try {
            input = decodeURI(input);
          } catch (error1) {
            ignore = error1;
          }
          input = encodeURI(input);
          return base64Encode(input);
        };
        BaseUtil = {
          allStrings: allStrings,
          camelCase: camelCase,
          convertKeys: convertKeys,
          defaults: defaults,
          snakeCase: snakeCase,
          without: without,
          isFunction: isFunction,
          isNumberLike: isNumberLike,
          smartEscape: smartEscape,
          withCamelCaseKeys: withCamelCaseKeys,
          withSnakeCaseKeys: withSnakeCaseKeys,
          base64EncodeURL: base64EncodeURL
        };

        /*
         * Includes utility methods and lodash / jQuery shims
         */

        /**
         * Get data from the DOM element.
         *
         * This method will use jQuery's `data()` method if it is available, otherwise it will get the `data-` attribute
         * @param {Element} element - the element to get the data from
         * @param {string} name - the name of the data item
         * @returns the value associated with the `name`
         * @function Util.getData
         */
        getData = function getData(element, name) {
          var ref;
          switch (false) {
            case !(element == null):
              return void 0;
            case !_.isFunction(element.getAttribute):
              return element.getAttribute("data-" + name);
            case !_.isFunction(element.getAttr):
              return element.getAttr("data-" + name);
            case !_.isFunction(element.data):
              return element.data(name);
            case !(_.isFunction(typeof jQuery !== "undefined" && jQuery !== null ? (ref = jQuery.fn) != null ? ref.data : void 0 : void 0) && _.isElement(element)):
              return jQuery(element).data(name);
          }
        };

        /**
         * Set data in the DOM element.
         *
         * This method will use jQuery's `data()` method if it is available, otherwise it will set the `data-` attribute
         * @function Util.setData
         * @param {Element} element - the element to set the data in
         * @param {string} name - the name of the data item
         * @param {*} value - the value to be set
         *
         */
        setData = function setData(element, name, value) {
          var ref;
          switch (false) {
            case !(element == null):
              return void 0;
            case !_.isFunction(element.setAttribute):
              return element.setAttribute("data-" + name, value);
            case !_.isFunction(element.setAttr):
              return element.setAttr("data-" + name, value);
            case !_.isFunction(element.data):
              return element.data(name, value);
            case !(_.isFunction(typeof jQuery !== "undefined" && jQuery !== null ? (ref = jQuery.fn) != null ? ref.data : void 0 : void 0) && _.isElement(element)):
              return jQuery(element).data(name, value);
          }
        };

        /**
         * Get attribute from the DOM element.
         *
         * @function Util.getAttribute
         * @param {Element} element - the element to set the attribute for
         * @param {string} name - the name of the attribute
         * @returns {*} the value of the attribute
         *
         */
        getAttribute = function getAttribute(element, name) {
          switch (false) {
            case !(element == null):
              return void 0;
            case !_.isFunction(element.getAttribute):
              return element.getAttribute(name);
            case !_.isFunction(element.attr):
              return element.attr(name);
            case !_.isFunction(element.getAttr):
              return element.getAttr(name);
          }
        };

        /**
         * Set attribute in the DOM element.
         *
         * @function Util.setAttribute
         * @param {Element} element - the element to set the attribute for
         * @param {string} name - the name of the attribute
         * @param {*} value - the value to be set
         */
        setAttribute = function setAttribute(element, name, value) {
          switch (false) {
            case !(element == null):
              return void 0;
            case !_.isFunction(element.setAttribute):
              return element.setAttribute(name, value);
            case !_.isFunction(element.attr):
              return element.attr(name, value);
            case !_.isFunction(element.setAttr):
              return element.setAttr(name, value);
          }
        };

        /**
         * Remove an attribute in the DOM element.
         *
         * @function Util.removeAttribute
         * @param {Element} element - the element to set the attribute for
         * @param {string} name - the name of the attribute
         */
        removeAttribute = function removeAttribute(element, name) {
          switch (false) {
            case !(element == null):
              return void 0;
            case !_.isFunction(element.removeAttribute):
              return element.removeAttribute(name);
            default:
              return setAttribute(element, void 0);
          }
        };

        /**
          * Set a group of attributes to the element
          * @function Util.setAttributes
          * @param {Element} element - the element to set the attributes for
          * @param {Object} attributes - a hash of attribute names and values
         */
        setAttributes = function setAttributes(element, attributes) {
          var name, results, value;
          results = [];
          for (name in attributes) {
            value = attributes[name];
            if (value != null) {
              results.push(setAttribute(element, name, value));
            } else {
              results.push(removeAttribute(element, name));
            }
          }
          return results;
        };

        /**
          * Checks if element has a css class
          * @function Util.hasClass
          * @param {Element} element - the element to check
          * @param {string} name - the class name
          @returns {boolean} true if the element has the class
         */
        hasClass = function hasClass(element, name) {
          if (_.isElement(element)) {
            return element.className.match(new RegExp("\\b" + name + "\\b"));
          }
        };

        /**
          * Add class to the element
          * @function Util.addClass
          * @param {Element} element - the element
          * @param {string} name - the class name to add
         */
        addClass = function addClass(element, name) {
          if (!element.className.match(new RegExp("\\b" + name + "\\b"))) {
            return element.className = _.trim(element.className + " " + name);
          }
        };
        getStyles = function getStyles(elem) {
          if (elem.ownerDocument.defaultView.opener) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
          }
          return window.getComputedStyle(elem, null);
        };
        cssExpand = ["Top", "Right", "Bottom", "Left"];
        contains = function contains(a, b) {
          var adown, bup;
          adown = a.nodeType === 9 ? a.documentElement : a;
          bup = b && b.parentNode;
          return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
        };
        domStyle = function domStyle(elem, name) {
          if (!(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style)) {
            return elem.style[name];
          }
        };
        curCSS = function curCSS(elem, name, computed) {
          var maxWidth, minWidth, ret, rmargin, style, width;
          rmargin = /^margin/;
          width = void 0;
          minWidth = void 0;
          maxWidth = void 0;
          ret = void 0;
          style = elem.style;
          computed = computed || getStyles(elem);
          if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
          }
          if (computed) {
            if (ret === "" && !contains(elem.ownerDocument, elem)) {
              ret = domStyle(elem, name);
            }
            if (rnumnonpx.test(ret) && rmargin.test(name)) {
              width = style.width;
              minWidth = style.minWidth;
              maxWidth = style.maxWidth;
              style.minWidth = style.maxWidth = style.width = ret;
              ret = computed.width;
              style.width = width;
              style.minWidth = minWidth;
              style.maxWidth = maxWidth;
            }
          }
          if (ret !== undefined) {
            return ret + "";
          } else {
            return ret;
          }
        };
        cssValue = function cssValue(elem, name, convert, styles) {
          var val;
          val = curCSS(elem, name, styles);
          if (convert) {
            return parseFloat(val);
          } else {
            return val;
          }
        };
        augmentWidthOrHeight = function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
          var j, len, side, sides, val;
          if (extra === (isBorderBox ? "border" : "content")) {
            return 0;
          } else {
            sides = name === "width" ? ["Right", "Left"] : ["Top", "Bottom"];
            val = 0;
            for (j = 0, len = sides.length; j < len; j++) {
              side = sides[j];
              if (extra === "margin") {
                val += cssValue(elem, extra + side, true, styles);
              }
              if (isBorderBox) {
                if (extra === "content") {
                  val -= cssValue(elem, "padding" + side, true, styles);
                }
                if (extra !== "margin") {
                  val -= cssValue(elem, "border" + side + "Width", true, styles);
                }
              } else {
                val += cssValue(elem, "padding" + side, true, styles);
                if (extra !== "padding") {
                  val += cssValue(elem, "border" + side + "Width", true, styles);
                }
              }
            }
            return val;
          }
        };
        pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        getWidthOrHeight = function getWidthOrHeight(elem, name, extra) {
          var isBorderBox, styles, val, valueIsBorderBox;
          valueIsBorderBox = true;
          val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
          styles = getStyles(elem);
          isBorderBox = cssValue(elem, "boxSizing", false, styles) === "border-box";
          if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
              val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
              return val;
            }
            valueIsBorderBox = isBorderBox && val === elem.style[name];
            val = parseFloat(val) || 0;
          }
          return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles);
        };
        width = function width(element) {
          return getWidthOrHeight(element, "width", "content");
        };

        /**
         * @class Util
         */
        Util = _.assign(BaseUtil, {
          hasClass: hasClass,
          addClass: addClass,
          getAttribute: getAttribute,
          setAttribute: setAttribute,
          removeAttribute: removeAttribute,
          setAttributes: setAttributes,
          getData: getData,
          setData: setData,
          width: width,

          /**
           * Returns true if item is a string
           * @function Util.isString
           * @param item
           * @returns {boolean} true if item is a string
           */
          isString: _.isString,
          isArray: _.isArray,

          /**
           * Returns true if item is empty:
           * <ul>
           *   <li>item is null or undefined</li>
           *   <li>item is an array or string of length 0</li>
           *   <li>item is an object with no keys</li>
           * </ul>
           * @function Util.isEmpty
           * @param item
           * @returns {boolean} true if item is empty
           */
          isEmpty: _.isEmpty,

          /**
           * Assign source properties to destination.
           * If the property is an object it is assigned as a whole, overriding the destination object.
           * @function Util.assign
           * @param {Object} destination - the object to assign to
           */
          assign: _.assign,

          /**
           * Recursively assign source properties to destination
           * @function Util.merge
           * @param {Object} destination - the object to assign to
           * @param {...Object} [sources] The source objects.
           */
          merge: _.merge,

          /**
           * Create a new copy of the given object, including all internal objects.
           * @function Util.cloneDeep
           * @param {Object} value - the object to clone
           * @return {Object} a new deep copy of the object
           */
          cloneDeep: _.cloneDeep,

          /**
           * Creates a new array from the parameter with "falsey" values removed
           * @function Util.compact
           * @param {Array} array - the array to remove values from
           * @return {Array} a new array without falsey values
           */
          compact: _.compact,

          /**
           * Check if a given item is included in the given array
           * @function Util.contains
           * @param {Array} array - the array to search in
           * @param {*} item - the item to search for
           * @return {boolean} true if the item is included in the array
           */
          contains: _.includes,

          /**
           * Returns values in the given array that are not included in the other array
           * @function Util.difference
           * @param {Array} arr - the array to select from
           * @param {Array} values - values to filter from arr
           * @return {Array} the filtered values
           */
          difference: _.difference,

          /**
           * Returns a list of all the function names in obj
           * @function Util.functions
           * @param {Object} object - the object to inspect
           * @return {Array} a list of functions of object
           */
          functions: _.functions,

          /**
           * Returns the provided value. This functions is used as a default predicate function.
           * @function Util.identity
           * @param {*} value
           * @return {*} the provided value
           */
          identity: _.identity,
          isPlainObject: _.isPlainObject,

          /**
           * Remove leading or trailing spaces from text
           * @function Util.trim
           * @param {string} text
           * @return {string} the `text` without leading or trailing spaces
           */
          trim: _.trim
        });

        /**
         * UTF8 encoder
         *
         */
        utf8_encode = function utf8_encode(argString) {
          var c1, enc, end, n, start, string, stringl, utftext;
          if (argString === null || typeof argString === 'undefined') {
            return '';
          }
          string = argString + '';
          utftext = '';
          start = void 0;
          end = void 0;
          stringl = 0;
          start = end = 0;
          stringl = string.length;
          n = 0;
          while (n < stringl) {
            c1 = string.charCodeAt(n);
            enc = null;
            if (c1 < 128) {
              end++;
            } else if (c1 > 127 && c1 < 2048) {
              enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
            } else {
              enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
            }
            if (enc !== null) {
              if (end > start) {
                utftext += string.slice(start, end);
              }
              utftext += enc;
              start = end = n + 1;
            }
            n++;
          }
          if (end > start) {
            utftext += string.slice(start, stringl);
          }
          return utftext;
        };

        /**
         * CRC32 calculator
         * Depends on 'utf8_encode'
         */
        crc32 = function crc32(str) {
          var crc, i, iTop, table, x, y;
          str = utf8_encode(str);
          table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
          crc = 0;
          x = 0;
          y = 0;
          crc = crc ^ -1;
          i = 0;
          iTop = str.length;
          while (i < iTop) {
            y = (crc ^ str.charCodeAt(i)) & 0xFF;
            x = '0x' + table.substr(y * 9, 8);
            crc = crc >>> 8 ^ x;
            i++;
          }
          crc = crc ^ -1;
          if (crc < 0) {
            crc += 4294967296;
          }
          return crc;
        };
        Layer = function () {

          /**
           * Layer
           * @constructor Layer
           * @param {Object} options - layer parameters
           */
          function Layer(options) {
            this.options = {};
            if (options != null) {
              ["resourceType", "type", "publicId", "format"].forEach(function (_this) {
                return function (key) {
                  var ref;
                  return _this.options[key] = (ref = options[key]) != null ? ref : options[Util.snakeCase(key)];
                };
              }(this));
            }
          }

          Layer.prototype.resourceType = function (value) {
            this.options.resourceType = value;
            return this;
          };

          Layer.prototype.type = function (value) {
            this.options.type = value;
            return this;
          };

          Layer.prototype.publicId = function (value) {
            this.options.publicId = value;
            return this;
          };

          /**
           * Get the public ID, formatted for layer parameter
           * @function Layer#getPublicId
           * @return {String} public ID
           */

          Layer.prototype.getPublicId = function () {
            var ref;
            return (ref = this.options.publicId) != null ? ref.replace(/\//g, ":") : void 0;
          };

          /**
           * Get the public ID, with format if present
           * @function Layer#getFullPublicId
           * @return {String} public ID
           */

          Layer.prototype.getFullPublicId = function () {
            if (this.options.format != null) {
              return this.getPublicId() + "." + this.options.format;
            } else {
              return this.getPublicId();
            }
          };

          Layer.prototype.format = function (value) {
            this.options.format = value;
            return this;
          };

          /**
           * generate the string representation of the layer
           * @function Layer#toString
           */

          Layer.prototype.toString = function () {
            var components;
            components = [];
            if (this.options.publicId == null) {
              throw "Must supply publicId";
            }
            if (!(this.options.resourceType === "image")) {
              components.push(this.options.resourceType);
            }
            if (!(this.options.type === "upload")) {
              components.push(this.options.type);
            }
            components.push(this.getFullPublicId());
            return Util.compact(components).join(":");
          };

          return Layer;
        }();
        FetchLayer = function (superClass) {
          extend(FetchLayer, superClass);

          /**
           * @constructor FetchLayer
           * @param {Object|string} options - layer parameters or a url
           * @param {string} options.url the url of the image to fetch
           */

          function FetchLayer(options) {
            FetchLayer.__super__.constructor.call(this, options);
            if (Util.isString(options)) {
              this.options.url = options;
            } else if (options != null ? options.url : void 0) {
              this.options.url = options.url;
            }
          }

          FetchLayer.prototype.url = function (url) {
            this.options.url = url;
            return this;
          };

          /**
           * generate the string representation of the layer
           * @function FetchLayer#toString
           * @return {String}
           */

          FetchLayer.prototype.toString = function () {
            return "fetch:" + cloudinary.Util.base64EncodeURL(this.options.url);
          };

          return FetchLayer;
        }(Layer);
        TextLayer = function (superClass) {
          extend(TextLayer, superClass);

          /**
           * @constructor TextLayer
           * @param {Object} options - layer parameters
           */

          function TextLayer(options) {
            var keys;
            TextLayer.__super__.constructor.call(this, options);
            keys = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "text"];
            if (options != null) {
              keys.forEach(function (_this) {
                return function (key) {
                  var ref;
                  return _this.options[key] = (ref = options[key]) != null ? ref : options[Util.snakeCase(key)];
                };
              }(this));
            }
            this.options.resourceType = "text";
          }

          TextLayer.prototype.resourceType = function (resourceType) {
            throw "Cannot modify resourceType for text layers";
          };

          TextLayer.prototype.type = function (type) {
            throw "Cannot modify type for text layers";
          };

          TextLayer.prototype.format = function (format) {
            throw "Cannot modify format for text layers";
          };

          TextLayer.prototype.fontFamily = function (fontFamily) {
            this.options.fontFamily = fontFamily;
            return this;
          };

          TextLayer.prototype.fontSize = function (fontSize) {
            this.options.fontSize = fontSize;
            return this;
          };

          TextLayer.prototype.fontWeight = function (fontWeight) {
            this.options.fontWeight = fontWeight;
            return this;
          };

          TextLayer.prototype.fontStyle = function (fontStyle) {
            this.options.fontStyle = fontStyle;
            return this;
          };

          TextLayer.prototype.textDecoration = function (textDecoration) {
            this.options.textDecoration = textDecoration;
            return this;
          };

          TextLayer.prototype.textAlign = function (textAlign) {
            this.options.textAlign = textAlign;
            return this;
          };

          TextLayer.prototype.stroke = function (stroke) {
            this.options.stroke = stroke;
            return this;
          };

          TextLayer.prototype.letterSpacing = function (letterSpacing) {
            this.options.letterSpacing = letterSpacing;
            return this;
          };

          TextLayer.prototype.lineSpacing = function (lineSpacing) {
            this.options.lineSpacing = lineSpacing;
            return this;
          };

          TextLayer.prototype.text = function (text) {
            this.options.text = text;
            return this;
          };

          /**
           * generate the string representation of the layer
           * @function TextLayer#toString
           * @return {String}
           */

          TextLayer.prototype.toString = function () {
            var components, hasPublicId, hasStyle, publicId, re, res, start, style, text, textSource;
            style = this.textStyleIdentifier();
            if (this.options.publicId != null) {
              publicId = this.getFullPublicId();
            }
            if (this.options.text != null) {
              hasPublicId = !Util.isEmpty(publicId);
              hasStyle = !Util.isEmpty(style);
              if (hasPublicId && hasStyle || !hasPublicId && !hasStyle) {
                throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
              }
              re = /\$\([a-zA-Z]\w*\)/g;
              start = 0;
              textSource = Util.smartEscape(this.options.text, /[,\/]/g);
              text = "";
              while (res = re.exec(textSource)) {
                text += Util.smartEscape(textSource.slice(start, res.index));
                text += res[0];
                start = res.index + res[0].length;
              }
              text += Util.smartEscape(textSource.slice(start));
            }
            components = [this.options.resourceType, style, publicId, text];
            return Util.compact(components).join(":");
          };

          TextLayer.prototype.textStyleIdentifier = function () {
            var components;
            components = [];
            if (this.options.fontWeight !== "normal") {
              components.push(this.options.fontWeight);
            }
            if (this.options.fontStyle !== "normal") {
              components.push(this.options.fontStyle);
            }
            if (this.options.textDecoration !== "none") {
              components.push(this.options.textDecoration);
            }
            components.push(this.options.textAlign);
            if (this.options.stroke !== "none") {
              components.push(this.options.stroke);
            }
            if (!(Util.isEmpty(this.options.letterSpacing) && !Util.isNumberLike(this.options.letterSpacing))) {
              components.push("letter_spacing_" + this.options.letterSpacing);
            }
            if (!(Util.isEmpty(this.options.lineSpacing) && !Util.isNumberLike(this.options.lineSpacing))) {
              components.push("line_spacing_" + this.options.lineSpacing);
            }
            if (!Util.isEmpty(Util.compact(components))) {
              if (Util.isEmpty(this.options.fontFamily)) {
                throw "Must supply fontFamily. " + components;
              }
              if (Util.isEmpty(this.options.fontSize) && !Util.isNumberLike(this.options.fontSize)) {
                throw "Must supply fontSize.";
              }
            }
            components.unshift(this.options.fontFamily, this.options.fontSize);
            components = Util.compact(components).join("_");
            return components;
          };

          return TextLayer;
        }(Layer);
        SubtitlesLayer = function (superClass) {
          extend(SubtitlesLayer, superClass);

          /**
           * Represent a subtitles layer
           * @constructor SubtitlesLayer
           * @param {Object} options - layer parameters
           */

          function SubtitlesLayer(options) {
            SubtitlesLayer.__super__.constructor.call(this, options);
            this.options.resourceType = "subtitles";
          }

          return SubtitlesLayer;
        }(TextLayer);

        /**
         * Transformation parameters
         * Depends on 'util', 'transformation'
         */
        Param = function () {

          /**
           * Represents a single parameter
           * @class Param
           * @param {string} name - The name of the parameter in snake_case
           * @param {string} shortName - The name of the serialized form of the parameter.
           *                         If a value is not provided, the parameter will not be serialized.
           * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
           * @ignore
           */
          function Param(name, shortName, process) {
            if (process == null) {
              process = cloudinary.Util.identity;
            }

            /**
             * The name of the parameter in snake_case
             * @member {string} Param#name
             */
            this.name = name;

            /**
             * The name of the serialized form of the parameter
             * @member {string} Param#shortName
             */
            this.shortName = shortName;

            /**
             * Manipulate origValue when value is called
             * @member {function} Param#process
             */
            this.process = process;
          }

          /**
           * Set a (unprocessed) value for this parameter
           * @function Param#set
           * @param {*} origValue - the value of the parameter
           * @return {Param} self for chaining
           */

          Param.prototype.set = function (origValue) {
            this.origValue = origValue;
            return this;
          };

          /**
           * Generate the serialized form of the parameter
           * @function Param#serialize
           * @return {string} the serialized form of the parameter
           */

          Param.prototype.serialize = function () {
            var val, valid;
            val = this.value();
            valid = cloudinary.Util.isArray(val) || cloudinary.Util.isPlainObject(val) || cloudinary.Util.isString(val) ? !cloudinary.Util.isEmpty(val) : val != null;
            if (this.shortName != null && valid) {
              return this.shortName + "_" + val;
            } else {
              return '';
            }
          };

          /**
           * Return the processed value of the parameter
           * @function Param#value
           */

          Param.prototype.value = function () {
            return this.process(this.origValue);
          };

          Param.norm_color = function (value) {
            return value != null ? value.replace(/^#/, 'rgb:') : void 0;
          };

          Param.prototype.build_array = function (arg) {
            if (arg == null) {
              arg = [];
            }
            if (cloudinary.Util.isArray(arg)) {
              return arg;
            } else {
              return [arg];
            }
          };

          /**
          * Covert value to video codec string.
          *
          * If the parameter is an object,
          * @param {(string|Object)} param - the video codec as either a String or a Hash
          * @return {string} the video codec string in the format codec:profile:level
          * @example
          * vc_[ :profile : [level]]
          * or
            { codec: 'h264', profile: 'basic', level: '3.1' }
          * @ignore
           */

          Param.process_video_params = function (param) {
            var video;
            switch (param.constructor) {
              case Object:
                video = "";
                if ('codec' in param) {
                  video = param['codec'];
                  if ('profile' in param) {
                    video += ":" + param['profile'];
                    if ('level' in param) {
                      video += ":" + param['level'];
                    }
                  }
                }
                return video;
              case String:
                return param;
              default:
                return null;
            }
          };

          return Param;
        }();
        ArrayParam = function (superClass) {
          extend(ArrayParam, superClass);

          /**
           * A parameter that represents an array
           * @param {string} name - The name of the parameter in snake_case
           * @param {string} shortName - The name of the serialized form of the parameter
           *                         If a value is not provided, the parameter will not be serialized.
           * @param {string} [sep='.'] - The separator to use when joining the array elements together
           * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
           * @class ArrayParam
           * @extends Param
           * @ignore
           */

          function ArrayParam(name, shortName, sep, process) {
            if (sep == null) {
              sep = '.';
            }
            this.sep = sep;
            ArrayParam.__super__.constructor.call(this, name, shortName, process);
          }

          ArrayParam.prototype.serialize = function () {
            var arrayValue, flat, t;
            if (this.shortName != null) {
              arrayValue = this.value();
              if (cloudinary.Util.isEmpty(arrayValue)) {
                return '';
              } else if (cloudinary.Util.isString(arrayValue)) {
                return this.shortName + "_" + arrayValue;
              } else {
                flat = function () {
                  var j, len, results;
                  results = [];
                  for (j = 0, len = arrayValue.length; j < len; j++) {
                    t = arrayValue[j];
                    if (cloudinary.Util.isFunction(t.serialize)) {
                      results.push(t.serialize());
                    } else {
                      results.push(t);
                    }
                  }
                  return results;
                }();
                return this.shortName + "_" + flat.join(this.sep);
              }
            } else {
              return '';
            }
          };

          ArrayParam.prototype.value = function () {
            var j, len, ref, results, v;
            if (cloudinary.Util.isArray(this.origValue)) {
              ref = this.origValue;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                v = ref[j];
                results.push(this.process(v));
              }
              return results;
            } else {
              return this.process(this.origValue);
            }
          };

          ArrayParam.prototype.set = function (origValue) {
            if (origValue == null || cloudinary.Util.isArray(origValue)) {
              return ArrayParam.__super__.set.call(this, origValue);
            } else {
              return ArrayParam.__super__.set.call(this, [origValue]);
            }
          };

          return ArrayParam;
        }(Param);
        TransformationParam = function (superClass) {
          extend(TransformationParam, superClass);

          /**
           * A parameter that represents a transformation
           * @param {string} name - The name of the parameter in snake_case
           * @param {string} [shortName='t'] - The name of the serialized form of the parameter
           * @param {string} [sep='.'] - The separator to use when joining the array elements together
           * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
           * @class TransformationParam
           * @extends Param
           * @ignore
           */

          function TransformationParam(name, shortName, sep, process) {
            if (shortName == null) {
              shortName = "t";
            }
            if (sep == null) {
              sep = '.';
            }
            this.sep = sep;
            TransformationParam.__super__.constructor.call(this, name, shortName, process);
          }

          TransformationParam.prototype.serialize = function () {
            var joined, result, t;
            if (cloudinary.Util.isEmpty(this.value())) {
              return '';
            } else if (cloudinary.Util.allStrings(this.value())) {
              joined = this.value().join(this.sep);
              if (!cloudinary.Util.isEmpty(joined)) {
                return this.shortName + "_" + joined;
              } else {
                return '';
              }
            } else {
              result = function () {
                var j, len, ref, results;
                ref = this.value();
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  t = ref[j];
                  if (t != null) {
                    if (cloudinary.Util.isString(t) && !cloudinary.Util.isEmpty(t)) {
                      results.push(this.shortName + "_" + t);
                    } else if (cloudinary.Util.isFunction(t.serialize)) {
                      results.push(t.serialize());
                    } else if (cloudinary.Util.isPlainObject(t) && !cloudinary.Util.isEmpty(t)) {
                      results.push(new Transformation(t).serialize());
                    } else {
                      results.push(void 0);
                    }
                  }
                }
                return results;
              }.call(this);
              return cloudinary.Util.compact(result);
            }
          };

          TransformationParam.prototype.set = function (origValue1) {
            this.origValue = origValue1;
            if (cloudinary.Util.isArray(this.origValue)) {
              return TransformationParam.__super__.set.call(this, this.origValue);
            } else {
              return TransformationParam.__super__.set.call(this, [this.origValue]);
            }
          };

          return TransformationParam;
        }(Param);
        RangeParam = function (superClass) {
          extend(RangeParam, superClass);

          /**
           * A parameter that represents a range
           * @param {string} name - The name of the parameter in snake_case
           * @param {string} shortName - The name of the serialized form of the parameter
           *                         If a value is not provided, the parameter will not be serialized.
           * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
           * @class RangeParam
           * @extends Param
           * @ignore
           */

          function RangeParam(name, shortName, process) {
            if (process == null) {
              process = this.norm_range_value;
            }
            RangeParam.__super__.constructor.call(this, name, shortName, process);
          }

          RangeParam.norm_range_value = function (value) {
            var modifier, offset;
            offset = String(value).match(new RegExp('^' + offset_any_pattern + '$'));
            if (offset) {
              modifier = offset[5] != null ? 'p' : '';
              value = (offset[1] || offset[4]) + modifier;
            }
            return value;
          };

          return RangeParam;
        }(Param);
        RawParam = function (superClass) {
          extend(RawParam, superClass);

          function RawParam(name, shortName, process) {
            if (process == null) {
              process = cloudinary.Util.identity;
            }
            RawParam.__super__.constructor.call(this, name, shortName, process);
          }

          RawParam.prototype.serialize = function () {
            return this.value();
          };

          return RawParam;
        }(Param);
        LayerParam = function (superClass) {
          var LAYER_KEYWORD_PARAMS;

          extend(LayerParam, superClass);

          function LayerParam() {
            return LayerParam.__super__.constructor.apply(this, arguments);
          }

          LayerParam.prototype.value = function () {
            var layerOptions, result;
            layerOptions = this.origValue;
            if (cloudinary.Util.isPlainObject(layerOptions)) {
              layerOptions = Util.withCamelCaseKeys(layerOptions);
              if (layerOptions.resourceType === "text" || layerOptions.text != null) {
                result = new cloudinary.TextLayer(layerOptions).toString();
              } else if (layerOptions.resourceType === "subtitles") {
                result = new cloudinary.SubtitlesLayer(layerOptions).toString();
              } else if (layerOptions.resourceType === "fetch" || layerOptions.url != null) {
                result = new cloudinary.FetchLayer(layerOptions).toString();
              } else {
                result = new cloudinary.Layer(layerOptions).toString();
              }
            } else if (/^fetch:.+/.test(layerOptions)) {
              result = new FetchLayer(layerOptions.substr(6)).toString();
            } else {
              result = layerOptions;
            }
            return result;
          };

          LAYER_KEYWORD_PARAMS = [["font_weight", "normal"], ["font_style", "normal"], ["text_decoration", "none"], ["text_align", null], ["stroke", "none"], ["letter_spacing", null], ["line_spacing", null]];

          LayerParam.prototype.textStyle = function (layer) {
            return new cloudinary.TextLayer(layer).textStyleIdentifier();
          };

          return LayerParam;
        }(Param);
        ExpressionParam = function (superClass) {
          extend(ExpressionParam, superClass);

          function ExpressionParam() {
            return ExpressionParam.__super__.constructor.apply(this, arguments);
          }

          ExpressionParam.prototype.serialize = function () {
            return Expression.normalize(ExpressionParam.__super__.serialize.call(this));
          };

          return ExpressionParam;
        }(Param);
        parameters = {};
        parameters.Param = Param;
        parameters.ArrayParam = ArrayParam;
        parameters.RangeParam = RangeParam;
        parameters.RawParam = RawParam;
        parameters.TransformationParam = TransformationParam;
        parameters.LayerParam = LayerParam;
        parameters.ExpressionParam = ExpressionParam;
        Expression = function () {

          /**
           * @internal
           */
          var faceCount;

          Expression.OPERATORS = {
            "=": 'eq',
            "!=": 'ne',
            "<": 'lt',
            ">": 'gt',
            "<=": 'lte',
            ">=": 'gte',
            "&&": 'and',
            "||": 'or',
            "*": "mul",
            "/": "div",
            "+": "add",
            "-": "sub"
          };

          /**
           * @internal
           */

          Expression.PREDEFINED_VARS = {
            "aspect_ratio": "ar",
            "aspectRatio": "ar",
            "current_page": "cp",
            "currentPage": "cp",
            "face_count": "fc",
            "faceCount": "fc",
            "height": "h",
            "initial_aspect_ratio": "iar",
            "initial_height": "ih",
            "initial_width": "iw",
            "initialAspectRatio": "iar",
            "initialHeight": "ih",
            "initialWidth": "iw",
            "page_count": "pc",
            "page_x": "px",
            "page_y": "py",
            "pageCount": "pc",
            "pageX": "px",
            "pageY": "py",
            "tags": "tags",
            "width": "w"
          };

          /**
           * @internal
           */

          Expression.BOUNDRY = "[ _]+";

          /**
           * Represents a transformation expression
           * @param {string} expressionStr - a expression in string format
           * @class Expression
           *
           */

          function Expression(expressionStr) {

            /**
              * @protected
              * @inner Expression-expressions
             */
            this.expressions = [];
            if (expressionStr != null) {
              this.expressions.push(Expression.normalize(expressionStr));
            }
          }

          /**
           * Convenience constructor method
           * @function Expression.new
           */

          Expression["new"] = function (expressionStr) {
            return new this(expressionStr);
          };

          /**
           * Normalize a string expression
           * @function Cloudinary#normalize
           * @param {string} expression a expression, e.g. "w gt 100", "width_gt_100", "width > 100"
           * @return {string} the normalized form of the value expression, e.g. "w_gt_100"
           */

          Expression.normalize = function (expression) {
            var operators, pattern, replaceRE;
            if (expression == null) {
              return expression;
            }
            expression = String(expression);
            operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*";
            pattern = "((" + operators + ")(?=[ _])|" + Object.keys(Expression.PREDEFINED_VARS).join("|") + ")";
            replaceRE = new RegExp(pattern, "g");
            expression = expression.replace(replaceRE, function (match) {
              return Expression.OPERATORS[match] || Expression.PREDEFINED_VARS[match];
            });
            return expression.replace(/[ _]+/g, '_');
          };

          /**
           * Serialize the expression
           * @return {string} the expression as a string
           */

          Expression.prototype.serialize = function () {
            return Expression.normalize(this.expressions.join("_"));
          };

          Expression.prototype.toString = function () {
            return this.serialize();
          };

          /**
           * Get the parent transformation of this expression
           * @return Transformation
           */

          Expression.prototype.getParent = function () {
            return this.parent;
          };

          /**
           * Set the parent transformation of this expression
           * @param {Transformation} the parent transformation
           * @return {Expression} this expression
           */

          Expression.prototype.setParent = function (parent) {
            this.parent = parent;
            return this;
          };

          /**
           * Add a expression
           * @function Expression#predicate
           * @internal
           */

          Expression.prototype.predicate = function (name, operator, value) {
            if (Expression.OPERATORS[operator] != null) {
              operator = Expression.OPERATORS[operator];
            }
            this.expressions.push(name + "_" + operator + "_" + value);
            return this;
          };

          /**
           * @function Expression#and
           */

          Expression.prototype.and = function () {
            this.expressions.push("and");
            return this;
          };

          /**
           * @function Expression#or
           */

          Expression.prototype.or = function () {
            this.expressions.push("or");
            return this;
          };

          /**
           * Conclude expression
           * @function Expression#then
           * @return {Transformation} the transformation this expression is defined for
           */

          Expression.prototype.then = function () {
            return this.getParent()["if"](this.toString());
          };

          /**
           * @function Expression#height
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Expression} this expression
           */

          Expression.prototype.height = function (operator, value) {
            return this.predicate("h", operator, value);
          };

          /**
           * @function Expression#width
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Expression} this expression
           */

          Expression.prototype.width = function (operator, value) {
            return this.predicate("w", operator, value);
          };

          /**
           * @function Expression#aspectRatio
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Expression} this expression
           */

          Expression.prototype.aspectRatio = function (operator, value) {
            return this.predicate("ar", operator, value);
          };

          /**
           * @function Expression#pages
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Expression} this expression
           */

          Expression.prototype.pageCount = function (operator, value) {
            return this.predicate("pc", operator, value);
          };

          /**
           * @function Expression#faces
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Expression} this expression
           */

          Expression.prototype.faceCount = function (operator, value) {
            return this.predicate("fc", operator, value);
          };

          Expression.prototype.value = function (value) {
            this.expressions.push(value);
            return this;
          };

          /**
           */

          Expression.variable = function (name, value) {
            return new this(name).value(value);
          };

          /**
            * @returns a new expression with the predefined variable "width"
            * @function Expression.width
           */

          Expression.width = function () {
            return new this("width");
          };

          /**
            * @returns a new expression with the predefined variable "height"
            * @function Expression.height
           */

          Expression.height = function () {
            return new this("height");
          };

          /**
            * @returns a new expression with the predefined variable "initialWidth"
            * @function Expression.initialWidth
           */

          Expression.initialWidth = function () {
            return new this("initialWidth");
          };

          /**
            * @returns a new expression with the predefined variable "initialHeight"
            * @function Expression.initialHeight
           */

          Expression.initialHeight = function () {
            return new this("initialHeight");
          };

          /**
            * @returns a new expression with the predefined variable "aspectRatio"
            * @function Expression.aspectRatio
           */

          Expression.aspectRatio = function () {
            return new this("aspectRatio");
          };

          /**
            * @returns a new expression with the predefined variable "initialAspectRatio"
            * @function Expression.initialAspectRatio
           */

          Expression.initialAspectRatio = function () {
            return new this("initialAspectRatio");
          };

          /**
            * @returns a new expression with the predefined variable "pageCount"
            * @function Expression.pageCount
           */

          Expression.pageCount = function () {
            return new this("pageCount");
          };

          /**
            * @returns a new expression with the predefined variable "faceCount"
            * @function Expression.faceCount
           */

          faceCount = function faceCount() {
            return new this("faceCount");
          };

          /**
            * @returns a new expression with the predefined variable "currentPage"
            * @function Expression.currentPage
           */

          Expression.currentPage = function () {
            return new this("currentPage");
          };

          /**
            * @returns a new expression with the predefined variable "tags"
            * @function Expression.tags
           */

          Expression.tags = function () {
            return new this("tags");
          };

          /**
            * @returns a new expression with the predefined variable "pageX"
            * @function Expression.pageX
           */

          Expression.pageX = function () {
            return new this("pageX");
          };

          /**
            * @returns a new expression with the predefined variable "pageY"
            * @function Expression.pageY
           */

          Expression.pageY = function () {
            return new this("pageY");
          };

          return Expression;
        }();
        Condition = function (superClass) {
          extend(Condition, superClass);

          /**
           * Represents a transformation condition
           * @param {string} conditionStr - a condition in string format
           * @class Condition
           * @example
           * // normally this class is not instantiated directly
           * var tr = cloudinary.Transformation.new()
           *    .if().width( ">", 1000).and().aspectRatio("<", "3:4").then()
           *      .width(1000)
           *      .crop("scale")
           *    .else()
           *      .width(500)
           *      .crop("scale")
           *
           * var tr = cloudinary.Transformation.new()
           *    .if("w > 1000 and aspectRatio < 3:4")
           *      .width(1000)
           *      .crop("scale")
           *    .else()
           *      .width(500)
           *      .crop("scale")
           *
           */

          function Condition(conditionStr) {
            Condition.__super__.constructor.call(this, conditionStr);
          }

          /**
           * @function Condition#height
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Condition} this condition
           */

          Condition.prototype.height = function (operator, value) {
            return this.predicate("h", operator, value);
          };

          /**
           * @function Condition#width
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Condition} this condition
           */

          Condition.prototype.width = function (operator, value) {
            return this.predicate("w", operator, value);
          };

          /**
           * @function Condition#aspectRatio
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Condition} this condition
           */

          Condition.prototype.aspectRatio = function (operator, value) {
            return this.predicate("ar", operator, value);
          };

          /**
           * @function Condition#pages
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Condition} this condition
           */

          Condition.prototype.pageCount = function (operator, value) {
            return this.predicate("pc", operator, value);
          };

          /**
           * @function Condition#faces
           * @param {string} operator the comparison operator (e.g. "<", "lt")
           * @param {string|number} value the right hand side value
           * @return {Condition} this condition
           */

          Condition.prototype.faceCount = function (operator, value) {
            return this.predicate("fc", operator, value);
          };

          return Condition;
        }(Expression);

        /**
         * Cloudinary configuration class
         * Depends on 'utils'
         */
        Configuration = function () {

          /**
           * Defaults configuration.
           */
          var DEFAULT_CONFIGURATION_PARAMS, ref;

          DEFAULT_CONFIGURATION_PARAMS = {
            responsive_class: 'cld-responsive',
            responsive_use_breakpoints: true,
            round_dpr: true,
            secure: (typeof window !== "undefined" && window !== null ? (ref = window.location) != null ? ref.protocol : void 0 : void 0) === 'https:'
          };

          Configuration.CONFIG_PARAMS = ["api_key", "api_secret", "callback", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive", "responsive_class", "responsive_use_breakpoints", "responsive_width", "round_dpr", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "upload_preset", "url_suffix", "use_root_path", "version"];

          /**
           * Cloudinary configuration class
           * @constructor Configuration
           * @param {Object} options - configuration parameters
           */

          function Configuration(options) {
            if (options == null) {
              options = {};
            }
            this.configuration = Util.cloneDeep(options);
            Util.defaults(this.configuration, DEFAULT_CONFIGURATION_PARAMS);
          }

          /**
           * Initialize the configuration.
           * The function first tries to retrieve the configuration form the environment and then from the document.
           * @function Configuration#init
           * @return {Configuration} returns this for chaining
           * @see fromDocument
           * @see fromEnvironment
           */

          Configuration.prototype.init = function () {
            this.fromEnvironment();
            this.fromDocument();
            return this;
          };

          /**
           * Set a new configuration item
           * @function Configuration#set
           * @param {string} name - the name of the item to set
           * @param {*} value - the value to be set
           * @return {Configuration}
           *
           */

          Configuration.prototype.set = function (name, value) {
            this.configuration[name] = value;
            return this;
          };

          /**
           * Get the value of a configuration item
           * @function Configuration#get
           * @param {string} name - the name of the item to set
           * @return {*} the configuration item
           */

          Configuration.prototype.get = function (name) {
            return this.configuration[name];
          };

          Configuration.prototype.merge = function (config) {
            if (config == null) {
              config = {};
            }
            Util.assign(this.configuration, Util.cloneDeep(config));
            return this;
          };

          /**
           * Initialize Cloudinary from HTML meta tags.
           * @function Configuration#fromDocument
           * @return {Configuration}
           * @example <meta name="cloudinary_cloud_name" content="mycloud">
           *
           */

          Configuration.prototype.fromDocument = function () {
            var el, j, len, meta_elements;
            meta_elements = typeof document !== "undefined" && document !== null ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0;
            if (meta_elements) {
              for (j = 0, len = meta_elements.length; j < len; j++) {
                el = meta_elements[j];
                this.configuration[el.getAttribute('name').replace('cloudinary_', '')] = el.getAttribute('content');
              }
            }
            return this;
          };

          /**
           * Initialize Cloudinary from the `CLOUDINARY_URL` environment variable.
           *
           * This function will only run under Node.js environment.
           * @function Configuration#fromEnvironment
           * @requires Node.js
           */

          Configuration.prototype.fromEnvironment = function () {
            var cloudinary_url, j, k, len, query, ref1, ref2, ref3, uri, uriRegex, v, value;
            cloudinary_url = typeof process !== "undefined" && process !== null ? (ref1 = process.env) != null ? ref1.CLOUDINARY_URL : void 0 : void 0;
            if (cloudinary_url != null) {
              uriRegex = /cloudinary:\/\/(?:(\w+)(?:\:([\w-]+))?@)?([\w\.-]+)(?:\/([^?]*))?(?:\?(.+))?/;
              uri = uriRegex.exec(cloudinary_url);
              if (uri) {
                if (uri[3] != null) {
                  this.configuration['cloud_name'] = uri[3];
                }
                if (uri[1] != null) {
                  this.configuration['api_key'] = uri[1];
                }
                if (uri[2] != null) {
                  this.configuration['api_secret'] = uri[2];
                }
                if (uri[4] != null) {
                  this.configuration['private_cdn'] = uri[4] != null;
                }
                if (uri[4] != null) {
                  this.configuration['secure_distribution'] = uri[4];
                }
                query = uri[5];
                if (query != null) {
                  ref2 = query.split('&');
                  for (j = 0, len = ref2.length; j < len; j++) {
                    value = ref2[j];
                    ref3 = value.split('='), k = ref3[0], v = ref3[1];
                    if (v == null) {
                      v = true;
                    }
                    this.configuration[k] = v;
                  }
                }
              }
            }
            return this;
          };

          /**
           * Create or modify the Cloudinary client configuration
           *
           * Warning: `config()` returns the actual internal configuration object. modifying it will change the configuration.
           *
           * This is a backward compatibility method. For new code, use get(), merge() etc.
           * @function Configuration#config
           * @param {hash|string|boolean} new_config
           * @param {string} new_value
           * @returns {*} configuration, or value
           *
           * @see {@link fromEnvironment} for initialization using environment variables
           * @see {@link fromDocument} for initialization using HTML meta tags
           */

          Configuration.prototype.config = function (new_config, new_value) {
            switch (false) {
              case new_value === void 0:
                this.set(new_config, new_value);
                return this.configuration;
              case !Util.isString(new_config):
                return this.get(new_config);
              case !Util.isPlainObject(new_config):
                this.merge(new_config);
                return this.configuration;
              default:
                return this.configuration;
            }
          };

          /**
           * Returns a copy of the configuration parameters
           * @function Configuration#toOptions
           * @returns {Object} a key:value collection of the configuration parameters
           */

          Configuration.prototype.toOptions = function () {
            return Util.cloneDeep(this.configuration);
          };

          return Configuration;
        }();

        /**
         * TransformationBase
         * Depends on 'configuration', 'parameters','util'
         * @internal
         */
        TransformationBase = function () {
          var VAR_NAME_RE, lastArgCallback, processVar;

          VAR_NAME_RE = /^\$[a-zA-Z0-9]+$/;

          TransformationBase.prototype.trans_separator = '/';

          TransformationBase.prototype.param_separator = ',';

          lastArgCallback = function lastArgCallback(args) {
            var callback;
            callback = args != null ? args[args.length - 1] : void 0;
            if (Util.isFunction(callback)) {
              return callback;
            } else {
              return void 0;
            }
          };

          /**
           * The base class for transformations.
           * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
           * @class TransformationBase
           */

          function TransformationBase(options) {
            var parent, trans;
            if (options == null) {
              options = {};
            }

            /** @private */
            parent = void 0;

            /** @private */
            trans = {};

            /**
             * Return an options object that can be used to create an identical Transformation
             * @function Transformation#toOptions
             * @return {Object} Returns a plain object representing this transformation
             */
            this.toOptions || (this.toOptions = function (withChain) {
              var key, list, opt, ref, ref1, tr, value;
              if (withChain == null) {
                withChain = true;
              }
              opt = {};
              for (key in trans) {
                value = trans[key];
                opt[key] = value.origValue;
              }
              ref = this.otherOptions;
              for (key in ref) {
                value = ref[key];
                if (value !== void 0) {
                  opt[key] = value;
                }
              }
              if (withChain && !Util.isEmpty(this.chained)) {
                list = function () {
                  var j, len, ref1, results;
                  ref1 = this.chained;
                  results = [];
                  for (j = 0, len = ref1.length; j < len; j++) {
                    tr = ref1[j];
                    results.push(tr.toOptions());
                  }
                  return results;
                }.call(this);
                list.push(opt);
                opt = {};
                ref1 = this.otherOptions;
                for (key in ref1) {
                  value = ref1[key];
                  if (value !== void 0) {
                    opt[key] = value;
                  }
                }
                opt.transformation = list;
              }
              return opt;
            });

            /**
             * Set a parent for this object for chaining purposes.
             *
             * @function Transformation#setParent
             * @param {Object} object - the parent to be assigned to
             * @returns {Transformation} Returns this instance for chaining purposes.
             */
            this.setParent || (this.setParent = function (object) {
              parent = object;
              if (object != null) {
                this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
              }
              return this;
            });

            /**
             * Returns the parent of this object in the chain
             * @function Transformation#getParent
             * @protected
             * @return {Object} Returns the parent of this object if there is any
             */
            this.getParent || (this.getParent = function () {
              return parent;
            });

            /** @protected */
            this.param || (this.param = function (value, name, abbr, defaultValue, process) {
              if (process == null) {
                if (Util.isFunction(defaultValue)) {
                  process = defaultValue;
                } else {
                  process = Util.identity;
                }
              }
              trans[name] = new Param(name, abbr, process).set(value);
              return this;
            });

            /** @protected */
            this.rawParam || (this.rawParam = function (value, name, abbr, defaultValue, process) {
              if (process == null) {
                process = Util.identity;
              }
              process = lastArgCallback(arguments);
              trans[name] = new RawParam(name, abbr, process).set(value);
              return this;
            });

            /** @protected */
            this.rangeParam || (this.rangeParam = function (value, name, abbr, defaultValue, process) {
              if (process == null) {
                process = Util.identity;
              }
              process = lastArgCallback(arguments);
              trans[name] = new RangeParam(name, abbr, process).set(value);
              return this;
            });

            /** @protected */
            this.arrayParam || (this.arrayParam = function (value, name, abbr, sep, defaultValue, process) {
              if (sep == null) {
                sep = ":";
              }
              if (defaultValue == null) {
                defaultValue = [];
              }
              if (process == null) {
                process = Util.identity;
              }
              process = lastArgCallback(arguments);
              trans[name] = new ArrayParam(name, abbr, sep, process).set(value);
              return this;
            });

            /** @protected */
            this.transformationParam || (this.transformationParam = function (value, name, abbr, sep, defaultValue, process) {
              if (sep == null) {
                sep = ".";
              }
              if (process == null) {
                process = Util.identity;
              }
              process = lastArgCallback(arguments);
              trans[name] = new TransformationParam(name, abbr, sep, process).set(value);
              return this;
            });
            this.layerParam || (this.layerParam = function (value, name, abbr) {
              trans[name] = new LayerParam(name, abbr).set(value);
              return this;
            });

            /**
             * Get the value associated with the given name.
             * @function Transformation#getValue
             * @param {string} name - the name of the parameter
             * @return {*} the processed value associated with the given name
             * @description Use {@link get}.origValue for the value originally provided for the parameter
             */
            this.getValue || (this.getValue = function (name) {
              var ref, ref1;
              return (ref = (ref1 = trans[name]) != null ? ref1.value() : void 0) != null ? ref : this.otherOptions[name];
            });

            /**
             * Get the parameter object for the given parameter name
             * @function Transformation#get
             * @param {string} name the name of the transformation parameter
             * @returns {Param} the param object for the given name, or undefined
             */
            this.get || (this.get = function (name) {
              return trans[name];
            });

            /**
             * Remove a transformation option from the transformation.
             * @function Transformation#remove
             * @param {string} name - the name of the option to remove
             * @return {*} Returns the option that was removed or null if no option by that name was found. The type of the
             *              returned value depends on the value.
             */
            this.remove || (this.remove = function (name) {
              var temp;
              switch (false) {
                case trans[name] == null:
                  temp = trans[name];
                  delete trans[name];
                  return temp.origValue;
                case this.otherOptions[name] == null:
                  temp = this.otherOptions[name];
                  delete this.otherOptions[name];
                  return temp;
                default:
                  return null;
              }
            });

            /**
             * Return an array of all the keys (option names) in the transformation.
             * @return {Array<string>} the keys in snakeCase format
             */
            this.keys || (this.keys = function () {
              var key;
              return function () {
                var results;
                results = [];
                for (key in trans) {
                  if (key != null) {
                    results.push(key.match(VAR_NAME_RE) ? key : Util.snakeCase(key));
                  }
                }
                return results;
              }().sort();
            });

            /**
             * Returns a plain object representation of the transformation. Values are processed.
             * @function Transformation#toPlainObject
             * @return {Object} the transformation options as plain object
             */
            this.toPlainObject || (this.toPlainObject = function () {
              var hash, key, list, tr;
              hash = {};
              for (key in trans) {
                hash[key] = trans[key].value();
                if (Util.isPlainObject(hash[key])) {
                  hash[key] = Util.cloneDeep(hash[key]);
                }
              }
              if (!Util.isEmpty(this.chained)) {
                list = function () {
                  var j, len, ref, results;
                  ref = this.chained;
                  results = [];
                  for (j = 0, len = ref.length; j < len; j++) {
                    tr = ref[j];
                    results.push(tr.toPlainObject());
                  }
                  return results;
                }.call(this);
                list.push(hash);
                hash = {
                  transformation: list
                };
              }
              return hash;
            });

            /**
             * Complete the current transformation and chain to a new one.
             * In the URL, transformations are chained together by slashes.
             * @function Transformation#chain
             * @return {Transformation} Returns this transformation for chaining
             * @example
             * var tr = cloudinary.Transformation.new();
             * tr.width(10).crop('fit').chain().angle(15).serialize()
             * // produces "c_fit,w_10/a_15"
             */
            this.chain || (this.chain = function () {
              var names, tr;
              names = Object.getOwnPropertyNames(trans);
              if (names.length !== 0) {
                tr = new this.constructor(this.toOptions(false));
                this.resetTransformations();
                this.chained.push(tr);
              }
              return this;
            });
            this.resetTransformations || (this.resetTransformations = function () {
              trans = {};
              return this;
            });
            this.otherOptions || (this.otherOptions = {});
            this.chained = [];
            if (!Util.isEmpty(options)) {
              this.fromOptions(options);
            }
          }

          /**
           * Merge the provided options with own's options
           * @param {Object} [options={}] key-value list of options
           * @returns {Transformation} Returns this instance for chaining
           */

          TransformationBase.prototype.fromOptions = function (options) {
            var key, opt;
            if (options instanceof TransformationBase) {
              this.fromTransformation(options);
            } else {
              options || (options = {});
              if (Util.isString(options) || Util.isArray(options)) {
                options = {
                  transformation: options
                };
              }
              options = Util.cloneDeep(options, function (value) {
                if (value instanceof TransformationBase) {
                  return new value.constructor(value.toOptions());
                }
              });
              if (options["if"]) {
                this.set("if", options["if"]);
                delete options["if"];
              }
              for (key in options) {
                opt = options[key];
                if (key.match(VAR_NAME_RE)) {
                  if (key !== '$attr') {
                    this.set('variable', key, opt);
                  }
                } else {
                  this.set(key, opt);
                }
              }
            }
            return this;
          };

          TransformationBase.prototype.fromTransformation = function (other) {
            var j, key, len, ref;
            if (other instanceof TransformationBase) {
              ref = other.keys();
              for (j = 0, len = ref.length; j < len; j++) {
                key = ref[j];
                this.set(key, other.get(key).origValue);
              }
            }
            return this;
          };

          /**
           * Set a parameter.
           * The parameter name `key` is converted to
           * @param {string} key - the name of the parameter
           * @param {*} value - the value of the parameter
           * @returns {Transformation} Returns this instance for chaining
           */

          TransformationBase.prototype.set = function () {
            var camelKey, key, values;
            key = arguments[0], values = 2 <= arguments.length ? slice.call(arguments, 1) : [];
            camelKey = Util.camelCase(key);
            if (Util.contains(Transformation.methods, camelKey)) {
              this[camelKey].apply(this, values);
            } else {
              this.otherOptions[key] = values[0];
            }
            return this;
          };

          TransformationBase.prototype.hasLayer = function () {
            return this.getValue("overlay") || this.getValue("underlay");
          };

          /**
           * Generate a string representation of the transformation.
           * @function Transformation#serialize
           * @return {string} Returns the transformation as a string
           */

          TransformationBase.prototype.serialize = function () {
            var ifParam, j, len, paramList, ref, ref1, ref2, ref3, ref4, resultArray, t, tr, transformationList, transformationString, transformations, value, variables, vars;
            resultArray = function () {
              var j, len, ref, results;
              ref = this.chained;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                tr = ref[j];
                results.push(tr.serialize());
              }
              return results;
            }.call(this);
            paramList = this.keys();
            transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
            ifParam = (ref1 = this.get("if")) != null ? ref1.serialize() : void 0;
            variables = processVar((ref2 = this.get("variables")) != null ? ref2.value() : void 0);
            paramList = Util.difference(paramList, ["transformation", "if", "variables"]);
            vars = [];
            transformationList = [];
            for (j = 0, len = paramList.length; j < len; j++) {
              t = paramList[j];
              if (t.match(VAR_NAME_RE)) {
                vars.push(t + "_" + Expression.normalize((ref3 = this.get(t)) != null ? ref3.value() : void 0));
              } else {
                transformationList.push((ref4 = this.get(t)) != null ? ref4.serialize() : void 0);
              }
            }
            switch (false) {
              case !Util.isString(transformations):
                transformationList.push(transformations);
                break;
              case !Util.isArray(transformations):
                resultArray = resultArray.concat(transformations);
            }
            transformationList = function () {
              var l, len1, results;
              results = [];
              for (l = 0, len1 = transformationList.length; l < len1; l++) {
                value = transformationList[l];
                if (Util.isArray(value) && !Util.isEmpty(value) || !Util.isArray(value) && value) {
                  results.push(value);
                }
              }
              return results;
            }();
            transformationList = vars.sort().concat(variables).concat(transformationList.sort());
            if (ifParam === "if_end") {
              transformationList.push(ifParam);
            } else if (!Util.isEmpty(ifParam)) {
              transformationList.unshift(ifParam);
            }
            transformationString = Util.compact(transformationList).join(this.param_separator);
            if (!Util.isEmpty(transformationString)) {
              resultArray.push(transformationString);
            }
            return Util.compact(resultArray).join(this.trans_separator);
          };

          /**
           * Provide a list of all the valid transformation option names
           * @function Transformation#listNames
           * @private
           * @return {Array<string>} a array of all the valid option names
           */

          TransformationBase.prototype.listNames = function () {
            return Transformation.methods;
          };

          /**
           * Returns attributes for an HTML tag.
           * @function Cloudinary.toHtmlAttributes
           * @return PlainObject
           */

          TransformationBase.prototype.toHtmlAttributes = function () {
            var attrName, height, j, key, len, options, ref, ref1, ref2, ref3, value;
            options = {};
            ref = this.otherOptions;
            for (key in ref) {
              value = ref[key];
              if (!!Util.contains(Transformation.PARAM_NAMES, Util.snakeCase(key))) {
                continue;
              }
              attrName = /^html_/.test(key) ? key.slice(5) : key;
              options[attrName] = value;
            }
            ref1 = this.keys();
            for (j = 0, len = ref1.length; j < len; j++) {
              key = ref1[j];
              if (/^html_/.test(key)) {
                options[Util.camelCase(key.slice(5))] = this.getValue(key);
              }
            }
            if (!(this.hasLayer() || this.getValue("angle") || Util.contains(["fit", "limit", "lfill"], this.getValue("crop")))) {
              width = (ref2 = this.get("width")) != null ? ref2.origValue : void 0;
              height = (ref3 = this.get("height")) != null ? ref3.origValue : void 0;
              if (parseFloat(width) >= 1.0) {
                if (options['width'] == null) {
                  options['width'] = width;
                }
              }
              if (parseFloat(height) >= 1.0) {
                if (options['height'] == null) {
                  options['height'] = height;
                }
              }
            }
            return options;
          };

          TransformationBase.prototype.isValidParamName = function (name) {
            return Transformation.methods.indexOf(Util.camelCase(name)) >= 0;
          };

          /**
           * Delegate to the parent (up the call chain) to produce HTML
           * @function Transformation#toHtml
           * @return {string} HTML representation of the parent if possible.
           * @example
           * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
           * // ImageTag {name: "img", publicId: "sample"}
           * tag.toHtml()
           * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
           * tag.transformation().crop("fit").width(300).toHtml()
           * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
           */

          TransformationBase.prototype.toHtml = function () {
            var ref;
            return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
          };

          TransformationBase.prototype.toString = function () {
            return this.serialize();
          };

          processVar = function processVar(varArray) {
            var j, len, name, ref, results, v;
            if (Util.isArray(varArray)) {
              results = [];
              for (j = 0, len = varArray.length; j < len; j++) {
                ref = varArray[j], name = ref[0], v = ref[1];
                results.push(name + "_" + Expression.normalize(v));
              }
              return results;
            } else {
              return varArray;
            }

            /**
             * Transformation Class methods.
             * This is a list of the parameters defined in Transformation.
             * Values are camelCased.
             * @const Transformation.methods
             * @private
             * @ignore
             * @type {Array<string>}
             */

            /**
             * Parameters that are filtered out before passing the options to an HTML tag.
             *
             * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
             * @const {Array<string>} Transformation.PARAM_NAMES
             * @private
             * @ignore
             * @see toHtmlAttributes
             */
          };

          return TransformationBase;
        }();
        Transformation = function (superClass) {
          extend(Transformation, superClass);

          /**
           *  Represents a single transformation.
           *  @class Transformation
           *  @example
           *  t = new cloudinary.Transformation();
           * t.angle(20).crop("scale").width("auto");
           *
           * // or
           *
           * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
           */

          function Transformation(options) {
            if (options == null) {
              options = {};
            }
            Transformation.__super__.constructor.call(this, options);
            this;
          }

          /**
           * Convenience constructor
           * @param {Object} options
           * @return {Transformation}
           * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
           */

          Transformation["new"] = function (args) {
            return new Transformation(args);
          };

          /*
            Transformation Parameters
           */

          Transformation.prototype.angle = function (value) {
            return this.arrayParam(value, "angle", "a", ".", Expression.normalize);
          };

          Transformation.prototype.audioCodec = function (value) {
            return this.param(value, "audio_codec", "ac");
          };

          Transformation.prototype.audioFrequency = function (value) {
            return this.param(value, "audio_frequency", "af");
          };

          Transformation.prototype.aspectRatio = function (value) {
            return this.param(value, "aspect_ratio", "ar", Expression.normalize);
          };

          Transformation.prototype.background = function (value) {
            return this.param(value, "background", "b", Param.norm_color);
          };

          Transformation.prototype.bitRate = function (value) {
            return this.param(value, "bit_rate", "br");
          };

          Transformation.prototype.border = function (value) {
            return this.param(value, "border", "bo", function (border) {
              if (Util.isPlainObject(border)) {
                border = Util.assign({}, {
                  color: "black",
                  width: 2
                }, border);
                return border.width + "px_solid_" + Param.norm_color(border.color);
              } else {
                return border;
              }
            });
          };

          Transformation.prototype.color = function (value) {
            return this.param(value, "color", "co", Param.norm_color);
          };

          Transformation.prototype.colorSpace = function (value) {
            return this.param(value, "color_space", "cs");
          };

          Transformation.prototype.crop = function (value) {
            return this.param(value, "crop", "c");
          };

          Transformation.prototype.defaultImage = function (value) {
            return this.param(value, "default_image", "d");
          };

          Transformation.prototype.delay = function (value) {
            return this.param(value, "delay", "dl");
          };

          Transformation.prototype.density = function (value) {
            return this.param(value, "density", "dn");
          };

          Transformation.prototype.duration = function (value) {
            return this.rangeParam(value, "duration", "du");
          };

          Transformation.prototype.dpr = function (value) {
            return this.param(value, "dpr", "dpr", function (_this) {
              return function (dpr) {
                dpr = dpr.toString();
                if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
                  return dpr + ".0";
                } else {
                  return Expression.normalize(dpr);
                }
              };
            }(this));
          };

          Transformation.prototype.effect = function (value) {
            return this.arrayParam(value, "effect", "e", ":", Expression.normalize);
          };

          Transformation.prototype["else"] = function () {
            return this["if"]('else');
          };

          Transformation.prototype.endIf = function () {
            return this["if"]('end');
          };

          Transformation.prototype.endOffset = function (value) {
            return this.rangeParam(value, "end_offset", "eo");
          };

          Transformation.prototype.fallbackContent = function (value) {
            return this.param(value, "fallback_content");
          };

          Transformation.prototype.fetchFormat = function (value) {
            return this.param(value, "fetch_format", "f");
          };

          Transformation.prototype.format = function (value) {
            return this.param(value, "format");
          };

          Transformation.prototype.flags = function (value) {
            return this.arrayParam(value, "flags", "fl", ".");
          };

          Transformation.prototype.gravity = function (value) {
            return this.param(value, "gravity", "g");
          };

          Transformation.prototype.height = function (value) {
            return this.param(value, "height", "h", function (_this) {
              return function () {
                if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
                  return Expression.normalize(value);
                } else {
                  return null;
                }
              };
            }(this));
          };

          Transformation.prototype.htmlHeight = function (value) {
            return this.param(value, "html_height");
          };

          Transformation.prototype.htmlWidth = function (value) {
            return this.param(value, "html_width");
          };

          Transformation.prototype["if"] = function (value) {
            var i, ifVal, j, ref, trIf, trRest;
            if (value == null) {
              value = "";
            }
            switch (value) {
              case "else":
                this.chain();
                return this.param(value, "if", "if");
              case "end":
                this.chain();
                for (i = j = ref = this.chained.length - 1; j >= 0; i = j += -1) {
                  ifVal = this.chained[i].getValue("if");
                  if (ifVal === "end") {
                    break;
                  } else if (ifVal != null) {
                    trIf = Transformation["new"]()["if"](ifVal);
                    this.chained[i].remove("if");
                    trRest = this.chained[i];
                    this.chained[i] = Transformation["new"]().transformation([trIf, trRest]);
                    if (ifVal !== "else") {
                      break;
                    }
                  }
                }
                return this.param(value, "if", "if");
              case "":
                return Condition["new"]().setParent(this);
              default:
                return this.param(value, "if", "if", function (value) {
                  return Condition["new"](value).toString();
                });
            }
          };

          Transformation.prototype.keyframeInterval = function (value) {
            return this.param(value, "keyframe_interval", "ki");
          };

          Transformation.prototype.offset = function (value) {
            var end_o, ref, start_o;
            ref = Util.isFunction(value != null ? value.split : void 0) ? value.split('..') : Util.isArray(value) ? value : [null, null], start_o = ref[0], end_o = ref[1];
            if (start_o != null) {
              this.startOffset(start_o);
            }
            if (end_o != null) {
              return this.endOffset(end_o);
            }
          };

          Transformation.prototype.opacity = function (value) {
            return this.param(value, "opacity", "o", Expression.normalize);
          };

          Transformation.prototype.overlay = function (value) {
            return this.layerParam(value, "overlay", "l");
          };

          Transformation.prototype.page = function (value) {
            return this.param(value, "page", "pg");
          };

          Transformation.prototype.poster = function (value) {
            return this.param(value, "poster");
          };

          Transformation.prototype.prefix = function (value) {
            return this.param(value, "prefix", "p");
          };

          Transformation.prototype.quality = function (value) {
            return this.param(value, "quality", "q", Expression.normalize);
          };

          Transformation.prototype.radius = function (value) {
            return this.param(value, "radius", "r", Expression.normalize);
          };

          Transformation.prototype.rawTransformation = function (value) {
            return this.rawParam(value, "raw_transformation");
          };

          Transformation.prototype.size = function (value) {
            var height, ref;
            if (Util.isFunction(value != null ? value.split : void 0)) {
              ref = value.split('x'), width = ref[0], height = ref[1];
              this.width(width);
              return this.height(height);
            }
          };

          Transformation.prototype.sourceTypes = function (value) {
            return this.param(value, "source_types");
          };

          Transformation.prototype.sourceTransformation = function (value) {
            return this.param(value, "source_transformation");
          };

          Transformation.prototype.startOffset = function (value) {
            return this.rangeParam(value, "start_offset", "so");
          };

          Transformation.prototype.streamingProfile = function (value) {
            return this.param(value, "streaming_profile", "sp");
          };

          Transformation.prototype.transformation = function (value) {
            return this.transformationParam(value, "transformation", "t");
          };

          Transformation.prototype.underlay = function (value) {
            return this.layerParam(value, "underlay", "u");
          };

          Transformation.prototype.variable = function (name, value) {
            return this.param(value, name, name);
          };

          Transformation.prototype.variables = function (values) {
            return this.arrayParam(values, "variables");
          };

          Transformation.prototype.videoCodec = function (value) {
            return this.param(value, "video_codec", "vc", Param.process_video_params);
          };

          Transformation.prototype.videoSampling = function (value) {
            return this.param(value, "video_sampling", "vs");
          };

          Transformation.prototype.width = function (value) {
            return this.param(value, "width", "w", function (_this) {
              return function () {
                if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
                  return Expression.normalize(value);
                } else {
                  return null;
                }
              };
            }(this));
          };

          Transformation.prototype.x = function (value) {
            return this.param(value, "x", "x", Expression.normalize);
          };

          Transformation.prototype.y = function (value) {
            return this.param(value, "y", "y", Expression.normalize);
          };

          Transformation.prototype.zoom = function (value) {
            return this.param(value, "zoom", "z", Expression.normalize);
          };

          return Transformation;
        }(TransformationBase);

        /**
         * Transformation Class methods.
         * This is a list of the parameters defined in Transformation.
         * Values are camelCased.
         */
        Transformation.methods || (Transformation.methods = Util.difference(Util.functions(Transformation.prototype), Util.functions(TransformationBase.prototype)));

        /**
         * Parameters that are filtered out before passing the options to an HTML tag.
         *
         * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
         */
        Transformation.PARAM_NAMES || (Transformation.PARAM_NAMES = function () {
          var j, len, ref, results;
          ref = Transformation.methods;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            m = ref[j];
            results.push(Util.snakeCase(m));
          }
          return results;
        }().concat(Configuration.CONFIG_PARAMS));

        /**
         * Generic HTML tag
         * Depends on 'transformation', 'util'
         */
        HtmlTag = function () {

          /**
           * Represents an HTML (DOM) tag
           * @constructor HtmlTag
           * @param {string} name - the name of the tag
           * @param {string} [publicId]
           * @param {Object} options
           * @example tag = new HtmlTag( 'div', { 'width': 10})
           */
          var toAttribute;

          function HtmlTag(name, publicId, options) {
            var transformation;
            this.name = name;
            this.publicId = publicId;
            if (options == null) {
              if (Util.isPlainObject(publicId)) {
                options = publicId;
                this.publicId = void 0;
              } else {
                options = {};
              }
            }
            transformation = new Transformation(options);
            transformation.setParent(this);
            this.transformation = function () {
              return transformation;
            };
          }

          /**
           * Convenience constructor
           * Creates a new instance of an HTML (DOM) tag
           * @function HtmlTag.new
           * @param {string} name - the name of the tag
           * @param {string} [publicId]
           * @param {Object} options
           * @return {HtmlTag}
           * @example tag = HtmlTag.new( 'div', { 'width': 10})
           */

          HtmlTag["new"] = function (name, publicId, options) {
            return new this(name, publicId, options);
          };

          /**
           * Represent the given key and value as an HTML attribute.
           * @function HtmlTag#toAttribute
           * @protected
           * @param {string} key - attribute name
           * @param {*|boolean} value - the value of the attribute. If the value is boolean `true`, return the key only.
           * @returns {string} the attribute  
           *
           */

          toAttribute = function toAttribute(key, value) {
            if (!value) {
              return void 0;
            } else if (value === true) {
              return key;
            } else {
              return key + "=\"" + value + "\"";
            }
          };

          /**
           * combine key and value from the `attr` to generate an HTML tag attributes string.
           * `Transformation::toHtmlTagOptions` is used to filter out transformation and configuration keys.
           * @protected
           * @param {Object} attrs
           * @return {string} the attributes in the format `'key1="value1" key2="value2"'`
           * @ignore
           */

          HtmlTag.prototype.htmlAttrs = function (attrs) {
            var key, pairs, value;
            return pairs = function () {
              var results;
              results = [];
              for (key in attrs) {
                value = attrs[key];
                if (value) {
                  results.push(toAttribute(key, value));
                }
              }
              return results;
            }().sort().join(' ');
          };

          /**
           * Get all options related to this tag.
           * @function HtmlTag#getOptions
           * @returns {Object} the options
           *
           */

          HtmlTag.prototype.getOptions = function () {
            return this.transformation().toOptions();
          };

          /**
           * Get the value of option `name`
           * @function HtmlTag#getOption
           * @param {string} name - the name of the option
           * @returns {*} Returns the value of the option
           *
           */

          HtmlTag.prototype.getOption = function (name) {
            return this.transformation().getValue(name);
          };

          /**
           * Get the attributes of the tag.
           * @function HtmlTag#attributes
           * @returns {Object} attributes
           */

          HtmlTag.prototype.attributes = function () {
            return this.transformation().toHtmlAttributes();
          };

          /**
           * Set a tag attribute named `name` to `value`
           * @function HtmlTag#setAttr
           * @param {string} name - the name of the attribute
           * @param {string} value - the value of the attribute
           */

          HtmlTag.prototype.setAttr = function (name, value) {
            this.transformation().set("html_" + name, value);
            return this;
          };

          /**
           * Get the value of the tag attribute `name`
           * @function HtmlTag#getAttr
           * @param {string} name - the name of the attribute
           * @returns {*}
           */

          HtmlTag.prototype.getAttr = function (name) {
            return this.attributes()["html_" + name] || this.attributes()[name];
          };

          /**
           * Remove the tag attributed named `name`
           * @function HtmlTag#removeAttr
           * @param {string} name - the name of the attribute
           * @returns {*}
           */

          HtmlTag.prototype.removeAttr = function (name) {
            var ref;
            return (ref = this.transformation().remove("html_" + name)) != null ? ref : this.transformation().remove(name);
          };

          /**
           * @function HtmlTag#content
           * @protected
           * @ignore
           */

          HtmlTag.prototype.content = function () {
            return "";
          };

          /**
           * @function HtmlTag#openTag
           * @protected
           * @ignore
           */

          HtmlTag.prototype.openTag = function () {
            return "<" + this.name + " " + this.htmlAttrs(this.attributes()) + ">";
          };

          /**
           * @function HtmlTag#closeTag
           * @protected
           * @ignore
           */

          HtmlTag.prototype.closeTag = function () {
            return "</" + this.name + ">";
          };

          /**
           * Generates an HTML representation of the tag.
           * @function HtmlTag#toHtml
           * @returns {string} Returns HTML in string format
           */

          HtmlTag.prototype.toHtml = function () {
            return this.openTag() + this.content() + this.closeTag();
          };

          /**
           * Creates a DOM object representing the tag.
           * @function HtmlTag#toDOM
           * @returns {Element}
           */

          HtmlTag.prototype.toDOM = function () {
            var element, name, ref, value;
            if (!Util.isFunction(typeof document !== "undefined" && document !== null ? document.createElement : void 0)) {
              throw "Can't create DOM if document is not present!";
            }
            element = document.createElement(this.name);
            ref = this.attributes();
            for (name in ref) {
              value = ref[name];
              element[name] = value;
            }
            return element;
          };

          HtmlTag.isResponsive = function (tag, responsiveClass) {
            var dataSrc;
            dataSrc = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
            return Util.hasClass(tag, responsiveClass) && /\bw_auto\b/.exec(dataSrc);
          };

          return HtmlTag;
        }();

        /**
         * Image Tag
         * Depends on 'tags/htmltag', 'cloudinary'
         */
        ImageTag = function (superClass) {
          extend(ImageTag, superClass);

          /**
           * Creates an HTML (DOM) Image tag using Cloudinary as the source.
           * @constructor ImageTag
           * @extends HtmlTag
           * @param {string} [publicId]
           * @param {Object} [options]
           */

          function ImageTag(publicId, options) {
            if (options == null) {
              options = {};
            }
            ImageTag.__super__.constructor.call(this, "img", publicId, options);
          }

          /** @override */

          ImageTag.prototype.closeTag = function () {
            return "";
          };

          /** @override */

          ImageTag.prototype.attributes = function () {
            var attr, options, srcAttribute;
            attr = ImageTag.__super__.attributes.call(this) || [];
            options = this.getOptions();
            srcAttribute = options.responsive && !options.client_hints ? 'data-src' : 'src';
            if (attr[srcAttribute] == null) {
              attr[srcAttribute] = new Cloudinary(this.getOptions()).url(this.publicId);
            }
            return attr;
          };

          return ImageTag;
        }(HtmlTag);

        /**
         * Video Tag
         * Depends on 'tags/htmltag', 'util', 'cloudinary'
         */
        VideoTag = function (superClass) {
          var DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, VIDEO_TAG_PARAMS;

          extend(VideoTag, superClass);

          VIDEO_TAG_PARAMS = ['source_types', 'source_transformation', 'fallback_content', 'poster'];

          DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];

          DEFAULT_POSTER_OPTIONS = {
            format: 'jpg',
            resource_type: 'video'
          };

          /**
           * Creates an HTML (DOM) Video tag using Cloudinary as the source.
           * @constructor VideoTag
           * @extends HtmlTag
           * @param {string} [publicId]
           * @param {Object} [options]
           */

          function VideoTag(publicId, options) {
            if (options == null) {
              options = {};
            }
            options = Util.defaults({}, options, Cloudinary.DEFAULT_VIDEO_PARAMS);
            VideoTag.__super__.constructor.call(this, "video", publicId.replace(/\.(mp4|ogv|webm)$/, ''), options);
          }

          /**
           * Set the transformation to apply on each source
           * @function VideoTag#setSourceTransformation
           * @param {Object} an object with pairs of source type and source transformation
           * @returns {VideoTag} Returns this instance for chaining purposes.
           */

          VideoTag.prototype.setSourceTransformation = function (value) {
            this.transformation().sourceTransformation(value);
            return this;
          };

          /**
           * Set the source types to include in the video tag
           * @function VideoTag#setSourceTypes
           * @param {Array<string>} an array of source types
           * @returns {VideoTag} Returns this instance for chaining purposes.
           */

          VideoTag.prototype.setSourceTypes = function (value) {
            this.transformation().sourceTypes(value);
            return this;
          };

          /**
           * Set the poster to be used in the video tag
           * @function VideoTag#setPoster
           * @param {string|Object} value
           * - string: a URL to use for the poster
           * - Object: transformation parameters to apply to the poster. May optionally include a public_id to use instead of the video public_id.
           * @returns {VideoTag} Returns this instance for chaining purposes.
           */

          VideoTag.prototype.setPoster = function (value) {
            this.transformation().poster(value);
            return this;
          };

          /**
           * Set the content to use as fallback in the video tag
           * @function VideoTag#setFallbackContent
           * @param {string} value - the content to use, in HTML format
           * @returns {VideoTag} Returns this instance for chaining purposes.
           */

          VideoTag.prototype.setFallbackContent = function (value) {
            this.transformation().fallbackContent(value);
            return this;
          };

          VideoTag.prototype.content = function () {
            var cld, fallback, innerTags, mimeType, sourceTransformation, sourceTypes, src, srcType, transformation, videoType;
            sourceTypes = this.transformation().getValue('source_types');
            sourceTransformation = this.transformation().getValue('source_transformation');
            fallback = this.transformation().getValue('fallback_content');
            if (Util.isArray(sourceTypes)) {
              cld = new Cloudinary(this.getOptions());
              innerTags = function () {
                var j, len, results;
                results = [];
                for (j = 0, len = sourceTypes.length; j < len; j++) {
                  srcType = sourceTypes[j];
                  transformation = sourceTransformation[srcType] || {};
                  src = cld.url("" + this.publicId, Util.defaults({}, transformation, {
                    resource_type: 'video',
                    format: srcType
                  }));
                  videoType = srcType === 'ogv' ? 'ogg' : srcType;
                  mimeType = 'video/' + videoType;
                  results.push("<source " + this.htmlAttrs({
                    src: src,
                    type: mimeType
                  }) + ">");
                }
                return results;
              }.call(this);
            } else {
              innerTags = [];
            }
            return innerTags.join('') + fallback;
          };

          VideoTag.prototype.attributes = function () {
            var a, attr, j, len, poster, ref, ref1, sourceTypes;
            sourceTypes = this.getOption('source_types');
            poster = (ref = this.getOption('poster')) != null ? ref : {};
            if (Util.isPlainObject(poster)) {
              defaults = poster.public_id != null ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS;
              poster = new Cloudinary(this.getOptions()).url((ref1 = poster.public_id) != null ? ref1 : this.publicId, Util.defaults({}, poster, defaults));
            }
            attr = VideoTag.__super__.attributes.call(this) || [];
            for (j = 0, len = attr.length; j < len; j++) {
              a = attr[j];
              if (!Util.contains(VIDEO_TAG_PARAMS)) {
                attr = a;
              }
            }
            if (!Util.isArray(sourceTypes)) {
              attr["src"] = new Cloudinary(this.getOptions()).url(this.publicId, {
                resource_type: 'video',
                format: sourceTypes
              });
            }
            if (poster != null) {
              attr["poster"] = poster;
            }
            return attr;
          };

          return VideoTag;
        }(HtmlTag);

        /**
         * Image Tag
         * Depends on 'tags/htmltag', 'cloudinary'
         */
        ClientHintsMetaTag = function (superClass) {
          extend(ClientHintsMetaTag, superClass);

          /**
           * Creates an HTML (DOM) Meta tag that enables client-hints.
           * @constructor ClientHintsMetaTag
           * @extends HtmlTag
           */

          function ClientHintsMetaTag(options) {
            ClientHintsMetaTag.__super__.constructor.call(this, 'meta', void 0, Util.assign({
              "http-equiv": "Accept-CH",
              content: "DPR, Viewport-Width, Width"
            }, options));
          }

          /** @override */

          ClientHintsMetaTag.prototype.closeTag = function () {
            return "";
          };

          return ClientHintsMetaTag;
        }(HtmlTag);
        Cloudinary = function () {
          var AKAMAI_SHARED_CDN, CF_SHARED_CDN, DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, OLD_AKAMAI_SHARED_CDN, SEO_TYPES, SHARED_CDN, VERSION, absolutize, applyBreakpoints, cdnSubdomainNumber, closestAbove, cloudinaryUrlPrefix, defaultBreakpoints, finalizeResourceType, findContainerWidth, maxWidth, updateDpr;

          VERSION = "2.5.0";

          CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";

          OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";

          AKAMAI_SHARED_CDN = "res.cloudinary.com";

          SHARED_CDN = AKAMAI_SHARED_CDN;

          DEFAULT_POSTER_OPTIONS = {
            format: 'jpg',
            resource_type: 'video'
          };

          DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];

          SEO_TYPES = {
            "image/upload": "images",
            "image/private": "private_images",
            "image/authenticated": "authenticated_images",
            "raw/upload": "files",
            "video/upload": "videos"
          };

          /**
          * @const {Object} Cloudinary.DEFAULT_IMAGE_PARAMS
          * Defaults values for image parameters.
          *
          * (Previously defined using option_consume() )
           */

          Cloudinary.DEFAULT_IMAGE_PARAMS = {
            resource_type: "image",
            transformation: [],
            type: 'upload'
          };

          /**
          * Defaults values for video parameters.
          * @const {Object} Cloudinary.DEFAULT_VIDEO_PARAMS
          * (Previously defined using option_consume() )
           */

          Cloudinary.DEFAULT_VIDEO_PARAMS = {
            fallback_content: '',
            resource_type: "video",
            source_transformation: {},
            source_types: DEFAULT_VIDEO_SOURCE_TYPES,
            transformation: [],
            type: 'upload'
          };

          /**
           * Main Cloudinary class
           * @class Cloudinary
           * @param {Object} options - options to configure Cloudinary
           * @see Configuration for more details
           * @example
           *    var cl = new cloudinary.Cloudinary( { cloud_name: "mycloud"});
           *    var imgTag = cl.image("myPicID");
           */

          function Cloudinary(options) {
            var configuration;
            this.devicePixelRatioCache = {};
            this.responsiveConfig = {};
            this.responsiveResizeInitialized = false;
            configuration = new Configuration(options);
            this.config = function (newConfig, newValue) {
              return configuration.config(newConfig, newValue);
            };

            /**
             * Use \<meta\> tags in the document to configure this Cloudinary instance.
             * @return {Cloudinary} this for chaining
             */
            this.fromDocument = function () {
              configuration.fromDocument();
              return this;
            };

            /**
             * Use environment variables to configure this Cloudinary instance.
             * @return {Cloudinary} this for chaining
             */
            this.fromEnvironment = function () {
              configuration.fromEnvironment();
              return this;
            };

            /**
             * Initialize configuration.
             * @function Cloudinary#init
             * @see Configuration#init
             * @return {Cloudinary} this for chaining
             */
            this.init = function () {
              configuration.init();
              return this;
            };
          }

          /**
           * Convenience constructor
           * @param {Object} options
           * @return {Cloudinary}
           * @example cl = cloudinary.Cloudinary.new( { cloud_name: "mycloud"})
           */

          Cloudinary["new"] = function (options) {
            return new this(options);
          };

          /**
           * Return the resource type and action type based on the given configuration
           * @function Cloudinary#finalizeResourceType
           * @param {Object|string} resourceType
           * @param {string} [type='upload']
           * @param {string} [urlSuffix]
           * @param {boolean} [useRootPath]
           * @param {boolean} [shorten]
           * @returns {string} resource_type/type
           * @ignore
           */

          finalizeResourceType = function finalizeResourceType(resourceType, type, urlSuffix, useRootPath, shorten) {
            var key, options;
            if (resourceType == null) {
              resourceType = "image";
            }
            if (type == null) {
              type = "upload";
            }
            if (Util.isPlainObject(resourceType)) {
              options = resourceType;
              resourceType = options.resource_type;
              type = options.type;
              urlSuffix = options.url_suffix;
              useRootPath = options.use_root_path;
              shorten = options.shorten;
            }
            if (type == null) {
              type = 'upload';
            }
            if (urlSuffix != null) {
              resourceType = SEO_TYPES[resourceType + "/" + type];
              type = null;
              if (resourceType == null) {
                throw new Error("URL Suffix only supported for " + function () {
                  var results;
                  results = [];
                  for (key in SEO_TYPES) {
                    results.push(key);
                  }
                  return results;
                }().join(', '));
              }
            }
            if (useRootPath) {
              if (resourceType === 'image' && type === 'upload' || resourceType === "images") {
                resourceType = null;
                type = null;
              } else {
                throw new Error("Root path only supported for image/upload");
              }
            }
            if (shorten && resourceType === 'image' && type === 'upload') {
              resourceType = 'iu';
              type = null;
            }
            return [resourceType, type].join("/");
          };

          absolutize = function absolutize(url) {
            var prefix;
            if (!url.match(/^https?:\//)) {
              prefix = document.location.protocol + '//' + document.location.host;
              if (url[0] === '?') {
                prefix += document.location.pathname;
              } else if (url[0] !== '/') {
                prefix += document.location.pathname.replace(/\/[^\/]*$/, '/');
              }
              url = prefix + url;
            }
            return url;
          };

          /**
           * Generate an resource URL.
           * @function Cloudinary#url
           * @param {string} publicId - the public ID of the resource
           * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
           *                          and {@link Configuration} parameters
           * @param {string} [options.type='upload'] - the classification of the resource
           * @param {Object} [options.resource_type='image'] - the type of the resource
           * @return {string} The resource URL
           */

          Cloudinary.prototype.url = function (publicId, options) {
            var error, error1, prefix, ref, resourceTypeAndType, transformation, transformationString, url, version;
            if (options == null) {
              options = {};
            }
            if (!publicId) {
              return publicId;
            }
            if (options instanceof Transformation) {
              options = options.toOptions();
            }
            options = Util.defaults({}, options, this.config(), Cloudinary.DEFAULT_IMAGE_PARAMS);
            if (options.type === 'fetch') {
              options.fetch_format = options.fetch_format || options.format;
              publicId = absolutize(publicId);
            }
            transformation = new Transformation(options);
            transformationString = transformation.serialize();
            if (!options.cloud_name) {
              throw 'Unknown cloud_name';
            }
            if (publicId.search('/') >= 0 && !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//) && !((ref = options.version) != null ? ref.toString() : void 0)) {
              options.version = 1;
            }
            if (publicId.match(/^https?:/)) {
              if (options.type === 'upload' || options.type === 'asset') {
                url = publicId;
              } else {
                publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
              }
            } else {
              try {
                publicId = decodeURIComponent(publicId);
              } catch (error1) {
                error = error1;
              }
              publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
              if (options.url_suffix) {
                if (options.url_suffix.match(/[\.\/]/)) {
                  throw 'url_suffix should not include . or /';
                }
                publicId = publicId + '/' + options.url_suffix;
              }
              if (options.format) {
                if (!options.trust_public_id) {
                  publicId = publicId.replace(/\.(jpg|png|gif|webp)$/, '');
                }
                publicId = publicId + '.' + options.format;
              }
            }
            prefix = cloudinaryUrlPrefix(publicId, options);
            resourceTypeAndType = finalizeResourceType(options.resource_type, options.type, options.url_suffix, options.use_root_path, options.shorten);
            version = options.version ? 'v' + options.version : '';
            return url || Util.compact([prefix, resourceTypeAndType, transformationString, version, publicId]).join('/').replace(/([^:])\/+/g, '$1/');
          };

          /**
           * Generate an video resource URL.
           * @function Cloudinary#video_url
           * @param {string} publicId - the public ID of the resource
           * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
           *                          and {@link Configuration} parameters
           * @param {string} [options.type='upload'] - the classification of the resource
           * @return {string} The video URL
           */

          Cloudinary.prototype.video_url = function (publicId, options) {
            options = Util.assign({
              resource_type: 'video'
            }, options);
            return this.url(publicId, options);
          };

          /**
           * Generate an video thumbnail URL.
           * @function Cloudinary#video_thumbnail_url
           * @param {string} publicId - the public ID of the resource
           * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
           *                          and {@link Configuration} parameters
           * @param {string} [options.type='upload'] - the classification of the resource
           * @return {string} The video thumbnail URL
           */

          Cloudinary.prototype.video_thumbnail_url = function (publicId, options) {
            options = Util.assign({}, DEFAULT_POSTER_OPTIONS, options);
            return this.url(publicId, options);
          };

          /**
           * Generate a string representation of the provided transformation options.
           * @function Cloudinary#transformation_string
           * @param {Object} options - the transformation options
           * @returns {string} The transformation string
           */

          Cloudinary.prototype.transformation_string = function (options) {
            return new Transformation(options).serialize();
          };

          /**
           * Generate an image tag.
           * @function Cloudinary#image
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.image = function (publicId, options) {
            var client_hints, img, ref, ref1;
            if (options == null) {
              options = {};
            }
            img = this.imageTag(publicId, options);
            client_hints = (ref = (ref1 = options.client_hints) != null ? ref1 : this.config('client_hints')) != null ? ref : false;
            if (!(options.src != null || client_hints)) {
              img.setAttr("src", '');
            }
            img = img.toDOM();
            if (!client_hints) {
              Util.setData(img, 'src-cache', this.url(publicId, options));
              this.cloudinary_update(img, options);
            }
            return img;
          };

          /**
           * Creates a new ImageTag instance, configured using this own's configuration.
           * @function Cloudinary#imageTag
           * @param {string} publicId - the public ID of the resource
           * @param {Object} options - additional options to pass to the new ImageTag instance
           * @return {ImageTag} An ImageTag that is attached (chained) to this Cloudinary instance
           */

          Cloudinary.prototype.imageTag = function (publicId, options) {
            var tag;
            tag = new ImageTag(publicId, this.config());
            tag.transformation().fromOptions(options);
            return tag;
          };

          /**
           * Generate an image tag for the video thumbnail.
           * @function Cloudinary#video_thumbnail
           * @param {string} publicId - the public ID of the video
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} An image tag element
           */

          Cloudinary.prototype.video_thumbnail = function (publicId, options) {
            return this.image(publicId, Util.merge({}, DEFAULT_POSTER_OPTIONS, options));
          };

          /**
           * @function Cloudinary#facebook_profile_image
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.facebook_profile_image = function (publicId, options) {
            return this.image(publicId, Util.assign({
              type: 'facebook'
            }, options));
          };

          /**
           * @function Cloudinary#twitter_profile_image
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.twitter_profile_image = function (publicId, options) {
            return this.image(publicId, Util.assign({
              type: 'twitter'
            }, options));
          };

          /**
           * @function Cloudinary#twitter_name_profile_image
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.twitter_name_profile_image = function (publicId, options) {
            return this.image(publicId, Util.assign({
              type: 'twitter_name'
            }, options));
          };

          /**
           * @function Cloudinary#gravatar_image
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.gravatar_image = function (publicId, options) {
            return this.image(publicId, Util.assign({
              type: 'gravatar'
            }, options));
          };

          /**
           * @function Cloudinary#fetch_image
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.fetch_image = function (publicId, options) {
            return this.image(publicId, Util.assign({
              type: 'fetch'
            }, options));
          };

          /**
           * @function Cloudinary#video
           * @param {string} publicId - the public ID of the image
           * @param {Object} [options] - options for the tag and transformations
           * @return {HTMLImageElement} an image tag element
           */

          Cloudinary.prototype.video = function (publicId, options) {
            if (options == null) {
              options = {};
            }
            return this.videoTag(publicId, options).toHtml();
          };

          /**
           * Creates a new VideoTag instance, configured using this own's configuration.
           * @function Cloudinary#videoTag
           * @param {string} publicId - the public ID of the resource
           * @param {Object} options - additional options to pass to the new VideoTag instance
           * @return {VideoTag} A VideoTag that is attached (chained) to this Cloudinary instance
           */

          Cloudinary.prototype.videoTag = function (publicId, options) {
            options = Util.defaults({}, options, this.config());
            return new VideoTag(publicId, options);
          };

          /**
           * Generate the URL of the sprite image
           * @function Cloudinary#sprite_css
           * @param {string} publicId - the public ID of the resource
           * @param {Object} [options] - options for the tag and transformations
           * @see {@link http://cloudinary.com/documentation/sprite_generation Sprite generation}
           */

          Cloudinary.prototype.sprite_css = function (publicId, options) {
            options = Util.assign({
              type: 'sprite'
            }, options);
            if (!publicId.match(/.css$/)) {
              options.format = 'css';
            }
            return this.url(publicId, options);
          };

          /**
          * Initialize the responsive behaviour.<br>
          * Calls {@link Cloudinary#cloudinary_update} to modify image tags.
           * @function Cloudinary#responsive
          * @param {Object} options
          * @param {String} [options.responsive_class='cld-responsive'] - provide an alternative class used to locate img tags
          * @param {number} [options.responsive_debounce=100] - the debounce interval in milliseconds.
          * @param {boolean} [bootstrap=true] if true processes the img tags by calling cloudinary_update. When false the tags will be processed only after a resize event.
          * @see {@link Cloudinary#cloudinary_update} for additional configuration parameters
           */

          Cloudinary.prototype.responsive = function (options, bootstrap) {
            var ref, ref1, ref2, responsiveClass, responsiveResize, timeout;
            if (bootstrap == null) {
              bootstrap = true;
            }
            this.responsiveConfig = Util.merge(this.responsiveConfig || {}, options);
            responsiveClass = (ref = this.responsiveConfig['responsive_class']) != null ? ref : this.config('responsive_class');
            if (bootstrap) {
              this.cloudinary_update("img." + responsiveClass + ", img.cld-hidpi", this.responsiveConfig);
            }
            responsiveResize = (ref1 = (ref2 = this.responsiveConfig['responsive_resize']) != null ? ref2 : this.config('responsive_resize')) != null ? ref1 : true;
            if (responsiveResize && !this.responsiveResizeInitialized) {
              this.responsiveConfig.resizing = this.responsiveResizeInitialized = true;
              timeout = null;
              return window.addEventListener('resize', function (_this) {
                return function () {
                  var debounce, ref3, ref4, reset, run, wait, waitFunc;
                  debounce = (ref3 = (ref4 = _this.responsiveConfig['responsive_debounce']) != null ? ref4 : _this.config('responsive_debounce')) != null ? ref3 : 100;
                  reset = function reset() {
                    if (timeout) {
                      clearTimeout(timeout);
                      return timeout = null;
                    }
                  };
                  run = function run() {
                    return _this.cloudinary_update("img." + responsiveClass, _this.responsiveConfig);
                  };
                  waitFunc = function waitFunc() {
                    reset();
                    return run();
                  };
                  wait = function wait() {
                    reset();
                    return timeout = setTimeout(waitFunc, debounce);
                  };
                  if (debounce) {
                    return wait();
                  } else {
                    return run();
                  }
                };
              }(this));
            }
          };

          /**
           * @function Cloudinary#calc_breakpoint
           * @private
           * @ignore
           */

          Cloudinary.prototype.calc_breakpoint = function (element, width, steps) {
            var breakpoints, point;
            breakpoints = Util.getData(element, 'breakpoints') || Util.getData(element, 'stoppoints') || this.config('breakpoints') || this.config('stoppoints') || defaultBreakpoints;
            if (Util.isFunction(breakpoints)) {
              return breakpoints(width, steps);
            } else {
              if (Util.isString(breakpoints)) {
                breakpoints = function () {
                  var j, len, ref, results;
                  ref = breakpoints.split(',');
                  results = [];
                  for (j = 0, len = ref.length; j < len; j++) {
                    point = ref[j];
                    results.push(parseInt(point));
                  }
                  return results;
                }().sort(function (a, b) {
                  return a - b;
                });
              }
              return closestAbove(breakpoints, width);
            }
          };

          /**
           * @function Cloudinary#calc_stoppoint
           * @deprecated Use {@link calc_breakpoint} instead.
           * @private
           * @ignore
           */

          Cloudinary.prototype.calc_stoppoint = Cloudinary.prototype.calc_breakpoint;

          /**
           * @function Cloudinary#device_pixel_ratio
           * @private
           */

          Cloudinary.prototype.device_pixel_ratio = function (roundDpr) {
            var dpr, dprString;
            if (roundDpr == null) {
              roundDpr = true;
            }
            dpr = (typeof window !== "undefined" && window !== null ? window.devicePixelRatio : void 0) || 1;
            if (roundDpr) {
              dpr = Math.ceil(dpr);
            }
            if (dpr <= 0 || dpr === NaN) {
              dpr = 1;
            }
            dprString = dpr.toString();
            if (dprString.match(/^\d+$/)) {
              dprString += '.0';
            }
            return dprString;
          };

          defaultBreakpoints = function defaultBreakpoints(width, steps) {
            if (steps == null) {
              steps = 100;
            }
            return steps * Math.ceil(width / steps);
          };

          closestAbove = function closestAbove(list, value) {
            var i;
            i = list.length - 2;
            while (i >= 0 && list[i] >= value) {
              i--;
            }
            return list[i + 1];
          };

          cdnSubdomainNumber = function cdnSubdomainNumber(publicId) {
            return crc32(publicId) % 5 + 1;
          };

          cloudinaryUrlPrefix = function cloudinaryUrlPrefix(publicId, options) {
            var cdnPart, host, path, protocol, ref, subdomain;
            if (((ref = options.cloud_name) != null ? ref.indexOf("/") : void 0) === 0) {
              return '/res' + options.cloud_name;
            }
            protocol = "http://";
            cdnPart = "";
            subdomain = "res";
            host = ".cloudinary.com";
            path = "/" + options.cloud_name;
            if (options.protocol) {
              protocol = options.protocol + '//';
            }
            if (options.private_cdn) {
              cdnPart = options.cloud_name + "-";
              path = "";
            }
            if (options.cdn_subdomain) {
              subdomain = "res-" + cdnSubdomainNumber(publicId);
            }
            if (options.secure) {
              protocol = "https://";
              if (options.secure_cdn_subdomain === false) {
                subdomain = "res";
              }
              if (options.secure_distribution != null && options.secure_distribution !== OLD_AKAMAI_SHARED_CDN && options.secure_distribution !== SHARED_CDN) {
                cdnPart = "";
                subdomain = "";
                host = options.secure_distribution;
              }
            } else if (options.cname) {
              protocol = "http://";
              cdnPart = "";
              subdomain = options.cdn_subdomain ? 'a' + (crc32(publicId) % 5 + 1) + '.' : '';
              host = options.cname;
            }
            return [protocol, cdnPart, subdomain, host, path].join("");
          };

          /**
          * Finds all `img` tags under each node and sets it up to provide the image through Cloudinary
          * @param {Element[]} nodes the parent nodes to search for img under
          * @param {Object} [options={}] options and transformations params
          * @function Cloudinary#processImageTags
           */

          Cloudinary.prototype.processImageTags = function (nodes, options) {
            var images, imgOptions, node, publicId, url;
            if (options == null) {
              options = {};
            }
            if (Util.isEmpty(nodes)) {
              return this;
            }
            options = Util.defaults({}, options, this.config());
            images = function () {
              var j, len, ref, results;
              results = [];
              for (j = 0, len = nodes.length; j < len; j++) {
                node = nodes[j];
                if (!(((ref = node.tagName) != null ? ref.toUpperCase() : void 0) === 'IMG')) {
                  continue;
                }
                imgOptions = Util.assign({
                  width: node.getAttribute('width'),
                  height: node.getAttribute('height'),
                  src: node.getAttribute('src')
                }, options);
                publicId = imgOptions['source'] || imgOptions['src'];
                delete imgOptions['source'];
                delete imgOptions['src'];
                url = this.url(publicId, imgOptions);
                imgOptions = new Transformation(imgOptions).toHtmlAttributes();
                Util.setData(node, 'src-cache', url);
                node.setAttribute('width', imgOptions.width);
                node.setAttribute('height', imgOptions.height);
                results.push(node);
              }
              return results;
            }.call(this);
            this.cloudinary_update(images, options);
            return this;
          };

          applyBreakpoints = function applyBreakpoints(tag, width, steps, options) {
            var ref, ref1, ref2, responsive_use_breakpoints;
            responsive_use_breakpoints = (ref = (ref1 = (ref2 = options['responsive_use_breakpoints']) != null ? ref2 : options['responsive_use_stoppoints']) != null ? ref1 : this.config('responsive_use_breakpoints')) != null ? ref : this.config('responsive_use_stoppoints');
            if (!responsive_use_breakpoints || responsive_use_breakpoints === 'resize' && !options.resizing) {
              return width;
            } else {
              return this.calc_breakpoint(tag, width, steps);
            }
          };

          findContainerWidth = function findContainerWidth(element) {
            var containerWidth, style;
            containerWidth = 0;
            while ((element = element != null ? element.parentNode : void 0) instanceof Element && !containerWidth) {
              style = window.getComputedStyle(element);
              if (!/^inline/.test(style.display)) {
                containerWidth = Util.width(element);
              }
            }
            return containerWidth;
          };

          updateDpr = function updateDpr(dataSrc, roundDpr) {
            return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio(roundDpr));
          };

          maxWidth = function maxWidth(requiredWidth, tag) {
            var imageWidth;
            imageWidth = Util.getData(tag, 'width') || 0;
            if (requiredWidth > imageWidth) {
              imageWidth = requiredWidth;
              Util.setData(tag, 'width', requiredWidth);
            }
            return imageWidth;
          };

          /**
          * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
          * Only images marked with the cld-responsive class have w_auto updated.
          * @function Cloudinary#cloudinary_update
          * @param {(Array|string|NodeList)} elements - the elements to modify
          * @param {Object} options
          * @param {boolean|string} [options.responsive_use_breakpoints=true]
          *  - when `true`, always use breakpoints for width
          * - when `"resize"` use exact width on first render and breakpoints on resize
          * - when `false` always use exact width
          * @param {boolean} [options.responsive] - if `true`, enable responsive on this element. Can be done by adding cld-responsive.
          * @param {boolean} [options.responsive_preserve_height] - if set to true, original css height is preserved.
          *   Should only be used if the transformation supports different aspect ratios.
           */

          Cloudinary.prototype.cloudinary_update = function (elements, options) {
            var containerWidth, dataSrc, j, len, match, ref, ref1, ref2, ref3, ref4, ref5, requiredWidth, responsive, responsiveClass, roundDpr, setUrl, tag;
            if (options == null) {
              options = {};
            }
            if (elements === null) {
              return this;
            }
            responsive = (ref = (ref1 = options.responsive) != null ? ref1 : this.config('responsive')) != null ? ref : false;
            elements = function () {
              switch (false) {
                case !Util.isArray(elements):
                  return elements;
                case elements.constructor.name !== "NodeList":
                  return elements;
                case !Util.isString(elements):
                  return document.querySelectorAll(elements);
                default:
                  return [elements];
              }
            }();
            responsiveClass = (ref2 = (ref3 = this.responsiveConfig['responsive_class']) != null ? ref3 : options['responsive_class']) != null ? ref2 : this.config('responsive_class');
            roundDpr = (ref4 = options['round_dpr']) != null ? ref4 : this.config('round_dpr');
            for (j = 0, len = elements.length; j < len; j++) {
              tag = elements[j];
              if (!((ref5 = tag.tagName) != null ? ref5.match(/img/i) : void 0)) {
                continue;
              }
              setUrl = true;
              if (responsive) {
                Util.addClass(tag, responsiveClass);
              }
              dataSrc = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
              if (!Util.isEmpty(dataSrc)) {
                dataSrc = updateDpr.call(this, dataSrc, roundDpr);
                if (HtmlTag.isResponsive(tag, responsiveClass)) {
                  containerWidth = findContainerWidth(tag);
                  if (containerWidth !== 0) {
                    switch (false) {
                      case !/w_auto:breakpoints/.test(dataSrc):
                        requiredWidth = maxWidth(containerWidth, tag);
                        dataSrc = dataSrc.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:" + requiredWidth);
                        break;
                      case !(match = /w_auto(:(\d+))?/.exec(dataSrc)):
                        requiredWidth = applyBreakpoints.call(this, tag, containerWidth, match[2], options);
                        requiredWidth = maxWidth(requiredWidth, tag);
                        dataSrc = dataSrc.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth);
                    }
                    Util.removeAttribute(tag, 'width');
                    if (!options.responsive_preserve_height) {
                      Util.removeAttribute(tag, 'height');
                    }
                  } else {
                    setUrl = false;
                  }
                }
                if (setUrl) {
                  Util.setAttribute(tag, 'src', dataSrc);
                }
              }
            }
            return this;
          };

          /**
           * Provide a transformation object, initialized with own's options, for chaining purposes.
           * @function Cloudinary#transformation
           * @param {Object} options
           * @return {Transformation}
           */

          Cloudinary.prototype.transformation = function (options) {
            return Transformation["new"](this.config()).fromOptions(options).setParent(this);
          };

          return Cloudinary;
        }();
        cloudinary = {
          utf8_encode: utf8_encode,
          crc32: crc32,
          Util: Util,
          Condition: Condition,
          Transformation: Transformation,
          Configuration: Configuration,
          HtmlTag: HtmlTag,
          ImageTag: ImageTag,
          VideoTag: VideoTag,
          ClientHintsMetaTag: ClientHintsMetaTag,
          Layer: Layer,
          FetchLayer: FetchLayer,
          TextLayer: TextLayer,
          SubtitlesLayer: SubtitlesLayer,
          Cloudinary: Cloudinary,
          VERSION: "2.5.0"
        };
        return cloudinary;
      });
    }).call(this, require('_process'), require("buffer").Buffer);
  }, { "_process": 180, "buffer": 9, "lodash/assign": 142, "lodash/cloneDeep": 143, "lodash/compact": 144, "lodash/difference": 146, "lodash/functions": 148, "lodash/identity": 149, "lodash/includes": 150, "lodash/isArray": 152, "lodash/isElement": 156, "lodash/isEmpty": 157, "lodash/isFunction": 158, "lodash/isPlainObject": 163, "lodash/isString": 165, "lodash/merge": 170, "lodash/trim": 178 }], 11: [function (require, module, exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];

      i += d;

      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };

    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

      value = Math.abs(value);

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

      buffer[offset + i - d] |= s * 128;
    };
  }, {}], 12: [function (require, module, exports) {
    var getNative = require('./_getNative'),
        root = require('./_root');

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView');

    module.exports = DataView;
  }, { "./_getNative": 88, "./_root": 127 }], 13: [function (require, module, exports) {
    var hashClear = require('./_hashClear'),
        hashDelete = require('./_hashDelete'),
        hashGet = require('./_hashGet'),
        hashHas = require('./_hashHas'),
        hashSet = require('./_hashSet');

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    module.exports = Hash;
  }, { "./_hashClear": 96, "./_hashDelete": 97, "./_hashGet": 98, "./_hashHas": 99, "./_hashSet": 100 }], 14: [function (require, module, exports) {
    var listCacheClear = require('./_listCacheClear'),
        listCacheDelete = require('./_listCacheDelete'),
        listCacheGet = require('./_listCacheGet'),
        listCacheHas = require('./_listCacheHas'),
        listCacheSet = require('./_listCacheSet');

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    module.exports = ListCache;
  }, { "./_listCacheClear": 110, "./_listCacheDelete": 111, "./_listCacheGet": 112, "./_listCacheHas": 113, "./_listCacheSet": 114 }], 15: [function (require, module, exports) {
    var getNative = require('./_getNative'),
        root = require('./_root');

    /* Built-in method references that are verified to be native. */
    var Map = getNative(root, 'Map');

    module.exports = Map;
  }, { "./_getNative": 88, "./_root": 127 }], 16: [function (require, module, exports) {
    var mapCacheClear = require('./_mapCacheClear'),
        mapCacheDelete = require('./_mapCacheDelete'),
        mapCacheGet = require('./_mapCacheGet'),
        mapCacheHas = require('./_mapCacheHas'),
        mapCacheSet = require('./_mapCacheSet');

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    module.exports = MapCache;
  }, { "./_mapCacheClear": 115, "./_mapCacheDelete": 116, "./_mapCacheGet": 117, "./_mapCacheHas": 118, "./_mapCacheSet": 119 }], 17: [function (require, module, exports) {
    var getNative = require('./_getNative'),
        root = require('./_root');

    /* Built-in method references that are verified to be native. */
    var Promise = getNative(root, 'Promise');

    module.exports = Promise;
  }, { "./_getNative": 88, "./_root": 127 }], 18: [function (require, module, exports) {
    var getNative = require('./_getNative'),
        root = require('./_root');

    /* Built-in method references that are verified to be native. */
    var Set = getNative(root, 'Set');

    module.exports = Set;
  }, { "./_getNative": 88, "./_root": 127 }], 19: [function (require, module, exports) {
    var MapCache = require('./_MapCache'),
        setCacheAdd = require('./_setCacheAdd'),
        setCacheHas = require('./_setCacheHas');

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    module.exports = SetCache;
  }, { "./_MapCache": 16, "./_setCacheAdd": 129, "./_setCacheHas": 130 }], 20: [function (require, module, exports) {
    var ListCache = require('./_ListCache'),
        stackClear = require('./_stackClear'),
        stackDelete = require('./_stackDelete'),
        stackGet = require('./_stackGet'),
        stackHas = require('./_stackHas'),
        stackSet = require('./_stackSet');

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    module.exports = Stack;
  }, { "./_ListCache": 14, "./_stackClear": 133, "./_stackDelete": 134, "./_stackGet": 135, "./_stackHas": 136, "./_stackSet": 137 }], 21: [function (require, module, exports) {
    var root = require('./_root');

    /** Built-in value references. */
    var _Symbol = root.Symbol;

    module.exports = _Symbol;
  }, { "./_root": 127 }], 22: [function (require, module, exports) {
    var root = require('./_root');

    /** Built-in value references. */
    var Uint8Array = root.Uint8Array;

    module.exports = Uint8Array;
  }, { "./_root": 127 }], 23: [function (require, module, exports) {
    var getNative = require('./_getNative'),
        root = require('./_root');

    /* Built-in method references that are verified to be native. */
    var WeakMap = getNative(root, 'WeakMap');

    module.exports = WeakMap;
  }, { "./_getNative": 88, "./_root": 127 }], 24: [function (require, module, exports) {
    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    module.exports = apply;
  }, {}], 25: [function (require, module, exports) {
    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    module.exports = arrayEach;
  }, {}], 26: [function (require, module, exports) {
    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    module.exports = arrayFilter;
  }, {}], 27: [function (require, module, exports) {
    var baseIndexOf = require('./_baseIndexOf');

    /**
     * A specialized version of `_.includes` for arrays without support for
     * specifying an index to search from.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }

    module.exports = arrayIncludes;
  }, { "./_baseIndexOf": 48 }], 28: [function (require, module, exports) {
    /**
     * This function is like `arrayIncludes` except that it accepts a comparator.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }

    module.exports = arrayIncludesWith;
  }, {}], 29: [function (require, module, exports) {
    var baseTimes = require('./_baseTimes'),
        isArguments = require('./isArguments'),
        isArray = require('./isArray'),
        isBuffer = require('./isBuffer'),
        isIndex = require('./_isIndex'),
        isTypedArray = require('./isTypedArray');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
        // Safari 9 has enumerable `arguments.length` in strict mode.
        key == 'length' ||
        // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == 'offset' || key == 'parent') ||
        // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
        // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }

    module.exports = arrayLikeKeys;
  }, { "./_baseTimes": 62, "./_isIndex": 105, "./isArguments": 151, "./isArray": 152, "./isBuffer": 155, "./isTypedArray": 167 }], 30: [function (require, module, exports) {
    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    module.exports = arrayMap;
  }, {}], 31: [function (require, module, exports) {
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    module.exports = arrayPush;
  }, {}], 32: [function (require, module, exports) {
    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }

    module.exports = asciiToArray;
  }, {}], 33: [function (require, module, exports) {
    var baseAssignValue = require('./_baseAssignValue'),
        eq = require('./eq');

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }

    module.exports = assignMergeValue;
  }, { "./_baseAssignValue": 38, "./eq": 147 }], 34: [function (require, module, exports) {
    var baseAssignValue = require('./_baseAssignValue'),
        eq = require('./eq');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }

    module.exports = assignValue;
  }, { "./_baseAssignValue": 38, "./eq": 147 }], 35: [function (require, module, exports) {
    var eq = require('./eq');

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    module.exports = assocIndexOf;
  }, { "./eq": 147 }], 36: [function (require, module, exports) {
    var copyObject = require('./_copyObject'),
        keys = require('./keys');

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    module.exports = baseAssign;
  }, { "./_copyObject": 77, "./keys": 168 }], 37: [function (require, module, exports) {
    var copyObject = require('./_copyObject'),
        keysIn = require('./keysIn');

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    module.exports = baseAssignIn;
  }, { "./_copyObject": 77, "./keysIn": 169 }], 38: [function (require, module, exports) {
    var defineProperty = require('./_defineProperty');

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    module.exports = baseAssignValue;
  }, { "./_defineProperty": 83 }], 39: [function (require, module, exports) {
    var Stack = require('./_Stack'),
        arrayEach = require('./_arrayEach'),
        assignValue = require('./_assignValue'),
        baseAssign = require('./_baseAssign'),
        baseAssignIn = require('./_baseAssignIn'),
        cloneBuffer = require('./_cloneBuffer'),
        copyArray = require('./_copyArray'),
        copySymbols = require('./_copySymbols'),
        copySymbolsIn = require('./_copySymbolsIn'),
        getAllKeys = require('./_getAllKeys'),
        getAllKeysIn = require('./_getAllKeysIn'),
        getTag = require('./_getTag'),
        initCloneArray = require('./_initCloneArray'),
        initCloneByTag = require('./_initCloneByTag'),
        initCloneObject = require('./_initCloneObject'),
        isArray = require('./isArray'),
        isBuffer = require('./isBuffer'),
        isMap = require('./isMap'),
        isObject = require('./isObject'),
        isSet = require('./isSet'),
        keys = require('./keys');

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG = 1,
        CLONE_FLAT_FLAG = 2,
        CLONE_SYMBOLS_FLAG = 4;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function (subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });

        return result;
      }

      if (isMap(value)) {
        value.forEach(function (subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });

        return result;
      }

      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function (subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    module.exports = baseClone;
  }, { "./_Stack": 20, "./_arrayEach": 25, "./_assignValue": 34, "./_baseAssign": 36, "./_baseAssignIn": 37, "./_cloneBuffer": 71, "./_copyArray": 76, "./_copySymbols": 78, "./_copySymbolsIn": 79, "./_getAllKeys": 85, "./_getAllKeysIn": 86, "./_getTag": 93, "./_initCloneArray": 101, "./_initCloneByTag": 102, "./_initCloneObject": 103, "./isArray": 152, "./isBuffer": 155, "./isMap": 160, "./isObject": 161, "./isSet": 164, "./keys": 168 }], 40: [function (require, module, exports) {
    var isObject = require('./isObject');

    /** Built-in value references. */
    var objectCreate = Object.create;

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = function () {
      function object() {}
      return function (proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = undefined;
        return result;
      };
    }();

    module.exports = baseCreate;
  }, { "./isObject": 161 }], 41: [function (require, module, exports) {
    var SetCache = require('./_SetCache'),
        arrayIncludes = require('./_arrayIncludes'),
        arrayIncludesWith = require('./_arrayIncludesWith'),
        arrayMap = require('./_arrayMap'),
        baseUnary = require('./_baseUnary'),
        cacheHas = require('./_cacheHas');

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      } else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer: while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        } else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    module.exports = baseDifference;
  }, { "./_SetCache": 19, "./_arrayIncludes": 27, "./_arrayIncludesWith": 28, "./_arrayMap": 30, "./_baseUnary": 64, "./_cacheHas": 66 }], 42: [function (require, module, exports) {
    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    module.exports = baseFindIndex;
  }, {}], 43: [function (require, module, exports) {
    var arrayPush = require('./_arrayPush'),
        isFlattenable = require('./_isFlattenable');

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    module.exports = baseFlatten;
  }, { "./_arrayPush": 31, "./_isFlattenable": 104 }], 44: [function (require, module, exports) {
    var createBaseFor = require('./_createBaseFor');

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    module.exports = baseFor;
  }, { "./_createBaseFor": 82 }], 45: [function (require, module, exports) {
    var arrayFilter = require('./_arrayFilter'),
        isFunction = require('./isFunction');

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function (key) {
        return isFunction(object[key]);
      });
    }

    module.exports = baseFunctions;
  }, { "./_arrayFilter": 26, "./isFunction": 158 }], 46: [function (require, module, exports) {
    var arrayPush = require('./_arrayPush'),
        isArray = require('./isArray');

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    module.exports = baseGetAllKeys;
  }, { "./_arrayPush": 31, "./isArray": 152 }], 47: [function (require, module, exports) {
    var _Symbol2 = require('./_Symbol'),
        getRawTag = require('./_getRawTag'),
        objectToString = require('./_objectToString');

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = _Symbol2 ? _Symbol2.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }

    module.exports = baseGetTag;
  }, { "./_Symbol": 21, "./_getRawTag": 90, "./_objectToString": 124 }], 48: [function (require, module, exports) {
    var baseFindIndex = require('./_baseFindIndex'),
        baseIsNaN = require('./_baseIsNaN'),
        strictIndexOf = require('./_strictIndexOf');

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }

    module.exports = baseIndexOf;
  }, { "./_baseFindIndex": 42, "./_baseIsNaN": 51, "./_strictIndexOf": 138 }], 49: [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    module.exports = baseIsArguments;
  }, { "./_baseGetTag": 47, "./isObjectLike": 162 }], 50: [function (require, module, exports) {
    var getTag = require('./_getTag'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var mapTag = '[object Map]';

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    module.exports = baseIsMap;
  }, { "./_getTag": 93, "./isObjectLike": 162 }], 51: [function (require, module, exports) {
    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }

    module.exports = baseIsNaN;
  }, {}], 52: [function (require, module, exports) {
    var isFunction = require('./isFunction'),
        isMasked = require('./_isMasked'),
        isObject = require('./isObject'),
        toSource = require('./_toSource');

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    module.exports = baseIsNative;
  }, { "./_isMasked": 108, "./_toSource": 140, "./isFunction": 158, "./isObject": 161 }], 53: [function (require, module, exports) {
    var getTag = require('./_getTag'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var setTag = '[object Set]';

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    module.exports = baseIsSet;
  }, { "./_getTag": 93, "./isObjectLike": 162 }], 54: [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isLength = require('./isLength'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    module.exports = baseIsTypedArray;
  }, { "./_baseGetTag": 47, "./isLength": 159, "./isObjectLike": 162 }], 55: [function (require, module, exports) {
    var isPrototype = require('./_isPrototype'),
        nativeKeys = require('./_nativeKeys');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    module.exports = baseKeys;
  }, { "./_isPrototype": 109, "./_nativeKeys": 121 }], 56: [function (require, module, exports) {
    var isObject = require('./isObject'),
        isPrototype = require('./_isPrototype'),
        nativeKeysIn = require('./_nativeKeysIn');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    module.exports = baseKeysIn;
  }, { "./_isPrototype": 109, "./_nativeKeysIn": 122, "./isObject": 161 }], 57: [function (require, module, exports) {
    var Stack = require('./_Stack'),
        assignMergeValue = require('./_assignMergeValue'),
        baseFor = require('./_baseFor'),
        baseMergeDeep = require('./_baseMergeDeep'),
        isObject = require('./isObject'),
        keysIn = require('./keysIn'),
        safeGet = require('./_safeGet');

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function (srcValue, key) {
        if (isObject(srcValue)) {
          stack || (stack = new Stack());
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    module.exports = baseMerge;
  }, { "./_Stack": 20, "./_assignMergeValue": 33, "./_baseFor": 44, "./_baseMergeDeep": 58, "./_safeGet": 128, "./isObject": 161, "./keysIn": 169 }], 58: [function (require, module, exports) {
    var assignMergeValue = require('./_assignMergeValue'),
        cloneBuffer = require('./_cloneBuffer'),
        cloneTypedArray = require('./_cloneTypedArray'),
        copyArray = require('./_copyArray'),
        initCloneObject = require('./_initCloneObject'),
        isArguments = require('./isArguments'),
        isArray = require('./isArray'),
        isArrayLikeObject = require('./isArrayLikeObject'),
        isBuffer = require('./isBuffer'),
        isFunction = require('./isFunction'),
        isObject = require('./isObject'),
        isPlainObject = require('./isPlainObject'),
        isTypedArray = require('./isTypedArray'),
        safeGet = require('./_safeGet'),
        toPlainObject = require('./toPlainObject');

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    module.exports = baseMergeDeep;
  }, { "./_assignMergeValue": 33, "./_cloneBuffer": 71, "./_cloneTypedArray": 75, "./_copyArray": 76, "./_initCloneObject": 103, "./_safeGet": 128, "./isArguments": 151, "./isArray": 152, "./isArrayLikeObject": 154, "./isBuffer": 155, "./isFunction": 158, "./isObject": 161, "./isPlainObject": 163, "./isTypedArray": 167, "./toPlainObject": 176 }], 59: [function (require, module, exports) {
    var identity = require('./identity'),
        overRest = require('./_overRest'),
        setToString = require('./_setToString');

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    module.exports = baseRest;
  }, { "./_overRest": 126, "./_setToString": 131, "./identity": 149 }], 60: [function (require, module, exports) {
    var constant = require('./constant'),
        defineProperty = require('./_defineProperty'),
        identity = require('./identity');

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function (func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    module.exports = baseSetToString;
  }, { "./_defineProperty": 83, "./constant": 145, "./identity": 149 }], 61: [function (require, module, exports) {
    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    module.exports = baseSlice;
  }, {}], 62: [function (require, module, exports) {
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    module.exports = baseTimes;
  }, {}], 63: [function (require, module, exports) {
    var _Symbol3 = require('./_Symbol'),
        arrayMap = require('./_arrayMap'),
        isArray = require('./isArray'),
        isSymbol = require('./isSymbol');

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol3 ? _Symbol3.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }

    module.exports = baseToString;
  }, { "./_Symbol": 21, "./_arrayMap": 30, "./isArray": 152, "./isSymbol": 166 }], 64: [function (require, module, exports) {
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }

    module.exports = baseUnary;
  }, {}], 65: [function (require, module, exports) {
    var arrayMap = require('./_arrayMap');

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      return arrayMap(props, function (key) {
        return object[key];
      });
    }

    module.exports = baseValues;
  }, { "./_arrayMap": 30 }], 66: [function (require, module, exports) {
    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    module.exports = cacheHas;
  }, {}], 67: [function (require, module, exports) {
    var baseSlice = require('./_baseSlice');

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }

    module.exports = castSlice;
  }, { "./_baseSlice": 61 }], 68: [function (require, module, exports) {
    var baseIndexOf = require('./_baseIndexOf');

    /**
     * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the last unmatched string symbol.
     */
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;

      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    module.exports = charsEndIndex;
  }, { "./_baseIndexOf": 48 }], 69: [function (require, module, exports) {
    var baseIndexOf = require('./_baseIndexOf');

    /**
     * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the first unmatched string symbol.
     */
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
          length = strSymbols.length;

      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    module.exports = charsStartIndex;
  }, { "./_baseIndexOf": 48 }], 70: [function (require, module, exports) {
    var Uint8Array = require('./_Uint8Array');

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    module.exports = cloneArrayBuffer;
  }, { "./_Uint8Array": 22 }], 71: [function (require, module, exports) {
    var root = require('./_root');

    /** Detect free variable `exports`. */
    var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
  }, { "./_root": 127 }], 72: [function (require, module, exports) {
    var cloneArrayBuffer = require('./_cloneArrayBuffer');

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    module.exports = cloneDataView;
  }, { "./_cloneArrayBuffer": 70 }], 73: [function (require, module, exports) {
    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    module.exports = cloneRegExp;
  }, {}], 74: [function (require, module, exports) {
    var _Symbol4 = require('./_Symbol');

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol4 ? _Symbol4.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    module.exports = cloneSymbol;
  }, { "./_Symbol": 21 }], 75: [function (require, module, exports) {
    var cloneArrayBuffer = require('./_cloneArrayBuffer');

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    module.exports = cloneTypedArray;
  }, { "./_cloneArrayBuffer": 70 }], 76: [function (require, module, exports) {
    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    module.exports = copyArray;
  }, {}], 77: [function (require, module, exports) {
    var assignValue = require('./_assignValue'),
        baseAssignValue = require('./_baseAssignValue');

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    module.exports = copyObject;
  }, { "./_assignValue": 34, "./_baseAssignValue": 38 }], 78: [function (require, module, exports) {
    var copyObject = require('./_copyObject'),
        getSymbols = require('./_getSymbols');

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    module.exports = copySymbols;
  }, { "./_copyObject": 77, "./_getSymbols": 91 }], 79: [function (require, module, exports) {
    var copyObject = require('./_copyObject'),
        getSymbolsIn = require('./_getSymbolsIn');

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    module.exports = copySymbolsIn;
  }, { "./_copyObject": 77, "./_getSymbolsIn": 92 }], 80: [function (require, module, exports) {
    var root = require('./_root');

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    module.exports = coreJsData;
  }, { "./_root": 127 }], 81: [function (require, module, exports) {
    var baseRest = require('./_baseRest'),
        isIterateeCall = require('./_isIterateeCall');

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function (object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    module.exports = createAssigner;
  }, { "./_baseRest": 59, "./_isIterateeCall": 106 }], 82: [function (require, module, exports) {
    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function (object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    module.exports = createBaseFor;
  }, {}], 83: [function (require, module, exports) {
    var getNative = require('./_getNative');

    var defineProperty = function () {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }();

    module.exports = defineProperty;
  }, { "./_getNative": 88 }], 84: [function (require, module, exports) {
    (function (global) {
      /** Detect free variable `global` from Node.js. */
      var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;

      module.exports = freeGlobal;
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {}], 85: [function (require, module, exports) {
    var baseGetAllKeys = require('./_baseGetAllKeys'),
        getSymbols = require('./_getSymbols'),
        keys = require('./keys');

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    module.exports = getAllKeys;
  }, { "./_baseGetAllKeys": 46, "./_getSymbols": 91, "./keys": 168 }], 86: [function (require, module, exports) {
    var baseGetAllKeys = require('./_baseGetAllKeys'),
        getSymbolsIn = require('./_getSymbolsIn'),
        keysIn = require('./keysIn');

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    module.exports = getAllKeysIn;
  }, { "./_baseGetAllKeys": 46, "./_getSymbolsIn": 92, "./keysIn": 169 }], 87: [function (require, module, exports) {
    var isKeyable = require('./_isKeyable');

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
    }

    module.exports = getMapData;
  }, { "./_isKeyable": 107 }], 88: [function (require, module, exports) {
    var baseIsNative = require('./_baseIsNative'),
        getValue = require('./_getValue');

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    module.exports = getNative;
  }, { "./_baseIsNative": 52, "./_getValue": 94 }], 89: [function (require, module, exports) {
    var overArg = require('./_overArg');

    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);

    module.exports = getPrototype;
  }, { "./_overArg": 125 }], 90: [function (require, module, exports) {
    var _Symbol5 = require('./_Symbol');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = _Symbol5 ? _Symbol5.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    module.exports = getRawTag;
  }, { "./_Symbol": 21 }], 91: [function (require, module, exports) {
    var arrayFilter = require('./_arrayFilter'),
        stubArray = require('./stubArray');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function (symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    module.exports = getSymbols;
  }, { "./_arrayFilter": 26, "./stubArray": 171 }], 92: [function (require, module, exports) {
    var arrayPush = require('./_arrayPush'),
        getPrototype = require('./_getPrototype'),
        getSymbols = require('./_getSymbols'),
        stubArray = require('./stubArray');

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    module.exports = getSymbolsIn;
  }, { "./_arrayPush": 31, "./_getPrototype": 89, "./_getSymbols": 91, "./stubArray": 171 }], 93: [function (require, module, exports) {
    var DataView = require('./_DataView'),
        Map = require('./_Map'),
        Promise = require('./_Promise'),
        Set = require('./_Set'),
        WeakMap = require('./_WeakMap'),
        baseGetTag = require('./_baseGetTag'),
        toSource = require('./_toSource');

    /** `Object#toString` result references. */
    var mapTag = '[object Map]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        setTag = '[object Set]',
        weakMapTag = '[object WeakMap]';

    var dataViewTag = '[object DataView]';

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function getTag(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }

    module.exports = getTag;
  }, { "./_DataView": 12, "./_Map": 15, "./_Promise": 17, "./_Set": 18, "./_WeakMap": 23, "./_baseGetTag": 47, "./_toSource": 140 }], 94: [function (require, module, exports) {
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    module.exports = getValue;
  }, {}], 95: [function (require, module, exports) {
    /** Used to compose unicode character classes. */
    var rsAstralRange = "\\ud800-\\udfff",
        rsComboMarksRange = "\\u0300-\\u036f",
        reComboHalfMarksRange = "\\ufe20-\\ufe2f",
        rsComboSymbolsRange = "\\u20d0-\\u20ff",
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsVarRange = "\\ufe0e\\ufe0f";

    /** Used to compose unicode capture groups. */
    var rsZWJ = "\\u200d";

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    module.exports = hasUnicode;
  }, {}], 96: [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    module.exports = hashClear;
  }, { "./_nativeCreate": 120 }], 97: [function (require, module, exports) {
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    module.exports = hashDelete;
  }, {}], 98: [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    module.exports = hashGet;
  }, { "./_nativeCreate": 120 }], 99: [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }

    module.exports = hashHas;
  }, { "./_nativeCreate": 120 }], 100: [function (require, module, exports) {
    var nativeCreate = require('./_nativeCreate');

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
      return this;
    }

    module.exports = hashSet;
  }, { "./_nativeCreate": 120 }], 101: [function (require, module, exports) {
    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    module.exports = initCloneArray;
  }, {}], 102: [function (require, module, exports) {
    var cloneArrayBuffer = require('./_cloneArrayBuffer'),
        cloneDataView = require('./_cloneDataView'),
        cloneRegExp = require('./_cloneRegExp'),
        cloneSymbol = require('./_cloneSymbol'),
        cloneTypedArray = require('./_cloneTypedArray');

    /** `Object#toString` result references. */
    var boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag:case float64Tag:
        case int8Tag:case int16Tag:case int32Tag:
        case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor();

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor();

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    module.exports = initCloneByTag;
  }, { "./_cloneArrayBuffer": 70, "./_cloneDataView": 72, "./_cloneRegExp": 73, "./_cloneSymbol": 74, "./_cloneTypedArray": 75 }], 103: [function (require, module, exports) {
    var baseCreate = require('./_baseCreate'),
        getPrototype = require('./_getPrototype'),
        isPrototype = require('./_isPrototype');

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }

    module.exports = initCloneObject;
  }, { "./_baseCreate": 40, "./_getPrototype": 89, "./_isPrototype": 109 }], 104: [function (require, module, exports) {
    var _Symbol6 = require('./_Symbol'),
        isArguments = require('./isArguments'),
        isArray = require('./isArray');

    /** Built-in value references. */
    var spreadableSymbol = _Symbol6 ? _Symbol6.isConcatSpreadable : undefined;

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    module.exports = isFlattenable;
  }, { "./_Symbol": 21, "./isArguments": 151, "./isArray": 152 }], 105: [function (require, module, exports) {
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }

    module.exports = isIndex;
  }, {}], 106: [function (require, module, exports) {
    var eq = require('./eq'),
        isArrayLike = require('./isArrayLike'),
        isIndex = require('./_isIndex'),
        isObject = require('./isObject');

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index === "undefined" ? "undefined" : _typeof(index);
      if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
        return eq(object[index], value);
      }
      return false;
    }

    module.exports = isIterateeCall;
  }, { "./_isIndex": 105, "./eq": 147, "./isArrayLike": 153, "./isObject": 161 }], 107: [function (require, module, exports) {
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
    }

    module.exports = isKeyable;
  }, {}], 108: [function (require, module, exports) {
    var coreJsData = require('./_coreJsData');

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = function () {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? 'Symbol(src)_1.' + uid : '';
    }();

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }

    module.exports = isMasked;
  }, { "./_coreJsData": 80 }], 109: [function (require, module, exports) {
    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

      return value === proto;
    }

    module.exports = isPrototype;
  }, {}], 110: [function (require, module, exports) {
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    module.exports = listCacheClear;
  }, {}], 111: [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    module.exports = listCacheDelete;
  }, { "./_assocIndexOf": 35 }], 112: [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    module.exports = listCacheGet;
  }, { "./_assocIndexOf": 35 }], 113: [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    module.exports = listCacheHas;
  }, { "./_assocIndexOf": 35 }], 114: [function (require, module, exports) {
    var assocIndexOf = require('./_assocIndexOf');

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    module.exports = listCacheSet;
  }, { "./_assocIndexOf": 35 }], 115: [function (require, module, exports) {
    var Hash = require('./_Hash'),
        ListCache = require('./_ListCache'),
        Map = require('./_Map');

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
      };
    }

    module.exports = mapCacheClear;
  }, { "./_Hash": 13, "./_ListCache": 14, "./_Map": 15 }], 116: [function (require, module, exports) {
    var getMapData = require('./_getMapData');

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    module.exports = mapCacheDelete;
  }, { "./_getMapData": 87 }], 117: [function (require, module, exports) {
    var getMapData = require('./_getMapData');

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    module.exports = mapCacheGet;
  }, { "./_getMapData": 87 }], 118: [function (require, module, exports) {
    var getMapData = require('./_getMapData');

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    module.exports = mapCacheHas;
  }, { "./_getMapData": 87 }], 119: [function (require, module, exports) {
    var getMapData = require('./_getMapData');

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    module.exports = mapCacheSet;
  }, { "./_getMapData": 87 }], 120: [function (require, module, exports) {
    var getNative = require('./_getNative');

    /* Built-in method references that are verified to be native. */
    var nativeCreate = getNative(Object, 'create');

    module.exports = nativeCreate;
  }, { "./_getNative": 88 }], 121: [function (require, module, exports) {
    var overArg = require('./_overArg');

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = overArg(Object.keys, Object);

    module.exports = nativeKeys;
  }, { "./_overArg": 125 }], 122: [function (require, module, exports) {
    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    module.exports = nativeKeysIn;
  }, {}], 123: [function (require, module, exports) {
    var freeGlobal = require('./_freeGlobal');

    /** Detect free variable `exports`. */
    var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = function () {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();

    module.exports = nodeUtil;
  }, { "./_freeGlobal": 84 }], 124: [function (require, module, exports) {
    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    module.exports = objectToString;
  }, {}], 125: [function (require, module, exports) {
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }

    module.exports = overArg;
  }, {}], 126: [function (require, module, exports) {
    var apply = require('./_apply');

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? func.length - 1 : start, 0);
      return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    module.exports = overRest;
  }, { "./_apply": 24 }], 127: [function (require, module, exports) {
    var freeGlobal = require('./_freeGlobal');

    /** Detect free variable `self`. */
    var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    module.exports = root;
  }, { "./_freeGlobal": 84 }], 128: [function (require, module, exports) {
    /**
     * Gets the value at `key`, unless `key` is "__proto__".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      return key == '__proto__' ? undefined : object[key];
    }

    module.exports = safeGet;
  }, {}], 129: [function (require, module, exports) {
    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    module.exports = setCacheAdd;
  }, {}], 130: [function (require, module, exports) {
    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    module.exports = setCacheHas;
  }, {}], 131: [function (require, module, exports) {
    var baseSetToString = require('./_baseSetToString'),
        shortOut = require('./_shortOut');

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    module.exports = setToString;
  }, { "./_baseSetToString": 60, "./_shortOut": 132 }], 132: [function (require, module, exports) {
    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeNow = Date.now;

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function () {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    module.exports = shortOut;
  }, {}], 133: [function (require, module, exports) {
    var ListCache = require('./_ListCache');

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }

    module.exports = stackClear;
  }, { "./_ListCache": 14 }], 134: [function (require, module, exports) {
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    module.exports = stackDelete;
  }, {}], 135: [function (require, module, exports) {
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    module.exports = stackGet;
  }, {}], 136: [function (require, module, exports) {
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    module.exports = stackHas;
  }, {}], 137: [function (require, module, exports) {
    var ListCache = require('./_ListCache'),
        Map = require('./_Map'),
        MapCache = require('./_MapCache');

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    module.exports = stackSet;
  }, { "./_ListCache": 14, "./_Map": 15, "./_MapCache": 16 }], 138: [function (require, module, exports) {
    /**
     * A specialized version of `_.indexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    module.exports = strictIndexOf;
  }, {}], 139: [function (require, module, exports) {
    var asciiToArray = require('./_asciiToArray'),
        hasUnicode = require('./_hasUnicode'),
        unicodeToArray = require('./_unicodeToArray');

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }

    module.exports = stringToArray;
  }, { "./_asciiToArray": 32, "./_hasUnicode": 95, "./_unicodeToArray": 141 }], 140: [function (require, module, exports) {
    /** Used for built-in method references. */
    var funcProto = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return func + '';
        } catch (e) {}
      }
      return '';
    }

    module.exports = toSource;
  }, {}], 141: [function (require, module, exports) {
    /** Used to compose unicode character classes. */
    var rsAstralRange = "\\ud800-\\udfff",
        rsComboMarksRange = "\\u0300-\\u036f",
        reComboHalfMarksRange = "\\ufe20-\\ufe2f",
        rsComboSymbolsRange = "\\u20d0-\\u20ff",
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsVarRange = "\\ufe0e\\ufe0f";

    /** Used to compose unicode capture groups. */
    var rsAstral = '[' + rsAstralRange + ']',
        rsCombo = '[' + rsComboRange + ']',
        rsFitz = "\\ud83c[\\udffb-\\udfff]",
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
        rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
        rsZWJ = "\\u200d";

    /** Used to compose unicode regexes. */
    var reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange + ']?',
        rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }

    module.exports = unicodeToArray;
  }, {}], 142: [function (require, module, exports) {
    var assignValue = require('./_assignValue'),
        copyObject = require('./_copyObject'),
        createAssigner = require('./_createAssigner'),
        isArrayLike = require('./isArrayLike'),
        isPrototype = require('./_isPrototype'),
        keys = require('./keys');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function (object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    module.exports = assign;
  }, { "./_assignValue": 34, "./_copyObject": 77, "./_createAssigner": 81, "./_isPrototype": 109, "./isArrayLike": 153, "./keys": 168 }], 143: [function (require, module, exports) {
    var baseClone = require('./_baseClone');

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG = 1,
        CLONE_SYMBOLS_FLAG = 4;

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    module.exports = cloneDeep;
  }, { "./_baseClone": 39 }], 144: [function (require, module, exports) {
    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    module.exports = compact;
  }, {}], 145: [function (require, module, exports) {
    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function () {
        return value;
      };
    }

    module.exports = constant;
  }, {}], 146: [function (require, module, exports) {
    var baseDifference = require('./_baseDifference'),
        baseFlatten = require('./_baseFlatten'),
        baseRest = require('./_baseRest'),
        isArrayLikeObject = require('./isArrayLikeObject');

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function (array, values) {
      return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
    });

    module.exports = difference;
  }, { "./_baseDifference": 41, "./_baseFlatten": 43, "./_baseRest": 59, "./isArrayLikeObject": 154 }], 147: [function (require, module, exports) {
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }

    module.exports = eq;
  }, {}], 148: [function (require, module, exports) {
    var baseFunctions = require('./_baseFunctions'),
        keys = require('./keys');

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    module.exports = functions;
  }, { "./_baseFunctions": 45, "./keys": 168 }], 149: [function (require, module, exports) {
    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    module.exports = identity;
  }, {}], 150: [function (require, module, exports) {
    var baseIndexOf = require('./_baseIndexOf'),
        isArrayLike = require('./isArrayLike'),
        isString = require('./isString'),
        toInteger = require('./toInteger'),
        values = require('./values');

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }

    module.exports = includes;
  }, { "./_baseIndexOf": 48, "./isArrayLike": 153, "./isString": 165, "./toInteger": 174, "./values": 179 }], 151: [function (require, module, exports) {
    var baseIsArguments = require('./_baseIsArguments'),
        isObjectLike = require('./isObjectLike');

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function () {
      return arguments;
    }()) ? baseIsArguments : function (value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    };

    module.exports = isArguments;
  }, { "./_baseIsArguments": 49, "./isObjectLike": 162 }], 152: [function (require, module, exports) {
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    module.exports = isArray;
  }, {}], 153: [function (require, module, exports) {
    var isFunction = require('./isFunction'),
        isLength = require('./isLength');

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    module.exports = isArrayLike;
  }, { "./isFunction": 158, "./isLength": 159 }], 154: [function (require, module, exports) {
    var isArrayLike = require('./isArrayLike'),
        isObjectLike = require('./isObjectLike');

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    module.exports = isArrayLikeObject;
  }, { "./isArrayLike": 153, "./isObjectLike": 162 }], 155: [function (require, module, exports) {
    var root = require('./_root'),
        stubFalse = require('./stubFalse');

    /** Detect free variable `exports`. */
    var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    module.exports = isBuffer;
  }, { "./_root": 127, "./stubFalse": 172 }], 156: [function (require, module, exports) {
    var isObjectLike = require('./isObjectLike'),
        isPlainObject = require('./isPlainObject');

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    module.exports = isElement;
  }, { "./isObjectLike": 162, "./isPlainObject": 163 }], 157: [function (require, module, exports) {
    var baseKeys = require('./_baseKeys'),
        getTag = require('./_getTag'),
        isArguments = require('./isArguments'),
        isArray = require('./isArray'),
        isArrayLike = require('./isArrayLike'),
        isBuffer = require('./isBuffer'),
        isPrototype = require('./_isPrototype'),
        isTypedArray = require('./isTypedArray');

    /** `Object#toString` result references. */
    var mapTag = '[object Map]',
        setTag = '[object Set]';

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    module.exports = isEmpty;
  }, { "./_baseKeys": 55, "./_getTag": 93, "./_isPrototype": 109, "./isArguments": 151, "./isArray": 152, "./isArrayLike": 153, "./isBuffer": 155, "./isTypedArray": 167 }], 158: [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isObject = require('./isObject');

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    module.exports = isFunction;
  }, { "./_baseGetTag": 47, "./isObject": 161 }], 159: [function (require, module, exports) {
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    module.exports = isLength;
  }, {}], 160: [function (require, module, exports) {
    var baseIsMap = require('./_baseIsMap'),
        baseUnary = require('./_baseUnary'),
        nodeUtil = require('./_nodeUtil');

    /* Node.js helper references. */
    var nodeIsMap = nodeUtil && nodeUtil.isMap;

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    module.exports = isMap;
  }, { "./_baseIsMap": 50, "./_baseUnary": 64, "./_nodeUtil": 123 }], 161: [function (require, module, exports) {
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      return value != null && (type == 'object' || type == 'function');
    }

    module.exports = isObject;
  }, {}], 162: [function (require, module, exports) {
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && (typeof value === "undefined" ? "undefined" : _typeof(value)) == 'object';
    }

    module.exports = isObjectLike;
  }, {}], 163: [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        getPrototype = require('./_getPrototype'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var objectTag = '[object Object]';

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }

    module.exports = isPlainObject;
  }, { "./_baseGetTag": 47, "./_getPrototype": 89, "./isObjectLike": 162 }], 164: [function (require, module, exports) {
    var baseIsSet = require('./_baseIsSet'),
        baseUnary = require('./_baseUnary'),
        nodeUtil = require('./_nodeUtil');

    /* Node.js helper references. */
    var nodeIsSet = nodeUtil && nodeUtil.isSet;

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    module.exports = isSet;
  }, { "./_baseIsSet": 53, "./_baseUnary": 64, "./_nodeUtil": 123 }], 165: [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isArray = require('./isArray'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var stringTag = '[object String]';

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }

    module.exports = isString;
  }, { "./_baseGetTag": 47, "./isArray": 152, "./isObjectLike": 162 }], 166: [function (require, module, exports) {
    var baseGetTag = require('./_baseGetTag'),
        isObjectLike = require('./isObjectLike');

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return (typeof value === "undefined" ? "undefined" : _typeof(value)) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }

    module.exports = isSymbol;
  }, { "./_baseGetTag": 47, "./isObjectLike": 162 }], 167: [function (require, module, exports) {
    var baseIsTypedArray = require('./_baseIsTypedArray'),
        baseUnary = require('./_baseUnary'),
        nodeUtil = require('./_nodeUtil');

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    module.exports = isTypedArray;
  }, { "./_baseIsTypedArray": 54, "./_baseUnary": 64, "./_nodeUtil": 123 }], 168: [function (require, module, exports) {
    var arrayLikeKeys = require('./_arrayLikeKeys'),
        baseKeys = require('./_baseKeys'),
        isArrayLike = require('./isArrayLike');

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    module.exports = keys;
  }, { "./_arrayLikeKeys": 29, "./_baseKeys": 55, "./isArrayLike": 153 }], 169: [function (require, module, exports) {
    var arrayLikeKeys = require('./_arrayLikeKeys'),
        baseKeysIn = require('./_baseKeysIn'),
        isArrayLike = require('./isArrayLike');

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    module.exports = keysIn;
  }, { "./_arrayLikeKeys": 29, "./_baseKeysIn": 56, "./isArrayLike": 153 }], 170: [function (require, module, exports) {
    var baseMerge = require('./_baseMerge'),
        createAssigner = require('./_createAssigner');

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function (object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    module.exports = merge;
  }, { "./_baseMerge": 57, "./_createAssigner": 81 }], 171: [function (require, module, exports) {
    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    module.exports = stubArray;
  }, {}], 172: [function (require, module, exports) {
    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    module.exports = stubFalse;
  }, {}], 173: [function (require, module, exports) {
    var toNumber = require('./toNumber');

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0,
        MAX_INTEGER = 1.7976931348623157e+308;

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    module.exports = toFinite;
  }, { "./toNumber": 175 }], 174: [function (require, module, exports) {
    var toFinite = require('./toFinite');

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? remainder ? result - remainder : result : 0;
    }

    module.exports = toInteger;
  }, { "./toFinite": 173 }], 175: [function (require, module, exports) {
    var isObject = require('./isObject'),
        isSymbol = require('./isSymbol');

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }

    module.exports = toNumber;
  }, { "./isObject": 161, "./isSymbol": 166 }], 176: [function (require, module, exports) {
    var copyObject = require('./_copyObject'),
        keysIn = require('./keysIn');

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    module.exports = toPlainObject;
  }, { "./_copyObject": 77, "./keysIn": 169 }], 177: [function (require, module, exports) {
    var baseToString = require('./_baseToString');

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    module.exports = toString;
  }, { "./_baseToString": 63 }], 178: [function (require, module, exports) {
    var baseToString = require('./_baseToString'),
        castSlice = require('./_castSlice'),
        charsEndIndex = require('./_charsEndIndex'),
        charsStartIndex = require('./_charsStartIndex'),
        stringToArray = require('./_stringToArray'),
        toString = require('./toString');

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    module.exports = trim;
  }, { "./_baseToString": 63, "./_castSlice": 67, "./_charsEndIndex": 68, "./_charsStartIndex": 69, "./_stringToArray": 139, "./toString": 177 }], 179: [function (require, module, exports) {
    var baseValues = require('./_baseValues'),
        keys = require('./keys');

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    module.exports = values;
  }, { "./_baseValues": 65, "./keys": 168 }], 180: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
      return [];
    };

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
      return '/';
    };
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
      return 0;
    };
  }, {}] }, {}, [2]);