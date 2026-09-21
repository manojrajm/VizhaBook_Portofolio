# VizhaBook — விழா புக்

> **Digitizing Tradition with Enterprise Engineering.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.168-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.style=flat-square)](LICENSE)

VizhaBook is a modern, enterprise-grade SaaS product platform designed to digitize traditional South Indian **Moi (மொய்) gift accounting** and event management for weddings, celebrations, and cultural gatherings. 

Built with a cinematic, 3D interactive user experience, VizhaBook bridges age-old cultural traditions with modern cloud infrastructure, real-time analytics, and instant UPI payments.

---

## ✨ Key Features

- 🏮 **Cinematic 3D Experience**: Interactive Three.js canvas featuring traditional cultural elements combined with modern SaaS product design.
- 📖 **Digital Moi Accounting**: Multi-device real-time ledger replacing traditional handwritten Moi notebooks.
- 💳 **Instant UPI & Receipts**: Integrated QR-based UPI payments with instant bilingual receipts in Tamil and English.
- ⚡ **QR Guest Check-in**: Fast entry scanner and host verification system for large-scale wedding receptions.
- 📈 **Live Event Analytics**: Real-time dashboards, guest attendance graphs, and financial summary tracking.
- 🛡️ **Enterprise SaaS Architecture**: Multi-tenant cloud infrastructure built for high concurrency and data integrity.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [TanStack Start](https://tanstack.com/start), [TanStack Router](https://tanstack.com/router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/) |
| **3D & Animation** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Build System** | [Vite 8](https://vitejs.dev/) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.0** or later installed on your system.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/manojrajm/VizhaBook_Portofolio.git
   cd VizhaBook_Portofolio
   ```

2. **Install dependencies:**
   ```sh
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   Open `http://localhost:3000` (or the URL shown in your terminal) to view the app in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Runs the Vite dev server with hot module replacement |
| `build` | `npm run build` | Builds the client & SSR production bundles |
| `preview` | `npm run preview` | Previews the production build locally |
| `lint` | `npm run lint` | Runs ESLint across the codebase |

---

## 📁 Project Structure

```
VizhaBook_Portofolio/
├── public/                 # Static assets (favicons, robots.txt, icons)
├── src/
│   ├── components/         # Reusable UI & 3D scene components
│   │   ├── ui/             # Radix UI primitive design system
│   │   └── VizhaBookScene.tsx  # Three.js 3D interactive canvas
│   ├── routes/             # TanStack Router file-based routes
│   │   ├── __root.tsx      # Root layout & global context
│   │   └── index.tsx       # Landing page & interactive experience
│   ├── lib/                # Utility helpers & error handling
│   ├── server.ts           # SSR server entry point
│   ├── styles.css          # Tailwind CSS global styles
│   └── start.ts            # TanStack Start initialization
├── vite.config.ts          # Vite build & plugin configuration
└── package.json            # Dependencies & scripts
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
