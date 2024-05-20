let container = document.querySelector(".loading")
let context = container.querySelector(".context")
let flag = false

context.addEventListener("mousedown", (e) => {
    flag = true
    let oX = e.offsetX
    let oY = e.offsetY
    document.addEventListener("mousemove", (e) => {
        let cX = e.clientX
        let cY = e.clientY
        let left = cX - oX < 0 ? 0 : cX - oX
        let top = cY - oY < 0 ? 0 : cY - oY

        if (flag) {
            context.style.top = top + "px"
            context.style.left = left + "px"
        }
    })
})
context.addEventListener("mouseup", () => {
    flag = false
})
