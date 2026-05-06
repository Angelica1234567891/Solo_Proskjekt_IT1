const topCanvas = document.querySelector(".ballSpace")
const topCtx = topCanvas.getContext("2d")

const boxCanvas = document.querySelector(".dropCanvas")
const boxCtx = boxCanvas.getContext("2d")

function resizeCanvases() {
    topCanvas.width = topCanvas.offsetWidth
    topCanvas.height = topCanvas.offsetHeight
    boxCanvas.width = boxCanvas.offsetWidth
    boxCanvas.height = boxCanvas.offsetHeight
}
resizeCanvases()

// All balls currently falling or landed
const balls = []

// The one ball sitting in the top bar waiting to drop
let pendingBall = {
    x: topCanvas.width / 2,
    radius: Math.floor(Math.random() * 30) + 10,
    farge: `hsl(${Math.random() * 360}, 100%, 50%)`
}

// Draw the pending ball in the top canvas
function drawPending() {
    topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height)
    topCtx.fillStyle = pendingBall.farge
    topCtx.beginPath()
    topCtx.arc(pendingBall.x, topCanvas.height / 2, pendingBall.radius, 0, 2 * Math.PI)
    topCtx.fill()
}

// Move pending ball left/right when you move the mouse
topCanvas.addEventListener("mousemove", function(e) {
    const rect = topCanvas.getBoundingClientRect()
    pendingBall.x = e.clientX - rect.left
    drawPending()
})

// Drop the ball when you click
topCanvas.addEventListener("click", function(e) {
    const rect = topCanvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left

    // Add a new falling ball to the box
    balls.push({
        x: clickX,
        y: 0,               // starts at top of box
        vy: 0,              // vertical speed
        radius: pendingBall.radius,
        farge: pendingBall.farge,
        landed: false
    })

    // Make a new pending ball
    pendingBall = {
        x: clickX,
        radius: Math.floor(Math.random() * 30) + 10,
        farge: `hsl(${Math.random() * 360}, 100%, 50%)`
    }
    drawPending()
})

const gravity = 0.5
const bounceDamping = 0.4  // how much bounce is lost on each hit

function update() {
    boxCtx.clearRect(0, 0, boxCanvas.width, boxCanvas.height)

    for (let ball of balls) {
        if (!ball.landed) {
            ball.vy += gravity          // accelerate downward
            ball.y += ball.vy

            const floor = boxCanvas.height - ball.radius

            // Check against floor
            if (ball.y >= floor) {
                ball.y = floor
                ball.vy *= -bounceDamping   // bounce with energy loss
                if (Math.abs(ball.vy) < 1) {
                    ball.vy = 0
                    ball.landed = true
                }
            }

            // Check against other landed balls
            for (let other of balls) {
                if (other === ball) continue
                const dx = ball.x - other.x
                const dy = ball.y - other.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const minDist = ball.radius + other.radius

                if (dist < minDist && dist > 0) {
                    // Push ball up so it sits on top
                    ball.y = other.y - minDist * (dy / dist) * -1
                    ball.vy *= -bounceDamping
                    if (Math.abs(ball.vy) < 1) {
                        ball.vy = 0
                        ball.landed = true
                    }
                }
            }
        }

        // Draw the ball
        boxCtx.fillStyle = ball.farge
        boxCtx.beginPath()
        boxCtx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
        boxCtx.fill()
    }

    requestAnimationFrame(update)
}

drawPending()
update()