// Carousel auto-switch
const images = document.querySelectorAll('.carousel-image');
let index = 0;

setInterval(() => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
}, 3500);

function includeHTML() {
  const elements = document.querySelectorAll('[include-html]');
  elements.forEach(async el => {
    const file = el.getAttribute('include-html');
    if (file) {
      const response = await fetch(file);
      const html = await response.text();
      el.innerHTML = html;
      el.removeAttribute('include-html');
      includeHTML(); // Recursive in case nested
    }
  });
}

function openAffiliationModal() {
  document.getElementById("affiliationModal").style.display = "flex";
}

function closeAffiliationModal() {
  document.getElementById("affiliationModal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(q => {
    q.addEventListener('click', () => {
      q.classList.toggle('active');

      const answer = q.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
});


includeHTML();

