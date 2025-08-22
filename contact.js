// ======= CONTACT JS ======= //

const contactForm = document.getElementById('contact-form');
const feedbackDiv = document.getElementById('contact-feedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // For now, just display feedback
  feedbackDiv.textContent = `Thank you, ${name}. Your message has been received!`;

  // Reset form
  contactForm.reset();
});
