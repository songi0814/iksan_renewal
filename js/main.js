//header lang
const btnLang = document.querySelector('#header .lang-wrap button')
const langWrap = document.querySelector('#header .lang-wrap')

btnLang.addEventListener('click', function() {
  langWrap.classList.toggle('active')
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

    if (!subMenu) return;

    document.querySelectorAll('#gnb .dep2').forEach(menu => {
      if (menu !== subMenu) menu.classList.remove('active');
    });
    subMenu.classList.toggle('active');
  });
});

document.addEventListener('click', e => {
  const isInsideGnb = e.target.closest('#gnb');
  if (!isInsideGnb) {
    document.querySelectorAll('#gnb .dep2').forEach(menu => {
      menu.classList.remove('active');
    });
  }
});



//특별전시
const exhSwiper = new Swiper(".exh-swiper", {
  autoplay: true,
  slidesPerView: 1,
  breakpoints: {
    1920: {slidesPerView: 4,},
    1150: {slidesPerView: 3,},
    950: {slidesPerView: 2,},
    450: {slidesPerView: 1,}
  },
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


//교육&행사
document.addEventListener("DOMContentLoaded", function () {
  const imageElement = document.querySelector(".edu-image-target");

  const popup = document.getElementById("imagePopup");
  const popupImage = document.getElementById("popupImage");
  const closeBtn = document.querySelector(".popup-close");

  const monthText = document.getElementById("currentMonthText");
  const tbody = document.querySelector("#sched_tbl tbody");
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");
  const threeDaysContainer = document.getElementById("threeDaysContainer");
  const mobileCalToggle = document.getElementById("mobileCalToggle");
  const mobileCalendarPopup = document.getElementById("mobileCalendarPopup");

  // 달력
  const today = new Date();
  const TODAY_YEAR = today.getFullYear();
  const TODAY_MONTH = today.getMonth();
  const TODAY_DATE = today.getDate();

  // PC용 전체 달력
  let currentYear = TODAY_YEAR;
  let currentMonth = TODAY_MONTH;

  // 3일짜리 달력
  let selectedDate = new Date(TODAY_YEAR, TODAY_MONTH, TODAY_DATE);

  // 팝업 달력
  let popupYear = TODAY_YEAR;
  let popupMonth = TODAY_MONTH;

  const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];

  // 헤더 변화
  function updateHeaderText() {
    const isMobile = window.innerWidth <= 550;
    if (isMobile) {
      const d = selectedDate;
      // mobile
      monthText.textContent = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    } else {
      // pc
      monthText.textContent = `${currentYear}년 ${currentMonth + 1}월`;
    }
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".change-image-btn");
    if (!btn) return;

    const type = btn.getAttribute("data-type");
    const imgSrc = btn.dataset.img;

    // 포스터 이미지 교체
    if (imageElement) {
      let newSrc = "./img/main_poster.png";

      if (type === "special") {
        newSrc = "./img/special.jpg";
      } else if (type === "experience") {
        newSrc = "./img/experience.jpg";
      } else if (type === "children") {
        newSrc = "./img/children.png";
      } else if (type === "reset") {
        newSrc = "./img/main_poster.png";
      }
      imageElement.src = newSrc;
    }

    if (window.innerWidth <= 1330 && popup && popupImage && imgSrc) {
      popupImage.src = imgSrc;
      popup.style.display = "flex";
    }
  });

  // 포스터 팝업 닫기
  if (closeBtn && popup) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1330) {
        popup.style.display = "none";
      }
    });
  }

  // PC용: 전체 달력
  function renderCalendar(year, month) {
    currentYear = year;
    currentMonth = month;

    if (window.innerWidth > 550) {
      monthText.textContent = `${year}년 ${month + 1}월`;
    }

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekday = firstDay.getDay();
    const totalDays = lastDay.getDate();

    let html = "";
    let dayCounter = 1;

    for (let row = 0; row < 6; row++) {
      let rowHtml = "<tr>";
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstWeekday) {
          rowHtml += "<td></td>";
        } else if (dayCounter > totalDays) {
          rowHtml += "<td></td>";
        } else {
          const date = dayCounter;
          const isToday =
            year === TODAY_YEAR &&
            month === TODAY_MONTH &&
            date === TODAY_DATE;

          let tdClass = isToday ? "today" : "";
          let cellHtml = `<td${tdClass ? ` class="${tdClass}"` : ""}>${date}`;

          // 월요일: 휴관일
          if (col === 1) {
            cellHtml +=
              `<br><button class="closed-day change-image-btn" ` +
              `data-type="reset" data-img="./img/main_poster.png">휴관일</button>`;
          }

          // 금요일: 특강 (+ 20~27: 체험)
          if (col === 5) {
            cellHtml +=
              `<button class="spacial-class change-image-btn" ` +
              `data-type="special" data-img="./img/special.jpg">특강</button>`;

            if (date >= 20 && date <= 27) {
              cellHtml +=
                `<button class="making-class change-image-btn" ` +
                `data-type="experience" data-img="./img/experience.jpg">체험</button>`;
            }
          }

          // 토요일: 어린이 교실
          if (col === 6) {
            cellHtml +=
              `<br><button class="child-class change-image-btn" ` +
              `data-type="children" data-img="./img/children.png">어린이 교실</button>`;
          }

          cellHtml += "</td>";
          rowHtml += cellHtml;
          dayCounter++;
        }
      }
      rowHtml += "</tr>";
      html += rowHtml;

      if (dayCounter > totalDays) break;
    }

    tbody.innerHTML = html;
  }

  // 3일짜리 달력 (전날 / 선택한 날 / 다음날)
  function renderThreeDays() {
    if (!threeDaysContainer) return;

    const offsets = [-1, 0, 1];
    let ths = "";
    let tds = "";

    const base = selectedDate;

    offsets.forEach((offset) => {
      const d = new Date(
        base.getFullYear(),
        base.getMonth(),
        base.getDate() + offset
      );
      const da = d.getDate();
      const w = d.getDay();

      const isCenter = offset === 0;

      // 요일 헤더
      ths += `<th>${weekdayNames[w]}</th>`;
      let buttonsHtml = "";

      // 월요일: 휴관일
      if (w === 1) {
        buttonsHtml +=
          `<br><button class="closed-day change-image-btn" ` +
          `data-type="reset" data-img="./img/main_poster.png">휴관일</button>`;
      }

      // 금요일: 특강 (+ 20~27: 체험)
      if (w === 5) {
        buttonsHtml +=
          `<br><button class="spacial-class change-image-btn" ` +
          `data-type="special" data-img="./img/special.jpg">특강</button>`;

        if (da >= 20 && da <= 27) {
          buttonsHtml +=
            `<button class="making-class change-image-btn" ` +
            `data-type="experience" data-img="./img/experience.jpg">체험</button>`;
        }
      }

      // 토요일: 어린이 교실
      if (w === 6) {
        buttonsHtml +=
          `<br><button class="child-class change-image-btn" ` +
          `data-type="children" data-img="./img/children.png">어린이 교실</button>`;
      }

      tds += `
        <td class="${isCenter ? "today" : ""}">
          ${da}
          ${buttonsHtml}
        </td>
      `;
    });

    threeDaysContainer.innerHTML = `
      <table class="three-days-table">
        <thead>
          <tr>${ths}</tr>
        </thead>
        <tbody>
          <tr>${tds}</tr>
        </tbody>
      </table>
    `;
  }

  // 팝업 달력 렌더링 (좌/우 이동)
  function renderPopupCalendar() {
    if (!mobileCalendarPopup) return;

    const year = popupYear;
    const month = popupMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekday = firstDay.getDay();
    const totalDays = lastDay.getDate();

    let html = `
      <div class="popup-cal-header">
        <button type="button" class="popup-cal-prev">
          <i class="ri-arrow-left-s-line"></i>
        </button>
        <span>${year}년 ${month + 1}월</span>
        <button type="button" class="popup-cal-next">
          <i class="ri-arrow-right-s-line"></i>
        </button>
      </div>
    `;

    html += `<table class="popup-cal"><thead><tr>`;
    weekdayNames.forEach((wd) => {
      html += `<th>${wd}</th>`;
    });
    html += `</tr></thead><tbody>`;

    let dayCounter = 1;

    for (let row = 0; row < 6; row++) {
      html += "<tr>";
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstWeekday) {
          html += `<td class="empty"></td>`;
        } else if (dayCounter > totalDays) {
          html += `<td class="empty"></td>`;
        } else {
          const da = dayCounter;

          const isSelected =
            year === selectedDate.getFullYear() &&
            month === selectedDate.getMonth() &&
            da === selectedDate.getDate();

          html += `<td class="${isSelected ? "is-selected" : ""}" data-date="${year}-${month + 1}-${da}">${da}</td>`;
          dayCounter++;
        }
      }
      html += "</tr>";
      if (dayCounter > totalDays) break;
    }

    html += "</tbody></table>";

    mobileCalendarPopup.innerHTML = html;
  }

  // 초기 렌더링
  renderCalendar(currentYear, currentMonth);
  renderThreeDays();
  updateHeaderText();

  // PC용 월 이동 버튼
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
      updateHeaderText();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
      updateHeaderText();
    });
  }

  // 모바일: 달력 팝업 토글
  if (mobileCalToggle && mobileCalendarPopup) {
    mobileCalToggle.addEventListener("click", () => {
      if (mobileCalendarPopup.classList.contains("open")) {
        mobileCalendarPopup.classList.remove("open");
      } else {
        popupYear = selectedDate.getFullYear();
        popupMonth = selectedDate.getMonth();
        renderPopupCalendar();
        mobileCalendarPopup.classList.add("open");
      }
    });

    mobileCalendarPopup.addEventListener("click", (e) => {
      const prevBtn = e.target.closest(".popup-cal-prev");
      const nextBtn = e.target.closest(".popup-cal-next");
      const cell = e.target.closest("td[data-date]");

      // 이전 달
      if (prevBtn) {
        popupMonth--;
        if (popupMonth < 0) {
          popupMonth = 11;
          popupYear--;
        }
        renderPopupCalendar();
        return;
      }

      // 다음 달
      if (nextBtn) {
        popupMonth++;
        if (popupMonth > 11) {
          popupMonth = 0;
          popupYear++;
        }
        renderPopupCalendar();
        return;
      }

      // 날짜 선택
      if (cell) {
        const [y, m, d] = cell.getAttribute("data-date").split("-").map(Number);
        selectedDate = new Date(y, m - 1, d);

        // 팝업 닫고 3일 달력 + 헤더 교체
        mobileCalendarPopup.classList.remove("open");
        renderThreeDays();
        updateHeaderText();
      }
    });
  }
  // 리사이즈 시 헤더 텍스트 모드 변경
  window.addEventListener("resize", () => {
    updateHeaderText();
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

  function getLimitCount() {
    return window.innerWidth <= 930 ? 4 : 5;
  }

  function setScrollLimit(list) {
    const ul = list.querySelector('ul');
    if (!ul) return;

    const lis = ul.querySelectorAll('li');
    const limitCount = getLimitCount();

    if (lis.length <= limitCount) {
      ul.style.maxHeight = 'none';
      ul.style.overflowY = 'visible';
      return;
    }

    const first = lis[0];
    const last = lis[limitCount - 1];

    const totalHeight = (last.offsetTop + last.offsetHeight) - first.offsetTop;

    ul.style.maxHeight = totalHeight + 'px';
    ul.style.overflowY = 'auto';
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      if (this.querySelector('a')) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const targetTab = this.getAttribute('data-tab');

      noticeLists.forEach(list => {
        list.classList.remove('active');
        if (list.getAttribute('data-type') === targetTab) {
          list.classList.add('active');

          setTimeout(() => {
            setScrollLimit(list);
          }, 50);
        }
      });
    });
  });

  const activeList = document.querySelector('#notice-board .notice-list.active');
  if (activeList) setScrollLimit(activeList);

  window.addEventListener('resize', () => {
    const activeList = document.querySelector('#notice-board .notice-list.active');
    if (!activeList) return;

    const ul = activeList.querySelector('ul');
    if (!ul) return;

    ul.style.maxHeight = 'none';
    ul.style.overflowY = 'visible';

    setScrollLimit(activeList);
  });
});
