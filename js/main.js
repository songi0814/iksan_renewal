//allmenu
const allMenuOpen = document.querySelector('.all-menu-open')
allMenuOpen.addEventListener('click', function() {
    document.querySelector('.all-menu-popup').style.display = 'block'
})
const allMenuClose = document.querySelector('.allmenu-close')
allMenuClose.addEventListener('click', function() {
    document.querySelector('.all-menu-popup').style.display = 'none'
})


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

//교육&행사
document.addEventListener('DOMContentLoaded', function () {
    const imageElement = document.querySelector('.edu-image-target');
    const buttons = document.querySelectorAll('.change-image-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const type = this.getAttribute('data-type');

        let newSrc = './img/main_poster.png'; // 기본 이미지

        if (type === 'special') {
            newSrc = './img/special.jpg';
        } else if (type === 'experience') {
            newSrc = './img/experience.jpg';
        } else if (type === 'children') {
            newSrc = './img/children.png';
        }

        imageElement.src = newSrc;
        });
    });
});

//홍보영상

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.video-tab button');
    const contents = document.querySelectorAll('#video-ads .video-contents > div');
    let swiperInstances = {};

    function initSwiper(container) {
        return new Swiper(container.querySelector('.vid-swiper'), {
            direction: "vertical",
            slidesPerView: 1,
            spaceBetween: 30,
            mousewheel: true,
            pagination: {
                el: container.querySelector('.swiper-pagination'),
                clickable: true,
            },
        });
    }

    function resetTabs() {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => {
            content.style.display = 'none';
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetClass = button.dataset.target;
            const targetContent = document.querySelector(`#video-ads .${targetClass}`);

            if (!targetContent) return;

            resetTabs();

            button.classList.add('active');

            targetContent.style.display = 'block';

            if (!swiperInstances[targetClass]) {
                swiperInstances[targetClass] = initSwiper(targetContent);
            } else {
                swiperInstances[targetClass].update();
            }
        });
    });

    (function initFirstTab() {
        tabButtons[0].classList.add('active');
        contents.forEach((content, index) => {
            if (index === 0) {
                content.style.display = 'block';
                const key = tabButtons[0].dataset.target;
                swiperInstances[key] = initSwiper(content);
            } else {
                content.style.display = 'none';
            }
        });
    })();
});



//공지사항

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('#notice-board .tab-btn');
    const noticeLists = document.querySelectorAll('#notice-board .notice-list');

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            if (this.querySelector('a')) return;

            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const targetTab = this.getAttribute('data-tab');

            noticeLists.forEach(list => {
                list.classList.remove('active');
                if (list.getAttribute('data-type') === targetTab) {
                    list.classList.add('active');
                }
            });
        });
    });
});