const burger_menu = document.querySelector('#burger_menu');
const profile_menu = document.querySelector('#profile_menu');
const btn_burger_menu = document.querySelector('#btn_burger_menu');
const btn_profile_menu = document.querySelector('#btn_profile_menu')

btn_burger_menu.addEventListener("click", () => {
    burger_menu.classList.toggle("visible");
    burger_menu.classList.toggle("invisible");
})

btn_profile_menu.addEventListener("click", () => {
    profile_menu.classList.toggle("visible");
    profile_menu.classList.toggle("invisible");
})

const button_open_popover = document.querySelector("#show_popover");
const button_close_popover = document.querySelector(".close_popover");
const div_popover = document.querySelector("#id_popover");

const register_button = document.querySelector('#register_button');

const signin_form = document.querySelector('#signin_form');
const login_form = document.querySelector('#login_form');
const login_button = document.querySelector('#login_button');
const signin_button = document.querySelector('#signin_button');
const signin_close_button = document.querySelector('.close_button');
const login_close_button = document.querySelector('#login_close_button');

signin_close_button.addEventListener('click', () => {
    signin_form.classList.add('invisible');
    signin_form.classList.remove('visible');
    document.body.classList.remove('blur');
})

login_close_button.addEventListener('click', () => {
    login_form.classList.add('invisible');
    login_form.classList.remove('visible');
    document.body.classList.remove('blur');
})

register_button.addEventListener('click', () => {
    document.body.classList.add('blur');
    signin_form.classList.remove('invisible');
    signin_form.classList.add('visible');
    profile_menu.classList.remove('visible');
    profile_menu.classList.add('invisible');
})

login_button.addEventListener('click', (event) => {
    event.preventDefault();
    signin_form.classList.remove("visible");
    signin_form.classList.add("invisible");
    login_form.classList.remove("invisible");
    login_form.classList.add("visible");
});

signin_button.addEventListener('click', (event) => {
    event.preventDefault();
    login_form.classList.remove("visible");
    login_form.classList.add("invisible");
    signin_form.classList.remove("invisible");
    signin_form.classList.add("visible");
});

const login = document.querySelector("#log_in");
const signin = document.querySelector("#sign_in");
const sesion_correcta = document.querySelector('#correct_session');
const accept_button = document.querySelector('#accept_button');

login.addEventListener('click', (event) => {
    event.preventDefault();
    login_form.classList.remove("visible");
    login_form.classList.add("invisible");
    sesion_correcta.classList.add('visible');
    sesion_correcta.classList.remove('invisible');
})

accept_button.addEventListener('click', () => {
    sesion_correcta.classList.remove('visible');
    sesion_correcta.classList.add('invisible');
    document.body.classList.remove('blur');
})

signin.addEventListener('click', (event) => {
    event.preventDefault();
    signin_form.classList.remove("visible");
    signin_form.classList.add("invisible");
    sesion_correcta.classList.add('visible');
    sesion_correcta.classList.remove('invisible');
})

let carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    let btn_izq = carousel.querySelector('.btn_left_arrow');
    let btn_der = carousel.querySelector('.btn_right_arrow');
    let carousel_juegos = carousel.querySelector('.games_carousel');
    let card = carousel.querySelectorAll('.card');

    let cantidad_pixeles_movimiento = 1200;
    let cantidad_total_pixeles = card.length * 209;
    let movimiento_pixeles_actual = carousel_juegos.clientWidth;

    btn_izq.addEventListener("click", () => {
        movimiento_pixeles_actual -= cantidad_pixeles_movimiento;

        carousel_juegos.scrollBy({
            left: -cantidad_pixeles_movimiento,
            behavior: 'smooth'
        })

        if (btn_der.style.display == "none") {
            btn_der.style.display = "block";
        }

        if (carousel_juegos.scrollLeft <= 0) {
            btn_izq.style.display = "none";
            movimiento_pixeles_actual = carousel_juegos.clientWidth;
        }
    })

    btn_der.addEventListener("click", () => {
        movimiento_pixeles_actual += cantidad_pixeles_movimiento;

        carousel_juegos.scrollBy({
            left: cantidad_pixeles_movimiento,
            behavior: 'smooth'
        })

        if (movimiento_pixeles_actual >= cantidad_total_pixeles) {
            cantidad_pixeles_movimiento = cantidad_total_pixeles - carousel_juegos.clientWidth;
            btn_der.style.display = "none";
        }

        if (carousel_juegos.scrollLeft >= 0) {
            btn_izq.style.display = "block";
        }
    })
})