# Holo-Card: Professional Digital Business Card

> A high-performance, 3D interactive digital business card built with Next.js 14 and Framer Motion. Designed for Senior Engineers.

## 🚀 Features

- **60fps Physics**: Decoupled Tilt (Mouse) and Flip (Click) layers for conflict-free 3D interaction.
- **Architectural Design System**: 
    - **OKLCH Color Palette**: Calibrated "Blueprint" (Light) and "Gunmetal" (Dark) themes.
    - **Premium Visuals**: Comparison Grid background, noise texture overlay, and double-border glassmorphism.
- **Dynamic vCard**: Generates standard VCF v3.0 files on the fly.
- **Lazy Loading**: Optimized QR Code component for zero layout shift.
- **Configuration**: Centralized site config for easy profile updates.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4-style CSS variables)
- **Themes**: [`next-themes`](https://github.com/pacocoursey/next-themes) (System preference support)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Spring physics)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `new-vcard` logic (custom implementation)

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
  email: 'ubaidurrehman99913@gmail.com',
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
│   ├── layout.tsx    # Root layout with ThemeProvider
│   └── page.tsx      # Main Card Page
├── components/
│   ├── holo-card/    # 3D Card Architecture
│   │   ├── root.tsx  # Context Layer
│   │   ├── card.tsx  # Physics Layer (Tilt/Flip)
│   │   └── face.tsx  # Visual Layer
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
