"use strict"

window.addEventListener("resize", setHeightMainPage)

setHeightMainPage()

function setHeightMainPage() {
    const windowWidth = window.innerWidth

    let first = windowWidth * 894 / 1280
    let second = windowWidth * 960 / 1280

    document.querySelector(".main_page").style.height = first + second + "px"
}

const munequitos = document.getElementById('munequitos');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;

  // Calcula la dirección opuesta al cursor
  const offsetX = (window.innerWidth / 2 - mouseX) / 10;

  // Aplica el desplazamiento a la imagen
  munequitos.style.transform = `translate(${offsetX}px)`;
});