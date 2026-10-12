// Validador de email (formato RFC básico)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

// ========== Formulário de contato ==========
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            document.getElementById('email').focus();
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="prompt">&gt;</span> Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(this);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            showNotification('Mensagem enviada com sucesso!', 'success');
            this.reset();
        })
        .catch(() => {
            showNotification('Erro ao enviar. Tente novamente.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// ========== Botão copiar email (ícone minimalista) ==========
// Seleciona ambos os tipos de botões em uma única lista
const copyBtns = document.querySelectorAll('.copy-email-btn, .npx');

copyBtns.forEach(btn => {
  btn.addEventListener('click', async function() {

    const textToCopy = this.dataset.email; 
    const icon = this.querySelector('i');
    
    if (!textToCopy || !icon) return;
    const originalIconClass = icon.className;
    let copiedOK = false;

    // Tenta Clipboard API primeiro
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copiedOK = true;
      } catch (_) { /* ignora, tenta fallback */ }
    }

    // Fallback: input temporário + execCommand
    if (!copiedOK) {
      try {
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        copiedOK = document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch (_) {
        copiedOK = false;
      }
    }

    // Feedback visual
    if (copiedOK) {
      if (this.classList.contains('npx')) {
        showNotification('Comando npx igor-portfolio copiado para a área de transferência!', 'success');
      } else if (this.classList.contains('copy-email-btn')) {
        showNotification('Email copiado para a área de transferência!', 'success');
      }

      this.classList.add('is-copied');
      icon.className = 'fas fa-check';
      
      setTimeout(() => {
        this.classList.remove('is-copied');
        icon.className = originalIconClass;
      }, 1800);
    } else {
      const errorMsg = this.classList.contains('npx') 
        ? 'Erro ao copiar comando npx igor-portfolio.' 
        : 'Erro ao copiar email.';
      showNotification(errorMsg, 'error');
    }
  });
});

