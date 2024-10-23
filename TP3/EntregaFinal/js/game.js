class Game {
    constructor(tamanioCasillero, tamanioFicha, xEnLinea, cantColumnas, cantFilas, jugador1, jugador2, fichaJugador1, fichaJugador2, imagenCasillero) {
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
        this.canvas
        this.fichaSeleccionada = null;
        this.imagenCasillero = imagenCasillero
        this.posicionAnterior
    }

    //CREA EL TABLERO Y LAS FICHAS PARA CADA JUGADOR, DEFINE EVENTOS DEL CANVAS
    initialize() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = canvas.getContext('2d')
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
        this.tableroWidth = this.cantColumnas * this.tamanioCasillero
        this.tableroHeight = this.cantFilas * this.tamanioCasillero
        this.tablero = new Tablero(this.ctx, this.cantColumnas, this.canvasWidth / 2 - this.tableroWidth / 2, this.canvasHeight / 2 - this.tableroHeight / 2, this.cantFilas, this.tamanioCasillero, this.imagenCasillero);
        this.tablero.initialize()
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

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
    }

    //DIBUJA EL JUEGO
    draw() {
        this.tablero.draw()

        for (let i = 0; i < this.fichas.length; i++) {
            for (let j = 0; j < this.fichas[i].length; j++) {
                this.fichas[i][j].draw()
            }
        }
    }


    //SE ACTIVA ANTE PRESIONES DEL MOUSE Y COMPRUEBA SI HAY UNA FICHA EN DICHA POSICION
    onMouseDown(e) {
        const x = e.clientX, y = e.clientY
        const ficha = this.obtenerFicha(x, y);
        if (ficha) {
            this.posicionAnterior = {x:ficha.getPosicionX(), y:ficha.getPosicionY()}
            this.fichaSeleccionada = ficha;
            ficha.estaSeleccionada = true;
        }
    }

    //COMPRUEBA SI HAY UNA FICHA EN DETERMINADA POSICION
    obtenerFicha(x, y){
        for (let i = 0; i < this.fichas.length; i++) {
            for (let j = 0; j < this.fichas[i].length; j++) {
                if(this.fichas[i][j].getPosicionX() < x && (this.fichas[i][j].getPosicionX() + this.fichas[i][j].getTamanio()) > x && this.fichas[i][j].getPosicionY() < y && (this.fichas[i][j].getPosicionY() + this.fichas[i][j].getTamanio()) > y){
                    return this.fichas[i][j];
                }
            }
        }
        return null;
    }

    //PROMUEVE EL MOVIMIENTO DE UNA FICHA ANTE EL MOVIMIENTO DEL CURSOR
    onMouseMove(e) {
        if (this.fichaSeleccionada) {
            const x = e.clientX, y = e.clientY
            // Mover la ficha seleccionada a la posición del cursor
            this.fichaSeleccionada.setPosicionX(x - this.fichaSeleccionada.getTamanio() / 2);
            this.fichaSeleccionada.setPosicionY(y - this.fichaSeleccionada.getTamanio() / 2);
            this.borrar();
            this.draw();  // Redibujar el tablero con la ficha movida
        }
    }

    //DESELECCIONA UNA FICHA A LA PAR DE QUE EL JUGADOR SUELTA EL MOUSE
    onMouseUp(e) {
        if (this.fichaSeleccionada) {
            if(this.esPosicionValida(this.fichaSeleccionada.getPosicionX(), this.fichaSeleccionada.getPosicionY())){
                console.log(2);
            } else{
                this.fichaSeleccionada.setPosicionX(this.posicionAnterior.x);
                this.fichaSeleccionada.setPosicionY(this.posicionAnterior.y);
                this.borrar();
                this.draw();
            }
            this.fichaSeleccionada = null;  // Deseleccionar la ficha
            
        }
    }

    //BORRA TODO LO CONTENIDO POR EL CANVAS
    borrar() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    esPosicionValida(x, y){
        return x > this.tablero.getPosicionX() && x < (this.tablero.getPosicionX() + this.tablero.getAncho()) && y < this.tablero.getPosicionY();
    }
}
