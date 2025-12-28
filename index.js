document.addEventListener('DOMContentLoaded', () => {

    /* LIGHTBOX */
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox__img');
    const lightboxClose = document.querySelector('.lightbox__close');
    const lightboxPrev = document.querySelector('.lightbox__prev');
    const lightboxNext = document.querySelector('.lightbox__next');

    let currentLightboxIndex = 0;
    let currentLightboxSlides = [];

    const openLightbox = (slides, index) => {
        if (!slides || slides.length === 0) return;
        currentLightboxSlides = slides;
        currentLightboxIndex = index;

        const url = getBgImageUrl(currentLightboxSlides[currentLightboxIndex]);
        if (!url) return;

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.92)';

        lightboxImg.onload = () => {
            requestAnimationFrame(() => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            });
        };

        lightboxImg.src = url;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('is-open');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    };

    const getBgImageUrl = (el) => {
        if (!el) return '';
        const bg = window.getComputedStyle(el).backgroundImage;
        if (!bg || bg === 'none') return '';
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        return match ? match[1] : '';
    };

    const nextLightbox = () => {
        if (!currentLightboxSlides || currentLightboxSlides.length === 0) return;
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxSlides.length;
        openLightbox(currentLightboxSlides, currentLightboxIndex);
    };

    const prevLightbox = () => {
        if (!currentLightboxSlides || currentLightboxSlides.length === 0) return;
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxSlides.length) % currentLightboxSlides.length;
        openLightbox(currentLightboxSlides, currentLightboxIndex);
    };

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevLightbox();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextLightbox();
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Закрытие при клике за пределами картинки
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox__backdrop') || e.target.classList.contains('lightbox__content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (lightbox.classList.contains('is-open')) {
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        }
    });

    /*  КЛИК ПО АКТИВНОЙ КАРТИНКЕ  */
    document.querySelectorAll('.slider-container:not(.socials-section)').forEach(container => {
        container.addEventListener('click', () => {
            const slides = [...container.querySelectorAll('.slide')];
            const activeIndex = slides.findIndex(slide => slide.classList.contains('active'));
            if (activeIndex === -1) return;
            openLightbox(slides, activeIndex);
        });
    });

    /* СЛАЙДЕР*/
    const sliderContainers = [...document.querySelectorAll('.slider-container:not(.socials-section)')];
    const sliders = sliderContainers.map(c => [...c.querySelectorAll('.slide')]);

    let index = 0;

    const updateSlides = () => {
        sliders.forEach(slides => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index % slides.length);
            });
        });
    };

    updateSlides();
    setInterval(() => {
        index++;
        updateSlides();
    }, 6500);

    /*SWIPE НА МОБИЛЬНЫХ*/
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    const handleGesture = () => {
        if (!lightbox.classList.contains('is-open')) return;
        if (touchEndX < touchStartX - 50) nextLightbox();
        if (touchEndX > touchStartX + 50) prevLightbox();
    };

    const stopClick = (e) => {
        e.stopPropagation();
    };

    document.querySelectorAll(
        'a, button, .btn, .social a, .social button'
    ).forEach(el => {
        el.addEventListener('click', stopClick);
    });

    /* BURGER MENU*/
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('is-open');
            mobileMenu.classList.toggle('is-open', !isOpen);
            burger.setAttribute('aria-expanded', String(!isOpen));
            mobileMenu.setAttribute('aria-hidden', String(isOpen));
            document.body.style.overflow = !isOpen ? 'hidden' : '';
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target.dataset.menuClose !== undefined) {
                mobileMenu.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    const servicesButtons = document.querySelectorAll('.services-buttons .btn-secondary');
    
    if (servicesButtons.length >= 2) {
        // Первая кнопка - ЧАСТНЫЕ ИНТЕРЬЕРЫ
        servicesButtons[0].addEventListener('click', () => {
            const interiorsSection = document.querySelector('#interiors');
            if (interiorsSection) {
                interiorsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Вторая кнопка - ОБЩЕСТВЕННЫЕ ИНТЕРЬЕРЫ
        servicesButtons[1].addEventListener('click', () => {
            const interiorsSection = document.querySelector('#interiors');
            if (interiorsSection) {
                interiorsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});