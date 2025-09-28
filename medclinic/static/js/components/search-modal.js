(function() {
    window.initSearchModal = function() {
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
    };
})();