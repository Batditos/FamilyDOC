(function() {
    window.initMobileMenu = function() {
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('overlay');
        const body = document.body;
        const accordionLinks = document.querySelectorAll('.mobile-menu__link--accordion');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('is-open');
            burgerBtn.classList.toggle('is-open');
            overlay.classList.toggle('is-active');
            body.classList.toggle('no-scroll');
            burgerBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));
        }

        if (burgerBtn) {
            burgerBtn.addEventListener('click', toggleMobileMenu);
        }

        if (overlay) {
            overlay.addEventListener('click', toggleMobileMenu);
        }

        // Аккордеон для мобильного меню
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
    };
})();