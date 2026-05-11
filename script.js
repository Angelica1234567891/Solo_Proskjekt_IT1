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