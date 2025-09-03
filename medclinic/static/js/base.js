document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    const accordionLinks = document.querySelectorAll('.mobile-menu__link--accordion');
    const desktopNavItems = document.querySelectorAll('.nav-item--has-sub');

    // Получаем элементы для корзины и счетчика
    const cartCounter = document.getElementById('cart-counter');

    // Функция для обновления счетчика корзины
    function updateCartCounter(count) {
        if (cartCounter) {
            cartCounter.textContent = count;
            // Добавляем или удаляем класс 'is-visible' в зависимости от количества товаров
            if (count > 0) {
                cartCounter.classList.add('is-visible');
            } else {
                cartCounter.classList.remove('is-visible');
            }
        }
    }

    // Пример: Имитация добавления товара.
    // В реальном проекте вы будете вызывать updateCartCounter(новое_количество_товаров)
    // в вашей логике добавления товара в корзину.
    let itemCount = 0;
    
    // Этот код - просто для демонстрации.
    // Вы можете удалить его, когда интегрируете свою реальную логику.
    const mockAddToCartBtn = document.querySelector('.some-add-to-cart-button'); // Замените на реальный селектор кнопки
    if (mockAddToCartBtn) {
        mockAddToCartBtn.addEventListener('click', () => {
            itemCount++;
            updateCartCounter(itemCount);
        });
    }

    // Инициализируем счетчик при загрузке страницы, устанавливая 0.
    // В реальном проекте здесь вы получите реальное количество из хранилища (localStorage, cookie и т.д.).
    updateCartCounter(0);

    // Функция для открытия/закрытия мобильного меню
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('is-open');
        burgerBtn.classList.toggle('is-open');
        overlay.classList.toggle('is-active');
        body.classList.toggle('no-scroll');
        burgerBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));
    }

    // Слушатель событий для кнопки бургера
    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Слушатель событий для оверлея (закрывает меню при клике вне его)
    if (overlay) {
        overlay.addEventListener('click', toggleMobileMenu);
    }

    // Логика аккордеона для мобильного меню
    accordionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const parentItem = this.parentElement;
            const submenu = parentItem.querySelector('.mobile-menu__submenu');
            
            accordionLinks.forEach(otherLink => {
                if (otherLink !== this) {
                    otherLink.parentElement.classList.remove('is-open');
                    otherLink.nextElementSibling.classList.remove('is-open');
                }
            });

            parentItem.classList.toggle('is-open');
            submenu.classList.toggle('is-open');
        });
    });

    // Логика для десктопного подменю по клику (для планшетов)
    if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        desktopNavItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const submenu = item.querySelector('.nav-submenu');

            link.addEventListener('click', function(e) {
                if (submenu) {
                    e.preventDefault();
                    desktopNavItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('is-open');
                        }
                    });
                    item.classList.toggle('is-open');
                }
            });
        });

        document.addEventListener('click', function(e) {
            desktopNavItems.forEach(item => {
                if (item.classList.contains('is-open') && !item.contains(e.target)) {
                    item.classList.remove('is-open');
                }
            });
        });
    }

    // Логика для десктопного подменю по наведению (для ПК)
    if (window.innerWidth >= 1024) {
        desktopNavItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const submenu = item.querySelector('.nav-submenu');

            link.addEventListener('click', function(e) {
                if (submenu) {
                    e.preventDefault();
                    desktopNavItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('is-open');
                        }
                    });
                    item.classList.toggle('is-open');
                }
            });
        });

        document.addEventListener('click', function(e) {
            desktopNavItems.forEach(item => {
                if (item.classList.contains('is-open') && !item.contains(e.target)) {
                    item.classList.remove('is-open');
                }
            });
        });
    }

    // Получаем элементы модального окна поиска
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchCloseBtn = searchModal ? searchModal.querySelector('.modal__close-btn') : null;

    if (searchBtn && searchModal && searchCloseBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.style.display = 'flex';
        });

        searchCloseBtn.addEventListener('click', () => {
            searchModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.style.display = 'none';
            }
        });
    }
});