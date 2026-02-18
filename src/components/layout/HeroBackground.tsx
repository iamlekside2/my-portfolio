import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isGold: boolean;
    }[] = [];

    const isLight = theme === "light";
    // Gold + Blue particles for the Royal palette
    const goldColor = isLight ? "rgba(184, 148, 31," : "rgba(212, 175, 55,";
    const blueColor = isLight ? "rgba(26, 71, 184," : "rgba(59, 130, 246,";
    const connectionDistance = 130;
    const particleCount = Math.min(
      90,
      Math.floor((window.innerWidth * window.innerHeight) / 14000)
    );

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 2 + 0.5,
          isGold: Math.random() > 0.4,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const color = p.isGold ? goldColor : blueColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color} ${isLight ? 0.18 : 0.3})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity =
              (1 - dist / connectionDistance) * (isLight ? 0.06 : 0.1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${goldColor} ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Gradient base — midnight navy with gold + blue radial glows */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 20%, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 80%, color-mix(in srgb, var(--color-accent-secondary) 8%, transparent) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, transparent 70%),
            var(--color-primary)
          `,
        }}
      />
      {/* Subtle diagonal grid — angular/sharp feel */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Particle network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default HeroBackground;
