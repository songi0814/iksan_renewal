

//특별전시
const exhSwiper = new Swiper(".exh-swiper", {
    autoplay: true,
    slidesPerView: 4,
    spaceBetween: 30,
    // freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//홍보영상
const vidSwiper = new Swiper(".vid-swiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});



