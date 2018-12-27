const alphaLinks = document.querySelectorAll('.alphabet-list a');
alphaLinks.forEach(function(link){
    link.addEventListener('mouseenter', function(e){

        this.previousElementSibling.classList.add('medLink');
        this.classList.add('largeLink');
        this.nextElementSibling.classList.add('medLink');
    });
    link.addEventListener('mouseleave', function(e){
        this.previousElementSibling.classList.remove('medLink');
        this.classList.remove('largeLink');
        this.nextElementSibling.classList.remove('medLink');
    });
});

// scripts from pure for side bar menu
(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementsByClassName('.pure-menu-link'),
        content  = document.getElementById('main');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    menuLink.on('click', function(e){
        toggleAll(e);
    });

    content.on('click', function(e){
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    });

}(this, this.document));

