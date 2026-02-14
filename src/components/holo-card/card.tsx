'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HoloCardProps {
    children: React.ReactNode;
}

export const HoloCard = ({ children }: HoloCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Mouse position state for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for tilt
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Map mouse position to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate percentage (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="group perspective-1000">
            {/* TILT LAYER */}
            <motion.div
                className="relative h-96 w-64 md:h-[450px] md:w-[320px] transition-all duration-200 ease-linear"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* FLIP LAYER */}
                <motion.div
                    className="relative h-full w-full cursor-pointer h-full w-full"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
};
