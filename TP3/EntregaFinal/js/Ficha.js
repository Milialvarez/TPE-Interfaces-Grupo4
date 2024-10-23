class Ficha {
    constructor(ctx, width, imagen, posicionX, posicionY, jugador, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.imagen = imagen;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.jugador = jugador;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getImagen(){
        return this.imagen;
    }

    getPosicionX(){
        return this.posicionX;
    }

    getPosicionY(){
        return this.posicionY;
    }

    getJugador(){
        return this.jugador;
    }

    setWidth(width){
        this.width = width;
    }

    setHeight(height){
        this.height = height;
    }

    setImagen(imagen){
        this.imagen = imagen;
    }

    setPosicionX(posicionX){
        this.posicionX = posicionX;
    }

    setPosicionY(posicionY){
        this.posicionY = posicionY;
    }

    setJugador(jugador){
        this.jugador = jugador;
    }

    draw() {
        ctx.beginPath();
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, this.width, this.height);
        ctx.closePath();
    }
}