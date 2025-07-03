// Enhanced Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    // Animate loading dots
    const loadingDots = document.querySelector('.loading-dots');
    let dotCount = 0;
    
    const dotInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        if (loadingDots) loadingDots.textContent = '.'.repeat(dotCount);
    }, 500);

    // Simulate content loading
    setTimeout(() => {
        clearInterval(dotInterval);
        const loading = document.getElementById('loading');
        
        if (loading && typeof gsap !== 'undefined') {
            // GSAP fade out animation
            gsap.to(loading, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    loading.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        } else if (loading) {
            // Fallback animation
            loading.style.transition = 'opacity 0.5s ease';
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }, 2000);

    // Initialize AOS with responsive settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: function() {
                // Disable AOS on mobile devices for better performance
                return window.innerWidth < 768;
            }
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Enhanced Mobile Navigation with responsive handling
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

function initMobileNavigation() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            header?.classList.toggle('nav-open');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open');
            
            // Enhanced GSAP animation for menu items
            if (navMenu.classList.contains('active') && typeof gsap !== 'undefined') {
                gsap.from('.nav-item', {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                header?.classList.remove('nav-open');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                header?.classList.remove('nav-open');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Enhanced Responsive Smooth Scrolling with GSAP
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle home link
            if (targetId === '#home') {
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: { y: 0 },
                        duration: window.innerWidth < 768 ? 0.8 : 1,
                        ease: "power2.inOut"
                    });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                updateActiveNavLink(this);
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate responsive offset
                const headerHeight = header ? header.offsetHeight : 80;
                const offset = window.innerWidth < 768 ? headerHeight + 20 : headerHeight;
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: {
                            y: targetElement,
                            offsetY: offset
                        },
                        duration: window.innerWidth < 768 ? 0.8 : 1,
                        ease: "power2.inOut"
                    });
                } else {
                    // Fallback smooth scroll
                    const targetPosition = targetElement.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                updateActiveNavLink(this);
            }
        });
    });
}

// Helper function to update active nav link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Enhanced Responsive Scroll Spy for Navigation
function initScrollSpy() {
    let ticking = false;
    
    function updateScrollSpy() {
        const scrollPosition = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 80;
        const offset = window.innerWidth < 768 ? headerHeight + 50 : headerHeight + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Enhanced Back to top button with responsive positioning
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            const showThreshold = window.innerWidth < 768 ? 200 : 300;
            if (scrollPosition > showThreshold) {
                backToTop.classList.add('active');
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.classList.remove('active');
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
                backToTop.style.transform = 'translateY(20px)';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollSpy);
            ticking = true;
        }
    });
}

// Enhanced Professional Typewriter Effect with Responsive Text
function initTypewriter() {
    const typewriterContainer = document.querySelector('.typewriter-container');
    if (!typewriterContainer) return;

    const typewriterText = typewriterContainer.querySelector('.typewriter-text');
    const cursor = typewriterContainer.querySelector('.typewriter-cursor');
    
    if (!typewriterText || !cursor) return;

    let texts;
    try {
        texts = JSON.parse(typewriterContainer.getAttribute('data-text').replace(/'/g, '"'));
    } catch (e) {
        texts = ["Machine Learning Engineer", "AI Researcher", "Data Scientist"];
    }

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Responsive typing speeds
    const isMobile = window.innerWidth < 768;
    let typingSpeed = isMobile ? 100 : 80;
    let pauseTime = isMobile ? 1200 : 1400;

    function type() {
        const current = texts[textIndex];
        if (isDeleting) {
            typewriterText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === current.length) {
            setTimeout(() => { isDeleting = true; type(); }, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 400);
        } else {
            setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
        }
    }

    // Start typing
    typewriterText.textContent = '';
    cursor.textContent = '|';
    type();
}

// Responsive Skills Animation
function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    skillProgress.forEach(progress => {
        const level = progress.getAttribute('data-level');
        if (typeof gsap !== 'undefined') {
            gsap.to(progress, {
                width: level,
                duration: window.innerWidth < 768 ? 1 : 1.5,
                ease: "power2.out"
            });
        } else {
            // Fallback animation
            progress.style.transition = `width ${window.innerWidth < 768 ? 1 : 1.5}s ease`;
            progress.style.width = level;
        }
    });
}

// Enhanced Responsive Particles.js
function initParticles() {
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: isMobile ? 30 : isTablet ? 50 : 80,
                    density: {
                        enable: true,
                        value_area: isMobile ? 400 : 800
                    }
                },
                color: {
                    value: "#4361ee"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: isMobile ? 0.3 : 0.5,
                    random: false
                },
                size: {
                    value: isMobile ? 2 : 3,
                    random: true
                },
                line_linked: {
                    enable: !isMobile,
                    distance: isMobile ? 100 : 150,
                    color: "#4361ee",
                    opacity: isMobile ? 0.2 : 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: isMobile ? 1 : 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: !isMobile,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: isMobile ? 100 : 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: isMobile ? 2 : 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Enhanced Responsive Magnetic Buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    // Only apply magnetic effect on non-touch devices
    if (!('ontouchstart' in window)) {
        magneticButtons.forEach(button => {
            if (typeof Magnetic !== 'undefined') {
                new Magnetic(button, {
                    y: window.innerWidth < 768 ? 0.1 : 0.2,
                    x: window.innerWidth < 768 ? 0.1 : 0.2,
                    s: window.innerWidth < 768 ? 0.1 : 0.2,
                    rs: 0.7
                });
            }
        });
    }
}

// Enhanced Responsive Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('light-mode')) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Enhanced Responsive Intersection Observer
function initIntersectionObserver() {
    const observerOptions = {
        threshold: window.innerWidth < 768 ? 0.05 : 0.1,
        rootMargin: window.innerWidth < 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                if (entry.target.classList.contains('skills-container') || 
                    entry.target.querySelector('.skill-progress')) {
                    setTimeout(() => animateSkills(), 200);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.section, .project-card, .cert-card, .research-card, .interest-card, .collaborator-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced Responsive Certifications Filter
function initCertificationFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificationCards = document.querySelectorAll('.cert-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            certificationCards.forEach((card, index) => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        opacity: 0,
                        y: window.innerWidth < 768 ? 10 : 20,
                        duration: 0.2,
                        delay: index * 0.05,
                        onComplete: () => {
                            if (filterValue === 'all') {
                                card.style.display = 'block';
                            } else {
                                const cardCategory = card.getAttribute('data-category');
                                card.style.display = cardCategory === filterValue ? 'block' : 'none';
                            }
                            
                            gsap.to(card, {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                delay: 0.1
                            });
                        }
                    });
                } else {
                    // Fallback animation
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        if (filterValue === 'all') {
                            card.style.display = 'block';
                        } else {
                            const cardCategory = card.getAttribute('data-category');
                            card.style.display = cardCategory === filterValue ? 'block' : 'none';
                        }
                        card.style.opacity = '1';
                    }, 150);
                }
            });
        });
    });
}

