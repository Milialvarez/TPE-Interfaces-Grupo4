class Tablero {
    constructor(ctx, cantColumnas, posicionX, posicionY, cantFilas, tamanioCasillero, imagenCasillero) {
        this.casilleros = [];
        this.ctx = ctx;
        this.cantColumnas = cantColumnas;
        this.cantFilas = cantFilas;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.fila = 0
        this.columna = 0
        this.tamanioCasillero = tamanioCasillero
        this.sePuedeAgregar = true;
        this.imagenCasillero = imagenCasillero
    }

    getPosicionX(){
        return this.posicionX;
    }

    getPosicionY(){
        return this.posicionY;
    }

    getAncho(){
        return this.tamanioCasillero * this.cantColumnas;
    }

    //INICIALIZA EL TABLERO Y LA CARGA DE IMAGENES
    initialize() {
        for (let i = 0; i < this.cantFilas; i++) {
            this.casilleros.push([])
        }

        // let imagen = new Image();
        // imagen.src = "../imgs/casillero.png";
        // imagen.onload = () => {
            while (this.sePuedeAgregar) {
                let casillero = new Casillero(this.ctx, false, this.tamanioCasillero, this.imagenCasillero, this.tamanioCasillero);
                this.agregarCasillero(casillero);
            }
        //     this.draw()
        // }
    }

    //DIBUJA EL TABLERO
    draw() {
        for (const fila of this.casilleros) {
            for (const casilla of fila) {
                casilla.draw();
            }
        }
    }

    //AGREGA CASILLEROS EVALUANDO DIFERENTES CASOS
    agregarCasillero(casillero) {
        if (this.fila == this.cantFilas - 1 && this.columna == this.cantColumnas) {
            this.sePuedeAgregar = false
            return
        }

        if (this.columna == this.cantColumnas) {
            this.fila++
            this.columna = 0
        }

        if (this.columna == 0 && this.fila == 0) {
            casillero.setPosicionX(this.posicionX)
            casillero.setPosicionY(this.posicionY)
        } else {
            if (this.columna == 0) {
                casillero.setPosicionX(this.posicionX)
                casillero.setPosicionY(this.posicionY + (this.tamanioCasillero * this.fila))
            } else {
                let casilleroAux = this.casilleros[this.fila][this.columna - 1]
                casillero.setPosicionX(casilleroAux.getPosicionX() + this.tamanioCasillero)
                casillero.setPosicionY(casilleroAux.getPosicionY())
            }
        }
        
        this.casilleros[this.fila].push(casillero);
        this.columna++
    }
}