const canvas = document.querySelector("canvas")
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
canvas.width = WIDTH
canvas.height = HEIGHT

// konteksten (som vi bruker til å tegne med):
const ctx = canvas.getContext("2d")



function tegnBall(x, y, radius) {
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()

}
