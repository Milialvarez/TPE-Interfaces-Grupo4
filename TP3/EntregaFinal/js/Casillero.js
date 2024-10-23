class Casillero {
    constructor(ctx, vacio, width, imagen, height) {
        this.ctx = ctx;
        this.vacio = vacio;
        this.posicionX = 0;
        this.posicionY = 0;
        this.width = width;
        this.imagen = imagen;
        this.height = height;
    }

    getVacio(){
        return this.vacio;
    }

    setVacio(vacio){
        this.vacio = vacio;
    }

    getPosicionX(){
        return this.posicionX;
    }

    setPosicionX(posicionX){
        this.posicionX = posicionX;
    }

    getPosicionY(){
        return this.posicionY;
    }

    setPosicionY(posicionY){
        this.posicionY = posicionY;
    }

    getImagen(){
        return this.imagen;
    }

    setImagen(imagen){
        this.imagen = imagen;
    }

    getWidth(){
        return this.width;
    }
    

    getHeight(){
        return this.height;
    }

    draw() {
        ctx.beginPath();
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, this.width, this.height);
        ctx.closePath();
    }
}