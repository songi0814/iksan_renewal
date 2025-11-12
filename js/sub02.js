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

// dep2
document.querySelectorAll('#gnb .dep1 > li > a').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const parentLi = e.currentTarget.closest('li');
    const subMenu = parentLi.querySelector('.dep2');

    // dep2가 없으면 종료 (에러 방지)
    if (!subMenu) return;

    // 다른 메뉴 닫기
    document.querySelectorAll('#gnb .dep2').forEach(menu => {
      if (menu !== subMenu) menu.classList.remove('active');
    });

    // 현재 클릭한 메뉴 토글
    subMenu.classList.toggle('active');
  });
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
            stagger: 0.2,
            duration:0.5,
            scrollTrigger: {
                trigger: container,
                markers: false,
                scrub: 1,
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
      scrub: 3,
      pin: '.value-list'
    }
  });

  // 반응형 간격 계산 (겹침 감안)
  const getGap = () => {
    const w = window.innerWidth;

    // 한 원의 지름을 대략 기준으로, 화면 대비 비율로 설정
    let baseGap = w * 0.18; // 1920 기준 약 345px
    if (w < 1600) baseGap = w * 0.16;
    if (w < 1400) baseGap = w * 0.145;
    if (w < 1200) baseGap = w * 0.13;
    if (w < 1024) baseGap = w * 0.11;
    if (w < 800) baseGap = w * 0.1;

    return baseGap;
  };

  const animateValues = () => {
    const gap = getGap();

    m_value.clear();

    m_value.to('.value-list .value', {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out'
    });

    /**
     * v1~v4를 중앙 기준으로 좌우 대칭 정렬하되
     * 각 원은 약 25~35% 정도 겹침 유지
     * (즉, gap이 원 지름보다 약간 작음)
     */
    const overlapRatio = 0.7; // 1보다 작으면 겹침, 1이면 닿음
    const offsets = [-1.5, -0.5, 0.5, 1.5].map(v => v * gap * overlapRatio);

    offsets.forEach((x, i) => {
      m_value.to(`.value-list .v${i + 1}`, { x, duration: 1, ease: 'power2.out' }, '<');
    });
  };

  animateValues();
  window.addEventListener('resize', animateValues);
});







// 전략

document.addEventListener('DOMContentLoaded', () => {
    const strategyCards = document.querySelectorAll('.strategy-list li');

    const setActiveCard = (cardElement) => {
        strategyCards.forEach(card => {
            card.classList.remove('active');
        });
        cardElement.classList.add('active');
    };

    strategyCards.forEach(card => {
        card.addEventListener('click', () => {
            setActiveCard(card);
        });
    });

    if (strategyCards.length > 0) {
        setActiveCard(strategyCards[0]);
    }
});

// 성과목표

document.addEventListener("DOMContentLoaded", () => {
  const goalItems = document.querySelectorAll(".per-goals-list li");

  if (goalItems.length > 0) {
    goalItems[0].classList.add("active"); // 첫 li 초기 활성화
  }

  goalItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      goalItems.forEach((li) => li.classList.remove("active"));
      item.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      goalItems.forEach((li) => li.classList.remove("active"));
      goalItems[0].classList.add("active"); // 다시 첫 li로 복귀
    });
  });
});
