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
