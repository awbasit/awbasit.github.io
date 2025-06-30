// Loading Screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Scroll Spy for Navigation
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

// Typewriter Effect
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

// Animate Skills Progress Bars
function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    skillProgress.forEach(progress => {
        const level = progress.getAttribute('data-level');
        progress.style.width = level;
    });
}

// Intersection Observer for Animations
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

// Certifications Filter
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
        });
    });
});

// Fetch and Display Projects
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
    
    // Display projects
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card animate delay-${index % 3}`;
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" class="btn btn-outline" target="_blank"><i class="bi bi-eye"></i> Live Demo</a>` : ''}
                    ${project.githubLink ? `<a href="${project.githubLink}" class="btn btn-primary" target="_blank"><i class="bi bi-github"></i> View Code</a>` : ''}
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
});

// Contact Form Submission
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
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}