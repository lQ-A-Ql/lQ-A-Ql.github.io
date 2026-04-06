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
}// Smooth Page Exits for non-View-Transition browsers
document.addEventListener('click', (e) => {
    const isViewTransitionSupported = 'startViewTransition' in document && document.querySelector('meta[name="view-transition"]');
    if (isViewTransitionSupported) return;

    const link = e.target.closest('a');
    if (!link) return;

    const hrefAttr = link.getAttribute('href');
    if (link.target === '_blank' || link.hostname !== window.location.hostname || link.pathname === window.location.pathname || !hrefAttr || hrefAttr.startsWith('#') || hrefAttr.startsWith('javascript:')) {
        return;
    }

    e.preventDefault();
    const href = link.href;

    document.body.classList.add('page-is-exiting');

    setTimeout(() => {
        window.location.href = href;
    }, 320);
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('page-is-exiting');
    }
});
