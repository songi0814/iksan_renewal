
// HEADER LANG
const btnLang = document.querySelector('#header .lang-wrap button')
const langWrap = document.querySelector('#header .lang-wrap')

if(btnLang && langWrap){
  btnLang.addEventListener('click', () => {
    langWrap.classList.toggle('active')
    document.querySelector('#header').classList.add('scroll')
  })
}


// ALL MENU
const allMenuOpen = document.querySelector('.all-menu-open')
const allMenuPopup = document.querySelector('.all-menu-popup')
const allMenuClose = document.querySelector('.allmenu-close')

if(allMenuOpen && allMenuPopup){
  allMenuOpen.addEventListener('click', () => {
  allMenuPopup.style.display = 'block'
  })
}

if(allMenuClose && allMenuPopup){
  allMenuClose.addEventListener('click', () => {
  allMenuPopup.style.display = 'none'
  })
}

// SEARCH
const searchWrap = document.querySelector('#header .utill .search-wrap')
if(searchWrap){
  const searchBtn = searchWrap.querySelector('button')
  searchBtn.addEventListener('click', function(e){
    e.stopPropagation()
    searchWrap.querySelector('.search-box').style.display = 'flex'
  })
  searchWrap.addEventListener('click', function(e){
    if(e.target.closest('.search-close')){
      searchWrap.querySelector('.search-box').style.display = 'none'
    }
  })
}


// GNB DEP2
document.querySelectorAll('#gnb .dep1 > li > a').forEach(item => {
item.addEventListener('click', e => {
  e.preventDefault()
  const parentLi = e.currentTarget.closest('li')
  const subMenu = parentLi.querySelector('.dep2')
  if(!subMenu) return

  document.querySelectorAll('#gnb .dep2').forEach(menu => {
    if(menu !== subMenu) menu.classList.remove('active')
  })
  subMenu.classList.toggle('active')
  })
})


// SUB TAB
const subTabLinks = document.querySelectorAll('#sub-tab .sub-tab-list a')

subTabLinks.forEach(link => { 
  link.addEventListener('click', (e) => {
    e.preventDefault()
  })
})

// GSAP
gsap.registerPlugin(SplitText, ScrollTrigger)
gsap.set(".split", { opacity: 1 })

// SECTION TITLE

gsap.utils.toArray(".split").forEach((el)=>{

  const targets = el.querySelectorAll("h3");

  gsap.to(targets,{
    opacity:1,
    y:0,
    duration:0.8,
    stagger:0.2,
    ease:"power3.out",
    scrollTrigger:{
      trigger:el,
      start:"top 85%",
      once:true
    }
  });

});


// MAIN VALUE CARD (단순화 버전)
window.addEventListener('load', () => {
  const values = gsap.utils.toArray('.value-list .value')

  const isDesktop = window.matchMedia('(min-width:1200px)').matches

  if (!isDesktop) {
    gsap.set(values, {
      opacity: 1,
      scale: 1,
      clearProps: 'all'
    })
    return
  }

  gsap.fromTo(values,
    {
      opacity: 0,
      scale: 0.6,
      y: 40
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#main-value',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )
})

// STRATEGY CARD
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".strategy-card").forEach((el, i)=>{
	gsap.to(el,{
		opacity:1,
		y:0,
		duration:0.8,
		delay:i * 0.15,
		ease:"power3.out",
		scrollTrigger:{
			trigger:el,
			start:"top 85%"
		}
	});
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(!prefersReducedMotion){


// PERFORMANCE CARD
gsap.utils.toArray(".performance-card").forEach((el, i)=>{

  gsap.to(el,{
    opacity:1,
    y:0,
    duration:0.8,
    delay:i * 0.08,
    ease:"power3.out",
    scrollTrigger:{
      trigger:el,
      start:"top 90%",
      once:true
    }
  });

}); 
}

window.addEventListener("resize", ()=>{
	ScrollTrigger.refresh();
});