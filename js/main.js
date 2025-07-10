

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

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('#notice-board .notice-btn button');
    const lists = document.querySelectorAll('#notice-board .notice-list');
    
    buttons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const tabType = btn.dataset.tab;
            
            if (btn.querySelector('a')) return;
            
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            lists.forEach(list => {
                if (list.dataset.type === tabType) {
                    list.style.display = 'block';
                } else {
                    list.style.display = 'none';
                }
            });
        });
    });
    
    lists.forEach(list => {
        list.style.display = list.dataset.type === 'notice' ? 'block' : 'none';
    });
    
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
});


//공지사항
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('#notice-board .notice-btn button');
    const lists = [
        document.querySelector('.notice-list-1'),
        document.querySelector('.notice-list-2')
    ];

    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', function (e) {
        if (btn.querySelector('a')) return;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        lists.forEach(l => l.style.display = 'none');
            if (idx === 0) lists[0].style.display = 'block';
            if (idx === 1) lists[1].style.display = 'block';
        });
    });

    lists[0].style.display = 'block';
    lists[1].style.display = 'none';
});



