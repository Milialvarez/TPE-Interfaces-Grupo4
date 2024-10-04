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

/*mostrar un form u otro*/
const register_button = document.querySelector('#register_button');

const signin_form = document.querySelector('#signin_form');
const login_form = document.querySelector('#login_form');
const login_button = document.querySelector('#login_button');
const signin_button = document.querySelector('#signin_button');
const close_button = document.querySelector('#close_button');

close_button.addEventListener('click', ()=>{
    login_form.classList.add('invisible');
    login_form.classList.remove('visible');
    signin_form.classList.add('invisible');
    signin_form.classList.remove('visible');
})

register_button.addEventListener('click', ()=>{
    login_form.classList.remove('visible');
    login_form.classList.add('invisible');
    signin_form.classList.toggle('invisible');
    signin_form.classList.toggle('visible');
}
)

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

const login = document.querySelector("#log_in");
const signin = document.querySelector("#sign_in");

login.addEventListener('click', (event)=>{
    event.preventDefault();
    alert("Welcome user 12234");
    login_form.classList.remove("visible");
    login_form.classList.add("invisible");
})

signin.addEventListener('click', (event)=>{
    event.preventDefault();
    alert("Welcome user 12234");
    signin_form.classList.remove("visible");
    signin_form.classList.add("invisible");
})

