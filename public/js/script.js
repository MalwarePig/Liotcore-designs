// ========================================
// LIOTCORE DESIGNS - APLICACIÓN OPTIMIZADA
// Funciona en cualquier hosting estático (Render, Netlify, etc.)
// No usa variables de entorno ni depende de Node.js
// ========================================

class LiotCoreApp {
    constructor() {
        this.scrollProgress = null;
        this.navbar = null;
        this.hamburger = null;
        this.navMenu = null;
        this.isInitialized = false;

        // Configuración del marquee de logos
        this.logosPath = '../public/img/clients/';
        this.existingLogos = [
            '1.webp', '2.webp', '3.webp', '4.webp',
            '5.webp', '6.webp', '7.webp', '8.webp',
            '9.webp', '10.webp'
        ];

        // Bind de métodos
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);

        // Inicialización diferida
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;

        try {
            this.cacheElements();
            this.setupContactButtons();
            this.setupNavigation();
            this.setupScrollEffects();

            // Diferir funcionalidades no críticas hasta después de carga
            window.addEventListener('load', () => {
                this.setupAnimations();
                this.setupFadeInAnimations();
                this.setupInteractiveElements();
                this.setupParticles();
                this.setupLogoMarquee();
                this.setupPerformanceMonitoring();
                this.setupHorizontalScroll(); // Inicializar scroll horizontal aquí
            });

            this.isInitialized = true;
        } catch (error) {
            // Solo descomenta la siguiente línea si necesitas depurar
            // console.error('Error al inicializar la app:', error);
        }
    }

    cacheElements() {
        this.scrollProgress = document.getElementById('scrollProgress');
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.particlesContainer = document.getElementById('particles');
    }

    // ========================================
    // LOGO MARQUEE (sin verificación HTTP)
    // ========================================
    setupLogoMarquee() {
        const marqueeContainer = document.querySelector('.marquee-container');
        if (marqueeContainer) {
            this.logoMarquee = new LogoMarquee(this.logosPath, this.existingLogos);
        }
    }

    refreshLogos() {
        if (this.logoMarquee) this.logoMarquee.refresh();
    }

    addLogo(logoName) {
        if (this.logoMarquee) this.logoMarquee.addLogo(logoName);
    }

    setLogosPath(newPath) {
        this.logosPath = newPath;
        if (this.logoMarquee) this.logoMarquee.setLogosPath(newPath);
    }

    // ========================================
    // BOTONES DE CONTACTO
    // ========================================
    setupContactButtons() {
        const emailBtn = document.getElementById('emailBtn');
        const whatsappBtn = document.getElementById('whatsappBtn');

        if (emailBtn) {
            emailBtn.addEventListener('click', (e) => this.handleEmailClick(e));
        }

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => this.handleWhatsAppClick(e));
        }
    }

    handleEmailClick(e) {
        e.preventDefault();
        const subject = encodeURIComponent('Solicitud de Cotización - Desarrollo Web');
        const body = encodeURIComponent(`Hola equipo de LiotCore Designs,

Estoy interesado en sus servicios de desarrollo web y me gustaría solicitar una cotización gratuita.

INFORMACIÓN DE MI PROYECTO:
• Tipo de proyecto: [Sitio web corporativo / Tienda online / Sistema web / Otro]
• Industria o giro de mi empresa: 
• Objetivo principal del proyecto: 
• Funcionalidades específicas que necesito: 
• ¿Tienen diseño existente o necesitan diseño completo?: 
• ¿Requieren integración con sistemas existentes?: 

INFORMACIÓN DE MI EMPRESA:
• Nombre de la empresa: 
• Sitio web actual (si tienen): 
• Tamaño de la empresa: 

DETALLES DEL PROYECTO:
• Presupuesto estimado: 
• Timeline deseado: 
• ¿Es su primer sitio web o una renovación?: 

INFORMACIÓN DE CONTACTO:
• Nombre completo: 
• Teléfono: 
• Mejor horario para contactar: 

Información adicional o comentarios:


¡Gracias por su tiempo y espero su respuesta!

Saludos cordiales.`);

        window.open(`mailto:osvaldodev92@gmail.com?subject=${subject}&body=${body}`, '_blank');
    }

    handleWhatsAppClick(e) {
        e.preventDefault();
        const phoneNumber = '8119757262';
        const message = encodeURIComponent(`¡Hola!

Estoy interesado en nuestros servicios de desarrollo web.

Me gustaría solicitar información.

¿Podrían ayudarme con una cotización?

¡Gracias! `);

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }

    // ========================================
    // NAVEGACIÓN
    // ========================================
    setupNavigation() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
            });
        }

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu) this.navMenu.classList.remove('active');
            });
        });

        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        const timelineSteps = document.querySelectorAll('.timeline-step');
        timelineSteps.forEach(step => {
            step.addEventListener('click', function() {
                const targetSection = document.getElementById(this.dataset.section);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ========================================
    // EFECTOS DE SCROLL
    // ========================================
    setupScrollEffects() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('resize', this.handleResize);
        this.handleScroll();
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;

        if (this.navbar) {
            this.navbar.classList.toggle('scrolled', scrollTop > 50);
        }

        if (this.scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            this.scrollProgress.style.width = `${progress}%`;
        }

        this.updateTimelineProgress(scrollTop);
        this.updateParallax(scrollTop);
    }

    updateTimelineProgress(scrollTop) {
        const sections = ['home', 'seo-content', 'solutions', 'about', 'portfolio', 'pricing', 'contact'];
        const steps = document.querySelectorAll('.timeline-step');
        const adjustedScrollTop = scrollTop + 200;
        let activeSection = 'home';

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && adjustedScrollTop >= section.offsetTop) activeSection = id;
        });

        steps.forEach(step => {
            const isActive = step.dataset.section === activeSection;
            step.classList.toggle('active', isActive);
            const dot = step.querySelector('.step-dot');
            const connector = step.querySelector('.step-connector');
            if (dot) dot.classList.toggle('active', isActive);
            if (connector) connector.classList.toggle('active', isActive);
        });
    }

    updateParallax(scrollTop) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }

    handleResize() {
        this.updateScrollProgress(window.pageYOffset);
    }

    // ========================================
    // ANIMACIONES Y INTERACCIÓN (diferidas)
    // ========================================
    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationFillMode = 'both';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('[class*="fadeInUp"], [class*="slideIn"]').forEach(el => observer.observe(el));
        this.setupPageLoadAnimation();
    }

    setupFadeInAnimations() {
        const faders = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        faders.forEach(el => observer.observe(el));
    }

    setupPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => { document.body.style.opacity = '1'; }, 100);
    }

    setupInteractiveElements() {
        this.setupFAQs();
        this.setupServiceCards();
        this.setupHeroAvatar();
        this.setupPortfolioItems();
        this.setupSEOCards();
    }

    setupFAQs() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
                if (!this.parentElement.classList.contains('active')) {
                    this.parentElement.classList.add('active');
                }
            });
        });
    }

    setupServiceCards() {
        if (window.innerWidth <= 768) return;
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) rotateX(5deg)');
            card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) rotateX(0deg)');
        });
    }

    setupHeroAvatar() {
        const avatar = document.querySelector('.hero-avatar');
        if (!avatar || window.innerWidth <= 768) return;
        avatar.addEventListener('mouseenter', () => avatar.style.transform = 'scale(1.1) rotate(5deg)');
        avatar.addEventListener('mouseleave', () => avatar.style.transform = 'scale(1) rotate(0deg)');
    }

    setupPortfolioItems() {
        if (window.innerWidth <= 768) return;
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const img = item.querySelector('.portfolio-image');
            item.addEventListener('mouseenter', () => img && (img.style.transform = 'scale(1.1)'));
            item.addEventListener('mouseleave', () => img && (img.style.transform = 'scale(1)'));
        });
    }

    setupSEOCards() {
        if (window.innerWidth <= 768) return;
        const cards = document.querySelectorAll('.seo-card');
        cards.forEach((card, i) => {
            card.style.animationDelay = `${i * 0.2}s`;
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) rotateX(2deg)';
                card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });
    }

    // ========================================
    // SCROLL HORIZONTAL - MIGRADO DESDE HTML
    // ========================================
    setupHorizontalScroll() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        const cardsTrack = document.getElementById('cardsTrack');
        const cards = document.querySelectorAll('.service-card');
        const scrollSection = document.querySelector('.scroll-section');
        if (!cardsTrack || !scrollSection || cards.length === 0) return;

        let currentIndex = 0;
        const cardWidth = 420;
        const cardGap = 32;
        const variableX = 85

        const updateTrackWidth = () => {
            const regularCards = cards.length;
            const endElementWidth = window.innerWidth;
            const totalWidth = (regularCards * (cardWidth + cardGap)) + endElementWidth - cardGap;
            cardsTrack.style.width = `${totalWidth}px`;
        };

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const sectionTop = scrollSection.offsetTop;
            const sectionBottom = sectionTop + scrollSection.offsetHeight - window.innerHeight;

            if (scrollTop < sectionTop || scrollTop > sectionBottom) return;

            const progress = (scrollTop - sectionTop) / (sectionBottom - sectionTop);
            const regularCards = cards.length;
            const regularCardsWidth = (regularCards * (cardWidth + cardGap)) - cardGap;
            const endElementWidth = window.innerWidth;
            const endElementStartPoint = endElementWidth;

            let translateX;
            if (progress <= 0.85) {
                const adjustedProgress = progress / 0.85;
                translateX = -adjustedProgress * endElementStartPoint;
            } else {
                translateX = -endElementStartPoint;
            }

            cardsTrack.style.transform = `translateX(${Math.max(-endElementStartPoint, Math.min(0, translateX))}px)`;

            const newIndex = Math.round((progress / 0.85) * cards.length);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= cards.length) {
                currentIndex = newIndex;
            }
        };

        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll);
        window.addEventListener('load', throttledScroll);
        window.addEventListener('resize', () => {
            updateTrackWidth();
            handleScroll();
        });

        updateTrackWidth();
        handleScroll();
    }

    // ========================================
    // PARTÍCULAS (diferidas y ligeras)
    // ========================================
    setupParticles() {
        if (!this.particlesContainer) return;

        const count = window.innerWidth > 768 ? 15 : 5;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 4 + 2}px;
                height: ${p.style.width};
                border-radius: 50%;
                background: #fff;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: float ${Math.random() * 6 + 6}s infinite ease-in-out;
                animation-delay: ${Math.random() * 6}s;
            `;
            this.particlesContainer.appendChild(p);
        }
    }

    // ========================================
    // MONITOREO DE RENDIMIENTO
    // ========================================
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                // Descomenta solo para pruebas: console.log(`Página cargada en ${Math.round(loadTime)}ms`);
            });
        }
    }
}

// ========================================
// CLASE: LOGO MARQUEE (OPTIMIZADA)
// ========================================
class LogoMarquee {
    constructor(logosPath, logoList) {
        this.logosPath = logosPath;
        this.logos = Array.isArray(logoList) ? logoList : [];
        this.marqueeContent = document.getElementById('marqueeContent') || document.querySelector('.marquee-content');
        this.init();
    }

    init() {
        if (!this.marqueeContent) return;

        if (this.logos.length > 0) {
            this.createMarquee();
        } else {
            this.showNoImagesMessage();
        }
    }

    createMarquee() {
        this.marqueeContent.innerHTML = '';

        const fragment = document.createDocumentFragment();
        this.logos.forEach(name => {
            const item = document.createElement('div');
            item.className = 'logo-item';
            const img = document.createElement('img');
            img.src = this.logosPath + name;
            img.alt = `Cliente ${name}`;
            img.loading = 'lazy';
            img.onerror = () => item.style.display = 'none';
            item.appendChild(img);
            fragment.appendChild(item);
        });

        for (let i = 0; i < 3; i++) {
            this.marqueeContent.appendChild(fragment.cloneNode(true));
        }

        const duration = Math.max(60, this.logos.length * 3);
        this.marqueeContent.style.animationDuration = `${duration}s`;
    }

    showNoImagesMessage() {
        this.marqueeContent.innerHTML = '<div class="no-images"><p>No se encontraron logos. Verifica la configuración.</p></div>';
    }

    addLogo(name) {
        if (!this.logos.includes(name)) {
            this.logos.push(name);
            this.createMarquee();
        }
    }

    setLogosPath(path) {
        this.logosPath = path;
        this.createMarquee();
    }

    refresh() {
        this.createMarquee();
    }
}

// Inicializar aplicación
const liotCoreApp = new LiotCoreApp();

// Opcional: expón solo en desarrollo (descomenta si necesitas depurar)
// window.liotCoreApp = liotCoreApp;

 document.querySelectorAll(".acordeon-titulo").forEach(boton => {
            boton.addEventListener("click", () => {
                const item = boton.parentElement;
                item.classList.toggle("activo");

                // Cierra los demás
                document.querySelectorAll(".acordeon-item").forEach(el => {
                    if (el !== item) el.classList.remove("activo");
                });
            });
        });