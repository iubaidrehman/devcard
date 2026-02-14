'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function Cursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Physics Config
    // Heavy damping = "Underwater/Space" feel
    const springConfig = { stiffness: 100, damping: 25, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Basic hover detection for "Magnetic" feel
            const target = e.target as HTMLElement;
            const isClickable = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
            {/* 
         The "Center of Gravity" 
         Neon Lime Accent (10%)
      */}
            <motion.div
                className="absolute h-3 w-3 rounded-full bg-accent"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* 
         The "Event Horizon" Ring 
         Expands significantly on hover to "capture" the element
      */}
            <motion.div
                className="absolute rounded-full border border-white"
                animate={{
                    height: isHovering ? 60 : 32,
                    width: isHovering ? 60 : 32,
                    opacity: isHovering ? 0.8 : 0.4,
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                }}
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
}