// Enhanced Responsive Projects Loading
function initProjectsLoading() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Sample projects data
    const projects = [
        {
            title: "Blockchain Supply Chain",
            description: "A blockchain-based solution for tracking cocoa supply chain to ensure transparency and sustainability.",
            image: "images/blockchain.jpg",
            tags: ["Blockchain", "Smart Contracts", "Supply Chain"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            title: "Network Intrusion Detection",
            description: "Deep learning model for detecting network intrusions using convolutional neural networks.",
            image: "images/network.jpg",
            tags: ["Deep Learning", "Cybersecurity", "CNN"],
            githubLink: "#"
        },
        {
            title: "Hypothyroid Disease Prediction",
            description: "Machine learning model to predict hypothyroid disease using patient medical data.",
            image: "images/profile2.png",
            tags: ["Machine Learning", "Healthcare", "Classification"],
            liveLink: "#",
            githubLink: "#"
        }
    ];
    
    // Display projects with responsive animations
    const projectImages = [
        "images/blockchain.jpg",
        "images/network.jpg", 
        "images/profile2.png"
    ];
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card delay-${index % 3}`;
        
        projectCard.innerHTML = `
            <div class="project-image-container">
                <img src="${projectImages[index] || 'images/profile2.png'}" alt="${project.title}" class="project-image">
                <div class="project-overlay"></div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" class="btn btn-outline btn-magnetic" target="_blank"><i class="bi bi-eye"></i> Live Demo</a>` : ''}
                    ${project.githubLink ? `<a href="${project.githubLink}" class="btn btn-primary btn-magnetic" target="_blank"><i class="bi bi-github"></i> View Code</a>` : ''}
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
        
        // Responsive project card animation
        if (typeof gsap !== 'undefined') {
            gsap.from(projectCard, {
                opacity: 0,
                y: window.innerWidth < 768 ? 30 : 50,
                duration: window.innerWidth < 768 ? 0.6 : 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: projectCard,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    });
}

// Enhanced Responsive Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;
        
        console.log({ name, email, subject, message });
        
        // Enhanced responsive success animation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="bi bi-check-circle"></i> Sent!';
        submitButton.disabled = true;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(submitButton, {
                backgroundColor: '#4BB543',
                duration: 0.3
            });
            
            setTimeout(() => {
                gsap.to(submitButton, {
                    backgroundColor: '#4361ee',
                    duration: 0.3,
                    onComplete: () => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                    }
                });
            }, 2000);
        } else {
            // Fallback
            submitButton.style.backgroundColor = '#4BB543';
            setTimeout(() => {
                submitButton.style.backgroundColor = '#4361ee';
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        }
        
        contactForm.reset();
    });
}

// Enhanced Responsive Hover Effects
function initHoverEffects() {
    // Only apply hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
        document.querySelectorAll('.hover-effect').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                element.style.setProperty('--mouse-x', `${x}px`);
                element.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
}

// Enhanced Window Resize Handler
function handleResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize particles with new dimensions
            if (document.getElementById('particles-js') && typeof pJSDom !== 'undefined' && pJSDom[0]) {
                pJSDom[0].pJS.fn.vendors.destroypJS();
                initParticles();
            }
            
            // Update AOS on resize
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Update GSAP ScrollTrigger
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSmoothScrolling();
    initScrollSpy();
    initTypewriter();
    initParticles();
    initMagneticButtons();
    initThemeToggle();
    initIntersectionObserver();
    initCertificationFilter();
    initProjectsLoading();
    initContactForm();
    initHoverEffects();
    handleResize();
    
    // Initialize research card toggles
    document.querySelectorAll('.research-card-header').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.research-card');
            card.classList.toggle('open');
        });
    });
});