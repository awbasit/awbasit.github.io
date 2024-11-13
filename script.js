window.addEventListener("load", function() {
  document.getElementById("loading").style.display = "none";
});

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

 
const progressBars = document.querySelectorAll('.progress');
window.addEventListener('scroll', () => {
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage;
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Certifications Section Animation
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

    // Filter Functionality
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

    // Accordion Functionality
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

// Fetch and Render Projects
document.addEventListener('DOMContentLoaded', () => {
  // Function to display the projects dynamically
  function displayProjects(projects) {
      const projectsContainer = document.getElementById('projects-container');
      
      projects.forEach(project => {
          // Create the project card structure
          const projectCard = document.createElement('div');
          projectCard.className = 'col-md-4 mb-4';
          
          projectCard.innerHTML = `
              <div class="card "> 
                  <div class="card-body d-flex flex-column">
                      <h5 class="card-title">${project.title}</h5>
                      <img src="${project.image}" class="card-img-top img-fluid" alt="${project.title} h">
                      <p class="card-text flex-grow-1">${project.description}</p>
                      <div class="mt-auto">
                          ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="btn btn-primary me-2">Live Demo</a>` : ''}
                          ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-secondary">GitHub</a>` : ''}
                      </div>
                      ${project.tags && project.tags.length > 0 ? `
                          <div class="mt-3">
                              ${project.tags.map(tag => `<span class="badge bg-info text-dark me-1">${tag}</span>`).join('')}
                          </div>
                      ` : ''}
                  </div>
              </div>
          `;

          // Append the card to the projects container
          projectsContainer.appendChild(projectCard);
      });
  }

  // Fetch the projects data from the JSON file
  fetch('data/projects.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          displayProjects(data.projects);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          const projectsContainer = document.getElementById('projects-container');
          projectsContainer.innerHTML = '<p class="text-danger">Failed to load projects. Please try again later.</p>';
      });
});

document.addEventListener('DOMContentLoaded', () => {
  const newsForm = document.getElementById('news-form');
  const newsList = document.getElementById('news-list');

  // Add event listener to handle form submission
  newsForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from refreshing the page

      // Get input values
      const newsTitle = document.getElementById('news-title').value;
      const newsContent = document.getElementById('news-content').value;

      // Create a new news item
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      newsItem.innerHTML = `
          <h3>${newsTitle}</h3>
          <p>${newsContent}</p>
      `;

      // Add the new news item to the list
      newsList.prepend(newsItem);

      // Clear the form
      newsForm.reset();
  });
});

// Smooth scrolling and toggle collapse
document.querySelectorAll('nav .menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Smooth scroll to section
        const sectionId = this.getAttribute('href');
        document.querySelector(sectionId).scrollIntoView({
            behavior: 'smooth'
        });

        // Collapse the menu by unchecking the toggle
        document.getElementById('menu-toggle').checked = false;
    });
});


