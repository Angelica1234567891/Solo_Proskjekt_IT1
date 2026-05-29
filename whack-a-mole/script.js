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

const poengTall = document.getElementById("poengTall")
const timerTall = document.getElementById("timerTall")
const sluttPoeng = document.getElementById("sluttPoeng")
const gameOverDiv = document.getElementById("gameOver")
const startKnapp = document.getElementById("startKnapp")
const alleHull = document.querySelectorAll(".hole")
const restart = document.getElementById("restart")

let poeng = 0
let aktivHull = null
let spillAktivt = false
let muldvarpIntervall = null
let timerIntervall = null
let tidIgjen = 30

function visMuldvarp() {
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

function avsluttSpill() {
    spillAktivt = false
    clearInterval(muldvarpIntervall)
    clearInterval(timerIntervall)

    if (aktivHull) {
        aktivHull.style.backgroundImage = ""
        aktivHull.style.backgroundColor = "green"
        aktivHull = null
    }

    sluttPoeng.textContent = poeng
    gameOverDiv.style.display = "block"
}

function startSpill() {
    poeng = 0
    tidIgjen = 30
    poengTall.textContent = 0
    timerTall.textContent = 30
    spillAktivt = true
    gameOverDiv.style.display = "none"

    clearInterval(muldvarpIntervall)
    clearInterval(timerIntervall)

    muldvarpIntervall = setInterval(visMuldvarp, 1000)

    timerIntervall = setInterval(function () {
        tidIgjen--
        timerTall.textContent = tidIgjen
        if (tidIgjen <= 0) {
            avsluttSpill()
        }
    }, 1000)

    visMuldvarp()
}

alleHull.forEach(hull => {
    hull.addEventListener("click", function () {
        if (!spillAktivt) return
        if (this === aktivHull) {
            poeng++
            poengTall.textContent = poeng
            visMuldvarp()
        }
    })
})

startKnapp.addEventListener("click", startSpill)
restart.addEventListener("click", startSpill)

startSpill()