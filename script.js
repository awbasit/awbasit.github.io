// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll-triggered animations
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
  
    const options = {
      root: null,
      threshold: 0.5, // Trigger when 50% of the element is visible
    };
  
    const fillProgress = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const percentage = progressBar.getAttribute('data-percentage');
          progressBar.style.width = percentage;
          observer.unobserve(progressBar);
        }
      });
    };
  
    const observer = new IntersectionObserver(fillProgress, options);
  
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  });

  // script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Certifications Section Animation
    const certificationsSection = document.querySelector('#certifications');

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1 // trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                certificationsSection.classList.add('active');
                observer.unobserve(certificationsSection);
            }
        });
    }, observerOptions);

    sectionObserver.observe(certificationsSection);

    // 2. Filter Functionality
    const filterButtons = certificationsSection.querySelectorAll('.filter-btn');
    const certificationItems = certificationsSection.querySelectorAll('.certification-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            certificationItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // 3. Accordion Functionality
    const accordionHeaders = certificationsSection.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;

            // Toggle 'active' class
            parentItem.classList.toggle('active');

            // Optional: Close other open accordions
            /*
            certificationItems.forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                }
            });
            */
        });
    });
});

// Scroll animation for Projects and Publications sections
window.addEventListener('scroll', function() {
    const projectsSection = document.querySelector('.projects-section');
    const publicationsSection = document.querySelector('.publications-section');

    // Check if the section is in view
    if (projectsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        projectsSection.classList.add('active');
    }

    if (publicationsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        publicationsSection.classList.add('active');
    }
});

