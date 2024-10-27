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
    }


    //CREA EL BOARD Y LAS CHIPS PARA CADA JUGADOR, DEFINE EVENTOS DEL CANVAS
    initialize() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = canvas.getContext('2d')
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
        this.boardWidth = this.nColumns * this.lockerSize
        this.boardHeight = this.nRows * this.lockerSize
        this.board = new Board(this.ctx, this.nColumns, this.canvasWidth / 2 - this.boardWidth / 2, this.canvasHeight / 2 - this.boardHeight / 2, this.nRows, this.lockerSize, this.lockerImage);
        this.board.initialize()
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < (this.nColumns * this.nRows) / 2; j++) {
                let chip

                if (i == 0) {
                    chip = new Chip(this.ctx, this.chipSize, this.chipPlayer1, 10, j * (this.chipSize / 3) + 10, this.player1, this.chipSize)
                } else if (i == 1) {
                    chip = new Chip(this.ctx, this.chipSize, this.chipPlayer2, this.canvasWidth - this.chipSize - 10, j * (this.chipSize / 3) + 10, this.player2, this.chipSize)
                }

                this.chips[i].push(chip)
            }
        }

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        // this.canvas.addEventListener('mouseup', (e) => this.insertChip(e));
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
        const chip = this.getChip(x, y);
        if (chip) {
            this.initPosition = { x: chip.getX(), y: chip.getY() }
            this.selectedChip = chip;
            chip.estaSeleccionada = true;
        }
    }

    //COMPRUEBA SI HAY UNA CHIP EN DETERMINADA POSICION
    getChip(x, y) {
        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < this.chips[i].length; j++) {
                if (this.chips[i][j].getX() < x && (this.chips[i][j].getX() + this.chips[i][j].getSize()) > x && this.chips[i][j].getY() < y && (this.chips[i][j].getY() + this.chips[i][j].getSize()) > y) {
                    return this.chips[i][j];
                }
            }
        }
        return null;
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

    //DESELECCIONA UNA CHIP A LA PAR DE QUE EL JUGADOR SUELTA EL MOUSE
    onMouseUp(e) {
        if (this.selectedChip) {
            const x = e.clientX, y = e.clientY
            if (this.isValidPosition(x, y) != -1) {
                if (this.board.emptyLocker(this.isValidPosition(x, y) + 1) != null) {
                    let locker = this.board.emptyLocker(this.isValidPosition(x, y) + 1)
                    this.insertChip(this.selectedChip, locker);
                    this.delete()
                    this.draw()
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

    //BORRA TODO LO CONTENIDO POR EL CANVAS
    delete() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    isValidPosition(x, y) {
        for (let index = 0; index < this.hints.length; index++) {
            if ((this.hints[index].getX() - this.hints[index].getRadius()) < x && (this.hints[index].getX() + this.hints[index].getRadius()) > x &&
                (this.hints[index].getY() - this.hints[index].getRadius()) < y && (this.hints[index].getY() + this.hints[index].getRadius()) > y) {
                return index;
            }
        }
        return -1;
    }

    drawHints() {
        let posY = 20;
        for (let index = 0; index < this.nColumns; index++) {
            let posX = this.board.getLockerSizeByColumn(index) + this.lockerSize / 2;
            this.hints[index] = new Hint(this.ctx, this.chipSize / 2, 'rgba(0,0,0,1)', posX, posY);
            this.hints[index].draw();
        }
    }

    insertChip(chip, locker){
        let posX = locker.getX() - (locker.getWidth() / 2 + chip.getSize() / 2);
        let posY = locker.getY() + (locker.getWidth() / 2 - chip.getSize() / 2);
        chip.setY(posY);
        chip.setX(posX);
        locker.setChip(chip);
    }
}

