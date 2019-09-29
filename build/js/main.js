var body = document.querySelector("body"),
    boxModel = document.querySelector(".separativeImages .box-model"),
    boxModelImage = document.querySelector(".separativeImages .box-model .modelImg"),
    boxModelArrow = document.querySelectorAll(".separativeImages .box-model .arrow"),
    separativeImgsContainer = document.querySelector(".separativeImages .img-container"),
    separativeImgs = document.querySelectorAll(".separativeImages .img");


// show box model
separativeImgs.forEach(function (img) {
    img.onclick = function () {
        var arr = Array.from(this.parentElement.children);

        arr.forEach(function (img) { img.classList.remove("active") });
        this.classList.add("active");

        boxModel.classList.add("active");
        boxModelImage.style.backgroundImage = this.style.backgroundImage;
        boxModelImage.classList.add("active");
        body.classList.add("stop-scrolling");
    };
});

// box model functions
function boxModelFun(e) {
    // console.log(boxModelArrow);

    if (boxModel.classList.contains("active")) {

        if (
            e.code === "ArrowRight" ||
            e.code === "ArrowLeft" ||
            e.target.classList.contains("arrow-right") ||
            e.target.classList.contains("arrow-left")
        ) {
            var arr = Array.from(separativeImgsContainer.children);
            var active = arr.find(function (div) { return div.classList.contains("active") });

            // change box model image
            if (
                e.target.classList.contains("arrow-right") ||
                e.code === "ArrowRight"
            ) {
                if (active.nextElementSibling === null) {
                    active.parentElement.firstElementChild.classList.add("active");
                    boxModelImage.style.backgroundImage =
                        active.parentElement.firstElementChild.style.backgroundImage;
                } else {
                    active.nextElementSibling.classList.add("active");
                    boxModelImage.style.backgroundImage = active.nextElementSibling.style.backgroundImage;
                }
            }

            // change box model image
            else if (
                e.target.classList.contains("arrow-left") ||
                e.code === "ArrowLeft"
            ) {
                if (active.previousElementSibling === null) {
                    active.parentElement.lastElementChild.classList.add("active");
                    boxModelImage.style.backgroundImage =
                        active.parentElement.lastElementChild.style.backgroundImage;
                } else {
                    active.previousElementSibling.classList.add("active");
                    boxModelImage.style.backgroundImage =
                        active.previousElementSibling.style.backgroundImage;
                }
            }
            active.classList.remove("active");
        }
    }
}
function closeBoxModel(e) {
    if (boxModel.classList.contains("active")) {
        // close box model
        if (
            e.code === "Escape" ||
            e.target.classList.contains("box-model") ||
            e.target.classList.contains("close")
        ) {
            boxModel.classList.remove("active");
            setTimeout(function () {
                body.classList.remove("stop-scrolling");
            }, 300)
        }
    }
}
window.addEventListener("keydown", boxModelFun);
window.addEventListener("keydown", closeBoxModel);
boxModelArrow.forEach(function (arrow) { arrow.addEventListener("click", boxModelFun) });
window.addEventListener("click", closeBoxModel);

(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();
// import 'core-js/features/array/from';
// import 'core-js/features/array/for-each';

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function(callback/*, thisArg*/) {

        var T, k;

        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = arguments[1];
        }

        // 6. Let k be 0.
        k = 0;

        // 7. Repeat while k < len.
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator.
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c.
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined.
    };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}
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

var testimonialBlocks = document.querySelectorAll('.testimonial-block');
var testimonialArr = Array.from(testimonialBlocks);

var testimonialDots = document.querySelectorAll('.testimonial-slider .slider-dots span');
var testimonialDotsArr = Array.from(testimonialDots);

(function () {
    if (window.innerWidth > 1200) {
        testimonialBlocks[0].style.transform = "translateX(" + ( 0 - 278 ) + "px )";
        testimonialBlocks[1].style.transform = "translateX(" + 307 + "px )";
        testimonialBlocks[2].style.transform = "translateX(" + (( 585 * 2 ) - 307) + "px )";
        testimonialBlocks[3].style.transform = "translateX(" + (( 585 * 3 ) - 307) + "px )";
    } else {
        testimonialBlocks[0].style.transform = "translateX(" + ( 0 - window.innerWidth ) + "px )";
        testimonialBlocks[1].style.transform = "translateX(" + 0 + "px )";
        testimonialBlocks[2].style.transform = "translateX(" + window.innerWidth + "px )";
        testimonialBlocks[3].style.transform = "translateX(" + window.innerWidth * 2  + "px )";
    }
})();

