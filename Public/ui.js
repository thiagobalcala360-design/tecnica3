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

    const navToggle = document.querySelector('.nav-toggle');
    const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

    const closeDropdowns = (suppressHover = false) => {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove('is-open');
            dropdown.classList.toggle('is-closing', suppressHover);
            dropdown.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
    };

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));

            if (!isOpen) {
                closeDropdowns();
            }
        });
    }

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        if (!toggle) {
            return;
        }

        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.remove('is-closing');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('is-closing');
            dropdown.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });

        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const wasOpen = dropdown.classList.contains('is-open');

            closeDropdowns();
            dropdown.classList.remove('is-closing');

            if (wasOpen) {
                dropdown.classList.add('is-closing');
                toggle.blur();
                return;
            }

            const isOpen = dropdown.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-dropdown')) {
            closeDropdowns(true);
        }

        if (!event.target.closest('header')) {
            document.body.classList.remove('nav-open');
            navToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDropdowns();
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

(() => {
    const gallery = document.querySelector('[data-gallery]');

    if (!gallery) {
        return;
    }

    const images = [
        {
            src: 'Assets/imagen1.jpg',
            alt: 'Patio y actividades de la escuela',
            title: 'Comunidad técnica',
        },
        {
            src: 'Assets/imagen2.jpg',
            alt: 'Estudiantes en espacios de aprendizaje',
            title: 'Aulas en movimiento',
        },
        {
            src: 'Assets/imagen3.jpg',
            alt: 'Talleres y proyectos escolares',
            title: 'Talleres y proyectos',
        },
        {
            src: 'Assets/imagen4.jpg',
            alt: 'Momentos institucionales de la escuela',
            title: 'Identidad Malvinas',
        },
    ];

    const image = gallery.querySelector('[data-gallery-image]');
    const title = gallery.querySelector('[data-gallery-title]');
    const count = gallery.querySelector('[data-gallery-count]');
    const progress = gallery.querySelector('[data-gallery-progress]');
    const frame = gallery.querySelector('.gallery-frame');
    const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
    const prev = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    let activeIndex = 0;

    const setImage = (nextIndex) => {
        activeIndex = (nextIndex + images.length) % images.length;
        const item = images[activeIndex];

        frame.classList.add('is-switching');

        window.setTimeout(() => {
            image.src = item.src;
            image.alt = item.alt;
            title.textContent = item.title;
            count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
            progress.style.width = `${((activeIndex + 1) / images.length) * 100}%`;

            thumbs.forEach((thumb, index) => {
                thumb.classList.toggle('is-active', index === activeIndex);
                thumb.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
            });

            frame.classList.remove('is-switching');
        }, 140);
    };

    prev?.addEventListener('click', () => setImage(activeIndex - 1));
    next?.addEventListener('click', () => setImage(activeIndex + 1));

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            setImage(Number(thumb.dataset.galleryThumb));
        });
    });

    document.addEventListener('keydown', (event) => {
        if (!gallery.matches(':hover') && !gallery.contains(document.activeElement)) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            setImage(activeIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            setImage(activeIndex + 1);
        }
    });

    setImage(0);
})();

function validarFormulario() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    const respuesta = document.getElementById('respuesta');

    if (!nombre || !email || !mensaje || !respuesta) {
        return false;
    }

    respuesta.textContent = `Gracias, ${nombre.value.trim()}. Tu mensaje quedó listo para enviar.`;
    respuesta.classList.add('is-visible');
    return false;
}
