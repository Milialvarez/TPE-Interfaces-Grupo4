let stars = document.querySelectorAll(".star")
let lastStarClicked = ''

stars.forEach(s => {
    s.addEventListener("click", setRating)
})

function setRating(e) {
    if (localStorage.getItem("session")) {
        stars.forEach(s => {
            s.src = "../iconos/logo_estrella_vacia.svg"
        })
    
        if (lastStarClicked != e.target.id) {
            let n = e.target.id.split("-")[1]

            lastStarClicked = e.target.id
        
            for (let i = 0; i < n; i++) {
                stars[i].src = "../iconos/logo_estrella_llena.svg"
            }
        } else {
            lastStarClicked = ''
        }

    } else {
        document.body.classList.add('blur')
        register_form.classList.remove('invisible')
        register_form.classList.add('visible')
        profile_menu.classList.remove('visible')
        profile_menu.classList.add('invisible')
    }
}

const option_button = document.getElementById('option_button');
option_button.addEventListener('click', getGameConfig)

let form = document.querySelector('.form');
let title = document.querySelector('#title');

const button_ready = document.getElementById('button_ready');
button_ready.addEventListener('click', (event) => {
    event.preventDefault();
    form.classList.add('invisible');

    title.classList.add('visible');
    option_button.classList.add('visible');
    button_game.classList.add('visible');

    title.classList.remove('invisible');
    option_button.classList.remove('invisible');
    button_game.classList.remove('invisible');
})

const button_game = document.getElementById('button_game'); 
button_game.addEventListener('click', () => {
    form.classList.add('visible');

    title.classList.add('invisible');
    option_button.classList.add('invisible');
    button_game.classList.add('invisible');

    
    form.classList.remove('invisible');
})


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
        const hintImage = await loadImage("../imgs/game/hint.png")
        const hintProhibitedImage = await loadImage("../imgs/game/hint_prohibited.png")
        const lockerImage = await loadImage("../imgs/game/casillero.png")
        let tomChipImage;
        let jerryChipImage;

        if (characterTom == 1) {
            tomChipImage = await loadImage("../imgs/game/ficha_tom.png")
        } else if (characterTom == 2) {
            tomChipImage = await loadImage("../imgs/game/ficha_tom_face_2.png")
        } else if (characterTom == 3) {
            tomChipImage = await loadImage("../imgs/game/ficha_tom_face_3.png")
        }

        if (characterJerry == 1) {
            jerryChipImage = await loadImage("../imgs/game/ficha_jerry.png")
        } else if (characterJerry == 2) {
            jerryChipImage = await loadImage("../imgs/game/ficha_jerry_face_2.png")
        } else if (characterJerry == 3) {
            jerryChipImage = await loadImage("../imgs/game/ficha_jerry_face_3.png")
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

let btnRunGame = document.querySelector("#btn_run_game")
btnRunGame.addEventListener("click", runGame)

function runGame() {
    btnRunGame.classList.add("invisible")
    document.querySelector("#intro_page").classList.remove("invisible")
}