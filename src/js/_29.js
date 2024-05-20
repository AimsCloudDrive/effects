const btn = document.querySelector(".btn-hover");
const tur = document.querySelector("feTurbulence");
const val = {
  freq: 0.00001
}
const tl = new gsap.timeline({
  paused: true,
  onUpdate() {
    tur.setAttribute("baseFrequency", `0 ${val.freq}`)
    // console.log(val.freq)
  }
});


tl.to(val, {freq: 0.4, duration: .1})
tl.to(val, {freq: 0.00001, duration: .1})

btn.onmouseenter = () => tl.restart()