// testimonialDotsArr.forEach(function (dot) {
//     dot.onclick = function () {
//
//         clearInterval(testimonialInterval);
//
//         var that = this;
//         var activeTestimonial = testimonialArr.find(function(testi) {
//             return testi.classList.contains("active")
//         });
//         var activeTestimonialDot = testimonialDotsArr.find(function(dots) {
//             return dots.classList.contains("active")
//         });
//         var sameData = testimonialArr.find(function (dataName) {
//             return dataName.classList.contains(that.dataset.name)
//         });
//
//         testimonialBlocks.forEach(function (testimonial) {
//
//             var testimonialBlockTransform =
//                 testimonial.style.transform.replace(/[a-zA-Z()]/g,'');
//
//             if (window.innerWidth > 1200) {
//                 testimonial.style.transform =
//                     "translateX(" + ( testimonialBlockTransform - 585 ) + "px )";
//             } else {
//                 testimonial.style.transform =
//                     "translateX(" + ( testimonialBlockTransform - window.innerWidth ) + "px )";
//             }
//         });
//
//         // var prevElm = sameData.previousElementSibling.style.transform.replace(/[a-zA-Z()]/g,'');
//         // var nextElm = sameData.nextElementSibling.style.transform.replace(/[a-zA-Z()]/g,'');
//         // console.log([prevElm, parseInt(prevElm)]);
//         // sameData.previousElementSibling.style.transform = "translateX(" + (parseInt(prevElm) - 585) + "px )";
//         // sameData.nextElementSibling.style.transform = "translateX(" + (parseInt(nextElm) - 585) + "px )";
//         sameData.style.transform = "translateX(" + 307 + "px )";
//         activeTestimonial.classList.remove('active');
//         activeTestimonialDot.classList.remove('active');
//         this.classList.add('active');
//         sameData.classList.add('active');
//     }
// });

var testimonialInterval = setInterval(function () {

    var activeTestimonial = testimonialArr.find(function(testi) {
        return testi.classList.contains("active")
    });
    var activeTestimonialDot = testimonialDotsArr.find(function(dots) {
        return dots.classList.contains("active")
    });

    if (activeTestimonial.nextElementSibling === null ||
        activeTestimonial.nextElementSibling.classList.contains('slider-dots')) {

        activeTestimonial.parentElement.firstElementChild.classList.add("active");
        activeTestimonialDot.parentElement.firstElementChild.classList.add("active");


        if (window.innerWidth > 1200) {
            testimonialBlocks[0].style.transform = "translateX(" + 307 + "px )";
            testimonialBlocks[1].style.transform = "translateX(" + ( 307 + 585 ) + "px )";
            testimonialBlocks[2].style.transform = "translateX(" + (( 585 * 2 ) + 307) + "px )";
            testimonialBlocks[3].style.transform = "translateX(" + (( 585 * 3 ) + 307) + "px )";
        } else {
            testimonialBlocks[0].style.transform = "translateX(" + 0 + "px )";
            testimonialBlocks[1].style.transform = "translateX(" + window.innerWidth + "px )";
            testimonialBlocks[2].style.transform = "translateX(" + window.innerWidth * 2 + "px )";
            testimonialBlocks[3].style.transform = "translateX(" + window.innerWidth * 3  + "px )";
        }

    } else {
        activeTestimonial.nextElementSibling.classList.add("active");
        activeTestimonialDot.nextElementSibling.classList.add("active");

        testimonialBlocks.forEach(function (testimonial) {
            var testimonialBlockTransform =
                testimonial.style.transform.replace(/[a-zA-Z()]/g,'');


            if (window.innerWidth > 1200) {
                testimonial.style.transform = "translateX(" + ( testimonialBlockTransform - 585 ) + "px )";
            } else {
                testimonial.style.transform = "translateX(" + ( testimonialBlockTransform - window.innerWidth ) + "px )";
            }
        });
    }


    activeTestimonial.classList.remove('active');
    activeTestimonialDot.classList.remove('active');

}, 4000);


