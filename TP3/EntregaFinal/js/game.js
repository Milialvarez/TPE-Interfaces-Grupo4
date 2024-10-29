class Game {
    constructor(lockerSize, chipSize, xInLine, nColumns, nRows, player1, player2, chipPlayer1, chipPlayer2, lockerImage, hintAllowedImage, hintProhibitedImage) {
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
        this.hintAllowedImage = hintAllowedImage
        this.hintProhibitedImage = hintProhibitedImage
        this.hintImage = hintAllowedImage
        this.hint = null;
        this.start = null
        this.fallingChip = null
        this.lastChip = null
        this.gravity = 12
        this.rebound = true
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
        this.board = new Board(this.ctx, this.nColumns, this.canvasWidth / 2 - this.boardWidth / 2, this.canvasHeight - this.boardHeight, this.nRows, this.lockerSize, this.lockerImage);
        this.board.initialize()
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
        if (chip && this.fallingChip == null) {
            this.initPosition = { x: chip.getX(), y: chip.getY() }
            this.selectedChip = chip;
            if(this.lastChip !=null  && this.chequearTurno() == false){
                this.showTurnsAlert();
                this.selectedChip = null;
            } else{
                chip.estaSeleccionada = true;
            }
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
        if (!this.selectedChip) {
            return
        }
        if(this.lastChip !=null){
            if(!this.chequearTurno()){
                this.showTurnsAlert();
                this.selectedChip = null;
                return;
            }
        }
        const x = e.clientX, y = e.clientY
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
        if(this.lastChip !=null && this.selectedChip !=null){
            if(this.chequearTurno() == false){
                this.selectedChip.setX(this.initPosition.x);
                this.selectedChip.setY(this.initPosition.y);
                this.delete();
                this.draw();
                return;
            }
        }
        
        if (this.selectedChip !=null) {
            const x = e.clientX, y = e.clientY
            const lockerIndex = this.isValidPosition(x, y)

            if (lockerIndex >= 0) {
                if (this.board.emptyLocker(lockerIndex) != null) {
                    this.tableroLleno();
                    let locker = this.board.emptyLocker(lockerIndex);
                    this.fallingChip = this.selectedChip
                    requestAnimationFrame((timestamp) => { this.animateFall(locker, timestamp) })
                    this.lastChip = this.selectedChip
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

        this.hint.setY(this.board.getY() - this.hintImage.height - 10)
        this.hint.setWidth(this.hintImage.width)
        this.hint.setHeight(this.hintImage.height)
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
        cartel.classList.remove('invisible');
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
            cartel.classList.remove('invisible');
            cartel.classList.add('visible');

            accept.addEventListener("click", () => {
                cartel.classList.remove('visible');
            })
        }
    }

    chequearTurno(){
        let currentPlayer = this.selectedChip.getPlayer();
        let lastPlayer = this.lastChip.getPlayer();
        if(currentPlayer == lastPlayer){
            return false;
        } else{
            return true;
        }
    }

    showTurnsAlert(){
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
}