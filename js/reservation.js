document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // LIEN ACTIF DANS LA NAVIGATION
    // =====================================

    const currentPage = window.location.pathname.split("/").pop();

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
    // EMPÊCHER LES DATES PASSÉES
    // =====================================

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;

    }


    // =====================================
    // ENVOI DE LA DEMANDE PAR WHATSAPP
    // =====================================

    const reservationForm = document.getElementById("reservationForm");

    if (reservationForm) {

        reservationForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!reservationForm.checkValidity()) {
                reservationForm.reportValidity();
                return;
            }

            const nom = document.getElementById("nom").value.trim();

            const telephone = document.getElementById("telephone").value.trim();

            const prestation = document.getElementById("prestation").value;

            const date = document.getElementById("date").value;

            const heure = document.getElementById("heure").value;

            const message = document.getElementById("message").value.trim();


            const dateFormatee = new Date(date + "T12:00:00")
                .toLocaleDateString("fr-FR");


            const texteWhatsApp = `
Bonjour GLADSTONE Institute,

Je souhaite prendre un rendez-vous.

Nom : ${nom}

Téléphone : ${telephone}

Prestation : ${prestation}

Date souhaitée : ${dateFormatee}

Heure souhaitée : ${heure}

Informations complémentaires :
${message || "Aucune"}

Merci de me confirmer la disponibilité.
            `;


            const numeroInstitut = "237677953893";

            const lienWhatsApp =
                "https://wa.me/" +
                numeroInstitut +
                "?text=" +
                encodeURIComponent(texteWhatsApp);


            window.open(lienWhatsApp, "_blank");

        });

    }

});