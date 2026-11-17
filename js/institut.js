document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       NAVIGATION ACTIVE
    ===================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "institut.html";

    document.querySelectorAll(".main-nav a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    /* =====================================
       MENU MOBILE
    ===================================== */

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


    /* =====================================
       ANIMATIONS AU DEFILEMENT
    ===================================== */

    const elementsToReveal = document.querySelectorAll(
        ".intro-label, .intro-content, .spaces-heading, .space-card, .cta-content, .footer-container"
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

    } else {

        elementsToReveal.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================
       GALERIE - AGRANDISSEMENT DES PHOTOS
    ===================================== */

    const spaceImages = document.querySelectorAll(".space-image img");

    let currentImageIndex = 0;

    const lightbox = document.createElement("div");

    lightbox.id = "institutLightbox";

    lightbox.innerHTML = `

        <button class="lightbox-close" aria-label="Fermer">
            &times;
        </button>

        <button class="lightbox-prev" aria-label="Photo précédente">
            &#10094;
        </button>

        <div class="lightbox-content">

            <img src="" alt="Photo agrandie">

            <div class="lightbox-caption">

                <span class="lightbox-number"></span>

                <h3></h3>

            </div>

        </div>

        <button class="lightbox-next" aria-label="Photo suivante">
            &#10095;
        </button>

    `;

    document.body.appendChild(lightbox);


    /* STYLE DE LA FENETRE */

    Object.assign(lightbox.style, {
        position: "fixed",
        inset: "0",
        zIndex: "1000",
        background: "rgba(0,0,0,0.96)",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 70px"
    });


    const lightboxContent = lightbox.querySelector(".lightbox-content");

    Object.assign(lightboxContent.style, {
        width: "100%",
        maxWidth: "1000px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    });


    const lightboxImage = lightbox.querySelector("img");

    Object.assign(lightboxImage.style, {
        maxWidth: "100%",
        maxHeight: "78vh",
        width: "auto",
        height: "auto",
        objectFit: "contain"
    });


    const lightboxCaption = lightbox.querySelector(".lightbox-caption");

    Object.assign(lightboxCaption.style, {
        color: "#fff",
        textAlign: "center",
        marginTop: "20px"
    });


    const lightboxNumber = lightbox.querySelector(".lightbox-number");

    Object.assign(lightboxNumber.style, {
        display: "block",
        fontSize: "10px",
        letterSpacing: "3px",
        color: "#aaa",
        marginBottom: "8px"
    });


    const lightboxTitle = lightbox.querySelector("h3");

    Object.assign(lightboxTitle.style, {
        fontFamily: "Georgia, serif",
        fontSize: "24px",
        fontWeight: "normal"
    });


    const lightboxButtons = lightbox.querySelectorAll(
        ".lightbox-close, .lightbox-prev, .lightbox-next"
    );

    lightboxButtons.forEach(button => {

        Object.assign(button.style, {
            position: "absolute",
            border: "none",
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "32px",
            padding: "12px"
        });

    });


    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");


    Object.assign(closeButton.style, {
        top: "20px",
        right: "25px",
        fontSize: "42px"
    });

    Object.assign(prevButton.style, {
        left: "15px",
        top: "50%",
        transform: "translateY(-50%)"
    });

    Object.assign(nextButton.style, {
        right: "15px",
        top: "50%",
        transform: "translateY(-50%)"
    });


    /* OUVRIR UNE PHOTO */

    function openLightbox(index) {

        currentImageIndex = index;

        updateLightbox();

        lightbox.style.display = "flex";

        document.body.style.overflow = "hidden";

    }


    /* METTRE A JOUR LA PHOTO */

    function updateLightbox() {

        const selectedImage = spaceImages[currentImageIndex];

        const selectedCard = selectedImage.closest(".space-card");

        const title = selectedCard.querySelector("h3").textContent;

        lightboxImage.src = selectedImage.src;

        lightboxImage.alt = selectedImage.alt;

        lightboxTitle.textContent = title;

        lightboxNumber.textContent =
            String(currentImageIndex + 1).padStart(2, "0") +
            " / " +
            String(spaceImages.length).padStart(2, "0");

    }


    /* PHOTO SUIVANTE */

    function nextImage() {

        currentImageIndex++;

        if (currentImageIndex >= spaceImages.length) {
            currentImageIndex = 0;
        }

        updateLightbox();

    }


    /* PHOTO PRECEDENTE */

    function previousImage() {

        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = spaceImages.length - 1;
        }

        updateLightbox();

    }


    /* FERMER LA FENETRE */

    function closeLightbox() {

        lightbox.style.display = "none";

        document.body.style.overflow = "";

    }


    /* EVENEMENTS SUR LES PHOTOS */

    spaceImages.forEach((image, index) => {

        image.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", nextImage);

    prevButton.addEventListener("click", previousImage);


    /* FERMER EN CLIQUANT SUR LE FOND */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /* NAVIGATION AU CLAVIER */

    document.addEventListener("keydown", event => {

        if (lightbox.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

    });


});