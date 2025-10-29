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

    // 페이지 로딩 시 첫 번째 탭을 활성화 상태로 설정
    if (tabItems.length > 0) {
        tabItems[0].classList.add('active');
    }
});



// 검색 탭
document.addEventListener("DOMContentLoaded", function() {
    const customSelect = document.querySelector(".custom-select-box");
    const selected = customSelect.querySelector(".select-selected");
    const items = customSelect.querySelector(".select-items");
    const listItems = items.querySelectorAll("li");

    // 드롭다운 열기/닫기 토글
    selected.addEventListener("click", function() {
        this.classList.toggle("active");
        items.classList.toggle("select-hide");
    });

    // 옵션 선택 시 값 업데이트
    listItems.forEach(item => {
        item.addEventListener("click", function() {
            // 선택된 항목의 텍스트와 값을 가져옴
            const value = this.getAttribute("data-value");
            const text = this.textContent;

            // 선택된 항목의 스타일 업데이트
            selected.textContent = text;
            selected.appendChild(document.createElement("span")).className = "material-icons";
            selected.lastChild.textContent = "expand_more";
            
            // 모든 항목에서 'same-as-selected' 클래스 제거
            listItems.forEach(li => li.classList.remove("same-as-selected"));
            // 현재 선택된 항목에 클래스 추가
            this.classList.add("same-as-selected");
            
            // 드롭다운 닫기
            selected.classList.remove("active");
            items.classList.add("select-hide");

            // 필요하다면 실제 select 요소의 값도 업데이트
            // const originalSelect = document.getElementById("opt");
            // originalSelect.value = value;
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener("click", function(e) {
        if (!customSelect.contains(e.target)) {
            selected.classList.remove("active");
            items.classList.add("select-hide");
        }
    });
});


const productList = document.getElementById("productList");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let products = [];
let currentIndex = 0;
const itemsPerPage = 20; // 한 번에 불러올 개수

// JSON 데이터 불러오기
fetch("../products.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts();
    });

// 제품 출력 함수
function renderProducts() {
    const nextItems = products.slice(currentIndex, currentIndex + itemsPerPage);

    nextItems.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <div class="product-info-top">
                <h3 id="product-txt">소장품명</h3>
                <h4>${product.name}</h4>
                <h3 id="product-txt">전시실</h3>
                <h4>${product.location}</h4>
            </div>
            <div class="product-info-bottom">
                <p><a href="#">더 알아보기</a></p>
            </div>
        </div>
        `;
        productList.appendChild(li);
    });

    currentIndex += itemsPerPage;

    // 모든 데이터 불러왔으면 버튼 숨김
    if (currentIndex >= products.length) {
        loadMoreBtn.style.display = "none";
    }
}

// 더보기 버튼 클릭 시 추가 로드
loadMoreBtn.addEventListener("click", renderProducts);