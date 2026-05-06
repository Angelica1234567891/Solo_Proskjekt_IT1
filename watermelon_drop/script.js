

const canvas = document.querySelector("canvas")
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
canvas.width = canvas.offsetWidth //regner ut css width: 730px
canvas.height = canvas.offsetHeight // regner ut høyden: 200px



// konteksten (som vi bruker til å tegne med):
const ctx = canvas.getContext("2d")

let x = 100
let y = 100
let vx = 4
let vy = 5
const radius = 40
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
    tegnSirkel(x, y, radius, farge)
})

function oppdaterBall() {
    vy += g
    x += vx
    y += vy

    if (x < radius || x > (WIDTH - radius)) {
        //snu farts-retningen:
        vx *= -1
        farge = `hsl(${Math.random() * 360}, 100%, 50% )`

    }

    if (y > (HEIGHT - radius)) {
        //snu farts-retningen:
        vy *= -1
        //Og! Få oss tilbake til "bakkenivå":
        y = (HEIGHT - radius)
        farge = `hsl(${Math.random() * 360}, 100%, 50% )`
    }
}

function loop() {
    oppdaterBall()

    //clear canvas:
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = "rgba(173, 216, 230, 0.1)"

    tegnBall()
    requestAnimationFrame(loop)
}

// Start loopen vår:
loop()
