(function() {
    window.initPopularSlider = function() {
        new Swiper('.popular-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 10,
            freeMode: true,
            navigation: {
                nextEl: '.popular-swiper-next',
                prevEl: '.popular-swiper-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1.6,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 5.1,
                    spaceBetween: 30,
                }
            },
        });
    };
})();