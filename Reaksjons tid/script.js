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


light.addEventListener("click", function () {
    navbar.classList.add("dark")
    body.classList.add("body")
    header.classList.add("header")
    dark.style.display = "block"
    light.style.display = "none"
})

dark.addEventListener("click", function () {
    navbar.classList.remove("dark")
    body.classList.remove("body")
    header.classList.remove("header")
    dark.style.display = "none"
    light.style.display = "block"
})

const startKnapp = document.getElementById("start")
const grønneLys = document.querySelectorAll(".green .sirkel")
const statusTekst = document.getElementById("tekst")
const tidSpan = document.getElementById("tid")
const poengDiv = document.getElementById("poeng")

let poeng = 0
let timerInterval = null
let sekunder = 0
let spillAktivt = false

function oppdaterPoeng() {
    poengDiv.innerHTML = "<h3>Poeng: " + poeng + "</h3>"
}

function startTimer() {
    sekunder = 0
    tidSpan.textContent = sekunder
    timerInterval = setInterval(function () {
        sekunder++
        tidSpan.textContent = sekunder
    }, 1000)
}

function stoppTimer() {
    clearInterval(timerInterval)
}

startKnapp.addEventListener("click", function () {
    if (spillAktivt) return
    spillAktivt = true
    statusTekst.textContent = "Vent..."
    startTimer()

    const ventetid = 1500 + Math.random() * 3500

    setTimeout(function () {
        grønneLys.forEach(function (lys) {
            lys.style.backgroundColor = "lime"
        })

        const startTid = performance.now()

        document.addEventListener("click", function () {
            const reaksjonstid = Math.round(performance.now() - startTid)
            stoppTimer()
            spillAktivt = false

            if (reaksjonstid < 400) {
                poeng += 3
                statusTekst.textContent = reaksjonstid + " ms – Rask! +3 poeng"
            } else if (reaksjonstid < 700) {
                poeng += 1
                statusTekst.textContent = reaksjonstid + " ms – OK! +1 poeng"
            } else {
                statusTekst.textContent = reaksjonstid + " ms – For sent! +0 poeng"
            }

            oppdaterPoeng()

            grønneLys.forEach(function (lys) {
                lys.style.backgroundColor = ""
            })

        }, { once: true })

    }, ventetid)
})

oppdaterPoeng()
