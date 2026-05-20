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


light.addEventListener("click", function() {
    navbar.classList.add("dark")
    body.classList.add("body")
    header.classList.add("header")
    dark.style.display = "block"
    light.style.display = "none"
})

dark.addEventListener("click", function() {
    navbar.classList.remove("dark")
    body.classList.remove("body")
    header.classList.remove("header")
    dark.style.display = "none"
    light.style.display = "block"
})

const start = document.getElementById("start")
const grønneLys = document.querySelectorAll(".green .sirkel")
const rodeLys = document.querySelectorAll(".red .sirkel")

let spillStatus = "idle"

function stoppLys () {
    grønneLys.forEach(lys => lys.classList.remove("onGreen"))
        rødeLys.forEach(lys => lys.classList.remove("onRed"))

}

function startSpill () {
    if (spillStatus === "venting" || spillStatus === "klar") return

    stoppLys()
    spillStatus = "waiting"
    startKnapp.disabled = true

    const ventetid = 1500 + Math.random() * 3500
    venteTimer = setTimeout(function () {
        tennGrøntLys ()
        tidspunkt = performance.now() 
        spillStatus = "ready"
    } )
}
