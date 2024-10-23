class Ficha {
    constructor(ctx, tamanio, imagen, posicionX, posicionY, jugador) {
        this.ctx = ctx;
        this.tamanio = tamanio;
        this.imagen = imagen;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.jugador = jugador;
    }

    getTamanio(){
        return this.tamanio;
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

    setTamanio(tamanio){
        this.tamanio = tamanio;
    }

    getTamanio(){
        return this.tamanio;
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
        this.ctx.beginPath();
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, this.tamanio, this.tamanio);
        this.ctx.closePath();
    }

}