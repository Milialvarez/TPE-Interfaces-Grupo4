class Hint {
    constructor(ctx, image, x, y, width, height) {
        this.ctx = ctx;
        this.image = image
        this.x = x;
        this.y = y
        this.width = width
        this.height = height
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height, );
        this.ctx.closePath();
    }
}