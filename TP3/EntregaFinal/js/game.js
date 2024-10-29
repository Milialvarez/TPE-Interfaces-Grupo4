class Game {
    constructor(lockerSize, chipSize, xInLine, nColumns, nRows, player1, player2, chipPlayer1, chipPlayer2, lockerImage) {
        this.lockerSize = lockerSize
        this.chipSize = chipSize
        this.xInLine = xInLine
        this.nColumns = nColumns
        this.nRows = nRows
        this.player1 = player1
        this.player2 = player2
        this.chipPlayer1 = chipPlayer1
        this.chipPlayer2 = chipPlayer2
        this.ctx
        this.canvasWidth
        this.canvasHeight
        this.boardWidth
        this.boardHeight
        this.board
        this.chips = [[], []]
        this.canvas
        this.selectedChip = null;
        this.lockerImage = lockerImage
        this.initPosition
        this.hints = [];
        this.start = null
        this.fallingChip = null
        this.gravity = 10
        this.rebound = true
    }

    //CREA EL BOARD Y LAS CHIPS PARA CADA JUGADOR, DEFINE EVENTOS DEL CANVAS
    initialize() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = canvas.getContext('2d')
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
        this.boardWidth = this.nColumns * this.lockerSize
        this.boardHeight = this.nRows * this.lockerSize
        this.board = new Board(this.ctx, this.nColumns, this.canvasWidth / 2 - this.boardWidth / 2, this.canvasHeight - this.boardHeight, this.nRows, this.lockerSize, this.lockerImage);
        this.board.initialize()
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < (this.nColumns * this.nRows) / 2; j++) {
                let chip

                if (i == 0) {
                    chip = new Chip(this.ctx, this.chipSize, this.chipPlayer1, 10, j * (this.chipSize / 3) + 100, this.player1, this.chipSize)
                } else if (i == 1) {
                    chip = new Chip(this.ctx, this.chipSize, this.chipPlayer2, this.canvasWidth - this.chipSize - 10, j * (this.chipSize / 3) + 100, this.player2, this.chipSize)
                }

                this.chips[i].push(chip)
            }
        }

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    //DIBUJA EL JUEGO
    draw() {
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < this.chips[i].length; j++) {
                this.chips[i][j].draw()
            }
        }
        this.board.draw()
    }

    //SE ACTIVA ANTE PRESIONES DEL MOUSE Y COMPRUEBA SI HAY UNA CHIP EN DICHA POSICION
    onMouseDown(e) {
        const x = e.clientX, y = e.clientY
        let selectedChips = this.getChip(x, y);
        const chip = selectedChips[selectedChips.length - 1];
        if (chip) {
            this.initPosition = { x: chip.getX(), y: chip.getY() }
            this.selectedChip = chip;
            chip.estaSeleccionada = true;
        }
    }

    //COMPRUEBA SI HAY UNA CHIP EN DETERMINADA POSICION
    getChip(x, y) {
        let selectedChips = []
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < this.chips[i].length; j++) {
                if (this.chips[i][j].coordinatesAreInChip(x, y)) {
                    selectedChips.push(this.chips[i][j])
                }
            }
        }
        return selectedChips;
    }

    //PROMUEVE EL MOVIMIENTO DE UNA CHIP ANTE EL MOVIMIENTO DEL CURSOR
    onMouseMove(e) {
        if (this.selectedChip) {
            const x = e.clientX, y = e.clientY
            // Mover la chip seleccionada a la posición del cursor
            this.selectedChip.setX(x - this.selectedChip.getSize() / 2);
            this.selectedChip.setY(y - this.selectedChip.getSize() / 2);
            this.delete();
            this.draw();
            this.drawHints(); // Redibujar el board con la chip movida
        }
    }

    //DESELECCIONA UNA CHIP A LA PAR DE QUE EL JUGADOR SUELTA EL MOUSE Y SE OBTIENE LA COLUMNA Y LOCKER DONDE COLOCAR LA FICHA SELECCIONADA
    onMouseUp(e) {
        if (this.selectedChip) {
            const x = e.clientX, y = e.clientY
            if (this.isValidPosition(x, y) >= 0) {
                let locker; let currentColumn = this.isValidPosition(x, y)
                if (this.board.emptyLocker(currentColumn) != null) {
                    this.tableroLleno();
                    locker = this.board.emptyLocker(currentColumn);
                    this.fallingChip = this.selectedChip
                    requestAnimationFrame((timestamp) => { this.animateFall(locker, timestamp) })
                } else {
                    console.log()
                    this.selectedChip.setX(this.initPosition.x);
                    this.selectedChip.setY(this.initPosition.y);
                    this.delete();
                    this.draw();
                }
            } else {
                this.selectedChip.setX(this.initPosition.x);
                this.selectedChip.setY(this.initPosition.y);
                this.delete();
                this.draw();
            }
            this.selectedChip = null;  // Deseleccionar la chip
        }
    }

    //MUESTRA ANIMACION DE CAIDA CUANDO SE SUELTA LA CHIP
    animateFall(locker) {
        let lockerPosY = locker.getY() + (locker.getWidth() / 2 - this.fallingChip.getSize() / 2)

        this.fallingChip.setY(this.fallingChip.getY() + this.gravity)
        this.delete();
        this.draw();

        if (this.fallingChip.getY() < lockerPosY) {
            requestAnimationFrame(() => { this.animateFall(locker) })
        } else {
            if (this.rebound) {
                requestAnimationFrame(() => { this.animateRebound(locker) })
            } else {
                this.insertChip(this.fallingChip, locker);
                this.delete();
                this.draw();
                this.fallingChip = null
                this.rebound = true
                this.gravity = 10
            }
        }
    }


    //ANIMACION QUE PERMITE QUE LA FICHA HAGA EFECTO REBOTE
    animateRebound(locker) {
        let lockerPosY = locker.getY() + (locker.getWidth() / 2 - this.fallingChip.getSize() / 2)
        this.gravity = -5

        this.fallingChip.setY(this.fallingChip.getY() + this.gravity)
        this.delete();
        this.draw();

        if (this.fallingChip.getY() >= lockerPosY - 20) {
            requestAnimationFrame(() => { this.animateRebound(locker) })
        } else {
            this.gravity = 7
            this.rebound = false
            requestAnimationFrame(() => { this.animateFall(locker) })
        }
    }

    //BORRA TODO LO CONTENIDO POR EL CANVAS
    delete() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    //CHEQUEA DADAS POSICIONES X E Y SI SE ENCUENTRA EL MOUSE SOBRE UN HINT
    isValidPosition(x, y) {
        for (let index = 0; index < this.hints.length; index++) {
            if ((this.hints[index].getX() - this.hints[index].getRadius()) < x && (this.hints[index].getX() + this.hints[index].getRadius()) > x &&
                (this.hints[index].getY() - this.hints[index].getRadius()) < y && (this.hints[index].getY() + this.hints[index].getRadius()) > y) {
                return index;
            }
        }
        return -1;
    }

    //DIBUJA LOS HINTS CUANDO SE MUEVE UNA FICHA
    drawHints() {
        let posY = 30;
        for (let index = 0; index < this.nColumns; index++) {
            let posX = this.board.getLockerSizeByColumn(index) + this.lockerSize / 2;
            this.hints[index] = new Hint(this.ctx, this.chipSize / 2, 'rgba(0,0,0,1)', posX, posY);
            this.hints[index].draw();
        }
    }

    //INSERTA UNA FICHA AL DEJARLA CAER EN EL LOCKER CORRESPONDIENTE
    insertChip(chip, locker) {

        let posX = locker.getX() + (locker.getWidth() / 2 - chip.getSize() / 2);
        let posY = locker.getY() + (locker.getWidth() / 2 - chip.getSize() / 2);
        chip.setY(posY);
        chip.setX(posX);
        locker.setChip(chip);
    }


    // CRONOMETRO
    countdown() {
        let seconds = document.querySelector('#seconds');
        let minutes = document.querySelector('#minutes');
        let msPorSegundo = 59;
        let msPorMinuto = 4;
        let intervalo;

        intervalo = setInterval(() => {
            minutes.innerText = msPorMinuto + ":";
            seconds.innerText = msPorSegundo;
            msPorSegundo--;
            if (msPorSegundo == -1) {
                msPorSegundo = 59;
                msPorMinuto--;
            }
            if (msPorMinuto == 0 && msPorSegundo == 0) {
                this.tieForTime();
                clearInterval(intervalo)
            }
        }, 1000)
    }

    // LÓGICA DE EMPATE POR TIEMPO LÍMITE
    tieForTime() {
        let accept = document.querySelector('.accept');
        let cartel = document.querySelector('.resultado_empate_tiempo');
        cartel.classList.add('visible');
        //no permitir agarrar otra ficha
        //que se corte el juego

        accept.addEventListener("click", () => {
            cartel.classList.remove('visible');
        })
    }

    // LÓGICA DE EMPATE POR TABLERO LLENO
    tableroLleno() {
        let accept = document.querySelector('.accept');
        let cartel = document.querySelector('.resultado_empate_tablero_lleno');
        if (this.board.casillerosCompletos()) {
            cartel.classList.add('visible');
            //no permitir agarrar otra ficha
            //que se corte el juego

            accept.addEventListener("click", () => {
                cartel.classList.remove('visible');
            })
        }
    }
}