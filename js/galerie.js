document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // NAVIGATION ACTIVE
    // =====================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // =====================================
    // MENU MOBILE
    // =====================================

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


    // =====================================
    // VISIONNEUSE PHOTOGRAPHIQUE
    // =====================================

    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    const counter = document.getElementById("lightboxCounter");

    const photos = [];

    galleryItems.forEach(item => {

        const image = item.querySelector("img");

        if (image) {

            photos.push({
                src: image.src,
                alt: image.alt
            });

        }

    });

    let currentIndex = 0;


    // AFFICHER UNE PHOTO

    function showPhoto(index) {

        if (!photos.length) return;

        currentIndex = (index + photos.length) % photos.length;

        lightboxImage.src = photos[currentIndex].src;
        lightboxImage.alt = photos[currentIndex].alt;

        counter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

    }


    // OUVRIR LA VISIONNEUSE

    function openLightbox(index) {

        showPhoto(index);

        lightbox.classList.add("open");

        document.body.classList.add("lightbox-open");

        lightbox.setAttribute("aria-hidden", "false");

        closeButton.focus();

    }


    // FERMER LA VISIONNEUSE

    function closeLightbox() {

        lightbox.classList.remove("open");

        document.body.classList.remove("lightbox-open");

        lightbox.setAttribute("aria-hidden", "true");

    }


    // PHOTO SUIVANTE

    function nextPhoto() {

        showPhoto(currentIndex + 1);

    }


    // PHOTO PRÉCÉDENTE

    function previousPhoto() {

        showPhoto(currentIndex - 1);

    }


    // CLIC SUR LES PHOTOS

    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    // BOUTONS DE LA VISIONNEUSE

    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", nextPhoto);

    previousButton.addEventListener("click", previousPhoto);


    // FERMER EN CLIQUANT SUR LE FOND

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // NAVIGATION AU CLAVIER

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            nextPhoto();

        }

        if (event.key === "ArrowLeft") {

            previousPhoto();

        }

    });


    // =====================================
    // ANIMATIONS AU DÉFILEMENT
    // =====================================

    const elementsToReveal = document.querySelectorAll(
        ".gallery-intro, .gallery-item, .gallery-booking, .footer-container"
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