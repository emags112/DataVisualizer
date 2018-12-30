

const alphaLinks = document.querySelectorAll('.alphabet-list a');
alphaLinks.forEach(function(link){
    link.addEventListener('mouseenter', function(e){
        if(this.previousElementSibling){
            this.previousElementSibling.classList.add('medLink');
        }
        this.classList.add('largeLink');
        if(this.nextElementSibling){
            this.nextElementSibling.classList.add('medLink');
        }        
        
    });
    link.addEventListener('mouseleave', function(e){
        if(this.previousElementSibling){
            this.previousElementSibling.classList.remove('medLink');
        }
        this.classList.remove('largeLink');
        if(this.nextElementSibling){
            this.nextElementSibling.classList.remove('medLink');
        }        
        
    });
});

const   visitorInfo =  document.querySelectorAll('.visitorCenterDivider'),
        arrow = document.querySelectorAll('#arrow');
    
visitorInfo.forEach(function(info){
    info.addEventListener('click', function(e){
        this.nextElementSibling.classList.toggle('hidden');
        this.children[0].classList.toggle('rotate');
    })
});

const   alerts = document.querySelectorAll('.alert-head');

alerts.forEach(function(alert){
    alert.addEventListener('click', function(e){
        this.nextElementSibling.classList.toggle('hidden');
        this.children[2].classList.toggle('rotate');
    })
});

const infocons = document.querySelectorAll('.infocon');
infocons.forEach(function(icon){
    if(icon.id === 'Caution'){
        icon.classList.add('fa-exclamation-triangle')
    }
    else if(icon.id === 'Information'){
        icon.classList.add('fa-info-circle')
    }
    else if(icon.id === 'Park Closure'){
        icon.classList.add('fa-window-close')
    }
    else if(icon.id === 'Danger'){
        icon.classList.add('fa-skull-crossbones')
    }
})

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

// import { runInThisContext } from "vm";