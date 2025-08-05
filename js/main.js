//header lang
const btnLang = document.querySelector('#header .lang-wrap button')
const langWrap = document.querySelector('#header .lang-wrap')

btnLang.addEventListener('click', function() {
    langWrap.classList.toggle('active')
    // searchbox 안보임
    document.querySelector('#header').classList.add('scroll')
})

//allmenu
const allMenuOpen = document.querySelector('.all-menu-open')
allMenuOpen.addEventListener('click', function() {
    document.querySelector('.all-menu-popup').style.display = 'block'
})
const allMenuClose = document.querySelector('.allmenu-close')
allMenuClose.addEventListener('click', function() {
    document.querySelector('.all-menu-popup').style.display = 'none'
})

//search
const searchWrap = document.querySelector('#header .utill .search-wrap');
searchWrap.querySelector('button').addEventListener('click', function(e) {
    e.stopPropagation();
    searchWrap.querySelector('.search-box').style.display = 'flex';
});

searchWrap.addEventListener('click', function(e) {
    if (e.target.closest('.search-close')) {
        searchWrap.querySelector('.search-box').style.display = 'none';
    }
});

//특별전시
const exhSwiper = new Swiper(".exh-swiper", {
    autoplay: true,
    slidesPerView: 4,
    breakpoints: {
        1150: {
          slidesPerView: 3, // 1150px 이상일 때 3개
        },
        950: {
            slidesPerView: 2, // 950px->2개
        },
        450: {
          slidesPerView: 1, // 0~450px->1개
        }
    },
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

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const closeBtn = document.querySelector('.popup-close');

    // 버튼 클릭 시 이미지 표시
document.querySelectorAll('.change-image-btn').forEach(btn => {
    btn.addEventListener('click', function () {
    if (window.innerWidth <= 1330) {
        const imageSrc = this.dataset.img;
        if (imageSrc) {
        popupImage.src = imageSrc;
        popup.style.display = 'flex';
        }
    }
    });
});

// 닫기
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// 배경 클릭 시 닫기
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
    popup.style.display = 'none';
    }
});

// 화면 리사이즈 시 팝업 닫기
window.addEventListener('resize', () => {
    if (window.innerWidth > 1330) {
    popup.style.display = 'none';
    }
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
            // breakpoints: {
            //     800: {
            //         spaceBetween: 10, 
            //     },
            //     500:{
            //         spaceBetween: 10
            //     }
            // },
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