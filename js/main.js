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

// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

function syncHeaderHeight() {
    if (!header) return;
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

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

// FIXED: Enhanced Smooth Scrolling for Navigation and Buttons
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
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
    
    // Find the corresponding nav link if clicked element is not a nav link
    const href = activeLink.getAttribute('href');
    const correspondingNavLink = document.querySelector(`.nav-link[href="${href}"]`);
    if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
    } else {
        activeLink.classList.add('active');
    }
}

// FIXED: Enhanced Scroll Spy for Navigation
function initScrollSpy() {
    let ticking = false;
    
    function updateScrollSpy() {
        const scrollPosition = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 80;
        const offset = headerHeight + 100;
        
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
        
        // FIXED: Back to top button functionality
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            const showThreshold = 300;
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

// Professional Typewriter Effect
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
    let typingSpeed = 80;
    let pauseTime = 1400;

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

// Animate Skills Progress Bars
function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    skillProgress.forEach(progress => {
        const level = progress.getAttribute('data-level');
        if (typeof gsap !== 'undefined') {
            gsap.to(progress, {
                width: level,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    });
}

// Enhanced Responsive Particles.js
function initParticles() {
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim() || '#4459b8';
        
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
                    value: primaryColor
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
                    color: primaryColor,
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

// Enhanced Magnetic Buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    // Only apply magnetic effect on non-touch devices
    if (!('ontouchstart' in window) && typeof Magnetic !== 'undefined') {
        magneticButtons.forEach(button => {
            new Magnetic(button, {
                y: 0.2,
                x: 0.2,
                s: 0.2,
                rs: 0.7
            });
        });
    }
}

// Enhanced Theme Toggle
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

// Enhanced Intersection Observer
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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

// FIXED: Enhanced Certifications Filter with proper data attributes
function initCertificationFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificationCards = document.querySelectorAll('.cert-card');

    // First, add data-category attributes to certification cards based on their content
    certificationCards.forEach(card => {
        if (card.hasAttribute('data-category')) return;

        const title = card.querySelector('.cert-title')?.textContent.toLowerCase() || '';
        const provider = card.querySelector('.cert-provider')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.cert-card-body p')?.textContent.toLowerCase() || '';
        
        // Categorize based on content
        if (title.includes('data') || title.includes('python') || description.includes('data science')) {
            card.setAttribute('data-category', 'data-science');
        } else if (title.includes('machine learning') || title.includes('classification') || title.includes('regression') || description.includes('machine learning')) {
            card.setAttribute('data-category', 'machine-learning');
        } else {
            card.setAttribute('data-category', 'others');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            certificationCards.forEach((card, index) => {
                const shouldShow = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                
                if (typeof gsap !== 'undefined') {
                    if (shouldShow) {
                        gsap.set(card, { display: 'block' });
                        gsap.fromTo(card, 
                            { opacity: 0, y: 20 },
                            { 
                                opacity: 1, 
                                y: 0, 
                                duration: 0.5, 
                                delay: index * 0.1,
                                ease: "power2.out"
                            }
                        );
                    } else {
                        gsap.to(card, {
                            opacity: 0,
                            y: -20,
                            duration: 0.3,
                            onComplete: () => {
                                gsap.set(card, { display: 'none' });
                            }
                        });
                    }
                } else {
                    // Fallback animation
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                    }
                }
            });
        });
    });
}

function initProjectsLoading() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    const projects = [
        {
            title: "ClaraCare",
            icon: "bi-heart-pulse",
            problem: "Diabetes patients need accessible, accurate health-literacy guidance at scale.",
            approach: "Built an end-to-end LLM fine-tuning pipeline using QLoRA supervised fine-tuning and DPO alignment for a diabetes health-literacy assistant.",
            outcome: "AUROC improved from 0.73 to 0.89",
            tags: ["QLoRA", "DPO", "PyTorch", "LLM Fine-tuning"]
        },
        {
            title: "Agentic Email Triage System",
            icon: "bi-envelope-check",
            problem: "High-volume inboxes need intelligent routing without losing human oversight.",
            approach: "Orchestrated n8n workflows with Claude and Gmail API, implementing multi-LLM routing and human-in-the-loop approval gates.",
            outcome: "Automated triage with accountable approval checkpoints",
            tags: ["n8n", "Claude", "Gmail API", "Multi-LLM"]
        },
        {
            title: "WhatsApp Clinical Triage Assistant",
            icon: "bi-chat-dots",
            problem: "Rural Ghana lacks scalable, multilingual first-line clinical guidance for common conditions.",
            approach: "Deployed a WhatsApp bot with Supabase/pgvector backend, deterministic clinical rule engine, and support for English, Twi, and Ga.",
            outcome: "Multilingual malaria and hypertension triage in production",
            tags: ["Supabase", "pgvector", "WhatsApp", "Rule Engine"]
        },
        {
            title: "Paper-to-Insight Pipeline",
            icon: "bi-journal-arrow-up",
            problem: "Research teams spend hours manually summarizing new publications.",
            approach: "Designed an n8n agentic workflow that ingests papers and produces structured research summaries.",
            outcome: "Repeatable agentic summarization pipeline",
            tags: ["n8n", "Agentic AI", "Research Automation"]
        },
        {
            title: "Speech Therapy Platform for Aphasic Patients",
            icon: "bi-mic",
            problem: "Aphasic patients need adaptive rehab tools with validated therapeutic responses.",
            approach: "Led full-stack development of a rehab platform with adaptive learning workflows and NLP-driven response validation.",
            outcome: "Lead Developer — live accessibility-focused platform",
            tags: ["NLP", "Full-stack", "Accessibility", "Adaptive Learning"],
            liveLink: "https://alphasia-research-site.onrender.com/"
        },
        {
            title: "Misinformation Detection via Sentiment Analysis",
            icon: "bi-shield-exclamation",
            problem: "Social media misinformation spreads faster than manual fact-checking can respond.",
            approach: "Lead Researcher on ensemble classifiers (SVM, Naive Bayes, Neural Networks) combined with prompt engineering for social media text.",
            outcome: "Lead Researcher — multi-model classification framework",
            tags: ["SVM", "Neural Networks", "Prompt Engineering", "NLP"]
        },
        {
            title: "Maison Aura",
            icon: "bi-bag-heart",
            problem: "Independent perfume brands need a modern e-commerce storefront with reliable backend.",
            approach: "Full-stack perfume e-commerce platform with React/Vite frontend and FastAPI + SQLite backend.",
            outcome: "End-to-end e-commerce platform shipped",
            tags: ["React", "Vite", "FastAPI", "SQLite"]
        },
        {
            title: "Predictive Maintenance System",
            icon: "bi-gear-wide-connected",
            problem: "Industrial equipment failures cause costly unplanned downtime.",
            approach: "Advised UMaT undergrad thesis on MetroPT-3 dataset modeling with FastAPI + Streamlit, deployed to Railway and Hugging Face Spaces.",
            outcome: "Production deployment on Railway and Hugging Face Spaces",
            tags: ["FastAPI", "Streamlit", "MetroPT-3", "Railway"]
        },
        {
            title: "Real-Time eCommerce Data Streaming",
            icon: "bi-cart-check",
            problem: "E-commerce platforms need sub-second ingestion for operational dashboards.",
            approach: "Designed a Kafka-based pipeline streaming 30,000+ records with PostgreSQL sinks and Dockerized services.",
            outcome: "70% reduction in ingestion lag",
            tags: ["Kafka", "PostgreSQL", "Python", "Docker"],
            githubLink: "https://github.com/wabasit/GTP-TRAINING/tree/lab5/Kafka_stream"
        },
        {
            title: "Music Streaming Analytics Pipeline",
            icon: "bi-music-note-beamed",
            problem: "Streaming platforms need reliable genre and engagement KPIs from batch pipelines.",
            approach: "Built Airflow DAGs with Redshift staging, upsert strategies, and data validation checks.",
            outcome: "35% faster BI reports; 99% fewer duplication errors",
            tags: ["Airflow", "Redshift", "S3", "Python"],
            githubLink: "https://github.com/wabasit/music-streaming-pipeline"
        },
        {
            title: "AWS Airflow & Redshift Orchestration",
            icon: "bi-cloud-upload",
            problem: "Manual S3-to-Redshift loads create latency and operational risk.",
            approach: "Built MWAA pipelines with IAM, VPC, and CloudWatch observability for secure orchestration.",
            outcome: "85% reduction in S3-to-Redshift latency",
            tags: ["AWS MWAA", "Airflow", "Redshift", "S3"]
        }
    ];

    projects.forEach((project, index) => {
        const projectCard = document.createElement('article');
        projectCard.className = `project-card delay-${index % 3}`;

        const imageBlock = project.image
            ? `<img src="${project.image}" alt="${project.title}" class="project-image">`
            : `<span class="project-icon" aria-hidden="true"><i class="bi ${project.icon || 'bi-code-slash'}"></i></span>`;

        projectCard.innerHTML = `
            <div class="project-image-container">
                <div class="project-visual">
                    ${imageBlock}
                </div>
                <div class="project-overlay"></div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-problem"><strong>Problem:</strong> ${project.problem}</p>
                <p class="project-outcome"><strong>Outcome:</strong> ${project.outcome}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <button type="button" class="project-case-toggle" aria-expanded="false">
                    <span>View approach</span>
                    <span class="expand-icon"><i class="bi bi-chevron-down"></i></span>
                </button>
                <div class="project-case-body">
                    <p><strong>Approach:</strong> ${project.approach}</p>
                </div>
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" class="btn btn-outline btn-magnetic" target="_blank" rel="noopener"><i class="bi bi-eye"></i> Live Demo</a>` : ''}
                    ${project.githubLink ? `<a href="${project.githubLink}" class="btn btn-primary btn-magnetic" target="_blank" rel="noopener"><i class="bi bi-github"></i> View Code</a>` : ''}
                </div>
            </div>
        `;

        projectCard.querySelector('.project-case-toggle').addEventListener('click', () => {
            const toggle = projectCard.querySelector('.project-case-toggle');
            const isOpen = projectCard.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });

        projectsContainer.appendChild(projectCard);

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.from(projectCard, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: projectCard,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        }
    });
}

// Impact stats counter — animate once on scroll into view
function initImpactCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        if (prefersReducedMotion || isNaN(target)) {
            el.textContent = target + suffix;
            return;
        }

        const duration = 1500;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));
}

// Enhanced Contact Form
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
        
        // Success animation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="bi bi-check-circle"></i> Sent!';
        submitButton.disabled = true;
        
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim() || '#4459b8';

        if (typeof gsap !== 'undefined') {
            gsap.to(submitButton, {
                backgroundColor: '#4BB543',
                duration: 0.3
            });
            
            setTimeout(() => {
                gsap.to(submitButton, {
                    backgroundColor: primaryColor,
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
                submitButton.style.backgroundColor = primaryColor;
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        }
        
        contactForm.reset();
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
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
            syncHeaderHeight();

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
    syncHeaderHeight();
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
    initImpactCounters();
    initContactForm();
    initHoverEffects();
    handleResize();
});