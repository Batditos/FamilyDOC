(function() {
    const SCROLLBAR_WIDTH = window.getScrollbarWidth();

    window.initChatPopup = function() {
        const chatPopupOverlay = document.getElementById('chatPopupOverlay');
        const closeChatButton = document.querySelector('.chat-popup-close-btn');
        const chatToggleBtn = document.getElementById('chatToggleBtn');
        const chatPopupForm = document.getElementById('chatPopupForm');
        const chatMessageInput = document.getElementById('chatMessageInput');
        const chatPopup = document.querySelector('.chat-popup');
        const chatPopupBody = document.getElementById('chatPopupBody');

        if (!chatPopupOverlay || !closeChatButton || !chatToggleBtn || !chatPopupForm || !chatMessageInput) {
            console.warn('Не все необходимые элементы чата найдены в DOM.');
            return;
        }

        let scrollPosition = 0;

        const openChatPopup = () => {
            // Только на мобильных — блокируем скролл
            if (window.innerWidth < 769) {
                scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                document.body.classList.add('no-scroll');
                document.documentElement.classList.add('chat-open');
                document.body.style.marginRight = `${SCROLLBAR_WIDTH}px`;
            }

            chatToggleBtn.setAttribute('aria-expanded', 'true');
            chatPopupOverlay.classList.add('is-visible');
            chatPopupOverlay.setAttribute('aria-hidden', 'false');

            setTimeout(() => {
                chatMessageInput.focus();
            }, 350);
        };

        const closeChatPopup = () => {
            chatPopupOverlay.classList.remove('is-visible');

            // Только на мобильных — разблокируем скролл
            if (window.innerWidth < 769) {
                document.body.classList.remove('no-scroll');
                document.documentElement.classList.remove('chat-open');
                document.body.style.marginRight = '';

                window.scrollTo(0, scrollPosition);
            }

            chatToggleBtn.setAttribute('aria-expanded', 'false');
            chatPopupOverlay.setAttribute('aria-hidden', 'true');

            chatMessageInput.blur();
        };

        chatToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openChatPopup();
        });

        closeChatButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeChatPopup();
        });

        chatPopupOverlay.addEventListener('click', (e) => {
            if (e.target === chatPopupOverlay) {
                closeChatPopup();
            }
        });

        chatPopupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const messageText = chatMessageInput.value.trim();
            if (messageText) {
                console.log('Отправка сообщения:', messageText);

                if (chatPopupBody) {
                    const newMessageElement = document.createElement('div');
                    newMessageElement.classList.add('message', 'outgoing');
                    newMessageElement.textContent = messageText;

                    chatPopupBody.appendChild(newMessageElement);

                    requestAnimationFrame(() => {
                        chatPopupBody.scrollTop = chatPopupBody.scrollHeight;
                    });
                }

                chatMessageInput.value = '';
                chatMessageInput.focus();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatPopupOverlay.classList.contains('is-visible')) {
                closeChatPopup();
            }
        });
    };
})();