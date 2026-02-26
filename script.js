(() => {
    'use strict';

    const slides       = document.querySelectorAll('.slide');
    const dots         = document.querySelectorAll('.dot');
    const prevBtn      = document.querySelector('.prev');
    const nextBtn      = document.querySelector('.next');
    const progressFill = document.getElementById('progressFill');
    const currentCount = document.getElementById('currentCount');
    const header       = document.getElementById('header');
    const cursor       = document.getElementById('cursor');
    const hamburger    = document.getElementById('hamburger');
    const navDrawer    = document.getElementById('navDrawer');

    const TOTAL       = slides.length;
    const INTERVAL_MS = 4500;

    let currentSlide  = 0;
    let autoplayTimer = null;
    let isAnimating   = false;

    // Cursor
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });

    // Header scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Hambúrguer
    hamburger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = navDrawer.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        navDrawer.setAttribute('aria-hidden', String(!isOpen));
    });
    navDrawer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navDrawer.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            navDrawer.setAttribute('aria-hidden', 'true');
        });
    });
    document.addEventListener('click', e => {
        if (navDrawer.classList.contains('open') &&
            !header.contains(e.target) && !navDrawer.contains(e.target)) {
            navDrawer.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });

    // Progress bar
    function startProgress() {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        void progressFill.offsetWidth;
        progressFill.style.transition = `width ${INTERVAL_MS}ms linear`;
        progressFill.style.width = '100%';
    }
    function stopProgress() {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
    }

    // Mostrar slide
    function showSlide(index) {
        if (isAnimating || index === currentSlide) return;
        isAnimating = true;
        const prev = currentSlide;
        currentSlide = ((index % TOTAL) + TOTAL) % TOTAL;
        slides[prev].classList.remove('active');
        slides[currentSlide].classList.add('active');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
        currentCount.textContent = String(currentSlide + 1).padStart(2, '0');
        startProgress();
        setTimeout(() => { isAnimating = false; }, 950);
    }

    // Autoplay
    function startAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => showSlide(currentSlide + 1), INTERVAL_MS);
    }
    function resetAutoplay() { startAutoplay(); startProgress(); }

    // Controles
    nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); resetAutoplay(); });
    prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); resetAutoplay(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.dataset.index, 10));
            resetAutoplay();
        });
    });

    // Teclado
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { showSlide(currentSlide + 1); resetAutoplay(); }
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { showSlide(currentSlide - 1); resetAutoplay(); }
    });

    // Swipe touch
    let touchStartX = 0, touchStartY = 0;
    const carousel = document.getElementById('carousel');
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            dx < 0 ? showSlide(currentSlide + 1) : showSlide(currentSlide - 1);
            resetAutoplay();
        }
    }, { passive: true });

    // Pausa no hover
    carousel.addEventListener('mouseenter', () => { clearInterval(autoplayTimer); stopProgress(); });
    carousel.addEventListener('mouseleave', resetAutoplay);

    // Init
    startAutoplay();
    startProgress();
})();