
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


// SUB TAB (페이지 이동 방지 + active 고정)
const subTabLinks = document.querySelectorAll('#sub-tab .sub-tab-list a')

subTabLinks.forEach(link => { 
  link.addEventListener('click', (e) => {
    e.preventDefault()
  })
})

// GSAP
gsap.registerPlugin(SplitText, ScrollTrigger)
gsap.set(".split", { opacity: 1 })

// // SPLIT TEXT ANIMATION
// document.fonts.ready.then(() => {
//   let texts = gsap.utils.toArray(".split")
//   texts.forEach((text) => {
//     SplitText.create(text, {
//     type: "words,lines",
//     mask: "lines",
//     linesClass: "line",
//       onSplit: (instance) => {
//         return gsap.from(instance.lines, {
//           yPercent: 120,
//           stagger: 0.2,
//           duration:0.6,
//           scrollTrigger: {
//             trigger: text,
//             start: "top 80%",
//           }
//         })
//       }
//     })
//   })
// })

	/* ===============================
	   SECTION TITLE
	================================= */

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




// MAIN VALUE CARD ANIMATION
window.addEventListener('load', () => {
  const section = document.querySelector('#main-value')
  if(!section) return
  const values = gsap.utils.toArray('.value-list .value')
  const initAnimation = () => {
    const isDesktop = window.matchMedia('(min-width:1200px)').matches
    ScrollTrigger.getAll().forEach(st=>{
      if(st.vars && st.vars.id === 'main-value'){
        st.kill()
      }
    })
    gsap.set(values,{clearProps:'all'})
    if(!isDesktop){
      gsap.set(values,{
        opacity:1,
        scale:1,
        x:0,
        y:0
      })
      return
    }
    
    /* 초기 상태 */
    gsap.set(values,{
      opacity:1,
      scale:0.3,
      x:0,
      y:0
    })
    const offsets = [
      { x:-420, y:0 },
      { x:-140, y:0 },
      { x:140, y:0 },
      { x:420, y:0 }
    ]
    const tl = gsap.timeline({
      scrollTrigger:{
        id:'main-value',
        trigger:'#main-value',
        start:'top 65%',
        end:'bottom 75%',
        scrub:1.5
      }
    })
    tl.to(values,{
      scale:1,
      duration:1.5,
      ease:'back.out(1.7)',
      stagger:0.06
    })
    offsets.forEach((pos,i)=>{
      tl.to(
      `.value-list .v${i+1}`,
        {
        x:pos.x,
        y:pos.y,
        duration:2.5,
        ease:'power3.out'
        },
      '<+=0.05'
      )
    })
  }
  initAnimation()
  window.addEventListener('resize', initAnimation)
})

// STRATEGY TAB
gsap.registerPlugin(ScrollTrigger);

/* 카드 애니메이션 */
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

gsap.registerPlugin(ScrollTrigger);

/* ===============================
   REDUCE MOTION 대응 (접근성)
================================= */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(!prefersReducedMotion){



	/* ===============================
	   STRATEGY CARD
	================================= */

	gsap.utils.toArray(".strategy-card").forEach((el, i)=>{

		gsap.to(el,{
			opacity:1,
			y:0,
			duration:0.8,
			delay:i * 0.1,
			ease:"power3.out",
			scrollTrigger:{
				trigger:el,
				start:"top 90%",
				once:true
			}
		});

	});

	/* ===============================
	   PERFORMANCE CARD
	================================= */

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

/* ===============================
   REFRESH (모바일 대응)
================================= */

window.addEventListener("resize", ()=>{
	ScrollTrigger.refresh();
});