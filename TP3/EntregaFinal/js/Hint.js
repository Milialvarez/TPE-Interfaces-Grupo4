class Hint{
    constructor(ctx, radius, color, posX, posY){
        this.ctx = ctx;
        this.radius = radius;
        this.color = color;
        this.posX = posX;
        this.posY = posY
    }

    getX(){
        return this.posX
    }

    getY(){
        return this.posY
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    getRadius(){
        return this.radius;
    }   
}