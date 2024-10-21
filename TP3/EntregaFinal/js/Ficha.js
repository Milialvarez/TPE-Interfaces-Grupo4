class Ficha {
    constructor(ctx, radio, color, posicionX, posicionY, jugador) {
        this.ctx = ctx;
        this.radio = radio;
        this.color = color;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.jugador = jugador;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posicionX, this.posicionY, this.radio, 0, 2* Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    select() {
        
    }
}