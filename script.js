(function ($) {
    "use strict";
  
    $(document).ready(function () {
        
        var initScrollNav = function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 200) {
                $('.navbar.fixed-top').addClass("bg-black");
            } else {
                $('.navbar.fixed-top').removeClass("bg-black");
            }
        }
  
        $(window).scroll(function () {
            initScrollNav();
        });
  
        
        var productSwiper = new Swiper(".product-swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 1,
                },
            },
        });
  
        var testimonialSwiper = new Swiper(".testimonial-swiper", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
  })(jQuery);