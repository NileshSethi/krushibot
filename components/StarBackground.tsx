"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  isNear: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
}

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < starCount; i++) {
        const isNear = Math.random() > 0.7;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isNear ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5,
          speed: isNear ? Math.random() * 0.5 + 0.2 : Math.random() * 0.1 + 0.05,
          opacity: Math.random(),
          isNear,
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() > 0.98) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          len: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 10,
          opacity: 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw normal stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle effect for near stars
        if (star.isNear) {
          star.opacity += (Math.random() - 0.5) * 0.1;
          star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        }
      });

      // Draw shooting stars
      createShootingStar();
      shootingStars.forEach((ss, index) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${ss.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y + ss.len);
        ctx.stroke();

        ss.x += ss.speed;
        ss.y += ss.speed;
        ss.opacity -= 0.02;

        if (ss.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default StarBackground;
