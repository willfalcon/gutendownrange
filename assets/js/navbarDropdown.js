module.exports = () => {


    //** Drop-Down Sub-Menu Voodoo **//

    // Put the Imperius Curse on the menu on document ready so we can bend it to our will later.

    // Get all menu items with sub menu items.
    const menuParents = document.querySelectorAll('.menu-item-has-children'); // querySelectorAll has support back to ie9

    // Iterate over those menu items with child sub menus with an index.
    let i = 0;
    menuParents.forEach((parent) => {
      // Each 'parent' here is a primary <li> with class .menu-item-has-children
      //    The <li> 'parent' will have 2 children
      //    at index[0], the <a> link to the parent page
      //    at index[1], a <ul> with class .sub-menu containing the child menu
      //
      // Add the caret to the <a> element html inside the <li>
      const childLink = parent.querySelector('a');
      const childMenu = parent.querySelector('ul');
      childLink.innerHTML += ' <i id=subMenuCaret' + i + ' class="fa fa-caret-right"></i>';
      // Add class 'parent' to the <li> item
      parent.classList.add('parent');
      // Add data-child attribute to the <li> item to target the correct sub-menu
      parent.setAttribute('data-child', 'sub_menu_' + i);
      // Add an id to the child <ul> sub-menu matching the data-child attr of the parent.
      childMenu.setAttribute('id', 'sub_menu_' + i);
      // Get the natural height of the element and store as a data attr for later.
      // var subMenu = document.getElementById('sub_menu_' + i);
      const height = window.getComputedStyle(childMenu)['height'];
      // var caret = document.getElementById('subMenuCaret' + i);
      childMenu.setAttribute('data-height', height);
      // collapse menu only if we're mobile.
      if (document.documentElement.clientWidth < 768) {
        childMenu.style.height = 0;
        childMenu.style.opacity = 0;
        childMenu.style.display = 'none';
        childLink.setAttribute('data-index', i);
        childLink.addEventListener('click', function(e) {
          e.preventDefault();
          const index = this.getAttribute('data-index');
          
          const caret = childLink.querySelector('i');
          if ( childMenu.classList.contains('open') ) {
            childMenu.classList.remove('open');
            childMenu.style.height = 0;
            childMenu.style.opacity = 0;
            caret.style.transform = 'rotate(0)';
            setTimeout(function() {
              childMenu.style.display = 'none';
            },250);
          } else {
            childMenu.classList.add('open');
            childMenu.style.display = 'block';
            caret.style.transform = 'rotate(90deg)';
            setTimeout(function() {
              childMenu.style.height = childMenu.getAttribute('data-height');
              childMenu.style.opacity = 1;
            },0);
          }
        });

      }

      i++;
      // Mischief managed
    });


    // Time to do some magic on those sub-menus
    // var menuParents = document.querySelectorAll('.menu-item-has-children'); // (already did this)
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

}
