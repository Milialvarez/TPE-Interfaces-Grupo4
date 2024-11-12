"use strict"

window.addEventListener("resize", setHeightMainPage)

setHeightMainPage()

function setHeightMainPage() {
    const windowWidth = window.innerWidth

    let first = windowWidth * 894 / 1280
    let second = windowWidth * 960 / 1280

    document.querySelector(".main_page").style.height = first + second + "px"
}

window.addEventListener("scroll", getScroll)

function getScroll(e) {
    const scrollY = window.scrollY
    document.querySelector("#header").classList.toggle("small", window.scrollY > 150)

    if (scrollY >= 150) {
        document.querySelector(".logo_img").style.width = "150px"
        document.querySelector(".logo_img").style.height = "86px"
        document.querySelector(".logo_img").style.transform = "unset"
    } else {
        document.querySelector(".logo_img").style.width = "550px"
        document.querySelector(".logo_img").style.height = "320px"
        document.querySelector(".logo_img").style.transform = "translateY(110px)"
        document.querySelector("#header").style.background = ""
    }
}