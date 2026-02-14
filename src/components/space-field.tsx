'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    opacity: number;
    baseX: number;
    baseY: number;
}

export function SpaceField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const particleCount = 1500; // Dense starfield
        const connectionDistance = 80;
        const repulsionRadius = 150;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 2 + 0.1, // Tiny pixels
                    speedY: Math.random() * 0.5 + 0.1, // Slow upward drift (Antigravity)
                    opacity: Math.random() * 0.5 + 0.1,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Color based on theme (Electric Blue in both, but different opacity/blend)
            const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
            const particleColor = isDark ? '41, 98, 255' : '41, 98, 255'; // Electric Blue

            particles.forEach((particle) => {
                // Antigravity Movement (Upwards)
                particle.y -= particle.speedY;

                // Reset if off screen (Looping)
                if (particle.y < 0) {
                    particle.y = canvas.height;
                    particle.x = Math.random() * canvas.width;
                }

                // Mouse Interaction (Repulsion)
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < repulsionRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    const directionX = forceDirectionX * force * 5; // Push strength
                    const directionY = forceDirectionY * force * 5;

                    particle.x -= directionX;
                    particle.y -= directionY;
                } else {
                    // Return to original horizontal connection (loose)
                    if (particle.x !== particle.baseX) {
                        const dx = particle.x - particle.baseX;
                        particle.x -= dx * 0.02; // Slow elastic return
                    }
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        init();
        animate();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
        };
    }, [theme]);

    // Render fixed background
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-60 mix-blend-screen"
        />
    );
}
