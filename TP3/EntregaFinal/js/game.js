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
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
    }

    //DIBUJA EL JUEGO
    draw() {
        this.board.draw()

        for (let i = 0; i < this.chips.length; i++) {
            for (let j = 0; j < this.chips[i].length; j++) {
                this.chips[i][j].draw()
            }
        }
    }

    //SE ACTIVA ANTE PRESIONES DEL MOUSE Y COMPRUEBA SI HAY UNA CHIP EN DICHA POSICION
    onMouseDown(e) {
        const x = e.clientX, y = e.clientY
        let selectedChips = this.getChip(x, y);
        // const chip = this.getChip(x, y);
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
                // if (this.chips[i][j].getX() < x && (this.chips[i][j].getX() + this.chips[i][j].getSize()) > x && this.chips[i][j].getY() < y && (this.chips[i][j].getY() + this.chips[i][j].getSize()) > y) {
                if (this.chips[i][j].coordinatesAreInChip(x, y)) {
                    // return this.chips[i][j];
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
            this.borrar();
            this.draw();  // Redibujar el board con la chip movida
        }
    }

    //DESELECCIONA UNA CHIP A LA PAR DE QUE EL JUGADOR SUELTA EL MOUSE
    onMouseUp(e) {
        if (this.selectedChip) {
            if (this.isValidPosition(this.selectedChip.getX(), this.selectedChip.getY())) {
                console.log(2);
            } else {
                this.selectedChip.setX(this.initPosition.x);
                this.selectedChip.setY(this.initPosition.y);
                this.borrar();
                this.draw();
            }
            this.selectedChip = null;  // Deseleccionar la chip
        }
    }

    //BORRA TODO LO CONTENIDO POR EL CANVAS
    borrar() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    isValidPosition(x, y) {
        return x > this.board.getX() && x < (this.board.getX() + this.board.getWidth()) && y < this.board.getY();
    }
}
