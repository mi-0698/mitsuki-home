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
