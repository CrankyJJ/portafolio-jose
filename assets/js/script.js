document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // INTERSECTION OBSERVER — Scroll Animations
    // =========================================
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .stagger-children'
    );
    animatedElements.forEach(el => observer.observe(el));

    // =========================================
    // NAVBAR — Scroll Effect
    // =========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // =========================================
    // MOBILE NAVIGATION
    // =========================================
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : '';
    });

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.style.overflow = '';
        });
    });

    // =========================================
    // SMOOTH SCROLLING
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // CURSOR GLOW (Desktop only)
    // =========================================
    const cursorGlow = document.querySelector('.cursor-glow');

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });
    }

    // =========================================
    // ACTIVE NAV LINK — Scroll Spy
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // =========================================
    // HERO CHIPS — Subtle float animation
    // =========================================
    const heroChips = document.querySelectorAll('.hero-chip');
    heroChips.forEach((chip, index) => {
        chip.style.animationDelay = `${index * 0.15}s`;
    });

    // =========================================
    // TECH PILLS — Hover ripple effect
    // =========================================
    const techPills = document.querySelectorAll('.tech-pill');
    techPills.forEach(pill => {
        pill.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.15s ease';
        });
        pill.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // =========================================
    // STAT CARDS — Count up animation
    // =========================================
    const statCards = document.querySelectorAll('.stat-card');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'countUp 0.6s ease forwards';
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statCards.forEach(card => statObserver.observe(card));

    // =========================================
    // TILT EFFECT on Project Cards
    // =========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // =========================================
    // FORM SUBMIT FEEDBACK
    // =========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitBtn = this.querySelector('.btn-submit');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>✓ Abriendo email...</span>';
            submitBtn.style.background = '#22c55e';

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // =========================================
    // PARALLAX on Hero Grid
    // =========================================
    const heroGrid = document.querySelector('.hero-bg-grid');
    if (heroGrid && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
        }, { passive: true });
    }

    // =========================================
    // PAGE LOAD — Reveal sequence
    // =========================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

});
