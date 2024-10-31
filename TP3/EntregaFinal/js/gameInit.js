"use strict"

const option_button = document.getElementById('option_button');
option_button.addEventListener('click', getGameConfig)

let selectedCharacterTom = 1;
let selectedCharacterJerry = 1;

function selectCharacterTom(event, index) {
    event.preventDefault();
  // Eliminar la clase 'selected' de todos los botones
  const buttons = document.querySelectorAll('.image-button_tom');

  // Guardar el índice del personaje seleccionado
  selectedCharacterTom = index;
}

function selectCharacterJerry(event, index) {
    event.preventDefault();
    // Eliminar la clase 'selected' de todos los botones
    const buttons = document.querySelectorAll('.image-button_jerry');
  
    // Guardar el índice del personaje seleccionado
    selectedCharacterJerry = index;
  }

function getGameConfig() {
    const option_form = document.getElementById('option_form');
    const formData = new FormData(option_form);
    const selectForm = document.getElementById('choose_inline');
    const optionChosen = selectForm.value;
    let option = String(optionChosen);
    let playerOneName = formData.get('player1');
    let playerTwoName = formData.get('player2');

    if (playerOneName === "" && playerTwoName === "") {
        playerOneName = "player 1";
        playerTwoName = "player 2";
    } else if (playerOneName === "") {
        playerOneName = "player 1";
    } else if (playerTwoName === "") {
        playerTwoName = "player 2";
    }

    const intro_page = document.getElementById('intro_page');
    intro_page.classList.add('invisible');

    initGame(option, playerOneName, playerTwoName, selectedCharacterTom, selectedCharacterJerry);
}

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
async function initGame(option, playerOneName, playerTwoName, characterTom, characterJerry) {

    try {
        const hintImage = await loadImage("../imgs/hint.png")
        const hintProhibitedImage = await loadImage("../imgs/hint_prohibited.png")
        const lockerImage = await loadImage("../imgs/casillero.png")
        let tomChipImage;
    let jerryChipImage;

    if(characterTom == 1){
        tomChipImage = await loadImage("../imgs/ficha_tom.png")
    } else if(characterTom == 2){
        tomChipImage = await loadImage("../imgs/ficha_tom_face_2.png")
    } else if(characterTom == 3){
        tomChipImage = await loadImage("../imgs/ficha_tom_face_3.png")
    }

    if(characterJerry == 1){
        jerryChipImage = await loadImage("../imgs/ficha_jerry.png")
    } else if(characterJerry == 2){
        jerryChipImage = await loadImage("../imgs/ficha_jerry_face_2.png")
    } else if(characterJerry == 3){
        jerryChipImage = await loadImage("../imgs/ficha_jerry_face_3.png")
    }

        let lockerSize, chipSize, hintSize, xInLine, nColumns, nRows;

        switch (option) {
            case "opcion5":
                lockerSize = 65; hintSize = 24; chipSize = 43; xInLine = 5; nColumns = 8; nRows = 7;
                break;
            case "opcion6":
                lockerSize = 58; hintSize = 22; chipSize = 39; xInLine = 6; nColumns = 9; nRows = 8;
                break;
            case "opcion7":
                lockerSize = 52; hintSize = 20; chipSize = 35; xInLine = 7; nColumns = 10; nRows = 9;
                break;
            default:
                lockerSize = 75; hintSize = 30; chipSize = 50; xInLine = 4; nColumns = 7; nRows = 6;
                break;
        }

        let countdown = document.querySelector(".countdown");
        countdown.classList.remove('invisible');

        let game = new Game(lockerSize, chipSize, hintSize, xInLine, nColumns, nRows, playerOneName, playerTwoName, tomChipImage, jerryChipImage, lockerImage, hintImage, hintProhibitedImage)
        game.initialize()
        game.draw()

    } catch (error) {
        console.error("Error al cargar las imágenes: ", error);
    }
}