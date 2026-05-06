

const canvas = document.querySelector("canvas")
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
canvas.width = WIDTH
canvas.height = HEIGHT

const canvasTop = 100 // TODO: REGN UT - finn vha JS
const canvasLeft = 230 // TODO: REGN UT - finn vha JS


// konteksten (som vi bruker til å tegne med):
const ctx = canvas.getContext("2d")

let x = 100
let y = 100
let radius = 40
const g = 0.1
let farge = "green"

function tegnSirkel(x, y, radius, farge) {
    ctx.fillStyle = farge
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

canvas.addEventListener("mousemove", function (e) {
    farge = `hsl(${Math.random() * 360}, 100%, 50% )`
    radius = Math.floor(Math.random() * 30) + 10
    tegnSirkel(e.clientX - canvasLeft, e.clientY - canvasTop, radius, farge)
})
