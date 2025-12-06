document.addEventListener('DOMContentLoaded', function() {

    const contentSection = document.querySelector('.content');

    /* --- FEJLÉC ELTŰNÉS GÖRGETÉSKOR --- */
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (window.innerWidth <= 900) { 
            if (currentScroll > lastScrollTop && currentScroll > 150) { 
                header.classList.add('scrolled-up');
            } else {
                header.classList.remove('scrolled-up');
            }
        } else {
            header.classList.remove('scrolled-up');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    }, false);


    /* --- HAMBURGER MENÜ --- */
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active'); 
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }


    /* --- ÓRAREND SZŰRŐ --- */
    const filterDropdown = document.getElementById('filter');

    if (filterDropdown) {
        const allCards = document.querySelectorAll('.card.ora'); 

        function filterSchedule(selectedType) {
            allCards.forEach(card => {
                const cardType = card.getAttribute('data-tipus');
                if (selectedType === 'osszes' || cardType === selectedType) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        filterDropdown.addEventListener('change', function() {
            filterSchedule(this.value);
        });

        filterSchedule(filterDropdown.value);
    }


    /* --- FOGLALÁS FORM VALIDÁCIÓ --- */
    const form = document.getElementById('foglalas');

    if (form) {
        const fullnameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const telefonInput = document.getElementById('telefon');
        const tipusInput = document.getElementById('tipus');
        const datumInput = document.getElementById('datum');
        const termsInput = document.getElementById('terms');

        const errorName = document.getElementById('error-name');
        const errorEmail = document.getElementById('error-email');
        const errorTelszam = document.getElementById('error-telszam');
        const errorType = document.getElementById('error-type');
        const errorDate = document.getElementById('error-date');
        const errorTerms = document.getElementById('error-terms');

        function clearErrors() {
            document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
            document.querySelectorAll('.input-error').forEach(i => i.classList.remove('input-error'));
        }

        function validateForm(event) {
            let isValid = true;
            clearErrors();

            if (fullnameInput.value.trim() === "") {
                errorName.textContent = "A név megadása kötelező!";
                fullnameInput.classList.add('input-error');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === "") {
                errorEmail.textContent = "E-mail cím megadása kötelező!";
                emailInput.classList.add('input-error');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.textContent = "Kérlek, érvényes e-mailt adj meg!";
                emailInput.classList.add('input-error');
                isValid = false;
            }

            const phoneRegex = /^\+?(\d[\s-]?){8,15}$/;
            if (telefonInput.value.trim() === "") {
                errorTelszam.textContent = "Telefonszám megadása kötelező!";
                telefonInput.classList.add('input-error');
                isValid = false;
            } else if (!phoneRegex.test(telefonInput.value.trim().replace(/[\s-]/g, ''))) {
                errorTelszam.textContent = "Adj meg érvényes telefonszámot!";
                telefonInput.classList.add('input-error');
                isValid = false;
            }

            if (tipusInput.value === "") {
                errorType.textContent = "Kérlek válassz típust!";
                tipusInput.classList.add('input-error');
                isValid = false;
            }

            if (datumInput.value === "") {
                errorDate.textContent = "Dátum megadása kötelező!";
                datumInput.classList.add('input-error');
                isValid = false;
            }

            if (!termsInput.checked) {
                errorTerms.textContent = "El kell fogadnod a feltételeket!";
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                event.preventDefault();
                handleSuccess();
            }
        }

        form.addEventListener('submit', validateForm);

        function handleSuccess() {
            form.style.display = 'none';
            const contactInfo = document.querySelector('.elerhetosegeink');
            if (contactInfo) contactInfo.style.display = 'none';

            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <h2>🧘‍♀️ Sikeres Jelentkezés! 🧘‍♂️</h2>
                <p>Hamarosan küldünk visszaigazolást a <strong>${emailInput.value.trim()}</strong> címre.</p>
                <a class="btn" href="3orarend.html">Vissza az órarendhez</a>
            `;

            contentSection.appendChild(successMessage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});
