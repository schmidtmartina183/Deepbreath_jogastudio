document.addEventListener('DOMContentLoaded', function() {
    
    const contentSection = document.querySelector('.content');
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
            const selectedValue = this.value;
            filterSchedule(selectedValue);
        });

        filterSchedule(filterDropdown.value); 
    }
   const form = document.getElementById('foglalas');

    // Input mezők
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
        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(el => el.textContent = '');
        const inputs = document.querySelectorAll('.form-group input, .form-group select');
        inputs.forEach(el => el.classList.remove('input-error'));
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
            errorEmail.textContent = "Kérlek, érvényes e-mail címet adj meg!";
            emailInput.classList.add('input-error');
            isValid = false;
        }

        const phoneRegex = /^\+?(\d[\s-]?){8,15}$/;
        if (telefonInput.value.trim() === "") {
            errorTelszam.textContent = "Telefonszám megadása kötelező!";
            telefonInput.classList.add('input-error');
            isValid = false;
        } else if (!phoneRegex.test(telefonInput.value.trim().replace(/[\s-]/g, ''))) {
             errorTelszam.textContent = "Kérlek, érvényes telefonszámot adj meg!";
            telefonInput.classList.add('input-error');
            isValid = false;
        }

        if (tipusInput.value === "") {
            errorType.textContent = "Kérlek, válassz óratípust!";
            tipusInput.classList.add('input-error'); 
            isValid = false;
        }

        if (datumInput.value === "") {
            errorDate.textContent = "A dátum megadása kötelező!";
            datumInput.classList.add('input-error');
            isValid = false;
        } else {
            const selectedDate = new Date(datumInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            if (selectedDate < today) {
                errorDate.textContent = "Kérlek, jövőbeni dátumot válassz!";
                datumInput.classList.add('input-error');
                isValid = false;
            }
        }

        if (!termsInput.checked) {
            errorTerms.textContent = "A jelentkezéshez el kell fogadnod a feltételeket.";
            isValid = false;
        }
            
        if (!isValid) {
            event.preventDefault();
            console.log("Hiba az űrlapon!");
        } else {
            event.preventDefault();
            handleSuccess(); 
        }
    }

    form.addEventListener('submit', validateForm);


    function handleSuccess() {
        form.style.display = 'none';
        const contactInfo = document.querySelector('.elerhetosegeink');
        if (contactInfo) {
            contactInfo.style.display = 'none';
        }

        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <h2>🧘‍♀️ Sikeres Jelentkezés! 🧘‍♂️</h2>
            <p>A foglalását rögzítettük. 
            Hamarosan küldünk egy visszaigazoló e-mailt a **${emailInput.value.trim()}** címre.</p>
            <p><strong>Találkozunk az órán!</strong></p>
            <a class="btn" href="3orarend.html" style="margin-top: 20px;">Vissza az Órarendhez</a>
        `;

        contentSection.appendChild(successMessage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});