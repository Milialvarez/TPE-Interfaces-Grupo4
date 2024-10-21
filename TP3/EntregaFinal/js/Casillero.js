class Casillero {
    constructor(ctx, vacio, radio, color) {
        this.ctx = ctx;
        this.vacio = vacio;
        this.posicionX = 0;
        this.posicionY = 0;
        this.radio = radio;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posicionX, this.posicionY, this.radio, 0, 2* Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}