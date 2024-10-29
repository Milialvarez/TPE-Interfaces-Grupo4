class Board {
    constructor(ctx, nColumns, x, y, nRows, lockerSize, lockerImage) {
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

    casillerosCompletos(){
        let cantidad = 0;
        let tamanio = this.nColumns * this.nRows
        for (let index = 0; index < this.lockers.length; index++) {
            for (let j = 0; j < this.lockers[index].length; j++) {
                if(this.lockers[index][j].getEmpty() != true){
                    cantidad++;
                }
            }
        }
        if(cantidad == tamanio - 1){
            return true;
        }
        return false;
    }
}