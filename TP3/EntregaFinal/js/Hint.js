class Hint {
    constructor(ctx, img, posX, posY, width, height) {
        this.ctx = ctx;
        this.img = img
        this.posX = posX;
        this.posY = posY
        this.width = width
        this.height = height
    }

    getX() {
        return this.posX
    }

    getY() {
        return this.posY
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    getRadius() {
        return this.radius;
    }


}