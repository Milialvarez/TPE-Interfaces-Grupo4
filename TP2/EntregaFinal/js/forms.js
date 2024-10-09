const button_open_popover = document.querySelector("#show_popover");
const button_close_popover = document.querySelector(".close_popover");
const div_popover = document.querySelector("#id_popover");

const register_button = document.querySelector('#register_button');

if (localStorage.getItem("session")) {
    register_button.innerHTML = "Cerrar sesion"
}

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
    if (localStorage.getItem("session")) {
        register_button.innerHTML = "Registrarse"
        localStorage.clear()
    } else {
        document.body.classList.add('blur');
        signin_form.classList.remove('invisible');
        signin_form.classList.add('visible');
        profile_menu.classList.remove('visible');
        profile_menu.classList.add('invisible');
    }
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

accept_button.addEventListener('click', () => {
    sesion_correcta.classList.remove('visible');
    sesion_correcta.classList.add('invisible');
    document.body.classList.remove('blur');
    register_button.innerHTML = "Cerrar sesión"
    localStorage.setItem("session", true)
})

signin.addEventListener("click", function (event) {
    event.preventDefault();

    signin.classList.add("loading"); // clase para mostrar el spinner
    signin.disabled = true; // Deshabilita el botón

    // Después de 3 segundos mostramos cartel de bienvenida
    setTimeout(() => {
        signin.classList.remove("loading");
        signin.disabled = false;
        signin_form.classList.remove("visible");
        signin_form.classList.add("invisible");
        sesion_correcta.classList.add('visible');
        sesion_correcta.classList.remove('invisible');
    }, 3000);
});

login.addEventListener("click", function (event) {
    event.preventDefault();

    login.classList.add("loading"); // clase para mostrar el spinner
    login.disabled = true; // Deshabilita el botón

    // Después de 3 segundos mostramos cartel de bienvenida
    setTimeout(() => {
        login.classList.remove("loading");
        login.disabled = false;
        login_form.classList.remove("visible");
        login_form.classList.add("invisible");
        sesion_correcta.classList.add('visible');
        sesion_correcta.classList.remove('invisible');
    }, 3000);
});