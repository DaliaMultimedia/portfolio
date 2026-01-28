const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sideMenu.classList.toggle('active');
});

document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
  });
});

const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const canvas = document.querySelector('.about-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  let t = 0;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(120,200,255,.6)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 8) {
      const y =
        canvas.height / 2 +
        Math.sin(x * 0.01 + t) * 12;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    t += 0.01;
    requestAnimationFrame(draw);
  };

  draw();
}

const pricingItems = document.querySelectorAll('.pricing-item');

pricingItems.forEach(item => {
  const header = item.querySelector('.pricing-header');

  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    pricingItems.forEach(i => i.classList.remove('open'));

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
// ABOUT — desktop parallax
const about = document.querySelector('.about');
const aboutImg = document.querySelector('.about-media img');

if (about && aboutImg && window.innerWidth >= 992) {
  window.addEventListener('scroll', () => {
    const rect = about.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
    aboutImg.style.transform = `translateY(${progress * 16}px)`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', () => {

  // ABRIR MODAL
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modal)
      if (!modal) return

      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
    })
  })

  // CERRAR MODAL
  document.querySelectorAll('[data-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal')
      if (!modal) return

      modal.classList.remove('active')
      document.body.style.overflow = ''
      modal.querySelectorAll('video').forEach(v => {
  v.pause()
  v.currentTime = 0
})

    })
  })

})
let bezierLines = []
let x = 0, y = 0
let letters = "Dalia Multimedia"
let fontSizeMin = 14
let counter = 0
let active = false

function setup() {
  pixelDensity(1)

  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('p5-hero')
  canvas.style('touch-action', 'auto')

  frameRate(windowWidth < 768 ? 18 : 24)

  background(10, 12, 18)
  textFont('Arial')
  fill(255)
  textAlign(LEFT, BASELINE)

  generateBezierLines()
  noLoop()
}

function draw() {
  for (let line of bezierLines) {
    line.display()
  }

  if (!active) return

  const px = touches.length ? touches[0].x : mouseX
  const py = touches.length ? touches[0].y : mouseY

  let d = dist(x, y, px, py)
  textSize(fontSizeMin + d * 0.25)

  let letter = letters.charAt(counter)
  let step = textWidth(letter) + 2

  if (d > 10) {
    let angle = atan2(py - y, px - x)

    push()
    translate(x, y)
    rotate(angle)
    text(letter, 0, 0)
    pop()

    x += cos(angle) * step
    y += sin(angle) * step

    counter = (counter + 1) % letters.length
  }
}

function mouseMoved() {
  activate(mouseX, mouseY)
}

function touchMoved() {
  if (touches.length) {
    activate(touches[0].x, touches[0].y)
  }
  return false
}

function activate(px, py) {
  if (!active) {
    x = px
    y = py
  }

  active = true
  loop()
  redraw()
  noLoop()
}

function mousePressed() {
  resetSketch(mouseX, mouseY)
}

function touchStarted() {
  if (touches.length) {
    resetSketch(touches[0].x, touches[0].y)
  }
  return false
}

function resetSketch(px, py) {
  background(10, 12, 18)
  generateBezierLines()
  x = px
  y = py
  counter = 0
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(10, 12, 18)
  generateBezierLines()
}

function generateBezierLines() {
  bezierLines = []
  let numLines = windowWidth < 768 ? 1 : 2

  for (let i = 0; i < numLines; i++) {
    bezierLines.push(new BezierLine())
  }
}

class BezierLine {
  constructor() {
    this.x1 = random(width)
    this.y1 = random(height)
    this.x2 = random(width)
    this.y2 = random(height)
    this.x3 = random(width)
    this.y3 = random(height)
    this.x4 = random(width)
    this.y4 = random(height)

    this.strokeWidth = random(0.6, 1.2)
    this.color = color(160, 220, 255, 40)
  }

  display() {
    stroke(this.color)
    strokeWeight(this.strokeWidth)
    noFill()
    bezier(
      this.x1, this.y1,
      this.x2, this.y2,
      this.x3, this.y3,
      this.x4, this.y4
    )
  }
}

