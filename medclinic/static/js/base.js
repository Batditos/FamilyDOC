// base.js - Оптимизированный JS-код без jQuery и других библиотек.
// Все интерактивные элементы обрабатываются здесь.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Получение DOM-элементов
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeSearchModalBtn = document.querySelector('.modal__close-btn');

    // Хелперы для блокировки скролла
    const lockScroll = () => document.body.style.overflow = 'hidden';
    const unlockScroll = () => document.body.style.overflow = '';

    // 2. Логика для бургер-меню и мобильного сайдбара
    if (burgerBtn && mobileMenu && closeMobileMenuBtn) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('mobile-menu--is-open');
            burgerBtn.setAttribute('aria-expanded', 'true');
            lockScroll();
        });

        closeMobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu--is-open');
            burgerBtn.setAttribute('aria-expanded', 'false');
            unlockScroll();
        });
        
        // Закрытие меню по клику вне его
        mobileMenu.addEventListener('click', (event) => {
            if (event.target === mobileMenu) {
                mobileMenu.classList.remove('mobile-menu--is-open');
                burgerBtn.setAttribute('aria-expanded', 'false');
                unlockScroll();
            }
        });
    }

    // 3. Логика для модального окна поиска
    if (searchBtn && searchModal && closeSearchModalBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('modal--is-open');
            lockScroll();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
            }
        });

        closeSearchModalBtn.addEventListener('click', () => {
            searchModal.classList.remove('modal--is-open');
            unlockScroll();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = "";
            }
        });

        // Закрытие модального окна по клику вне его
        searchModal.addEventListener('click', (event) => {
            if (event.target === searchModal) {
                searchModal.classList.remove('modal--is-open');
                unlockScroll();
            }
        });
    }

    // 4. Логика аккордеона для мобильного меню
    const accordionToggles = document.querySelectorAll('.mobile-menu__link--accordion');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parentItem = toggle.closest('.mobile-menu__item--has-sub');
            if (parentItem) {
                if (parentItem.classList.contains('mobile-menu__item--is-open')) {
                    parentItem.classList.remove('mobile-menu__item--is-open');
                } else {
                    document.querySelectorAll('.mobile-menu__item--has-sub.mobile-menu__item--is-open').forEach(item => {
                        item.classList.remove('mobile-menu__item--is-open');
                    });
                    parentItem.classList.add('mobile-menu__item--is-open');
                }
            }
        });
    });

    // 5. AJAX-поиск с CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    const searchSubmitBtn = document.getElementById('search-submit');
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            if (query) {
                fetch('/search/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify({ query })
                })
                .then(res => res.json())
                .then(data => {
                    console.log('Результаты поиска:', data);
                    // TODO: отрисовать результаты поиска в DOM
                })
                .catch(err => console.error('Ошибка поиска:', err));
            }
        });
    }
});
