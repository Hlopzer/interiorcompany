document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    const setMenuOpen = (isOpen) => {
        if (!burger || !mobileMenu) return;
        mobileMenu.classList.toggle('is-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('is-open');
            setMenuOpen(!isOpen);
        });

        mobileMenu.addEventListener('click', (e) => {
            const target = e.target;
            if (!(target instanceof Element)) return;

            if (target.matches('[data-menu-close]')) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        });
    }

    document.querySelectorAll('.btn-secondary').forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = document.querySelector('#interiors');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 1. Находим все контейнеры слайдеров на странице
    const sliderContainers = Array.from(document.querySelectorAll('.slider-container'));

    // 2. Собираем слайды по контейнерам
    const sliders = sliderContainers
        .map((container) => Array.from(container.querySelectorAll('.slide')))
        .filter((slides) => slides.length >= 2);

    if (sliders.length === 0) return;

    // 3. Единый индекс для синхронного переключения во всех местах
    let currentIndex = 0;

    const setActiveIndex = (nextIndex) => {
        sliders.forEach((slides) => {
            const clampedNext = nextIndex % slides.length;
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === clampedNext);
            });
        });
    };

    const next = () => {
        currentIndex += 1;
        setActiveIndex(currentIndex);
    };

    setActiveIndex(currentIndex);

    // Запускаем интервал 5 секунд (5000мс)
    setInterval(next, 5000);
});