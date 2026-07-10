const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        createEmail(name, email, message);
        console.log(`Mensagem de ${name} (${email}): ${message}`);

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="prompt">&gt;</span> Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso!', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function createEmail(name, email, message) {
    const subject = encodeURIComponent(`Mensagem de ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
    console.log(`mailto:?subject=${subject}&body=${body}`);
}