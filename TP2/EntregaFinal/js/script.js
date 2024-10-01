const burger_menu = document.querySelector('#burger_menu');
const profile_menu = document.querySelector('#profile_menu');
const btn_burger_menu = document.querySelector('#btn_burger_menu');
const btn_profile_menu = document.querySelector('#btn_profile_menu')

btn_burger_menu.addEventListener("click", ()=>{
    burger_menu.classList.toggle("visible");
    burger_menu.classList.toggle("invisible");
})

btn_profile_menu.addEventListener("click", ()=>{
    profile_menu.classList.toggle("visible");
    profile_menu.classList.toggle("invisible");
})

const button_open_popover = document.querySelector("#show_popover");
const button_close_popover = document.querySelector(".close_popover");
const div_popover = document.querySelector("#id_popover");

button_open_popover.addEventListener('click', ()=>{
    div_popover.style.display = 'flex';
})

button_close_popover.addEventListener('click', ()=> {
    div_popover.style.display = 'none';
})

/*mostrar un form u otro*/
const signin_form = document.querySelector('#signin_form');
const login_form = document.querySelector('#login_form');
const login_button = document.querySelector('.login_button');
const signin_button = document.querySelector('.signin_button');

login_button.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado
    signin_form.classList.remove("visible");
    signin_form.classList.add("invisible");
    login_form.classList.remove("invisible");
    login_form.classList.add("visible");
});

signin_button.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado
    login_form.classList.remove("visible");
    login_form.classList.add("invisible");
    signin_form.classList.remove("invisible");
    signin_form.classList.add("visible");
});

