const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function initCanvasSize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
}

initCanvasSize();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Particle {
  constructor() {
    this.size = getRandom(2 * devicePixelRatio, 7 * devicePixelRatio);
    const r = Math.min(canvas.width, canvas.height) / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    this.x = cx + r * Math.cos(rad);
    this.y = cy + r * Math.sin(rad);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "#5445544d";
    ctx.fill();
  }

  moveTo(tx, ty) {
    const duration = 500;
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    const startTime = Date.now();
    const _move = () => {
      const t = Date.now() - startTime;
      const x = sx + xSpeed * t;
      const y = sy + ySpeed * t;
      this.x = x;
      this.y = y;
      if (t >= duration) {
        this.x = tx;
        this.y = ty;
        return;
      }
      requestAnimationFrame(_move);
    };

    _move();
  }
}

const particles = [];
let text = null;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  for (const p of particles) {
    p.draw();
  }
  requestAnimationFrame(draw);
}

draw();

function getText() {
  return new Date().toTimeString().substring(0, 8);
}

function update() {
  const curText = getText();
  if (text === curText) {
    return;
  }
  text = curText;
  const { width, height } = canvas;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  ctx.font = `${140 * devicePixelRatio}px 'DS-Digital', 'sans-serif'`;
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height / 2);

  const points = getPoints();
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    let p = particles[i];
    if (!p) {
      p = new Particle();
      particles.push(p);
    }
    p.moveTo(x, y);
  }
  if (points.length < particles.length) {
    particles.splice(points.length);
  }
}

function getPoints() {
  const points = [];
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(data);
  for (let i = 0; i < canvas.width; i += 6) {
    for (let j = 0; j < canvas.height; j += 6) {
      const index = (i + j * canvas.width) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push([i, j]);
      }
    }
  }
  return points;
}
