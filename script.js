let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}

// Modal functionality
const modal = document.getElementById('projectModal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close-modal');
const projectButtons = document.querySelectorAll('.project-card .btn');
const modalSlider = document.querySelector('.modal-slider');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
const slideIndicators = document.querySelector('.slide-indicators');

// Project data
const projectsData = [
    {
        id: 1,
        title: "Senior Project",
        description: "Development of Thai Khon mask Recognition System from Image, This project aims to develop a web application equipped With an advanced algorithm capable of recognizing Khon masks through image analysis. The application will be able to identify the specific name, character type, and provide a concise historical overview of each Khon mask.By focusing on a comprehensive dataset Of 26 distinct Khon masks, categorized into 9 Teachers Head, 12 primary Ramakien characters, and 5 head Crown types, this application will serve as a valuable tool for studying and preserving Thai cultural heritage.The development of this web application Vit not only facilitate the learning process for younger generations but also foster a deeper appreciation for the intricate arts, historical significance, nd philosophical underpinnings of Khon performances. By promoting a comprehensive understanding of Thai culture, this project contributes to the preservation and dissemination of this unique art form. The insights, moral values, and ethical principles embedded within hon performances offer valuable life lessons that can be applied to daily life. Additionally, by making Khon culture more accessible to a global audience, this application will enhance Thailand cultural image and promote intercultural exchange. ",
        techStack: ["YOLOv8", "OpenCV", "Objectdetection", "Classification", "AI", "Deep Learning", "Firebase", "Flutter","Dart for Flutter", "Restful API","Pytorch", "Numpy", "Pandas","Etc."],
        images: ["sn1.png", "sn2.png", "sn3.png", "sn4.png", "sn5.png", "sn6.png", "sn7.png", "sn8.png", "sn9.png", "sn10.png", "sn11.png"],
        demoUrl: "https://khonmask-8e464.web.app"
    },
    {
        id: 2,
        title: "Design Project",
        description: "Designed various UX/UI projects, including a GOGON application interfaces, food landing page, card concepts, LINE bot interactions, a time counter, and Tkinter-based desktop UI designs using Figma, Photoshop, and Illustrator.",
        techStack: ["figma", "Photoshop", "Illustrator", "Responsive Design"],
        images: ["ds3.png", "ds4.png","ds1.png", "ds2.png", "ds5.png", "ds6.png", "ds7.png", "ds8.png"],
        demoUrl: "https://www.figma.com/proto/qCnLNx3HQdpeXPqdWJ5kyE/Design_Natthasit-Meungprafang?node-id=16-109&p=f&t=TtgyCuT5DLQtcofO-1&scaling=contain&content-scaling=fixed&page-id=0%3A1"
    }

];

let currentSlide = 0;
let currentProject = null;

// Functions for modal handling
function openModal(projectIndex) {
    currentProject = projectsData[projectIndex];
    
    // Set modal content
    document.querySelector('.modal-title').textContent = currentProject.title;
    document.querySelector('.modal-description').textContent = currentProject.description;
    
    // Create tech stack bullets
    const techStackList = document.querySelector('.tech-stack-list');
    techStackList.innerHTML = '';
    currentProject.techStack.forEach(tech => {
        const techItem = document.createElement('li');
        techItem.textContent = tech;
        techStackList.appendChild(techItem);
    });
    
    // Set demo button URL
    const demoBtn = document.querySelector('.modal-demo-btn');
    demoBtn.href = currentProject.demoUrl;
    
    // Fix: Add event listener to the demo button
    demoBtn.addEventListener('click', function(e) {
        // Use window.open to ensure the link opens
        window.open(currentProject.demoUrl, '_blank');
    });
    
    // Create slider content
    modalSlider.innerHTML = '';
    slideIndicators.innerHTML = '';
    
    currentProject.images.forEach((img, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        
        // Use placeholder images since actual images may not exist
        const imgElement = document.createElement('img');
        // imgElement.src = `/api/placeholder/800/450`;
        imgElement.src = img;
        imgElement.alt = `${currentProject.title} - Slide ${index + 1}`;
        
        slide.appendChild(imgElement);
        modalSlider.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('span');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        slideIndicators.appendChild(indicator);
    });
    
    currentSlide = 0;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function nextSlide() {
    if (!currentProject) return;
    
    currentSlide = (currentSlide + 1) % currentProject.images.length;
    updateSlider();
}

function prevSlide() {
    if (!currentProject) return;
    
    currentSlide = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Event listeners
projectButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
    });
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});

// Auto slide every 5 seconds
let slideInterval;

function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideTimer() {
    clearInterval(slideInterval);
}

// Start/stop timer when mouse enters/leaves the slider
// modalSlider.addEventListener('mouseenter', stopSlideTimer);
// modalSlider.addEventListener('mouseleave', startSlideTimer);

// Start timer when modal opens
// modal.addEventListener('transitionend', (e) => {
//     if (modal.classList.contains('open')) {
//         startSlideTimer();
//     }
// });

// Scroll animations
document.addEventListener("DOMContentLoaded", function() {
  // Add index numbers to timeline items for staggered animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.setProperty('--item-index', index);
  });
  
  // Setup IntersectionObserver for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  
  // Apply to elements we want to animate on scroll
  const animateElements = document.querySelectorAll('.skill-box, .timeline-item, .project-card, .contact-item');
  animateElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });
  
  // Animate sections as they come into view
  const sections = document.querySelectorAll('section, .projects');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Navbar active state
  const navLinks = document.querySelectorAll('.navbar a');
  const navSections = document.querySelectorAll('section, .projects');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    navSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Add particles background effect to home section
  const homeSection = document.querySelector('.home');
  if (homeSection) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    homeSection.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
      createParticle(particlesContainer);
    }
  }
  
  function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
  }
  
  // Fix: Ensure demo buttons in modal are properly initialized
  const initModalButtons = function() {
    const demoBtn = document.querySelector('.modal-demo-btn');
    if (demoBtn && currentProject) {
      demoBtn.href = currentProject.demoUrl;
      
      // Remove existing event listeners (to prevent duplicates)
      const newBtn = demoBtn.cloneNode(true);
      demoBtn.parentNode.replaceChild(newBtn, demoBtn);
      
      // Add new event listener
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(currentProject.demoUrl, '_blank');
      });
    }
  };
  
  // Call this function whenever the modal is opened
  if (modal) {
    modal.addEventListener('transitionend', function(e) {
      if (modal.classList.contains('open')) {
        initModalButtons();
      }
    });
  }
});

// Text typing effect for headings
function setupTypewriterEffect() {
  const headings = document.querySelectorAll('.typewriter');
  
  headings.forEach(heading => {
    const text = heading.textContent;
    heading.textContent = '';
    heading.style.display = 'inline-block';
    
    let charIndex = 0;
    
    function typeChar() {
      if (charIndex < text.length) {
        heading.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 100);
      }
    }
    
    typeChar();
  });
}


// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Close mobile menu if it's open
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});