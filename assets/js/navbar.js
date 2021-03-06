module.exports = () => {
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
      const currentlyOpen = document.querySelector('.sub-menu.open');
      if (currentlyOpen) {
        currentlyOpen.classList.remove('open');
        currentlyOpen.style.height = 0;
        currentlyOpen.style.opacity = 0;
        currentlyOpen.parentNode.querySelector('i.fa').style.transform = 'rotate(0)';
        setTimeout(function() {
          currentlyOpen.style.display = 'none';
        },250);
      }
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
}
