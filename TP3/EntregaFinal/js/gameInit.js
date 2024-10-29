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
        const hintImage = await loadImage("../imgs/hint.png")
        const tomChipImage = await loadImage("../imgs/ficha_tom.png")
        const jerryChipImage = await loadImage("../imgs/ficha_jerry.png")
        const lockerImage = await loadImage("../imgs/casillero.png")

        let game = new Game(75, 50, 6, 8, 7, "nombre jugador 1", "nombre jugador 2", tomChipImage, jerryChipImage, lockerImage, hintImage)
        game.initialize()
        game.draw()
        game.cuentaRegresiva()

    } catch (error) {
        console.error("Error al cargar las imágenes: ", error);
    }
}

initGame()

