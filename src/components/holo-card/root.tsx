'use client';

import React, { createContext, useContext, useState } from 'react';

interface HoloCardContextType {
    isFlipped: boolean;
    toggleFlip: () => void;
}

const HoloCardContext = createContext<HoloCardContextType | undefined>(undefined);

export const useHoloCard = () => {
    const context = useContext(HoloCardContext);
    if (!context) {
        throw new Error('useHoloCard must be used within a HoloCardProvider');
    }
    return context;
};

export const HoloCardRoot = ({ children }: { children: React.ReactNode }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped((prev) => !prev);

    return (
        <HoloCardContext.Provider value={{ isFlipped, toggleFlip }}>
            {children}
        </HoloCardContext.Provider>
    );
};
