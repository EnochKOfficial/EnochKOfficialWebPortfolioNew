import React from "react";

export default function Particles({ count = 24, colors = ["rgba(124,58,237,0.25)", "rgba(168,85,247,0.18)"] }) {
  const ref = React.useRef(null);
  const rafRef = React.useRef();

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    const handleResize = () => requestAnimationFrame(onResize);
    window.addEventListener("resize", handleResize);

    const dots = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 60 + Math.random() * 110,
      vx: (Math.random() - 0.5) * 0.6, // faster to feel alive
      vy: (Math.random() - 0.5) * 0.6,
      drift: Math.random() * Math.PI * 2,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      dots.forEach((d, i) => {
        d.drift += 0.005 + i * 0.0001;
        d.x += d.vx + Math.cos(d.drift) * 0.2;
        d.y += d.vy + Math.sin(d.drift) * 0.2;
        if (d.x < -d.r) d.x = width + d.r;
        if (d.x > width + d.r) d.x = -d.r;
        if (d.y < -d.r) d.y = height + d.r;
        if (d.y > height + d.r) d.y = -d.r;
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        g.addColorStop(0, d.c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count, colors.join(",")]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
}