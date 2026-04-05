const menuToggle = document.querySelector('.js-menu-toggle');
const mainNav = document.querySelector('.js-main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
  });
}

const revealNodes = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealNodes.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}