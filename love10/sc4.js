window.onload = function () {
    const c = document.getElementById("alx");
    const a = c.getContext("2d");
  
    let e = [];
    let h = [];
    let WIDTH = (c.width = window.innerWidth);
    let HEIGHT = (c.height = window.innerHeight);
    const v = 32 + 16 + 8;
    const R = Math.random;
    const C = Math.cos;
    const Y = 6.3;
  
    // Generate attractor points in a heart shape
    for (let i = 0; i < Y; i += 0.2) {
      h.push([
        WIDTH / 2 + 210 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 13 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)),
      ]);
    }
  
    for (let i = 0; i < Y; i += 0.4) {
      h.push([
        WIDTH / 2 + 150 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 9 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)),
      ]);
    }
  
    for (let i = 0; i < Y; i += 0.8) {
      h.push([
        WIDTH / 2 + 90 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 5 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)),
      ]);
    }
  
    // Initialize particles
    for (let i = 0; i < v; i++) {
      const x = R() * WIDTH;
      const y = R() * HEIGHT;
      const H = 340 + R() * 20;
      const S = 100 * R() + 100;
      const B = 51 * R() + 20;
      const f = [];
  
      for (let k = 0; k < v; k++) {
        f.push({
          x: x,
          y: y,
          X: 0,
          Y: 0,
          // R: (1 - k / v + 1) * 2, THICKER
          R: (1 - k / v + 1) * 1.5,
          S: R() + 1,
          q: ~~(R() * v),
          D: 2 * (i % 2) - 1,
          F: 0.2 * R() + 0.7,
          f: `hsla(${~~H},${~~S}%,${~~B}%,.1)`,
        });
      }
  
      e.push(f);
    }
  
    // Draw a single particle
    function path(d) {
      a.fillStyle = d.f;
      a.beginPath();
      a.arc(d.x, d.y, d.R, 0, Y, 1);
      a.closePath();
      a.fill();
    }
  
    setInterval(function () {
      a.fillStyle = "rgba(0,0,0,.2)";
      a.fillRect(0, 0, WIDTH, HEIGHT);
      for (i = v; i--;) {
          f = e[i];
          u = f[0];
          q = h[u.q];
          D = u.x - q[0];
          E = u.y - q[1];
          G = Math.sqrt(D * D + E * E);
          10 > G && (0.95 < R() ? u.q = ~~ (R() * v) : (0.99 < R() && (u.D *= -1), u.q += u.D, u.q %= v, 0 > u.q && (u.q += v)));
          u.X += -D / G * u.S;
          u.Y += -E / G * u.S;
          u.x += u.X;
          u.y += u.Y;
          path(u);
          u.X *= u.F;
          u.Y *= u.F;
          for (k = 0; k < v - 1;) T = f[k], N = f[++k], N.x -= 0.7 * (N.x - T.x), N.y -= 0.7 * (N.y - T.y), path(N)
      }
  }, 25);
}