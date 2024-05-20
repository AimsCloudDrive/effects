const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

import { init } from "./initCanvas.js"
init(cvs, window.innerWidth, window.innerHeight);
cvs.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
const mi = {
    x: cvs.width / 2,
    y: cvs.height / 2,
}
window.onmousemove = (e) => {
    mi.x = e.clientX;
    mi.y = e.clientY;
}

class item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.PI * 2 * Math.random();
        this.radius = Math.random() * 150;
        this.color = `hsl(${Math.random() * 360}, 60%, 50%)`;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x, this.y);
        this.angle += 0.02;
        this.x = mi.x + Math.cos(this.angle) * this.radius;
        this.y = mi.y + Math.sin(this.angle) * this.radius;
        ctx.lineTo(this.x, this.y);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

    }
}

class Grip {
    constructor(nums = 20) {
        this.items = [];

        for ( let i = 0; i < nums; ++i) {
            this.items.push(new item(mi.x, mi.y));
        }
    }

    draw() {
        requestAnimationFrame(() => {
            this.draw()
        })
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, cvs.width, cvs.height)
        this.items.forEach((item) => item.draw())
    }
}

const g1 = new Grip(20);
g1.draw()

export function dd () {
    console.log("dd")
}
