const burger = document.getElementById("burger")
const kryss = document.getElementById("kryss")
const navbar = document.getElementById("navbar")

burger.addEventListener("click", function() {
    navbar.classList.add("open")
    burger.style.display = "none"
    kryss.style.display = "block"
})

kryss.addEventListener("click", function() {
    navbar.classList.remove("open")
    burger.style.display = "block"
    kryss.style.display = "none"
})



const canvas = document.querySelector("canvas")
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
canvas.width = canvas.offsetWidth //regner ut css width: 730px
canvas.height = canvas.offsetHeight // regner ut høyden: 200px


// konteksten (som vi bruker til å tegne med):
const ctx = canvas.getContext("2d")

let x = 100
let y = 100
let radius = 40
const g = 0.1
let farge = "red"

function tegnBall(x, y, radius, farge) {
    ctx.fillStyle = farge
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

canvas.addEventListener("click", function (e) {
    const ballPlass = canvas.getBoundingClientRect() //viser til hvor elemente skal plasseres
    const x = e.clientX - ballPlass.left
    const y = e.clientY - ballPlass.top

    farge = `hsl(${Math.random() * 360}, 100%, 50% )`
    radius = Math.floor(Math.random() * 20) + 10
    tegnBall(x, y, radius, farge)
})

