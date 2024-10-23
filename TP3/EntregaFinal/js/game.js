class Game {
    constructor(tamanioCasillero, tamanioFicha, xEnLinea, cantColumnas, cantFilas, jugador1, jugador2, fichaJugador1, fichaJugador2) {
        this.tamanioCasillero = tamanioCasillero
        this.tamanioFicha = tamanioFicha
        this.xEnLinea = xEnLinea
        this.cantColumnas = cantColumnas
        this.cantFilas = cantFilas
        this.jugador1 = jugador1
        this.jugador2 = jugador2
        this.fichaJugador1 = fichaJugador1
        this.fichaJugador2 = fichaJugador2
        this.ctx
        this.canvasWidth
        this.canvasHeight
        this.tableroWidth
        this.tableroHeight
        this.tablero
        this.fichas = [[], []]
    }

    initialize() {
        let canvas = document.querySelector("#canvas")
        this.ctx = canvas.getContext('2d')
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
        this.tableroWidth = this.cantColumnas * this.tamanioCasillero
        this.tableroHeight = this.cantFilas * this.tamanioCasillero
        this.tablero = new Tablero(this.ctx, this.cantColumnas, this.canvasWidth / 2 - this.tableroWidth / 2, this.canvasHeight / 2 - this.tableroHeight / 2, this.cantFilas, this.tamanioCasillero);

        for (let i = 0; i < this.fichas.length; i++) {
            for (let j = 0; j < (this.cantColumnas * this.cantFilas) / 2; j++) {
                let ficha

                if (i == 0) {
                    ficha = new Ficha(this.ctx, this.tamanioFicha, this.fichaJugador1, 10, j * (this.tamanioFicha / 3) + 10, this.jugador1, this.tamanioFicha)
                } else if (i == 1) {
                    ficha = new Ficha(this.ctx, this.tamanioFicha, this.fichaJugador2, this.canvasWidth - this.tamanioFicha - 10, j * (this.tamanioFicha / 3) + 10, this.jugador2, this.tamanioFicha)
                }

                this.fichas[i].push(ficha)
            }
        }
    }

    draw() {
        this.tablero.initialize()
        
        for (let i = 0; i < this.fichas.length; i++) {
            for (let j = 0; j < this.fichas[i].length; j++) {
                this.fichas[i][j].draw()
            }
        }
    }
}