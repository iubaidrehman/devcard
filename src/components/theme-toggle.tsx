"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-10 w-10" /> // Placeholder to prevent layout shift
    }

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
                relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300
                border shadow-glass-lg hover:scale-110
                ${isDark
                    ? "border-zinc-800 bg-zinc-950 shadow-glass-dark hover:bg-zinc-900"
                    : "border-zinc-200 bg-white hover:border-primary hover:bg-zinc-50"
                }
            `}
            aria-label="Toggle theme"
        >
            {/* Sun Icon (Show in Light Mode) */}
            <Sun
                className={`
                    absolute h-[1.2rem] w-[1.2rem] transition-all duration-300
                    ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-primary"}
                `}
            />

            {/* Moon Icon (Show in Dark Mode) */}
            <Moon
                className={`
                    absolute h-[1.2rem] w-[1.2rem] transition-all duration-300
                    ${isDark ? "rotate-0 scale-100 opacity-100 text-primary" : "-rotate-90 scale-0 opacity-0"}
                `}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
