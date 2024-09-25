const menu = document.querySelector(".menu");
const menu_desplegable = document.querySelector(".btn_burger_menu");
menu_desplegable.addEventListener("click", ()=>{
    menu.classList.toggle("visible");
    menu_desplegable.classList.toggle("efecto");
})
