(function() {
    let itemCount = 0;

    window.updateCartCounter = function(count) {
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
            cartCounter.textContent = count;
            if (count > 0) {
                cartCounter.classList.add('is-visible');
            } else {
                cartCounter.classList.remove('is-visible');
            }
        }
    };

    window.initCartCounter = function() {
        // Пример: имитация добавления товара (удалить в реальном проекте)
        const mockAddToCartBtn = document.querySelector('.some-add-to-cart-button');
        if (mockAddToCartBtn) {
            mockAddToCartBtn.addEventListener('click', () => {
                itemCount++;
                window.updateCartCounter(itemCount);
            });
        }

        window.updateCartCounter(0);
    };
})();