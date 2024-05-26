const cvs = document.querySelector("canvas");
const option = {
  willReadFrequently: true,
};

// import {getRandom, init} from "./initCanvas.js";
const init = (cvs, width, height, type, option) => {
  cvs.width = width;
  cvs.height = height;
  if (type) {
    if (option) {
      return cvs.getContext(type, option);
    }
    return cvs.getContext(type);
  }
};

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ctx = init(
  cvs,
  window.innerWidth * devicePixelRatio,
  window.innerHeight * devicePixelRatio,
  "2d",
  option
);
cvs.style.background = "radial-gradient(#fff, #8c738c)";
const clear = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
};
const PI = Math.PI,
  cos = Math.cos,
  sin = Math.sin,
  min = Math.min;
class Particle {
  animation = undefined;
  constructor() {
    const r = min(cvs.width, cvs.height) / 2 - 7,
      cx = cvs.width / 2,
      cy = cvs.height / 2,
      rad = (getRandom(0, 360) * PI) / 180;
    this.x = cx + r * cos(rad);
    this.y = cy - r * sin(rad);
    this.szie = getRandom(3 * devicePixelRatio, 7 * devicePixelRatio);
  }
  drawP() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.szie, 0, 2 * PI);
    ctx.fillStyle = "#5445544d";
    ctx.fill();
  }

  moveTo(tx, ty) {
    const duration = 500,
      sx = this.x,
      sy = this.y,
      xSpeed = (tx - sx) / duration,
      ySpeed = (ty - sy) / duration,
      startTime = Date.now();
    const _move = () => {
      const t = Date.now() - startTime;
      this.x = sx + xSpeed * t;
      this.y = sy + ySpeed * t;
      if (t > duration) {
        this.x = tx;
        this.y = ty;
      }
      this.animation = requestAnimationFrame(_move);
    };
    _move();
  }
  stop() {
    if (this.animation) {
      cancelAnimationFrame(this.animation);
    }
    this.animation = undefined;
  }
}

class Graph {
  let;
  text = null;
  const;
  particles = [];
  function;

  constructor() {
    for (let i = 0; i < 500; i++) {
      this.particles.push(new Particle());
    }
  }

  getText() {
    return new Date().toTimeString().substring(0, 8);
  }

  getPoints() {
    const { width, height, data } = ctx.getImageData(
      0,
      0,
      cvs.width,
      cvs.height
    );
    const points = [];
    const gap = 3;
    for (let i = 0; i < width; i += gap) {
      for (let j = 0; j < height; j += gap) {
        const index = (i + j * width) * 4;
        const r = data[index],
          g = data[index + 1],
          b = data[index + 2],
          a = data[index + 3];
        if (r === 0 && g === 0 && b === 0 && a === 255) {
          points.push([i, j]);
        }
      }
    }
    return points;
  }

  update() {
    const { width, height } = cvs;
    const newText = this.getText();
    if (newText === this.text) {
      return;
    }
    clear();
    this.text = newText;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    ctx.font = `${200 * devicePixelRatio}px common-number, sans-serif`; //
    ctx.fillText(
      this.text,
      (width - ctx.measureText(this.text).width) / 2,
      height / 2
    );
    const points = this.getPoints();
    while (points.length > this.particles.length) {
      this.particles.push(new Particle());
    }
    if (this.particles.length > points.length) {
      this.particles.splice(points.length).forEach((v) => v.stop());
    }
    clear();
    for (let i = 0; i < points.length; ++i) {
      const p = this.particles[i];
      if (p) {
        p.moveTo(...points[i]);
      }
    }
  }

  draw() {
    clear();
    this.update();
    this.particles.forEach((p) => p.drawP());
    requestAnimationFrame((_) => this.draw());
  }
}
const g = new Graph();
g.draw();
