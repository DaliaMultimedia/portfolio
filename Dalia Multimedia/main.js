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
