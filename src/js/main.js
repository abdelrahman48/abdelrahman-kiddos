// Start show window size on IE
// var x = document.querySelector('.window-size');
// x.textContent = window.innerWidth;
// window.onresize = function () {
//     console.log(x);
//     x.textContent = window.innerWidth
// };
// End show window size on IE

// Start prevent default when click on links
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

var a = document.querySelectorAll('a');
a.forEach(function (link) { link.onclick = function (e) { e.preventDefault() } });

var form = document.querySelectorAll('form');
form.forEach(function (form) { form.onsubmit = function (e) { e.preventDefault() } });
// End prevent default when click on links

// Start fixed top nav on scroll
var topContact = document.querySelector('.top-contact');
var nav = document.querySelector('nav');
var navH = nav.offsetHeight;

window.onscroll = function () {
    if (window.scrollY > topContact.offsetHeight + 300) {
        body.style.paddingTop = navH;
        nav.style.top = 0;
        nav.classList.add('stick-in-top');
    }
    else if (nav.classList.contains('stick-in-top')) {
        nav.style.top = -100;
        body.style.paddingTop = 0;
        nav.classList.remove('stick-in-top');
    }
};
// End fixed top nav on scroll

// Start open & close menu in small small screens
var menu = document.querySelector('nav .menu');
var menuItems = document.querySelector('nav .navigation ul');
menu.onclick = function () {
    menuItems.classList.toggle('open')
};
// End open & close menu in small small screens

// Start hero slider
var sliderContainer = document.querySelector('.header-slider .slider-container');
var sliderElems = Array.from(document.querySelectorAll('.header-slider .slider'));
var sliderDotsContainer = document.querySelector('.header-slider .slider-dots');
var sliderDots = Array.from(document.querySelectorAll('.header-slider .dot'));
var windowWidth = document.body.scrollWidth;

setInterval(function () {
    var activeSlider = sliderElems.find(function (slider) {
        return slider.classList.contains('active')
    });
    var activeDot = sliderDots.find(function (dot) {
        return dot.classList.contains('active')
    });

    if (activeSlider.nextElementSibling === null) {
        sliderContainer.style.transform = "translateX(" + ( 0 ) + "px )";

        sliderContainer.firstElementChild.classList.add('active');
        sliderDotsContainer.firstElementChild.classList.add('active');
    } else {
        var sliderContainerTransform =
            sliderContainer.style.transform.replace(/[a-zA-Z()]/g,'');


        sliderContainer.style.transform = "translateX(" + ( sliderContainerTransform - windowWidth ) + "px )";
        activeSlider.nextElementSibling.classList.add('active');
        activeDot.nextElementSibling.classList.add('active');
    }
    activeSlider.classList.remove('active');
    activeDot.classList.remove('active');
}, 4000);

// (function () {
//         var x = 0;
//         for(var i=0; i<=sliderElems.length-1;i++) {
//             sliderElems[i].style.transform = "translateX("+x+"px)";
//             x += window.innerWidth;
//         }
// })();
// End hero slider
