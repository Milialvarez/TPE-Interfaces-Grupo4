class Chip {
    constructor(ctx, size, image, x, y, player) {
        this.ctx = ctx;
        this.size = size;
        this.image = image;
        this.x = x;
        this.y = y;
        this.player = player;
        this.used = false;
    }

    //GETTERS Y SETTERS DE UNA FICHA
    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    setY(y) {
        this.y = y;
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }

    getUsed(){
        return this.used;
    }

    setUsed(used){
        this.used = used;
    }

    //METODO QUE DIBUJA A UNA FICHA
    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        this.ctx.closePath();
    }

    //BOOLEAN QUE DETERMINA SI UNA POSICION X E Y PROVISTA POR EL CURSOR ESTÁ SOBRE UNA FICHA
    coordinatesAreInChip(x, y) {
        return this.getX() < x && (this.getX() + this.getSize()) > x && this.getY() < y && (this.getY() + this.getSize()) > y
    }
}