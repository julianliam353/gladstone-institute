document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // PAGE ACTIVE DANS LA NAVIGATION
    // =================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // =================================
    // MENU MOBILE
    // =================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // =================================
    // ANIMATIONS AU DÉFILEMENT
    // =================================

    const elementsToReveal = document.querySelectorAll(
        ".intro-container, .section-heading, .service-card, .booking-content, .footer-container"
    );

    elementsToReveal.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        document.body.classList.add("js-ready");

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        elementsToReveal.forEach(element => {
            observer.observe(element);
        });

    }

});
