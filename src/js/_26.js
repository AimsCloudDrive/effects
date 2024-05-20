const $ = document.querySelectorAll.bind(document)

doms = {
    ringOuter: $(".ring-outer")[0],
    ring: $(".ring")[0],
    images: $("img")
}


let isDown = false
let oldW = 0
let newW = 0
let deg = 0
function run(e) {
    if (!isDown) return;

    newW = e.clientX;

    let sign = Math.sign(newW - oldW);
    let dist = Math.abs(newW - oldW);
    deg = deg - (dist / window.innerWidth) * 180 * sign;
    if (deg > 360) deg = 0;
    if (deg < 0) deg = 360;
    doms.ring.style.transform = `rotateY(${ deg }deg)`;
    oldW = newW;

}
function mouseDown () {
    isDown = true
}
function mouseUp () {
    isDown = false
}


doms.ringOuter.addEventListener("mousemove",  run);
doms.ringOuter.addEventListener("mouseup", mouseUp);
doms.ringOuter.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseout", mouseUp)