"use strict"
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let tableroWidth = 4 * 60 + 10
let tableroHeight = 4 * 60 + 10

let tablero = new Tablero(ctx, "rgba(255, 123, 0, 0.7)", 4, canvasWidth / 2 - tableroWidth / 2, canvasHeight / 2 - tableroHeight / 2, 4);

let casillero = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero2 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero3 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero4 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero5 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero6 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero7 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero8 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero9 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero10 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero11 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero12 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero13 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero14 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero15= new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");
let casillero16 = new Casillero(ctx, false, 25, "rgba(0, 0, 0, 0.3)");

tablero.agregarCasillero(casillero);
tablero.agregarCasillero(casillero2);
tablero.agregarCasillero(casillero3);
tablero.agregarCasillero(casillero4);
tablero.agregarCasillero(casillero5);
tablero.agregarCasillero(casillero6);
tablero.agregarCasillero(casillero7);
tablero.agregarCasillero(casillero8);
tablero.agregarCasillero(casillero9);
tablero.agregarCasillero(casillero10);
tablero.agregarCasillero(casillero11);
tablero.agregarCasillero(casillero12);
tablero.agregarCasillero(casillero13);
tablero.agregarCasillero(casillero14);
tablero.agregarCasillero(casillero15);
tablero.agregarCasillero(casillero16);

tablero.draw();
