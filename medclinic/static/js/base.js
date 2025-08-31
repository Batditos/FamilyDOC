document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu logic
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Function to toggle body scroll state
    const toggleBodyScroll = (disable) => {
        // Проверяем, существует ли элемент mobileMenu, прежде чем менять классы
        if (mobileMenu) {
            document.body.classList.toggle('no-scroll', disable);
        }
    };

    // New function to close the menu, ensuring consistent state updates
    const closeMenu = () => {
        if (mobileMenu && burgerBtn) {
            mobileMenu.classList.remove('is-open');
            burgerBtn.classList.remove('is-open');
            burgerBtn.setAttribute('aria-expanded', 'false');
            toggleBodyScroll(false);
        }
    };

    if (burgerBtn && mobileMenu) {
        // Обработчик клика по бургер-кнопке
        burgerBtn.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.contains('is-open');
            
            if (isMenuOpen) {
                closeMenu();
            } else {
                mobileMenu.classList.add('is-open');
                burgerBtn.classList.add('is-open');
                burgerBtn.setAttribute('aria-expanded', 'true');
                toggleBodyScroll(true);
            }
        });

        // Swipe-up gesture to close the mobile menu
        let touchstartY = 0;
        let touchendY = 0;
        const swipeThreshold = 50; // Minimum swipe distance in pixels

        mobileMenu.addEventListener('touchstart', (event) => {
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        mobileMenu.addEventListener('touchend', (event) => {
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, false);

        function handleGesture() {
            if (touchendY < touchstartY - swipeThreshold && mobileMenu.classList.contains('is-open')) {
                closeMenu();
            }
        }
    }

    // Modal logic (Search)
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeModalBtn = searchModal ? searchModal.querySelector('.modal__close-btn') : null;

    if (searchBtn && searchModal && closeModalBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.style.display = 'flex';
            toggleBodyScroll(true);
        });

        closeModalBtn.addEventListener('click', () => {
            searchModal.style.display = 'none';
            toggleBodyScroll(false);
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === searchModal) {
                searchModal.style.display = 'none';
                toggleBodyScroll(false);
            }
        });
    }

    // Accordion for mobile menu
    const accordionLinks = document.querySelectorAll('.mobile-menu__link--accordion');
    accordionLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const parentItem = event.target.closest('.mobile-menu__item');
            if (parentItem) {
                parentItem.classList.toggle('is-open');
                const submenu = parentItem.querySelector('.mobile-menu__submenu');
                if (submenu) {
                    submenu.classList.toggle('is-open');
                }
            }
        });
    });
});