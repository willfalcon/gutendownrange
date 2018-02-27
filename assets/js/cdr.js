jQuery(document).ready(function($) {
  var toggler = document.getElementById('navbarToggler');
  toggler.onclick = function() {
    var nav = document.getElementById('main_nav');
    var toggleTR = document.getElementById('toggleTR');
    if ( toggler.classList.contains('open') ) {
      nav.style.transform = 'translateY(-100%)';
      toggler.classList.remove('open');
    } else {
      nav.style.transform = 'translateY(0)';
      toggler.classList.add('open');
      toggleTR.setAttribute('fill', 'white');
    }
  };
});
