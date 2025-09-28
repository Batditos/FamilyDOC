(function() {
    window.initDesktopNav = function() {
        const desktopNavItems = document.querySelectorAll('.nav-item--has-sub');

        const handleDesktopNav = () => {
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
        };

        if (window.innerWidth >= 768) {
            handleDesktopNav();
        }
    };
})();