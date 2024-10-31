class Game {
    constructor(lockerSize, chipSize, hintSize, xInLine, nColumns, nRows, player1, player2, chipPlayer1, chipPlayer2, lockerImage, hintAllowedImage, hintProhibitedImage) {
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
        this.chips
        this.canvas
        this.canvasOffset
        this.selectedChip = null;
        this.lockerImage = lockerImage
        this.initPosition
        this.hintAllowedImage = hintAllowedImage
        this.hintProhibitedImage = hintProhibitedImage
        this.hintImage = hintAllowedImage
        this.hint = null;
        this.start = null
        this.fallingChip = null
        this.lastChip = null
        this.gravity = 12
        this.rebound = true
        this.hintSize = hintSize
        this.intervalCount
    }

    //CREA EL BOARD Y LAS CHIPS PARA CADA JUGADOR, DEFINE EVENTOS DEL CANVAS
    initialize() {
        this.canvas = document.querySelector("#canvas")
        this.canvas.classList.remove('invisible');
        this.ctx = canvas.getContext('2d')
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
        this.boardWidth = this.nColumns * this.lockerSize
        this.boardHeight = this.nRows * this.lockerSize
        this.board = new Board(this.ctx, this.xInLine, this.nColumns, this.canvasWidth / 2 - this.boardWidth / 2, this.canvasHeight - this.boardHeight, this.nRows, this.lockerSize, this.lockerImage);
        this.board.initialize()
        this.chips = [[], []]
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < (this.nColumns * this.nRows) / 2; j++) {
                let chip

                if (i == 0) {
                    chip = new Chip(this.ctx, this.chipSize, this.chipPlayer1, 10, this.canvasHeight - this.chipSize - (j * (this.chipSize / 3) + 10), this.player1)
                } else if (i == 1) {
                    chip = new Chip(this.ctx, this.chipSize, this.chipPlayer2, this.canvasWidth - this.chipSize - 10, this.canvasHeight - this.chipSize - (j * (this.chipSize / 3) + 10), this.player2)
                }

                this.chips[i].push(chip)
            }
        }

        let restart_container = document.querySelector('.restart-container');
        restart_container.classList.remove('invisible');

        let btn_restart = document.querySelector('#restart');
        btn_restart.addEventListener('click', (e)=>this.restartGame());

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.lastChip = null
        this.countdown()
        this.canvasOffset = this.canvas.getBoundingClientRect()
    }

    //DIBUJA EL JUEGO
    draw() {
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < this.chips[i].length; j++) {
                this.chips[i][j].draw()
            }
        }
        
        if (this.board != null) {
            this.board.draw()
        }
    }

    //SE ACTIVA ANTE PRESIONES DEL MOUSE Y COMPRUEBA SI HAY UNA CHIP EN DICHA POSICION
    onMouseDown(e) {
        const x = e.clientX, y = e.clientY
        const chip = this.getChip(x, y);

        if (chip && this.fallingChip == null) {
            if (chip.getUsed()) {
                return;
            }

            this.initPosition = { x: chip.getX(), y: chip.getY() }
            this.selectedChip = chip;
            if (this.lastChip != null && this.checkTurn() == false) {
                this.showTurnsAlert();
                this.selectedChip = null;
            } else {
                chip.estaSeleccionada = true;
            }
        }
    }

    //COMPRUEBA SI HAY UNA CHIP EN DETERMINADA POSICION
    getChip(x, y) {
        let selectedChips = []
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < this.chips[i].length; j++) {
                if (this.chips[i][j].coordinatesAreInChip(x - this.canvasOffset.x, y - this.canvasOffset.y)) {
                    selectedChips.push(this.chips[i][j])
                }
            }
        }
        return selectedChips[selectedChips.length - 1];
    }

    //PROMUEVE EL MOVIMIENTO DE UNA CHIP ANTE EL MOVIMIENTO DEL CURSOR
    onMouseMove(e) {
        if (!this.selectedChip) {
            return
        }
        if (this.lastChip != null) {
            if (!this.checkTurn()) {
                this.showTurnsAlert();
                this.selectedChip = null;
                return;
            }
        }
        const x = e.clientX - this.canvasOffset.x, y = e.clientY - this.canvasOffset.y
        const lockerIndex = this.isValidPosition(x, y)

        if (lockerIndex < 0) {
            // Mover la chip seleccionada a la posición del cursor
            this.selectedChip.setX(x - this.selectedChip.getSize() / 2);
            this.selectedChip.setY(y - this.selectedChip.getSize() / 2);
            this.delete();
            this.draw();
        } else {
            const lockerX = (lockerIndex * this.lockerSize) + this.board.getX()
            this.selectedChip.setX(lockerX + (this.lockerSize - this.selectedChip.getSize()) / 2);
            this.selectedChip.setY(this.board.getY() - (this.selectedChip.getSize() * 2));
            this.delete();
            this.draw();

            if (this.board.emptyLocker(lockerIndex) == null) {
                this.hintImage = this.hintProhibitedImage
            } else {
                this.hintImage = this.hintAllowedImage
            }

            this.drawHint(lockerX)
        }
    }

    //DESELECCIONA UNA CHIP A LA PAR DE QUE EL JUGADOR SUELTA EL MOUSE Y SE OBTIENE LA COLUMNA Y LOCKER DONDE COLOCAR LA FICHA SELECCIONADA
    onMouseUp(e) {
        if (this.lastChip != null && this.selectedChip != null) {
            if (this.checkTurn() == false) {
                this.selectedChip.setX(this.initPosition.x);
                this.selectedChip.setY(this.initPosition.y);
                this.delete();
                this.draw();
                return;
            }
        }

        if (this.selectedChip != null) {
            const x = e.clientX - this.canvasOffset.x, y = e.clientY - this.canvasOffset.y
            const lockerIndex = this.isValidPosition(x, y)

            if (lockerIndex >= 0) {
                if (this.board.emptyLocker(lockerIndex) != null) {
                    let locker = this.board.emptyLocker(lockerIndex);
                    this.fallingChip = this.selectedChip
                    requestAnimationFrame((timestamp) => { this.animateFall(locker, timestamp) })
                    this.lastChip = this.selectedChip
                    this.selectedChip.setUsed(true);
                } else {
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
                this.gravity = 12
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

    //CHEQUEA DADAS POSICIONES X E Y Y DEVUELVE LA COLUMNA EN LA QUE SE SOLTÓ
    isValidPosition(x, y) {
        if (x >= this.board.getX() && x < this.board.getX() + this.board.getWidth() && y <= this.board.getY()) {
            return Math.floor((x - this.board.getX()) / this.lockerSize)
        }

        return -1;
    }

    //DIBUJA LOS HINTS CUANDO SE MUEVE UNA FICHA
    drawHint(lockerX) {
        if (this.hint == null) {
            this.hint = new Hint(this.ctx)
        }

        this.hint.setY(this.board.getY() - this.hintSize - 10)
        this.hint.setWidth(this.hintSize)

        if (this.hintImage.width > this.hintImage.height) {
            this.hint.setHeight(this.hintSize / 2)
        } else {
            this.hint.setHeight(this.hintSize)
        }

        this.hint.setImage(this.hintImage)
        this.hint.setX(lockerX + (this.lockerSize - this.hint.getWidth()) / 2)
        this.hint.draw()
    }

    //INSERTA UNA FICHA AL DEJARLA CAER EN EL LOCKER CORRESPONDIENTE
    insertChip(chip, locker) {
        let posX = locker.getX() + (this.lockerSize / 2 - this.chipSize / 2);
        let posY = locker.getY() + (this.lockerSize / 2 - this.chipSize / 2);
        chip.setY(posY);
        chip.setX(posX);
        locker.setChip(chip);

        if (this.board.checkWinner(locker)) {
            alert("GANADOR: " + chip.getPlayer() + ", FELICIDADES!")
            this.restartGame()
            return
        }

        this.tieForFullBoard();
    }

    // CRONOMETRO DEL JUEGO
    countdown() {
        let countdown = document.querySelector('.countdown');
        countdown.classList.remove('invisible');
        let secondsContainer = document.querySelector('#seconds');
        let minutesContainer = document.querySelector('#minutes');
        let seconds = 0;
        let minutes = 5;

        this.drawTime(minutesContainer, secondsContainer, seconds, minutes)

        this.intervalCount = setInterval(() => {
            seconds--;

            if (seconds == -1) {
                seconds = 59;
                minutes--;
            }

            if (minutes == 0 && seconds == 0) {
                this.tieForTime();
                this.stopCountdown()
                countdown.classList.add('invisible');
            }

            this.drawTime(minutesContainer, secondsContainer, seconds, minutes)
        }, 1000)
    }

    stopCountdown() {
        clearInterval(this.intervalCount)
    }

    drawTime(minutesContainer, secondsContainer, seconds, minutes) {
        if (minutes <= 9) {
            minutesContainer.innerHTML = '0' + minutes;
        } else {
            minutesContainer.innerHTML = minutes;
        }

        if (seconds <= 9) {
            secondsContainer.innerHTML = '0' + seconds;
        } else {
            secondsContainer.innerHTML = seconds;
        }
    }

    // LÓGICA DE EMPATE POR TIEMPO LÍMITE
    tieForTime() {
        let accept = document.querySelector('.accept');
        let cartel = document.querySelector('.tie');
        let cause = document.querySelector('#cause');
        let result = document.querySelector('#result');

        result.innerHTML = "Empate";
        cause.innerHTML = "¡Sin tiempo!";

        cartel.classList.remove('invisible');
        cartel.classList.add('visible');

        accept.addEventListener("click", () => {
            cartel.classList.remove('visible')
            this.restartGame();
        })
    }

    // LÓGICA DE EMPATE POR TABLERO LLENO
    tieForFullBoard() {
        let accept = document.querySelector('.accept');
        let cartel = document.querySelector('.tie');
        let cause = document.querySelector('#cause');
        let result = document.querySelector('#result');

        if (this.board.fullLockers()) {

            result.innerHTML = "Empate";
            cause.innerHTML = "¡Tablero lleno!";
            cartel.classList.remove('invisible');
            cartel.classList.add('visible');

            accept.addEventListener("click", () => {
                cartel.classList.remove('visible');
                this.restartGame();
            })
        }
    }

    checkTurn() {
        let currentPlayer = this.selectedChip.getPlayer();
        let lastPlayer = this.lastChip.getPlayer();
        if (currentPlayer == lastPlayer) {
            return false;
        } else {
            return true;
        }
    }

    showTurnsAlert() {
        let alert = document.querySelector('#turn_alert');
        alert.classList.remove('invisible');

        let seconds = 0;
        const interval = setInterval(() => {
            seconds += 1;
            if (seconds === 3) {
                alert.classList.add('invisible');
                clearInterval(interval); // Detiene el contador
            }
        }, 1000);
    }

    // RESETEA TODOS LOS VALORES DEL JUEGO
    restartGame() {
        this.board = null
        this.chips = [[], []]

        let restart_container = document.querySelector('.restart-container');
        restart_container.classList.add('invisible');

        this.lastChip = null

        this.delete();
        this.stopCountdown()

        this.canvas.classList.add("invisible")
        let countdown = document.querySelector('.countdown');
        countdown.classList.add('invisible');
        const intro_page = document.getElementById('intro_page');
        intro_page.classList.remove('invisible');
    }
}