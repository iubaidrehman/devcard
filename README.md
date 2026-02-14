# Holo-Card: Professional Edition 💠

> A high-performance, 3D interactive digital business card built with Next.js 14 and React Three Fiber. Designed for Senior Engineers.

![Holo-Card Preview](https://via.placeholder.com/800x400?text=Holo-Card+Preview)

## 🚀 Features

### 🌌 Premium 3D Design System
A complete visual overhaul featuring a physics-based, 3D interactive environment.
- **WebGL Diamond Field**: 4,000+ interactive 3D diamonds (InstancedMesh) that float, rotate, and react to mouse parallax.
- **Magnetic Cursor**: A fluid, physics-based cursor that "drags" through the air and snaps to interactive elements with heavy damping.
- **60-30-10 Palette**: 
    - **60%**: Pure White / Abyss Black (Foundation)
    - **30%**: Electric Blue `#2962FF` (Structure/Text)
    - **10%**: Neon Lime `#C6FF00` (Accent/Pop)

### 💠 3D Interactivity
- **60fps Physics**: Decoupled Tilt (Mouse) and Flip (Click) layers for conflict-free 3D interaction.
- **Deep Shadows**: Multi-layered "abyssal" shadows in dark mode for a premium glassmorphic feel.
- **Hover Effects**: Tactile scale (1.02x), dynamic glare, and component repulsion.

### ⚡ Core Functionality
- **Dynamic vCard**: Generates standard VCF v3.0 files on the fly.
- **Theme Toggle**: Robust, high-contrast switcher (White/Blue in Light, Black/Blue in Dark).
- **Lazy Loading**: Optimized QR Code component for zero layout shift.
- **Configuration**: Centralized site config for easy profile updates.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **3D Engine**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4-style CSS variables)
- **Themes**: [`next-themes`](https://github.com/pacocoursey/next-themes) (System preference support)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Spring physics)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚡ Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iubaidrehman/holo-card.git
   cd holo-card
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit**: [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

The entire user profile is managed via a single configuration file. No need to touch React components to update details.

**File:** `src/config/site.ts`

```typescript
export const siteConfig = {
  name: 'Ubaid Rehman',
  title: 'Senior Full Stack Engineer',
  email: 'ubaid@example.com',
  url: 'https://iubaidrehman.com', // Override with ENV if needed
  links: {
    github: 'https://github.com/iubaidrehman',
    linkedin: 'https://linkedin.com/in/iubaidrehman',
    twitter: 'https://twitter.com/iubaidrehman',
  },
};
```

## 🏗️ Project Structure

```bash
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout with ThemeProvider & Cursor
│   └── page.tsx      # Main Card Page
├── components/
│   ├── holo-card/    # 3D Card Architecture
│   │   ├── root.tsx  # Context Layer
│   │   ├── card.tsx  # Physics Layer (Tilt/Flip)
│   │   └── face.tsx  # Visual Layer
│   ├── cursor.tsx    # Custom Physics Cursor
│   ├── particle-wave.tsx # WebGL 3D Diamond Field
│   └── theme-toggle.tsx
├── config/           # Site Configuration
│   └── site.ts
└── lib/              # Utilities
    └── vcard.ts      # VCF Generation Logic
```

## 📄 License

This project is open source and available for personal use.

---

**Author**: [Ubaid Rehman](https://iubaidrehman.com)
