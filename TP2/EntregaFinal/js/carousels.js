let carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    let btn_izq = carousel.querySelector('.btn_left_arrow');
    let btn_der = carousel.querySelector('.btn_right_arrow');
    let carousel_juegos = carousel.querySelector('.games_carousel');
    let cards = carousel.querySelectorAll('.card');

    let cantidad_pixeles_movimiento = 1200;
    let cantidad_total_pixeles = cards.length * 209 - carousel_juegos.clientWidth;

    function ItsMobileView() {
        return window.innerWidth <= 768;
    }

    carousel_juegos.addEventListener('scroll', () => {
        if (carousel_juegos.id == 'recommended_carousel') {
            cards.forEach(card => {
                card.classList.add('scaled');
            })
            carousel_juegos.addEventListener('scrollend', () => {
                cards.forEach(card => {
                    card.classList.remove('scaled');
                })
            })
        }
        if (ItsMobileView()) {
            btn_der.style.display = "none";
            btn_izq.style.display = "none";
        } else {
            let scroll = carousel_juegos.scrollLeft;
            if (scroll > 0) {
                btn_izq.style.display = "block";
            } else {
                btn_izq.style.display = "none";
            }

            if (scroll >= cantidad_total_pixeles - 1) {
                btn_der.style.display = "none";
            } else {
                btn_der.style.display = "block";
            }
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