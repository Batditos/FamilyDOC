document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu logic
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Function to toggle body scroll state
    const toggleBodyScroll = (disable) => {
        document.body.classList.toggle('no-scroll', disable);
    };

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            const isMenuOpen = mobileMenu.classList.contains('is-open');

            if (isMenuOpen) {
                // Change icon to 'times' (X) and prevent body scroll
                burgerBtn.querySelector('i').classList.remove('fa-bars');
                burgerBtn.querySelector('i').classList.add('fa-times');
                toggleBodyScroll(true);
            } else {
                // Change icon back to 'bars' and allow body scroll
                burgerBtn.querySelector('i').classList.remove('fa-times');
                burgerBtn.querySelector('i').classList.add('fa-bars');
                toggleBodyScroll(false);
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
                mobileMenu.classList.remove('is-open');
                burgerBtn.querySelector('i').classList.remove('fa-times');
                burgerBtn.querySelector('i').classList.add('fa-bars');
                toggleBodyScroll(false);
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
            // This is important to prevent other event listeners from firing
            event.stopImmediatePropagation();

            const parentItem = event.target.closest('.mobile-menu__item');

            if (parentItem) {
                // Toggle current submenu
                parentItem.classList.toggle('is-open');
                const submenu = parentItem.querySelector('.mobile-menu__submenu');
                if (submenu) {
                    submenu.classList.toggle('is-open');
                }
            }
        });
    });
});
