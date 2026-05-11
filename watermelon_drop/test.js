// --- FRUKTLISTE ---
const frukter = [
    { emoji: "🍒", storrelse: 20, farge: "red" },
    { emoji: "🍊", storrelse: 30, farge: "orange" },
    { emoji: "🍋", storrelse: 40, farge: "yellow" },
    { emoji: "🍎", storrelse: 50, farge: "green" },
    { emoji: "🍉", storrelse: 60, farge: "lime" },
]

// --- VARIABLER ---
const boks = document.getElementById("boks")
const poengTekst = document.getElementById("poeng")
const nesteTekst = document.getElementById("neste")

let poeng = 0
let alleBaller = []
let gjeldendeFrukt = 0
let nesteFrukt = 0


const BREDDE = 300
const HOYDE = 400
const TYNGDE = 0.4
const BUNN = HOYDE


// --- LAG EN BALL ---
function lagBall(x, y, fruktNummer) {
    const frukt = frukter[fruktNummer]
    const storrelse = frukt.storrelse

    // Lag HTML-element
    const el = document.createElement("div")
    el.className = "ball"
    el.textContent = frukt.emoji
    el.style.width = storrelse + "px"
    el.style.height = storrelse + "px"
    el.style.backgroundColor = frukt.farge
    boks.appendChild(el)

    // Lag ball-objekt
    const ball = {
        x: x,
        y: y,
        fartX: 0,
        fartY: 0,
        storrelse: storrelse,
        fruktNummer: fruktNummer,
        element: el
    }

    alleBaller.push(ball)
    return ball
}


// --- KLIKK FOR Å SLIPPE BALL ---
boks.addEventListener("click", function (e) {
    const posisjon = boks.getBoundingClientRect()
    const x = e.clientX - posisjon.left

    const ball = lagBall(x, 0, gjeldendeFrukt)
    ball.fartY = 3

    // Bytt til neste frukt
    gjeldendeFrukt = nesteFrukt
    nesteFrukt = Math.floor(Math.random() * 3)
    nesteTekst.textContent = frukter[nesteFrukt].emoji
})


for (let i = 0; i < alleBaller.length; i++) {
  for (let j = i + 1; j < alleBaller.length; j++) {
    const a = alleBaller[i]
    const b = alleBaller[j]

    const dx = b.x - a.x
    const dy = b.y - a.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const minDist = (a.storrelse + b.storrelse) / 2

    if (dist < minDist && dist > 0) {
      // Dytt dem fra hverandre
      const skyv = (minDist - dist) / 2
      const retningX = dx / dist
      const retningY = dy / dist

      a.x -= retningX * skyv
      a.y -= retningY * skyv
      b.x += retningX * skyv
      b.y += retningY * skyv

      // Gi dem fart bort fra hverandre (rulleeffekt)
      a.fartX -= retningX * 1.5
      a.fartY -= retningY * 1.5
      b.fartX += retningX * 1.5
      b.fartY += retningY * 1.5
    }
  }
}

// --- SJEKK OM TO BALLER TREFFER HVERANDRE ---
function avstand(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.sqrt(dx * dx + dy * dy)
}

function sjekkSammenslåing() {
    for (let i = 0; i < alleBaller.length; i++) {
        for (let j = i + 1; j < alleBaller.length; j++) {
            const a = alleBaller[i]
            const b = alleBaller[j]

            const radius = (a.storrelse + b.storrelse) / 2
            const erNærme = avstand(a, b) < radius

            const sammeType = a.fruktNummer === b.fruktNummer
            const kanOppgraderes = a.fruktNummer < frukter.length - 1

            if (erNærme && sammeType && kanOppgraderes) {
                // Fjern begge
                a.element.remove()
                b.element.remove()
                alleBaller.splice(j, 1)
                alleBaller.splice(i, 1)

                // Lag ny større frukt
                const nyFrukt = a.fruktNummer + 1
                const nyBall = lagBall(a.x, a.y, nyFrukt)
                nyBall.fartY = -3

                // Gi poeng
                poeng += nyFrukt * 10
                poengTekst.textContent = poeng
                return
            }
        }
    }
}


// --- FYSIKK-LØKKE (kjører 60 ganger i sekundet) ---
function oppdater() {
    for (let ball of alleBaller) {

        // Tyngdekraft
        ball.fartY += TYNGDE

        // Flytt ballen
        ball.x += ball.fartX
        ball.y += ball.fartY

        const radius = ball.storrelse / 2

        // Vegg venstre og høyre
        if (ball.x - radius < 0) {
            ball.x = radius
            ball.fartX *= -0.5
        }
        if (ball.x + radius > BREDDE) {
            ball.x = BREDDE - radius
            ball.fartX *= -0.5
        }

        // Bunn
        if (ball.y + radius > BUNN) {
            ball.y = BUNN - radius
            ball.fartY *= -0.4
            ball.fartX *= 0.9
        }

        // Tegn ballen på skjermen
        ball.element.style.left = ball.x + "px"
        ball.element.style.top = ball.y + "px"
    }

    for (let i = 0; i < alleBaller.length; i++) {
  for (let j = i + 1; j < alleBaller.length; j++) {
    const a = alleBaller[i]
    const b = alleBaller[j]

    const dx = b.x - a.x
    const dy = b.y - a.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const minDist = (a.storrelse + b.storrelse) / 2

    if (dist < minDist && dist > 0) {
      // Dytt dem fra hverandre
      const skyv = (minDist - dist) / 2
      const retningX = dx / dist
      const retningY = dy / dist

      a.x -= retningX * skyv
      a.y -= retningY * skyv
      b.x += retningX * skyv
      b.y += retningY * skyv

      // Gi dem fart bort fra hverandre (rulleeffekt)
      a.fartX -= retningX * 1.5
      a.fartY -= retningY * 1.5
      b.fartX += retningX * 1.5
      b.fartY += retningY * 1.5
    }
  }
}


    sjekkSammenslåing()
    requestAnimationFrame(oppdater)
}


// --- START ---
nesteFrukt = Math.floor(Math.random() * 3)
nesteTekst.textContent = frukter[nesteFrukt].emoji
oppdater()