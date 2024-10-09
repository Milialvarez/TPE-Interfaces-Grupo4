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