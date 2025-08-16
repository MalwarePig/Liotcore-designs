// ========================================
// MAIN APPLICATION - LIOTCORE DESIGNS
// ========================================

class LiotCoreApp {
    
    constructor() {
        this.scrollProgress = null;
        this.navbar = null;
        this.hamburger = null;
        this.navMenu = null;
        this.isInitialized = false;
        
        // Bind methods
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        // Initialize when DOM is ready
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
            this.setupAnimations();
            this.setupInteractiveElements();
            this.setupParticles();
            this.setupScrollToTop();
            this.setupPerformanceMonitoring();
            this.setupFadeInAnimations(); // <<--- NUEVO

            this.isInitialized = true;
            console.log('LiotCore App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }
    
    cacheElements() {
        this.scrollProgress = document.getElementById('scrollProgress');
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.particlesContainer = document.getElementById('particles');
    }
    
    setupContactButtons() {
        const emailBtn = document.getElementById('emailBtn');
        const whatsappBtn = document.getElementById('whatsappBtn');
        
        if (emailBtn) {
            emailBtn.addEventListener('click', this.handleEmailClick.bind(this));
        }
        
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', this.handleWhatsAppClick.bind(this));
        }
    }
    
    handleEmailClick(e) {
        e.preventDefault();
        
        const subject = encodeURIComponent('Solicitud de Cotización - Desarrollo Web');
        const body = encodeURIComponent(`Hola equipo de LiotCore Designs,

Estoy interesado en sus servicios de desarrollo web y me gustaría solicitar una cotización gratuita.

Por favor, proporcionen información sobre:

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

        window.open(`mailto:ventas@liotcoredesigns.com?subject=${subject}&body=${body}`, '_blank');
    }
    
    handleWhatsAppClick(e) {
        e.preventDefault();
        
        const phoneNumber = '528119765432';
        const message = encodeURIComponent(`¡Hola! 👋 

Estoy interesado en sus servicios de desarrollo web.

Me gustaría solicitar información sobre:

🔸 *Tipo de proyecto:* [Sitio web / Tienda online / Sistema web]
🔸 *Mi empresa:* 
🔸 *Objetivo:* 
🔸 *Presupuesto estimado:* 
🔸 *Timeline:* 

¿Podrían ayudarme con una cotización gratuita?

¡Gracias! 🚀`);

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
    
    setupNavigation() {
        // Mobile menu toggle
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu) {
                    this.navMenu.classList.remove('active');
                }
            });
        });
        
        // Smooth scrolling for navigation links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Timeline step navigation
        const timelineSteps = document.querySelectorAll('.timeline-step');
        timelineSteps.forEach(step => {
            step.addEventListener('click', function() {
                const targetSection = document.getElementById(this.dataset.section);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
            
            // Hover effects for timeline steps
            step.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            step.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    setupScrollEffects() {
        // Throttle scroll events for better performance
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
        
        // Initial call
        this.handleScroll();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Update navbar
        this.updateNavbar(scrollTop);
        
        // Update scroll progress
        this.updateScrollProgress(scrollTop);
        
        // Update timeline progress
        this.updateTimelineProgress(scrollTop);
        
        // Parallax effect for hero
        this.updateParallax(scrollTop);
    }
    
    updateNavbar(scrollTop) {
        if (this.navbar) {
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
    }
    
    updateScrollProgress(scrollTop) {
        if (this.scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            this.scrollProgress.style.width = scrollProgress + '%';
        }
    }
    
    updateTimelineProgress(scrollTop) {
        const sections = ['home', 'seo-content', 'about', 'services', 'portfolio', 'pricing', 'contact'];
        const steps = document.querySelectorAll('.timeline-step');
        const adjustedScrollTop = scrollTop + 200;

        let activeSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && adjustedScrollTop >= section.offsetTop) {
                activeSection = sectionId;
            }
        });

        steps.forEach(step => {
            const isActive = step.dataset.section === activeSection;
            step.classList.toggle('active', isActive);
            
            const stepDot = step.querySelector('.step-dot');
            if (stepDot) {
                stepDot.classList.toggle('active', isActive);
            }
            
            const connector = step.querySelector('.step-connector');
            if (connector) {
                connector.classList.toggle('active', isActive);
            }
        });
    }
    
    updateParallax(scrollTop) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }
    
    handleResize() {
        // Handle resize events if needed
        this.updateScrollProgress(window.pageYOffset);
    }
    
    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationFillMode = 'both';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('[class*="fadeInUp"], [class*="slideIn"]');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Typing effect for hero subtitle
        this.setupTypingEffect();
        
        // Page load animation
        this.setupPageLoadAnimation();
    }
    
    setupFadeInAnimations() {
        const faders = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Para que no se repita cuando sales y entras
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        faders.forEach(el => observer.observe(el));
    }
    
    setupTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            this.typeWriter(subtitle, originalText, 80);
        }
    }
    
    typeWriter(element, text, delay = 100) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        };
        
        setTimeout(type, 1000);
    }
    
    setupPageLoadAnimation() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
    
    setupInteractiveElements() {
        // FAQ Toggle functionality
        this.setupFAQs();
        
        // Service cards hover effects
        this.setupServiceCards();
        
        // Hero avatar animation
        this.setupHeroAvatar();
        
        // Portfolio items
        this.setupPortfolioItems();
        
        // SEO cards
        this.setupSEOCards();
    }
    
    setupFAQs() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });
    }
    
    setupHeroAvatar() {
        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroAvatar) {
            heroAvatar.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });

            heroAvatar.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }
    
    setupPortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const image = this.querySelector('.portfolio-image');
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const image = this.querySelector('.portfolio-image');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    setupSEOCards() {
        const seoCards = document.querySelectorAll('.seo-card');
        seoCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) rotateX(2deg)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    setupParticles() {
        if (!this.particlesContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            this.particlesContainer.appendChild(particle);
        }
    }
    
    setupScrollToTop() {
        const scrollButton = document.createElement('div');
        scrollButton.innerHTML = '↑';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        `;
        
        document.body.appendChild(scrollButton);
        
        const handleScrollToTopVisibility = () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.transform = 'translateY(0)';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.transform = 'translateY(20px)';
            }
        };
        
        window.addEventListener('scroll', handleScrollToTopVisibility);
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.transform = 'translateY(-3px) scale(1.1)';
            scrollButton.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.4)';
        });
        
        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.transform = 'translateY(0) scale(1)';
            scrollButton.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
        });
    }
    
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`Page loaded in ${Math.round(loadTime)}ms`);
            });
        }
    }

}

// Initialize the application
new LiotCoreApp();
