'use client';

import dynamic from 'next/dynamic';
import { Download, Github, Linkedin, Twitter } from 'lucide-react';
import { HoloCard, Face } from '@/components/holo-card';
import { generateVCard } from '@/lib/vcard';
import { ThemeToggle } from '@/components/theme-toggle';
import { siteConfig } from '@/config/site';

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

export default function Home() {
    const user = {
        firstName: siteConfig.name.split(' ')[0],
        lastName: siteConfig.name.split(' ')[1],
        title: siteConfig.title,
        email: siteConfig.email,
        url: siteConfig.env.url || siteConfig.url,
        linkedin: siteConfig.links.linkedin,
        github: siteConfig.links.github,
        twitter: siteConfig.links.twitter,
    };

    const vCardData = generateVCard(siteConfig);

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden transition-colors bg-background">

            {/* 
        Layer 1: Foundation 
        Technical Grid Pattern instead of "Glow Blobs" 
      */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />

            {/* Theme Toggle */}
            <div className="absolute top-8 right-8 z-50">
                <ThemeToggle />
            </div>

            <div className="z-10 flex flex-col items-center gap-12">
                <HoloCard>

                    {/* FRONT FACE: "The Blueprint" */}
                    <Face variant="front">
                        <div className="flex flex-col items-center justify-between h-full py-10 px-6">

                            {/* Header: Clean, Minimal, Architectural */}
                            <div className="flex flex-col items-center gap-6">

                                {/* Avatar: Simple stroke, no neon glow */}
                                <div className="relative h-28 w-28 rounded-full border-2 border-primary/20 p-1">
                                    <div className="h-full w-full rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                        <span className="text-3xl font-bold text-primary tracking-tighter">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-bold text-foreground tracking-tight">{user.firstName} {user.lastName}</h2>
                                    <p className="text-sm font-semibold text-primary tracking-widest uppercase">{user.title}</p>
                                </div>
                            </div>

                            {/* Functional Accents: Tech Stack */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {['.NET 8', 'Next.js 14', 'React', 'Cloud'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Semantic Guidance */}
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium tracking-widest uppercase opacity-60">
                                <span>Tilt</span>
                                <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                                <span>Flip</span>
                            </div>
                        </div>
                    </Face>

                    {/* BACK FACE: "The Connection" */}
                    <Face variant="back">
                        <div className="flex h-full flex-col items-center justify-center gap-8 py-8 px-6">

                            <div className="text-center space-y-4 w-full">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Connect</h3>
                                {/* QR Code Container: Clean Card */}
                                <div className="relative p-4 bg-white rounded-lg border border-border mx-auto w-fit shadow-sm">
                                    <QRCode
                                        size={140}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={vCardData || ''}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-4">
                                {/* Primary Action */}
                                <button
                                    onClick={handleDownload}
                                    className="group relative w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Download className="h-4 w-4" />
                                        Save Contact
                                    </span>
                                </button>

                                {/* Secondary Actions */}
                                <div className="flex justify-center gap-6 pt-2">
                                    {[
                                        { icon: Github, href: user.github, label: "GitHub" },
                                        { icon: Linkedin, href: user.linkedin, label: "LinkedIn" },
                                        { icon: Twitter, href: user.twitter, label: "Twitter" }
                                    ].map(({ icon: Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 -m-2 text-muted-foreground transition-colors hover:text-primary"
                                            aria-label={label}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </Face>
                </HoloCard>
            </div>

        </main>
    );
}
