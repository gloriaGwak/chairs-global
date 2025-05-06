
let chairsGlobal = {};
let matchMediaSize = window.matchMedia("(max-width: 1024px)");
let isMobile = true;


document.addEventListener("DOMContentLoaded",() => {
    chairsGlobal.init();
    console.log(isMobile,"이닛")
});

chairsGlobal = {
    resizeEvent: () => {
        window.addEventListener('resize', () => {
            chairsGlobal.sizeChx();
            console.log(isMobile,"리사이즈")
        });
    },

    sizeChx: () =>{
        if(!matchMediaSize.matches){
            isMobile = false;
        }else{
            isMobile = true;
        }
    },
    // header event
    header: () => {
        const header = document.querySelector('header');
        const btnOpenMainMenu = header.querySelector('[data-btn=openMainMenu]');
        const btncloseMainMenu = header.querySelector('[data-btn=closeMainMenu]');
        const btnOpenSubMenu = header.querySelector('[data-btn=openSubMenu]');
        const btnCloseSubMenu = header.querySelector('[data-btn=closeSubMenu]');
        const subMenu = header.querySelector('.sub_menu');
        
        

        btnOpenMainMenu.addEventListener("click", mainMenuOpen);
        btncloseMainMenu.addEventListener("click", mainMenuClose);

        header.querySelectorAll('a').forEach((link,idx) => {
            const linkLength = header.querySelectorAll('a').length;
            link.addEventListener("keyup", (evt) => {
                focusOut(evt,link,idx, linkLength);
                console.log(idx, length, idx)
            });
        });

        btnOpenSubMenu.addEventListener("click", subMenuOpen);
        btnCloseSubMenu.addEventListener("click", subMenuClose);

        
        function mainMenuOpen (){
            if(!isMobile) return;
            header.classList.add('active');
        };
        function mainMenuClose (){
            if(!isMobile) return;
            header.classList.remove('active');
        };

        function subMenuOpen (evt){
            if(!isMobile){
                console.log(isMobile,'subMenuOpen에서 웹웹')
                const target = evt.target
                const li = target.closest('li');
                
                if(header.classList == 'active'){
                    header.classList.remove('active');
                    li.dataset.active = false;
                } else {
                    header.classList.add('active');
                    li.dataset.active = true;
                }
            } else {
                console.log(isMobile,'subMenuOpen에서 모바일')
                if (subMenu.style.maxHeight) {
                    closeAccordion(subMenu);
                } else {
                    openAccordion(subMenu);
                }
            }
        };

        
        const openAccordion = (subMenu) => {
                subMenu.closest('li').dataset.active = true;
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                btnOpenSubMenu.setAttribute("title", "Close menu");
        };
        
        const closeAccordion = (subMenu) => {
            subMenu.closest('li').dataset.active = false;
            subMenu.style.maxHeight = null;
            btnOpenSubMenu.setAttribute("title", "Open menu");
        };
        
        function subMenuClose (evt){
            if(isMobile) return;
            const target = evt.target;
            let li = null;

            if (target.closest('.main_menu') !== null) {
                li = target.closest('li');
                li.dataset.active = false;
            }
            header.classList.remove('active');
        };

        function focusOut(evt,item,idx, length){
            const li = item.closest('li');
            let submenu = null;
            if (li) {
                submenu = li.querySelector('.sub_menu');
            }

            if(evt.keyCode === 9 && submenu){
                subMenuOpen(evt);
            } 

            console.log(idx, length, idx)

            if(idx === length - 1 || idx ===0){
                subMenuClose(evt);
            }
        }


    },
    homepageMotion: () => {
        const sectionHero = document.querySelector('.section_hero');
        const heroTextArea = sectionHero.querySelector('.txt_box strong');
        const heroText = heroTextArea.querySelectorAll('p');
        const scrollTarget = document.querySelector('section[data-scroll=target]');
        
        document.addEventListener("DOMContentLoaded",() => {
            sectionHero.classList.add('active');
        })
        window.addEventListener('scroll',toggleActiveOnScroll);


        function toggleActiveOnScroll(){
            let targetRec = scrollTarget.getBoundingClientRect();
            
            if(targetRec.top - (targetRec.top / 5) < window.scrollY){
                scrollTarget.classList.add('active');
            }else{
                scrollTarget.classList.remove('active');
            }
        }
    },
    init: () => { 
        chairsGlobal.header();
        chairsGlobal.resizeEvent();
        chairsGlobal.sizeChx();
	}
}