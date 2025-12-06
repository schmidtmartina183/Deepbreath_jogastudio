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

    // --- Óratípus ajánló kérdőív logika (Órarend oldal) ---
    const quizForm = document.getElementById('ora-kerdoiv');

    if (quizForm) {
        const resultBox = document.getElementById('quiz-result');

        quizForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(quizForm);

            const tapasztalat = formData.get('tapasztalat');
            const cel = formData.get('cel');
            const intenzitas = formData.get('intenzitas');
            const egeszseg = formData.get('egeszseg');
            const babamamaAllapot = formData.get('babamama');

            // Pontszámok az egyes óratípusokra
            const scores = {
                kezdo: 0,
                pilates: 0,
                gerinc: 0,
                hot: 0,
                babamama: 0,
                flow: 0,
                regeneralo: 0
            };

            // 1. Tapasztalat
            if (tapasztalat === 'teljesen_kezdő') {
                scores.kezdo += 3;
                scores.regeneralo += 2;
            } else if (tapasztalat === 'kezdő_néhány_óra') {
                scores.kezdo += 2;
                scores.pilates += 1;
                scores.gerinc += 1;
            } else if (tapasztalat === 'középhaladó_haladó') {
                scores.flow += 2;
                scores.hot += 2;
                scores.pilates += 1;
            }

            // 2. Cél
            if (cel === 'stresszcsökkentés') {
                scores.regeneralo += 3;
                scores.kezdo += 1;
                scores.gerinc += 1;
            } else if (cel === 'tartásjavítás') {
                scores.pilates += 3;
                scores.gerinc += 1;
            } else if (cel === 'hátfájdalom') {
                scores.gerinc += 3;
                scores.pilates += 1;
            } else if (cel === 'intenzív_izzadós') {
                scores.hot += 3;
                scores.flow += 2;
            } else if (cel === 'babás') {
                scores.babamama += 5;
            } else if (cel === 'lágy_regenerálás') {
                scores.regeneralo += 3;
                scores.kezdo += 1;
            }

            // 3. Intenzitás
            if (intenzitas === 'nagyon_kíméletes') {
                scores.regeneralo += 2;
                scores.gerinc += 2;
                scores.kezdo += 1;
                scores.babamama += 1;
            } else if (intenzitas === 'közepes') {
                scores.kezdo += 2;
                scores.pilates += 2;
                scores.gerinc += 1;
                scores.flow += 1;
            } else if (intenzitas === 'pörgős') {
                scores.hot += 3;
                scores.flow += 3;
            }

            // 4. Egészségi állapot
            if (egeszseg === 'jelentős_fájdalom') {
                scores.gerinc += 3;
                scores.regeneralo += 2;
            } else if (egeszseg === 'enyhe_fájdalom') {
                scores.gerinc += 2;
                scores.pilates += 1;
                scores.regeneralo += 1;
            } else if (egeszseg === 'nincsen') {
                scores.flow += 1;
                scores.hot += 1;
                scores.pilates += 1;
            }

            // 5. Baba-mama állapot
            if (babamamaAllapot === 'igen') {
                scores.babamama += 5;
            } else {
                // ha nem babás, ne ajánljuk elsődlegesen a baba-mama órát
                scores.babamama = 0;
            }

            // Legmagasabb pontszámú óratípus kiválasztása
            let bestTypeKey = null;
            let bestScore = -Infinity;

            Object.keys(scores).forEach(key => {
                if (scores[key] > bestScore) {
                    bestScore = scores[key];
                    bestTypeKey = key;
                }
            });

            const typeTexts = {
                kezdo: {
                    name: 'Kezdő jóga',
                    desc: 'Az első órádnak egy lassabb, vezetett Kezdő jóga órát ajánlunk, ahol biztonságosan megtanulhatod az alapokat.'
                },
                pilates: {
                    name: 'Pilates',
                    desc: 'Számodra a Pilates tűnik ideálisnak: fókusz a core izmokon, tartásjavítás és kontrollált erősítés.'
                },
                gerinc: {
                    name: 'Gerinc jóga',
                    desc: 'A Gerinc jóga órák célzottan segíthetnek a hát- és derékfájdalmak enyhítésében, kíméletes, de hatékony gyakorlással.'
                },
                hot: {
                    name: 'Hot jóga',
                    desc: 'Szereted a kihívásokat: a Hot jóga intenzív, izzasztó gyakorlás, amely erősít és méregtelenít is.'
                },
                babamama: {
                    name: 'Baba-mama jóga',
                    desc: 'A válaszaid alapján számodra a Baba-mama jóga a legjobb indulás: gyengéd, szülés utáni regeneráció babával együtt.'
                },
                flow: {
                    name: 'Flow jóga',
                    desc: 'A dinamikus Flow jóga jól illik hozzád: folyamatos mozgás, légzés és erő fejlesztése egyben.'
                },
                regeneralo: {
                    name: 'Regeneráló jóga',
                    desc: 'Most a pihenés és feltöltődés az első: a Regeneráló jóga hosszú, passzív pózokkal segít teljesen ellazulni.'
                }
            };

            const chosen = typeTexts[bestTypeKey] || typeTexts.kezdo;

            resultBox.innerHTML = `
                <p><strong>Ajánlott első óratípusod:</strong> ${chosen.name}</p>
                <p>${chosen.desc}</p>
                <p>
                    <a href="2orak.html" class="btn">Bővebb leírás az órákról</a>
                    <a href="5foglalas.html" class="btn">Időpont foglalása</a>
                </p>
            `;

            resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }


});
