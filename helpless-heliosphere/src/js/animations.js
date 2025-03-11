// Project Gallery animations
export function animateProjectFiltering() {
  // Intersection Observer for project cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  );

  // Observe project cards
  document.querySelectorAll('.project-card').forEach((card) => {
    observer.observe(card);
  });
}

// Filter button hover effect
export function setupFilterButtonEffects() {
  const buttons = document.querySelectorAll('.filter-btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
}

// Enhanced project filtering with smooth animations
export function setupProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  
  // Filter projects with smooth animation
  const filterProjects = (category) => {
    projects.forEach((project) => {
      const projectCategory = project.getAttribute('data-category');
      
      if (category === 'All' || category === projectCategory) {
        // Show matching projects
        project.style.transition = 'all 0.5s ease-out';
        project.style.opacity = '0';
        project.style.transform = 'scale(0.95)';
        project.classList.remove('hidden');
        
        // Trigger reflow
        project.offsetHeight;
        
        // Animate in
        project.style.opacity = '1';
        project.style.transform = 'scale(1)';
      } else {
        // Hide non-matching projects
        project.style.transition = 'all 0.5s ease-out';
        project.style.opacity = '0';
        project.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          project.classList.add('hidden');
        }, 500);
      }
    });
  };

  // Handle filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Apply filter
      const category = btn.getAttribute('data-category');
      filterProjects(category);
    });
  });

  // Set initial state
  const allButton = document.querySelector('[data-category="All"]');
  if (allButton) {
    allButton.classList.add('active');
  }
}

// Project card hover animations
export function setupProjectCardAnimations() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      const overlay = card.querySelector('.project-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      const overlay = card.querySelector('.project-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
    });
  });
}

// Initialize all animations
export function initAnimations() {
  document.addEventListener('DOMContentLoaded', () => {
    animateProjectFiltering();
    setupFilterButtonEffects();
    setupProjectCardAnimations();
    setupProjectFiltering();
  });
}