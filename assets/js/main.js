window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".fade-in .column > *").forEach(element => {
        var r = element.getBoundingClientRect();
        if (r.top > window.innerHeight) {
            element.classList.add("fade-hidden");
        }
    });
});

window.addEventListener("scroll", function () {
    const fadeInElements = document.querySelectorAll(".fade-in .column > *");
    fadeInElements.forEach(element => {
        var r = element.getBoundingClientRect();
        if (r.y < window.innerHeight - 50) {
            element.classList.remove("fade-hidden");
        }
    });
});

window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".has-submenu").forEach(function (dropDown) {
        dropDown.addEventListener("click", function () {
            if (window.innerWidth <= 767) {
                this.classList.toggle("active");
            }
        });
    });
});