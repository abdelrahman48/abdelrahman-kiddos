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


