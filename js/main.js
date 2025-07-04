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
    // Handle all anchor links (navigation, footer links, buttons)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle home link
            if (targetId === '#home' || targetId === '#') {
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: { y: 0 },
                        duration: 1,
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
                const offset = headerHeight + 20;
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: {
                            y: targetElement,
                            offsetY: offset
                        },
                        duration: 1,
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

// Enhanced Projects Loading
function initProjectsLoading() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Sample projects data
    const projects = [
        {
            title: "Car Streaming Data Pipeline",
            description: " Implemented robust data validation checks, improving pipeline reliability\
             by 90%; Designed efficient Redshift Upsert strategy using staging tables, reducing duplication errors by 80%",
            image: "images/car rental.png",
            tags: ["AWS Glue", "Step Functions", "Redshift", "Aurora MySQL", "S3", "SQL"],
            githubLink: "https://github.com/wabasit/car-rental-pipeline"
        },
        {
            title: "Batch ETL for Rental Marketplace",
            description: "Used Glue & Step Functions to deliver weekly rental KPIs and user engagement\
             metrics; Used Step Functions to orchestrate Glue jobs, ensuring error handling and \
             stepwise execution; Computed key business metrics: Occupancy Rate, Average Listing Price, \
             Repeat Customer Rate, and Top Performing  Listings; Enhanced data transformation accuracy and traceability with custom Glue scripts and logging",
            image: "images/rental.png",
            tags: ["AWS Glue", "Step Functions", "Redshift", "Aurora MySQL", "S3", "SQL"]
        },
        {
            title: "Speech Therapy application",
            description: "This is a speech therapy application for aphasic people",
            image: "images/aphasia.png",
            tags: ["HTML", "CSS", "JavaScript"],
            liveLink: "https://alphasia-research-site.onrender.com/",
            githubLink: "https://github.com/yourusername/projectone"
        },
        {
            title: "Rock Classifier",
            description: "Analyzed 10,000 rock data and implemented classification models,\
             Support Vector Machine, Random Forest, Gradient boost and Adaboost to predict \
             the classification of rocks leveraging pandas, sklearn, matplotlib and seaborn",
            image: "images/rock.jpg",
            tags: ["SVM", "XGBOOST", "ADABOOST", "RANDOM FOREST"],
            githubLink: "https://github.com/awbasit/Rocks-Classification"
        },
        {
            title: "Flouride Concentration Prediction in Groundwater",
            description: "Analyzed 2013 groundwater samples with hydrogeochemical compositions\
             and implemented regression models, SVM, XGBoost, and Stochastic Gradient Descent \
             XGBoost ranked as the best model with a mean squared error of 6.556056  and accuracy \
             score 0.076923 ahead of SVM and Stochastic Gradient Descent",
            image: "images/rock.jpg",
            tags: ["SVM", "XGBOOST", "STOCHASTIC GRADIENT DESCENT"],
            githubLink: "https://github.com/awbasit/Rocks-Classification"
        },
        {
            title: "Employee Retention Prediction",
            description: "This project was built to predict employee retaining or leaving",
            image: "https://images.inc.com/uploaded_files/image/1920x1080/getty_539953664_213316.jpg",
            tags: ["SCIKIT-LEARN", "NUMPY", "PANDAS"],
            githubLink: "https://github.com/awbasit/employee-retention-predictor"
        },
        {
            title: "Real-Time eCommerce Data Streaming with Apache Kafka and PostgreSQL",
            description: "Designed a Kafka-based eCommerce pipeline streaming 30,000+ records,\
             reducing ingestion lag by 70%. Implemented real-time health monitoring with <3s \
             latency from source to dashboard",
            image: "images/ecommerce.png",
            tags: ["Python", "Kafka", "PostgreSQL", "Docker"],
            githubLink: "https://github.com/wabasit/GTP-TRAINING/tree/lab5/Kafka_stream"
        },
        {
            title: "Inventory Management System Using PostgreSQL",
            description: "Reduced inventory discrepancies by 98% and enabled real-time stock \
             monitoring through automation and optimized querying. Optimized query performance\
             and indexing, resulting in a 65% improvement in report generation speed",
            image: "images/inventory.png",
            tags: ["SQL", "Stored Procedures", "Triggers", "Python (ETL)"],
            githubLink: "https://github.com/wabasit/GTP-TRAINING/tree/lab3/inventory-management-system"
        },
        {
            title: "AWS Airflow & Redshift Orchestration",
            description: "Built MWAA pipelines moving S3 data to Redshift, cutting manual load \
             tasks by 100%. Configured AWS IAM roles, VPC, and CloudWatch logging for secure and \
             observable operations. Reduced data latency from S3 to Redshift by 85% with streamlined \
             Airflow task dependencies and retries. Validated pipeline success using Airflow’s monitoring UI and log inspection",
            image: "images/airflow.png",
            tags: ["AWS MWAA", "Apache Airflow", "S3", "Redshift", "Python"]
        },
        {
            title: "Flight Data Analysis Apache Airflow",
            description: "The Flight Price Analysis Pipeline successfully automates the processing \
            of flight price data using Airflow, MySQL, and PostgreSQL in a Dockerized environment. \
            The pipeline architecture ensures modularity and scalability, with clear separation of \
            staging (MySQL) and analytics (PostgreSQL) data. The flight_price_analysis DAG via the \
            Airflow UI orchestrates six tasks to create tables, load, \
            validate, transform, and verify data, computing the average fare per airline as the primary KPI",
            image: "images/flight.jpg",
            tags: ["Apache Airflow", "PostgreSQL", "Docker", "Python"],
            githubLink: "https://github.com/wabasit/GTP-TRAINING/tree/lab6/airflow/flight_airflow_analysis"
        },
        {
            title: "Music Streaming Analytics Pipeline with Airflow",
            description: "Delivered genre/hour-based KPIs using Redshift and Airflow DAGs; improved\
             BI report speed by 35%; Implemented robust data validation checks, improving pipeline \
             reliability by 90%; Designed efficient Redshift Upsert strategy using staging tables, reducing duplication errors by 99%",
            image: "images/music.png",
            tags: ["RDS", "SQL", "Apache Airflow", "S3", "Redshift", "Python"],
            githubLink: "https://github.com/wabasit/music-streaming-pipeline"
        },
        {
            title: "Batch ETL for Rental Marketplace",
            description: "Used Glue & Step Functions to deliver weekly rental KPIs and user engagement\
             metrics; Used Step Functions to orchestrate Glue jobs, ensuring error handling and \
             stepwise execution; Computed key business metrics: Occupancy Rate, Average Listing Price, \
             Repeat Customer Rate, and Top Performing  Listings; Enhanced data transformation accuracy and traceability with custom Glue scripts and logging",
            image: "images/profile2.png",
            tags: ["AWS Glue", "Step Functions", "Redshift", "Aurora MySQL", "S3", "SQL"]
        }
    ];
    
    // Display projects
    const projectImages = [
        "images/blockchain.jpg",
        "images/network.jpg", 
        "images/profile2.png",
        "images/rental.png",
        "images/car rental.png", 
        "images/ecommerce.png",
        "images/music.png",
        "images/inventory.png",
        "images/rock.jpg",
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_539953664_213316.jpg",
        "images/airflow.png",
        "images/flight.jpg",
        "images/groundwater.png",
        "images/employee.png",
        "images/aphasia.png"
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
        
        // Animate project cards
        if (typeof gsap !== 'undefined') {
            gsap.from(projectCard, {
                opacity: 0,
                y: 50,
                duration: 0.8,
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