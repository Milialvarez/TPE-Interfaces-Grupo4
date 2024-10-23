"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let tamanioCasillero = 75

let tableroWidth = 8 * tamanioCasillero
let tableroHeight = 7 * tamanioCasillero

let tablero = new Tablero(ctx, 8, canvasWidth / 2 - tableroWidth / 2, canvasHeight / 2 - tableroHeight / 2, 7, tamanioCasillero);


let imagen = new Image();
imagen.src = "../imgs/ficha_tom.png";
imagen.onload = () => {
    let ficha = new Ficha(ctx, tamanioCasillero / 2, imagen, 0, 150, "Tom", tamanioCasillero / 2);
    ficha.draw()
}

tablero.initialize();