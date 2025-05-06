let chairsGlobal = {};
let matchMediaSize = window.matchMedia("(max-width: 1024px)");
let isMobile = matchMediaSize.matches; // 초기 상태 설정

document.addEventListener("DOMContentLoaded",() => {
    chairsGlobal.init(); // Load initial function when page is loaded
});

chairsGlobal = {
    // Add an event listener to update the device size status when the window is resized
    resizeEvent: () => {
        // Listen for media query changes instead of 'resize' event
        matchMediaSize.addEventListener("change", (e) => {
            isMobile = e.matches;
        });
    },
    // Check device size
    sizeChx: () =>{
        matchMediaSize = window.matchMedia("(max-width: 1024px)");
        isMobile = matchMediaSize.matches;
    },
    // Set up event listeners for header interactions (e.g., menu toggle)
    header: () => { 
        const header = document.querySelector('header');
        const btnOpenMainMenu = header.querySelector('[data-btn=openMainMenu]'); // hamburger button
        const btncloseMainMenu = header.querySelector('[data-btn=closeMainMenu]'); // close button
        const btnOpenSubMenu = header.querySelector('[data-btn=openSubMenu]'); // about us button
        const btnCloseSubMenu = header.querySelector('[data-btn=closeSubMenu]'); // close button on sub menu
        const subMenu = header.querySelector('.sub_menu'); // sub menu
        const links = header.querySelectorAll('a');

        // open menu when click hamburger button in tablet and mobile (width is less then 1024px)
        btnOpenMainMenu.addEventListener("click", mainMenuOpen);
        // close menu when click close button on nav menu in tablet and mobile (width is less then 1024px)
        btncloseMainMenu.addEventListener("click", mainMenuClose);

        /* 
            Loop through all anchor tags in the header and add keyup event listeners 
            to handle focus navigation using the focusOut function 
        */
        links.forEach((link, idx) => {
            link.addEventListener("keyup", (evt) => {
                focusOut(evt, link, idx, links.length);
            });
        });

        // open sub menu when click about us button in PC (width is more then 1024px)
        btnOpenSubMenu.addEventListener("click", subMenuOpen);
        // close sub menu when click about us button or close button on sub menu in PC (width is more then 1024px)
        btnCloseSubMenu.addEventListener("click", subMenuClose);

        // open menu when click hamburger button
        function mainMenuOpen (){
            if(!isMobile) return;
            header.classList.add('active');
        };
        // close menu when click hamburger button
        function mainMenuClose (){
            if(!isMobile) return;
            header.classList.remove('active');
        };

        // open sub menu when click about us button
        function subMenuOpen (evt){
            if(!isMobile){
                const target = evt.target
                const li = target.closest('li');
                
                if(header.classList.contains('active')){
                    header.classList.remove('active');
                    li.dataset.active = false;
                } else {
                    header.classList.add('active');
                    li.dataset.active = true;
                }
            } else {
                if (subMenu.style.maxHeight) {
                    closeAccordion(subMenu);
                } else {
                    openAccordion(subMenu);
                }
            }
        };

        // open accordion         
        const openAccordion = (subMenu) => {
                subMenu.closest('li').dataset.active = true;
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                btnOpenSubMenu.setAttribute("title", "Close menu");
        };
        
        // close accordion 
        const closeAccordion = (subMenu) => {
            subMenu.closest('li').dataset.active = false;
            subMenu.style.maxHeight = null;
            btnOpenSubMenu.setAttribute("title", "Open menu");
        };
        
        // close sub menu when click about us button or close button on sub menu
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

        // keyboard focus navigation
        function focusOut(evt,item,idx, length){
            const li = item.closest('li');
            let submenu = null;
            if (li) {
                submenu = li.querySelector('.sub_menu');
            }

            if(evt.key === 'Tab' && submenu){
                subMenuOpen(evt);
            } 

            if(idx === length - 1 || idx ===0){
                subMenuClose(evt);
            }
        }
    },
    homepageMotion: () => {
        const sectionHero = document.querySelector('.section_hero');
        const scrollTarget = document.querySelector('section[data-scroll=target]');
        
        // add class on section_hero when page is loaded
        document.addEventListener("DOMContentLoaded",() => {
            setTimeout(() => {
                sectionHero.classList.add('active');
            },250);
        })

        // Add scroll event listener to trigger animation or class change based on scroll position
        window.addEventListener('scroll',toggleActiveOnScroll);

        // Add or remove 'active' class on the target section based on its position relative to the viewport
        function toggleActiveOnScroll(){
            let targetRec = scrollTarget.getBoundingClientRect();
            
            if(targetRec.top - (targetRec.top / 5) < window.scrollY){
                scrollTarget.classList.add('active');
            }else{
                scrollTarget.classList.remove('active');
            }
        }
    },
    init: () => { // Initialize core functions when the page loads
        chairsGlobal.header();
        chairsGlobal.resizeEvent();
        chairsGlobal.sizeChx();
	}
}