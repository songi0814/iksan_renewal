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


//sub-menu-tab
document.addEventListener('DOMContentLoaded', () => {
    const tabItems = document.querySelectorAll('#sub-tab .sub-tab-list li');

    tabItems.forEach(item => {
        item.addEventListener('click', (e) => {
            tabItems.forEach(i => i.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // 페이지 로딩 시 3번째 탭을 활성화 상태로 설정
    if (tabItems.length > 0) {
        tabItems[2].classList.add('active');
    }
});


// vision scroll-trigger
gsap.registerPlugin(SplitText, ScrollTrigger);

console.clear();

gsap.set(".split", { opacity: 1 });

document.fonts.ready.then(() => {
    let containers = gsap.utils.toArray(".container");

    containers.forEach((container) => {
        let text = container.querySelector(".split");
        let animation;

        SplitText.create(text, {
        type: "words,lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit: (instance) => {
            console.log("split")
            return gsap.from(instance.lines, {
            yPercent: 120,
            stagger: 0.3,
            duration:1,
            scrollTrigger: {
                trigger: container,
                markers: false,
                scrub: 2,
                start: "clamp(top center)",
                end: "clamp(bottom bottom)"
            }
            });
        }
        });
    });
});

// main-value scroll-trigger

window.addEventListener('load', () => {
    const m_value = gsap.timeline({
        scrollTrigger: {
            trigger: '#main-value',
            start: 'bottom bottom',
            end: 'bottom bottom',
            scrub: 2, 
            pin: '.value-list' 
        }
    });

    const gap = 274.5;

    m_value
        .to('.value-list .value', { opacity: 1, scale: 1, duration: 1 })
        .to('.value-list .v1', { x: -gap * 1.5 }, '<')
        .to('.value-list .v2', { x: -gap * 0.5 }, '<')
        .to('.value-list .v3', { x: gap * 0.5 }, '<')
        .to('.value-list .v4', { x: gap * 1.5 }, '<');
});

// 전략

document.addEventListener('DOMContentLoaded', () => {
    const strategyCards = document.querySelectorAll('.strategy-list li');

    // Function to set the active card
    const setActiveCard = (cardElement) => {
        strategyCards.forEach(card => {
            card.classList.remove('active');
        });
        cardElement.classList.add('active');
    };

    // Add click event listener to each card
    strategyCards.forEach(card => {
        card.addEventListener('click', () => {
            setActiveCard(card);
        });
    });

    // Set the first card as active by default on page load
    if (strategyCards.length > 0) {
        setActiveCard(strategyCards[0]);
    }
});