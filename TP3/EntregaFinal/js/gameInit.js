"use strict"

const option_button = document.getElementById('option_button');
option_button.addEventListener('click', () => {
    const option_form = document.getElementById('option_form');
    const formData = new FormData(option_form);
    const selectForm = document.getElementById('choose_inline');
    const optionChosen = selectForm.value;
    let option = String(optionChosen);
    const playerOneName = formData.get('player1');
    const playerTwoName = formData.get('player2');

    const intro_page = document.getElementById('intro_page');
    intro_page.classList.add('invisible');

    initGame(option, playerOneName, playerTwoName);
})

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
async function initGame(option, playerOneName, playerTwoName) {
    try {
        const hintImage = await loadImage("../imgs/hint.png")
        const hintProhibitedImage = await loadImage("../imgs/hint_prohibited.png")
        const tomChipImage = await loadImage("../imgs/ficha_tom.png")
        const jerryChipImage = await loadImage("../imgs/ficha_jerry.png")
        const lockerImage = await loadImage("../imgs/casillero.png")

        let lockerSize, chipSize, xInLine, nColumns, nRows;

        if(option == "opcion4"){
            lockerSize = 75; chipSize = 50; xInLine = 4; nColumns = 7; nRows = 6;
        } else if(option == "opcion5"){
            lockerSize = 65; chipSize = 43; xInLine = 5; nColumns = 8; nRows = 7;
        } else if(option == "opcion6"){
            lockerSize = 58; chipSize = 39; xInLine = 6; nColumns = 9; nRows = 8;
        } else if(option == "opcion7"){
            lockerSize = 52; chipSize = 35; xInLine = 7; nColumns = 10; nRows = 9;
        }

        let countdown = document.querySelector(".countdown");
        countdown.classList.remove('invisible');

        let game = new Game(lockerSize, chipSize, xInLine, nColumns, nRows, playerOneName, playerTwoName, tomChipImage, jerryChipImage, lockerImage, hintImage, hintProhibitedImage)
        game.initialize()
        game.draw()
        game.countdown()

    } catch (error) {
        console.error("Error al cargar las imágenes: ", error);
    }
}

