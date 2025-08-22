// ======= COMMON JS ======= //

// NAVBAR TOGGLE (for mobile)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// ACTIVE LINK HIGHLIGHT ON SCROLL
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset + 65; // offset for navbar

  let current = '';
  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// SCROLL ANIMATIONS (fade-in for headings and cards)
const fadeElements = document.querySelectorAll('.fade-on-scroll');

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

// SCROLL TO TOP BUTTON
const scrollBtn = document.createElement('button');
scrollBtn.textContent = "⬆";
scrollBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show button after scrolling 300px
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
