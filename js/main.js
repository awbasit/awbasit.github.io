// Enhanced Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    // Animate loading dots
    const loadingDots = document.querySelector('.loading-dots');
    let dotCount = 0;
    
    const dotInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingDots.textContent = '.'.repeat(dotCount);
    }, 500);

    // Simulate content loading
    setTimeout(() => {
        clearInterval(dotInterval);
        const loading = document.getElementById('loading');
        
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
    }, 2000);

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // GSAP animation for menu
    if (navMenu.classList.contains('active')) {
        gsap.from('.nav-item', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced Smooth Scrolling with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // GSAP smooth scroll
            gsap.to(window, {
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                duration: 1,
                ease: "power2.inOut"
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Enhanced Scroll Spy for Navigation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
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
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (scrollPosition > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Enhanced Typewriter Effect with GSAP
class Typewriter {
    constructor(element, texts, speed = 100, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pause = pause;
        this.currentText = '';
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.currentText = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.currentText = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        this.element.textContent = this.currentText;
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.currentText === currentText) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const texts = typewriterElement.getAttribute('data-text').replace(/['"]+/g, '').split(',');
        new Typewriter(typewriterElement, texts);
    }
});

// Animate Skills Progress Bars with GSAP
function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    skillProgress.forEach(progress => {
        const level = progress.getAttribute('data-level');
        gsap.to(progress, {
            width: level,
            duration: 1.5,
            ease: "power2.out"
        });
    });
}

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
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
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#4361ee",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
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
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Initialize Magnetic Buttons
document.addEventListener('DOMContentLoaded', function() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(button => {
        new Magnetic(button, {
            y: 0.2,
            x: 0.2,
            s: 0.2,
            rs: 0.7
        });
    });
});

// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
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
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            if (entry.target.classList.contains('skills-container')) {
                animateSkills();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .project-card, .certification-card, .news-card, .interest-card, .collaborator-card').forEach(section => {
    observer.observe(section);
});

// Enhanced Certifications Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const certificationCards = document.querySelectorAll('.certification-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        certificationCards.forEach(card => {
            gsap.to(card, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                    
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        delay: 0.1
                    });
                }
            });
        });
    });
});

// Enhanced Projects Loading with GSAP
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    
    // Sample projects data - replace with your actual projects data
    const projects = [
        {
            title: "Blockchain Supply Chain",
            description: "A blockchain-based solution for tracking cocoa supply chain to ensure transparency and sustainability.",
            image: "images/project1.jpg",
            tags: ["Blockchain", "Smart Contracts", "Supply Chain"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            title: "Network Intrusion Detection",
            description: "Deep learning model for detecting network intrusions using convolutional neural networks.",
            image: "images/project2.jpg",
            tags: ["Deep Learning", "Cybersecurity", "CNN"],
            githubLink: "#"
        },
        {
            title: "Hypothyroid Disease Prediction",
            description: "Machine learning model to predict hypothyroid disease using patient medical data.",
            image: "images/project3.jpg",
            tags: ["Machine Learning", "Healthcare", "Classification"],
            liveLink: "#",
            githubLink: "#"
        }
    ];
    
    // Display projects with GSAP animations
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card delay-${index % 3}`;
        
        projectCard.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
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
        
        // Animate project cards in sequence
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
    });
});

// Enhanced Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, subject, message });
        
        // Show success message with animation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="bi bi-check-circle"></i> Sent!';
        submitButton.disabled = true;
        
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
        
        // Reset form
        contactForm.reset();
    });
}

// Add hover effects to all hover-effect elements
document.querySelectorAll('.hover-effect').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});