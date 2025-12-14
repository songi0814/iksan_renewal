//header lang
const btnLang = document.querySelector('#header .lang-wrap button')
const langWrap = document.querySelector('#header .lang-wrap')

btnLang.addEventListener('click', function() {
  langWrap.classList.toggle('active')
  document.querySelector('#header').classList.add('scroll')
})

//allmenu
// const allMenuOpen = document.querySelector('.all-menu-open')
// allMenuOpen.addEventListener('click', function() {
//   display = 'block'
// })
// const allMenuClose = document.querySelector('.allmenu-close')
// allMenuClose.addEventListener('click', function() {
//   document.querySelector('.all-menu-popup').style.display = 'none'
// })

const allMenuOpen = document.querySelector('.all-menu-open');
const allMenuPopup = document.querySelector('.all-menu-popup');

allMenuOpen.addEventListener('click', function () {
  if (allMenuPopup) {
    allMenuPopup.style.display = 'block';
  }
});

const allMenuClose = document.querySelector('.allmenu-close');
allMenuClose.addEventListener('click', function () {
  if (allMenuPopup) {
    allMenuPopup.style.display = 'none';
  }
});


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
  if (!subMenu) return;

  document.querySelectorAll('#gnb .dep2').forEach(menu => {
    if (menu !== subMenu) menu.classList.remove('active');
  });

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

// main-value scroll-trigger (데스크톱 전용 애니메이션)
gsap.registerPlugin(SplitText, ScrollTrigger);

window.addEventListener('load', () => {
  const initMainValueAnimation = () => {
    const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

    // 기존 타임라인/트리거 제거
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger && st.trigger.id === 'main-value') {
        st.kill();
      }
    });

    // 스타일 초기화
    gsap.set('.value-list .value', {
      clearProps: 'all'
    });

    if (!isDesktop) {
      // 태블릿/모바일은 정적인 리스트( CSS에서 세로 배치 )
      gsap.set('.value-list .value', {
        opacity: 1,
        scale: 1,
        x: 0
      });
      return;
    }

    // 데스크톱용 타임라인
    const m_value = gsap.timeline({
      scrollTrigger: {
        id: 'main-value',
        trigger: '#main-value',
        start: 'bottom bottom',
        end: 'bottom bottom',
        scrub: 3,
        pin: '.value-list'
      }
    });

    const getGap = () => {
      const w = window.innerWidth;
      let baseGap = w * 0.23;
      if (w < 1600) baseGap = w * 0.22;
      if (w < 1400) baseGap = w * 0.22;
      if (w < 1200) baseGap = w * 0.24;
      if (w < 890) baseGap = w * 0.21;
      if (w < 790) baseGap = w * 0.2;
      if (w < 590) baseGap = w * 0.21;
      if (w < 550) baseGap = w * 0.22;
      if (w < 500) baseGap = w * 0.22;
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

      const overlapRatio = 0.7;
      const offsets = [-1.5, -0.5, 0.5, 1.5].map(v => v * gap * overlapRatio);

      offsets.forEach((x, i) => {
        m_value.to(
          `.value-list .v${i + 1}`,
          { x, duration: 1, ease: 'power2.out' },
          '<'
        );
      });
    };

    animateValues();
    window.addEventListener('resize', animateValues);
  };

  initMainValueAnimation();
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
