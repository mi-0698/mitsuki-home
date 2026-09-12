const btn = document.querySelector('.menu-btn');
const panel = document.querySelector('.menu-panel');
const menuContainer = document.querySelector('.menu');

if (btn && panel) {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = btn.classList.toggle('open');
        panel.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
        panel.setAttribute('aria-hidden', !isOpen);
    });
    document.addEventListener('click', (e) => {
        if (!menuContainer.contains(e.target)) {
            btn.classList.remove('open');
            panel.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
        }
    });
}
const langBtn = document.getElementById('langToggle');
let currentLang = 'ja';

function applyLang(lang) {
    document.querySelectorAll('[data-ja]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
    document.documentElement.lang = lang;
    langBtn.textContent = lang === 'ja' ? 'EN' : 'JA';
}

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ja' ? 'en' : 'ja';
        applyLang(currentLang);
    });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            if (btn) {
                btn.classList.remove('open');
                panel.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('[data-scroll]').forEach(el => scrollObserver.observe(el));

const BUBBLE_GRADIENTS = [
    'radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(126, 200, 227, 0.85) 45%, rgba(68, 166, 212, 0.95) 100%)',
    'radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(181, 229, 207, 0.85) 45%, rgba(110, 200, 165, 0.95) 100%)',
    'radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(195, 215, 250, 0.85) 45%, rgba(135, 175, 240, 0.95) 100%)',
    'radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(150, 225, 235, 0.85) 45%, rgba(70, 190, 215, 0.95) 100%)'
];

document.addEventListener('pointerdown', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const count = 7;
    for (let i = 0; i < count; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.random() * 16 + 14;
        const tx = (Math.random() - 0.5) * 80;
        const ty = -(Math.random() * 55 + 45);
        const delay = Math.random() * 0.1;
        const duration = 0.75 + Math.random() * 0.35;
        b.style.cssText = [
            `width:${size}px`,
            `height:${size}px`,
            `left:${x - size / 2}px`,
            `top:${y - size / 2}px`,
            `background:${BUBBLE_GRADIENTS[Math.floor(Math.random() * BUBBLE_GRADIENTS.length)]}`,
            `--tx:${tx}px`,
            `--ty:${ty}px`,
            `animation-delay:${delay}s`,
            `animation-duration:${duration}s`
        ].join(';');
        document.body.appendChild(b);
        b.addEventListener('animationend', () => b.remove());
        setTimeout(() => b.remove(), (delay + duration) * 1000 + 200);
    }
});


const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const text = tagline.dataset[currentLang] || tagline.textContent.trim();
    tagline.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    tagline.appendChild(cursor);
    let i = 0;
    function type() {
        if (i < text.length) {
            tagline.insertBefore(document.createTextNode(text[i]), cursor);
            i++;
            setTimeout(type, 48);
        } else {
            setTimeout(() => cursor.remove(), 1800);
        }
    }
    setTimeout(type, 500);
}
