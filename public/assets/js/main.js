function updateScrolledHeader() {
    document.body.classList.toggle("scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", updateScrolledHeader, { passive: true });
window.addEventListener("DOMContentLoaded", updateScrolledHeader);

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
// Botão "Agende uma visita": no computador, abre a app do WhatsApp directamente
// (sem a página intermédia do wa.me); sem app instalada, cai no WhatsApp Web.
// No telemóvel o link wa.me já abre a app, por isso não se intervém.
window.addEventListener("DOMContentLoaded", function () {
    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            var url = new URL(link.href);
            var phone = url.pathname.replace("/", "");
            var text = url.searchParams.get("text") || "";
            var query = "phone=" + phone + "&text=" + encodeURIComponent(text);
            event.preventDefault();
            var opened = false;
            var onHide = function () { opened = true; };
            window.addEventListener("blur", onHide);
            document.addEventListener("visibilitychange", onHide);
            window.location.href = "whatsapp://send?" + query;
            setTimeout(function () {
                window.removeEventListener("blur", onHide);
                document.removeEventListener("visibilitychange", onHide);
                if (!opened && !document.hidden) {
                    window.open("https://web.whatsapp.com/send?" + query, "_blank", "noopener");
                }
            }, 1500);
        });
    });
});
