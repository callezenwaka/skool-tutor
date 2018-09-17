//Open and closes the menu icon in mobile mode
const nav_menu_toggle = document.querySelector('#nav_menu_toggle');
nav_menu_toggle.addEventListener('click',(e) => {
	// const container = document.querySelector('#container');
	// const logo = document.querySelector('#logo');
	// const nav_menu_toggle_name = document.querySelector('#nav_menu_toggle_name');
 	// const page_overlay = document.querySelector('#page_overlay');
    // const page_to_the_top = document.querySelector('#page_to_the_top');
    nav_menu_toggle.classList.toggle("change");
    nav_menu_toggle.classList.toggle("nav_menu_toggle_fixed");
    container.classList.toggle('container_hide');
    logo.classList.toggle('logo_hide');
    nav_menu_toggle_name.classList.toggle('nav_menu_toggle_name_hide');
    page_overlay.classList.toggle("page_overlay_active");
    //page_to_the_top.classList.toggle('page_to_the_top_active')
    e.stopPropagation();
})

// Toggles an overlay on the screen in mobile mode
window.addEventListener('click', (e) => {
    // const nav_menu_toggle = document.querySelector('#nav_menu_toggle');
    // const nav_menu = document.querySelector('#nav_menu');
    const page_overlay = document.querySelector('#page_overlay');
    if (page_overlay.classList.contains('page_overlay_active')) {
        nav_menu_toggle.classList.toggle("change");
        nav_menu_toggle.classList.toggle("nav_menu_toggle_fixed");
        container.classList.toggle('container_hide');
        logo.classList.toggle('logo_hide');
        nav_menu_toggle_name.classList.toggle('nav_menu_toggle_name_hide');
        page_overlay.classList.toggle("page_overlay_active");
    }
    e.stopPropagation();
});//event.target.className == "item"