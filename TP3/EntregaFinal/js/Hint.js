class Hint {
    constructor(ctx) {
        this.ctx = ctx;
        this.image = null
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
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

    getWidth() {
        return this.width
    }

    setWidth(width) {
        this.width = width
    }

    getHeight() {
        return this.height
    }

    setHeight(height) {
        this.height = height
    }

    setImage(image) {
        this.image = image
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height, );
        this.ctx.closePath();
    }
}