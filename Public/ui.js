(() => {
    const links = Array.from(document.querySelectorAll('.nav-links a'));

    if (!links.length) {
        return;
    }

    const normalize = (value) => (value || '')
        .split('/')
        .pop()
        .split('?')[0]
        .split('#')[0]
        .toLowerCase();

    const currentPage = normalize(window.location.pathname);

    links.forEach((link, index) => {
        link.style.setProperty('--nav-delay', `${index * 70}ms`);

        if (normalize(link.getAttribute('href')) === currentPage) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
        }
    });

    const updateScrolledState = () => {
        document.body.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });

    window.requestAnimationFrame(() => {
        document.body.classList.add('ui-ready');
    });
})();