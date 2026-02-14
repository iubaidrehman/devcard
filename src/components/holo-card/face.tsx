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
                'bg-card shadow-xl',
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
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none z-0 mix-blend-soft-light"
                style={{ backgroundImage: 'url("/noise.png")' }}></div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between text-card-foreground">
                {children}
            </div>

            {/* 
            Lighting: Subtle gradient from top-left (Highlight) 
            Replaces the "glossy overlay" with a more structural highlight
        */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};
