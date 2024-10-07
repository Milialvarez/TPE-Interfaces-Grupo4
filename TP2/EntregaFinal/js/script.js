/* MENÚ */
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

/* FORMS */
const button_open_popover = document.querySelector("#show_popover");
const button_close_popover = document.querySelector(".close_popover");
const div_popover = document.querySelector("#id_popover");

/*mostrar un form u otro*/
const register_button = document.querySelector('#register_button');

const signin_form = document.querySelector('#signin_form');
const login_form = document.querySelector('#login_form');
const login_button = document.querySelector('#login_button');
const signin_button = document.querySelector('#signin_button');

register_button.addEventListener('click', ()=>{
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

/* CARRUSEL */

let carousels = document.querySelectorAll('.carousel'); //selecciona todos los elementos con la clase carousel.

carousels.forEach((carousel) =>{ //itera sobre cada carrusel para aplicar la lógica interna a c/u
    let btn_izq = carousel.querySelector('.btn_flecha_izq_carousel');
    let btn_der = carousel.querySelector('.btn_flecha_derecha_carousel');
    let carousel_juegos = carousel.querySelector('.carousel_juegos');
    let card = carousel.querySelectorAll('.card');

    let cantidad_pixeles_movimiento = 1200; //define la cantidad de píxeles que el carrusel se desplaza cuando se presiona el botón.
    let cantidad_total_pixeles = card.length * 209; //tamaño total del contenedor de tarjetas en base a la cantidad de tarjetas y el tamaño individual de cada una.
    let movimiento_pixeles_actual = carousel_juegos.clientWidth; //cantidad de píxeles que se ha movido el contenedor hasta el momento. Se inicializa con el ancho del contenedor.

    btn_izq.addEventListener("click", () =>{
        movimiento_pixeles_actual -= cantidad_pixeles_movimiento;

        carousel_juegos.scrollBy({
            left: -cantidad_pixeles_movimiento,
            behavior: 'smooth'
        })
        if(btn_der.style.display == "none"){
            btn_der.style.display = "block";
        }

        if(carousel_juegos.scrollLeft <= 0){ //scrollLeft: cantidad de píxeles que se movieron de manera horizontal
            movimiento_pixeles_actual = carousel_juegos.clientWidth;
            btn_izq.style.display = "none";
        }
    })

    btn_der.addEventListener("click", () =>{
        movimiento_pixeles_actual += cantidad_pixeles_movimiento;

        carousel_juegos.scrollBy({
            left: cantidad_pixeles_movimiento,
            behavior: 'smooth'
        })

        if(btn_izq.style.display == "none"){
            btn_izq.style.display = "block";
        }

        if(movimiento_pixeles_actual >= cantidad_total_pixeles){
            cantidad_pixeles_movimiento = cantidad_total_pixeles - carousel_juegos.clientWidth;
            btn_der.style.display = "none";
        }

        if(carousel_juegos.scrollLeft > 0){
            btn_izq.style.display = "block";
        }
    })
})

