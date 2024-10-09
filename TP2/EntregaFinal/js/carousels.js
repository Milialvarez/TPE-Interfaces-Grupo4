let carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    let btn_izq = carousel.querySelector('.btn_left_arrow');
    let btn_der = carousel.querySelector('.btn_right_arrow');
    let carousel_juegos = carousel.querySelector('.games_carousel');
    let card = carousel.querySelectorAll('.card');

    let cantidad_pixeles_movimiento = 1200;
    let cantidad_total_pixeles = card.length * 209 - carousel_juegos.clientWidth;

    carousel_juegos.addEventListener('scroll', () => {
        let scroll = carousel_juegos.scrollLeft;
       
        if (scroll > 0) {
            btn_izq.style.display = "block"; 
        } else {
            btn_izq.style.display = "none";
        }

        if (scroll >= cantidad_total_pixeles) {
            btn_der.style.display = "none"; 
        } else {
            btn_der.style.display = "block"; 
        }
    });

    btn_izq.addEventListener("click", () => {
        carousel_juegos.scrollBy({
            left: -cantidad_pixeles_movimiento,
            behavior: 'smooth'
        });
    });

    btn_der.addEventListener("click", () => {
        carousel_juegos.scrollBy({
            left: cantidad_pixeles_movimiento,
            behavior: 'smooth'
        });
    });
})