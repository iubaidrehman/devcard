'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FaceProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'front' | 'back';
}

export const Face = ({ children, className, variant = 'front' }: FaceProps) => {
    return (
        <div
            className={cn(
                'absolute inset-0 h-full w-full rounded-xl overflow-hidden',
                // BORDER: Architectural double-border effect
                'border border-border',
                // BACKGROUND: Semantic Card Background (Opaque enough for text)
                'bg-card shadow-glass-lg dark:shadow-glass-dark',
                // BLUR: Kept for slight depth, but less "frosted glass" more "acrylic"
                'backdrop-blur-md',
                'flex flex-col items-center justify-center text-center',
                variant === 'back' && '[transform:rotateY(180deg)]',
                className
            )}
            style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }}
        >
            {/* Subtle Noise Texture - Kept for professional texture */}
            <div
                className="absolute inset-0 opacity-[0.2] pointer-events-none z-0 mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            ></div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between text-card-foreground">
                {children}
            </div>

            {/* 
            Lighting: Subtle gradient from top-left (Highlight) 
            Replaces the "glossy overlay" with a more structural highlight
        */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};
