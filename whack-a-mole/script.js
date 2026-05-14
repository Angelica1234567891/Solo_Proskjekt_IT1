const burger = document.getElementById("burger")
const kryss = document.getElementById("kryss")
const navbar = document.getElementById("navbar")

burger.addEventListener("click", function () {
    navbar.classList.add("open")
    burger.style.display = "none"
    kryss.style.display = "block"
})

kryss.addEventListener("click", function () {
    navbar.classList.remove("open")
    burger.style.display = "block"
    kryss.style.display = "none"
})

const dark = document.getElementById("dark")
const light = document.getElementById("light")
const body = document.getElementById("body")
const header = document.getElementById("header")


dark.addEventListener("click", function() {
    navbar.classList.add("dark")
    body.classList.add("body")
    header.classList.add("header")
    dark.style.display = "none"
    light.style.display = "block"
})

light.addEventListener("click", function() {
    navbar.classList.remove("dark")
    body.classList.remove("body")
    header.classList.remove("header")
    dark.style.display = "block"
    light.style.display = "none"
})

const restart = document.getElementById("restart")

restart.addEventListener("click", function() {
    poeng = 0
    poengTall.textContent = 0
    visMuldvarp()
})

const poengTall = document.getElementById("poengTall")
const alleHull = document.querySelectorAll(".hole")

let poeng = 0
let aktivHull = 0

function visMole () {
    if (aktivHull) {
        aktivHull.style.backgroundImage = ""
        aktivHull.style.backgroundColor = "green"
    }

    const tilfeldig = Math.floor(Math.random() * alleHull.length)
    aktivHull = alleHull[tilfeldig]

    aktivHull.style.backgroundImage = "url('mole.png')"
    aktivHull.style.backgroundSize = "cover"
    aktivHull.style.backgroundPosition = "center"
}

alleHull.forEach(hole => {
    hole.addEventListener("click", klikk)
})

function klikk(event) {
    console.log("hei")
    if (this == aktivHull) {
        poeng++
        poengTall.textContent = poeng
        visMole()
    }
}

setInterval(visMole, 1000)

visMole()