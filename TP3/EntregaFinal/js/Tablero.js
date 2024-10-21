class Tablero {
    constructor(ctx, color, cantColumnas, posicionX, posicionY, cantFilas) {
        this.casilleros = [[]];
        this.ctx = ctx;
        this.color = color;
        this.fila = 0;
        this.columna = 0;
        this.cantColumnas = cantColumnas;
        this.cantFilas = cantFilas;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.posicionX, this.posicionY, this.cantColumnas * 60 + 10, this.cantFilas * 60 + 10);
        ctx.fill();
        ctx.closePath();

        for (const fila of this.casilleros) {
            for (const casilla of fila) {
                casilla.draw();
            }
        }
    }

    agregarCasillero(casillero) {
        if( this.fila + 1 == this.cantFilas && this.columna == this.cantColumnas ){
            return;
        }
        if(this.columna >= this.cantColumnas) {
            this.fila++;
            this.casilleros[this.fila] = []
            this.columna = 0
        }

        if (this.columna == 0) {
            casillero.posicionX = (this.columna + 1) * casillero.radio + this.posicionX +10
        } else {
            casillero.posicionX = this.casilleros[this.fila][this.columna - 1].posicionX + casillero.radio * 2 +10
        }
        
        if (this.fila == 0) {
            casillero.posicionY = (this.fila + 1) * casillero.radio + this.posicionY +10
        }
         else {
            casillero.posicionY = this.casilleros[this.fila - 1][this.columna].posicionY + casillero.radio * 2 +10
        }

        this.casilleros[this.fila].push(casillero);
        this.columna++
    }
}