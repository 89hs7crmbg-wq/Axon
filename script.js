// Preloader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hide'), 2100);
});

// Popup
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('popup').classList.add('show'), 4300);
});
document.getElementById('popup-close').onclick = () => {
  document.getElementById('popup').classList.remove('show');
};
document.getElementById('popup').onclick = e => {
  if (e.target.id === 'popup') document.getElementById('popup').classList.remove('show');
};

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.onclick = () => mobileNav.classList.toggle('open');
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.onclick = () => mobileNav.classList.remove('open');
});

// Progress
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scrollY / h * 100) + '%';
});

// Up button
const up = document.getElementById('up');
window.addEventListener('scroll', () => {
  up.classList.toggle('show', scrollY > 700);
});
up.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// Particles
(function() {
  const c = document.getElementById('particles');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, pts = [];

  function resize() {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  }

  function create() {
    pts = [];
    const n = Math.floor(w * h / 18000);
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.4 + 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,169,196,${p.o})`;
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139,169,196,${0.09*(1-d/110)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  addEventListener('resize', () => { resize(); create(); });
  resize(); create(); draw();
})();
