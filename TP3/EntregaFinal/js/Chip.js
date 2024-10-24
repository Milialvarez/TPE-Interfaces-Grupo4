class Chip {
    constructor(ctx, size, image, x, y, player) {
        this.ctx = ctx;
        this.size = size;
        this.image = image;
        this.x = x;
        this.y = y;
        this.player = player;
    }

    //GETTERS Y SETTERS DE UNA FICHA
    getSize() {
        return this.size;
    }

    getHeight() {
        return this.height;
    }

    getImage() {
        return this.image;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getPlayer() {
        return this.player;
    }

    setSize(size) {
        this.size = size;
    }

    getSize() {
        return this.size;
    }

    setHeight(height) {
        this.height = height;
    }

    setImage(image) {
        this.image = image;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setPlayer(player) {
        this.player = player;
    }

    //METODO QUE DIBUJA A UNA FICHA
    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        this.ctx.closePath();
    }

}