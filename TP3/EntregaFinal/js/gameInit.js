"use strict"

//FUNCIÓN PROMESA DE CARGA DE IMAGENES GENERAL
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(img)
        img.onerror = reject
    })
}

//FUNCIÓN ASÍNCRONA DE CONFIGURACIÓN E INICIALIZACIÓN DEL JUEGO
async function initGame() {
    try {
        const imagenTom = await loadImage("../imgs/ficha_tom.png")
        const imagenJerry = await loadImage("../imgs/ficha_jerry.png")

        let game = new Game(75, 50, 6, 8, 7, "nombre jugador 1", "nombre jugador 2", imagenTom, imagenJerry)
        game.initialize()
        game.draw()

    } catch (error) {
        console.error("Error al cargar las imágenes: ", error);
    }
}

initGame()