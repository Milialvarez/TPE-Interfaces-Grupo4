class Board {
    constructor(ctx, xInLine, nColumns, x, y, nRows, lockerSize, lockerImage) {
        this.lockers = [];
        this.ctx = ctx;
        this.nColumns = nColumns;
        this.nRows = nRows;
        this.x = x;
        this.y = y;
        this.row = 0
        this.column = 0
        this.lockerSize = lockerSize
        this.canAdd = true;
        this.lockerImage = lockerImage
        this.canvas
        this.xInLine = xInLine
    }

    getNumberColumms() {
        return this.nColumns;
    }

    getNumberRows() {
        return this.nRows;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.lockerSize * this.nColumns;
    }

    //INICIALIZA EL TABLERO Y LA CARGA DE IMAGENES
    initialize() {
        for (let i = 0; i < this.nRows; i++) {
            this.lockers.push([])
        }

        while (this.canAdd) {
            let locker = new Locker(this.ctx, this.lockerSize, this.lockerImage, this.lockerSize);
            this.addLocker(locker);
        }
    }

    //DIBUJA EL TABLERO
    draw() {
        for (const row of this.lockers) {
            for (const locker of row) {
                locker.draw();
            }
        }
    }

    //AGREGA LOCKERS EVALUANDO DIFERENTES CASOS
    addLocker(locker) {
        if (this.row == this.nRows - 1 && this.column == this.nColumns) {
            this.canAdd = false
            return
        }

        if (this.column == this.nColumns) {
            this.row++
            this.column = 0
        }

        if (this.column == 0 && this.row == 0) {
            locker.setX(this.x)
            locker.setY(this.y)
        } else {
            if (this.column == 0) {
                locker.setX(this.x)
                locker.setY(this.y + (this.lockerSize * this.row))
            } else {
                let lockerAux = this.lockers[this.row][this.column - 1]
                locker.setX(lockerAux.getX() + this.lockerSize)
                locker.setY(lockerAux.getY())
            }
        }

        this.lockers[this.row].push(locker);
        this.column++
    }

    getLockerSizeByColumn(column) {
        return this.lockers[0][column].getX();
    }

    emptyLocker(column) {
        for (let index = this.nRows - 1; index >= 0; index--) {
            if (this.lockers[index][column].getEmpty()) {
                return this.lockers[index][column];
            }
        }
        return null;
    }

    fullLockers() {
        let quantity = 0;
        let size = this.nColumns * this.nRows

        for (let index = 0; index < this.lockers.length; index++) {
            for (let j = 0; j < this.lockers[index].length; j++) {
                if (this.lockers[index][j].getEmpty() != true) {
                    quantity++;
                }
            }
        }

        if (quantity == size) {
            return true;
        }

        return false;
    }

    // MANEJA LOGICA PARA DETECTAR GANADOR
    checkWinner(initLocker) {
        let player = initLocker.getChip().getPlayer()
        let count = 1
        let indexes = this.getLockerIndex(initLocker)

        count += this.countRight(indexes.row, indexes.col + 1, player)
        count += this.countLeft(indexes.row, indexes.col - 1, player)

        if (count >= this.xInLine) {
            return true
        }

        count = 1
        count += this.countDown(indexes.row + 1, indexes.col, player)

        if (count >= this.xInLine) {
            return true
        }

        count = 1
        count += this.countDiagonalUpRight(indexes.row - 1, indexes.col + 1, player)
        count += this.countDiagonalDownLeft(indexes.row + 1, indexes.col - 1, player)

        if (count >= this.xInLine) {
            return true
        }

        count = 1
        count += this.countDiagonalUpLeft(indexes.row - 1, indexes.col - 1, player)
        count += this.countDiagonalDownRight(indexes.row + 1, indexes.col + 1, player)

        if (count >= this.xInLine) {
            return true
        }

        return false
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO PARA LA DERECHA
    countRight(row, col, player) {
        let count = 0, foundDifferent = false

        while (col < this.nColumns && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            col++
        }

        return count
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO PARA LA IZQUIERDA
    countLeft(row, col, player) {
        let count = 0, foundDifferent = false

        while (col >= 0 && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            col--
        }

        return count
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO PARA ABAJO
    countDown(row, col, player) {
        let count = 0, foundDifferent = false

        while (row < this.nRows && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            row++
        }

        return count
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO POR LA DIAGONAL ARRIBA Y DERECHA
    countDiagonalUpRight(row, col, player) {
        let count = 0, foundDifferent = false

        while (row >= 0 && col < this.nColumns && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            row--
            col++
        }

        return count
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO POR LA DIAGONAL ABAJO E IZQUIERDA
    countDiagonalDownLeft(row, col, player) {
        let count = 0, foundDifferent = false

        while (row < this.nRows && col >= 0 && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            row++
            col--
        }

        return count
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO POR LA DIAGONAL ARRIBA E IZQUIERDA
    countDiagonalUpLeft(row, col, player) {
        let count = 0, foundDifferent = false

        while (row >= 0 && col >= 0 && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            row--
            col--
        }

        return count
    }

    // CUENTA FICHAS DEL MISMO JUGADOR DESDE UN CASILLERO POR LA DIAGONAL ABAJO Y DERECHA
    countDiagonalDownRight(row, col, player) {
        let count = 0, foundDifferent = false

        while (row < this.nRows && col < this.nColumns && !foundDifferent) {
            let chip = this.lockers[row][col].getChip()

            if (chip != null) {
                if (chip.getPlayer() == player) {
                    count++
                } else {
                    foundDifferent = true
                }
            } else {
                foundDifferent = true
            }

            row++
            col++
        }

        return count
    }

    // OBTIENE LA POSICION DE UN CASILLERO DENTRO DE LA MATRIZ
    getLockerIndex(locker) {
        for (let i = 0; i < this.lockers.length; i++) {
            for (let j = 0; j < this.lockers[i].length; j++) {
                if (this.lockers[i][j].equals(locker)) {
                    return {
                        row: i,
                        col: j
                    }
                }
            }
        }
    }
}