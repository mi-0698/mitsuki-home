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

const ambientContainer = document.createElement('div');
ambientContainer.className = 'ambient-container';
ambientContainer.setAttribute('aria-hidden', 'true');
document.body.appendChild(ambientContainer);

const ambientCount = 6;
for (let i = 0; i < ambientCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'ambient-bubble';
    const size = Math.random() * 45 + 35;
    const left = Math.random() * 88 + 6;
    const duration = Math.random() * 8 + 14;
    const delay = Math.random() * 14;
    const drift = (Math.random() - 0.5) * 80;
    bubble.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${left}%`,
        `--duration:${duration}s`,
        `--drift:${drift}px`,
        `animation-delay:${delay}s`
    ].join(';');
    ambientContainer.appendChild(bubble);
}

document.addEventListener('pointerdown', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    const rippleSize = Math.random() * 30 + 175;
    ripple.style.cssText = [
        `width:${rippleSize}px`,
        `height:${rippleSize}px`,
        `left:${e.clientX}px`,
        `top:${e.clientY}px`
    ].join(';');
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 900);

    const bubbleCount = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < bubbleCount; i++) {
        const b = document.createElement('div');
        b.className = 'soap-bubble';
        const size = Math.random() * 18 + 36;
        const stagger = i * 0.15;
        const driftX = (Math.random() - 0.5) * 55;
        const riseY = Math.random() * 35 + 110;
        b.style.cssText = [
            `width:${size}px`,
            `height:${size}px`,
            `left:${e.clientX}px`,
            `top:${e.clientY}px`,
            `--drift-x:${driftX}px`,
            `--rise-y:${riseY}px`,
            `animation-delay:${stagger}s`
        ].join(';');
        document.body.appendChild(b);
        setTimeout(() => b.remove(), (stagger + 2.4) * 1000);
    }
});

