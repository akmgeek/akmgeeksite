// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow the default navigation to happen first
      const href = this.getAttribute('href');
      
      // Close menu immediately
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      // If it's an anchor link, handle smooth scroll
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Small delay to ensure menu closes before scroll
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });

  // Close menu when clicking on backdrop or outside
  navMenu.addEventListener('click', function(e) {
    // If clicking on the backdrop (the nav-menu itself, not a link)
    if (e.target === navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Smooth scroll for anchor links (excluding nav menu links which are handled separately)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // Skip if this link is inside the nav menu (handled separately)
  if (anchor.closest('.nav-menu')) {
    return;
  }
  
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }
  });
});

// Form submission handler
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    // You can add custom form handling here if needed
    // For now, it will use the default mailto behavior
  });
}

// Add fade-in animation on scroll (only for elements below fold)
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and projects that are initially below viewport
  document.querySelectorAll('.card, .project, .testimonial, .about-card').forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
      observer.observe(el);
    }
  });

  // Special observer for process steps (they have their own animation)
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = entry.target;
        step.classList.add('animated');
        processObserver.unobserve(step);
      }
    });
  }, observerOptions);

  // Observe process steps
  document.querySelectorAll('.process-step').forEach(step => {
    const rect = step.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      processObserver.observe(step);
    } else {
      // If already visible, animate immediately
      step.classList.add('animated');
    }
  });
}

