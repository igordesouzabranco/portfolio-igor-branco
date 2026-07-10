// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (hero && header) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.scrollY > heroBottom - 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', updateActiveLink);

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-bar');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 100) {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Typing effect for terminal
const typingElement = document.querySelector('.typing');

const terminalCommands = [
    { text: 'node --version', delay: 100 },
    { text: 'npm run dev', delay: 100 },
    { text: 'python --version', delay: 100 },
    { text: 'pip install Flask', delay: 100 },
    { text: 'git status', delay: 100 }
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeCommand() {
    if (!typingElement) return;

    const currentCommand = terminalCommands[commandIndex];
    const promptSpan = '<span class="prompt">&gt;</span> ';
    const cursorSpan = '<span class="cursor">_</span>';

    if (isDeleting) {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % terminalCommands.length;
            setTimeout(typeCommand, 500);
            return;
        }
    } else {
        charIndex++;
        if (charIndex > currentCommand.text.length) {
            setTimeout(() => {
                isDeleting = true;
                typeCommand();
            }, 2000);
            return;
        }
    }

    const typedText = currentCommand.text.substring(0, charIndex);
    typingElement.innerHTML = `${promptSpan}${typedText}${cursorSpan}`;

    const delay = isDeleting ? 50 : currentCommand.delay;
    setTimeout(typeCommand, delay);
}

setTimeout(typeCommand, 1000);

// Speech bubbles animation
const allBubbles = document.querySelectorAll('.bubble');
const secretBubble = document.querySelector('.bubble-secret');
const normalBubbles = document.querySelectorAll('.bubble:not(.bubble-secret)');

const bubbleTexts = [
    'git push...', 'npm install...', 'python run.py...', 'docker compose up...', 'npm run dev...',
    'git pull...', 'npm start...', 'pip install...', 'docker build...', 'yarn add...',
    'git commit...', 'npm test...', 'python main.py...', 'docker stop...', 'npm run build...',
    'git merge...', 'npm update...', 'pip freeze...', 'docker ps...', 'npm install -g...',
    'git checkout...', 'npm run lint...', 'python -m venv...', 'docker rm...', 'npm run start...',
    'git branch...', 'npm run dev...', 'pip install -r...', 'docker images...', 'npm run prod...'
];

const secretTexts = [
    'Pensando em Plague Tale...', 'Pensando em Hellblade...', 'Pensando em Paramore...', 'Pensando em Starbenders...'
];

let bubbleInterval;
let shiftCount = 0;
let shiftTimer = null;
let codeBuffer = '';
let codeTimer = null;

function getRandomCommand() {
    return bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
}

function getSecretText() {
    return secretTexts[Math.floor(Math.random() * secretTexts.length)];
}

function hideAllBubbles() {
    allBubbles.forEach(bubble => bubble.classList.remove('active'));
}

function showNormalBubble() {
    hideAllBubbles();
    const randomBubble = normalBubbles[Math.floor(Math.random() * normalBubbles.length)];
    randomBubble.textContent = getRandomCommand();
    randomBubble.classList.add('active');
    setTimeout(() => randomBubble.classList.remove('active'), 2000);
}

function spawnFireworks() {
    const emojis = ['🎆', '🎇', '✨', '💫', '🌟', '🎇'];
    const container = document.body;
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                font-size: ${20 + Math.random() * 30}px;
                pointer-events: none;
                z-index: 9999;
                animation: fireworkFade 1.5s ease forwards;
            `;
            container.appendChild(el);
            setTimeout(() => el.remove(), 1500);
        }, i * 100);
    }
}

function showSecretBubble() {
    hideAllBubbles();
    secretBubble.textContent = getSecretText();
    secretBubble.classList.add('active');
    spawnFireworks();
    setTimeout(() => secretBubble.classList.remove('active'), 3000);
}

function showRandomBubble() {
    if (normalBubbles.length === 0) return;
    const roll = Math.random();
    if (roll < 0.10) {
        showSecretBubble();
    } else {
        showNormalBubble();
    }
}

function handleShiftPress() {
    shiftCount++;
    clearTimeout(shiftTimer);
    shiftTimer = setTimeout(() => { shiftCount = 0; }, 800);
    if (shiftCount >= 3) {
        shiftCount = 0;
        showSecretBubble();
    }
}

function handleCodeInput(e) {
    if (e.key >= '0' && e.key <= '9') {
        codeBuffer += e.key;
        clearTimeout(codeTimer);
        codeTimer = setTimeout(() => { codeBuffer = ''; }, 1000);
        if (codeBuffer.includes('67')) {
            codeBuffer = '';
            showSecretBubble();
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') handleShiftPress();
    handleCodeInput(e);
});

function startBubbleAnimation() {
    const pixelArt = document.querySelector('.pixel-art-container');
    if (!pixelArt) return;

    pixelArt.addEventListener('mouseenter', () => {
        showRandomBubble();
        bubbleInterval = setInterval(showRandomBubble, 2500);
    });

    pixelArt.addEventListener('mouseleave', () => {
        clearInterval(bubbleInterval);
        hideAllBubbles();
    });
}

startBubbleAnimation();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '\u2713' : type === 'error' ? '\u2717' : '\u2139'}</span>
        <span class="notification-message">${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#3fb950' : type === 'error' ? '#f85149' : '#58a6ff'};
        color: #0d1117;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.875rem;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(animStyle);

// Header scroll effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill cards tilt effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Console Easter egg
console.log('%c Dev Igor Branco - Portfólio ', 'background: #3fb950; color: #0d1117; font-size: 14px; padding: 8px 12px; border-radius: 4px; font-family: monospace;');
