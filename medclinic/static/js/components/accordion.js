(function() {
    window.initAccordions = function() {
        // Общий аккордеон
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.icon');

                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== header && otherHeader.classList.contains('active')) {
                        const otherContent = otherHeader.nextElementSibling;
                        otherHeader.classList.remove('active');
                        otherContent.classList.remove('active');
                        otherContent.style.maxHeight = 0;
                        otherHeader.querySelector('.icon').style.transform = 'rotate(0deg)';
                    }
                });

                header.classList.toggle('active');
                content.classList.toggle('active');

                if (content.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = 'rotate(45deg)';

                    if (window.innerWidth <= 768) {
                        content.addEventListener('transitionend', function onTransitionEnd() {
                            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            content.removeEventListener('transitionend', onTransitionEnd);
                        });
                    }
                } else {
                    content.style.maxHeight = 0;
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });

        // Аккордеон подписок
        const subscriptionHeaders = document.querySelectorAll('.subscription-accordion-header');

        const handleAccordionClick = (header, content) => {
            const icon = header.querySelector('.icon');
            const isActive = header.classList.contains('active');

            subscriptionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = 0;
                    otherHeader.querySelector('.icon').style.transform = 'rotate(0deg)';
                }
            });

            header.classList.toggle('active', !isActive);
            content.classList.toggle('active', !isActive);

            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(45deg)';
            } else {
                content.style.maxHeight = 0;
                icon.style.transform = 'rotate(0deg)';
            }
        };

        subscriptionHeaders.forEach(header => {
            const content = header.nextElementSibling;
            header.addEventListener('click', () => {
                handleAccordionClick(header, content);
            });
        });

        // FAQ аккордеон
        const faqHeaders = document.querySelectorAll('.faq__header');
        faqHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.faq__icon');

                faqHeaders.forEach(otherHeader => {
                    if (otherHeader !== header && otherHeader.classList.contains('active')) {
                        const otherContent = otherHeader.nextElementSibling;
                        otherHeader.classList.remove('active');
                        otherContent.classList.remove('active');
                        otherContent.style.maxHeight = 0;
                        otherHeader.querySelector('.faq__icon').style.transform = 'rotate(0deg)';
                    }
                });

                header.classList.toggle('active');
                content.classList.toggle('active');

                if (content.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = 'rotate(45deg)';
                } else {
                    content.style.maxHeight = 0;
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    };
})();