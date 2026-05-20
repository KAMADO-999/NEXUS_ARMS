# ⚔️ NEXUS ARMS

> *Where Firepower Meets Finesse.*

A dark, immersive **weapons showcase & e-commerce storefront** built with Next.js 14, TypeScript, and Tailwind CSS. Featuring cinematic scroll animations, a custom cursor, live cart system, and a full weapon catalog — NEXUS ARMS delivers a premium tactical shopping experience.

---

## 🖥️ Live Preview

🔗 **[nexus-arms.vercel.app](https://nexus-arms.vercel.app/)**

---

## ✨ Features

- 🔫 **Weapon Scroll Showcase** — Cinematic horizontal scroll with weapon reveals
- 🛒 **Cart Sidebar** — Add/remove weapons with live cart state (Zustand)
- 🎯 **Custom Cursor** — Sleek tactical cursor that reacts to hover
- 💀 **Lore Section** — Dark narrative storytelling for each weapon
- 📊 **Stats Section** — Animated counters for damage, range, fire rate
- 🔤 **Split Text Animations** — Letter-by-letter text reveal on scroll
- 🌑 **Cinematic Hero** — Frame-by-frame animated hero background
- 🛍️ **Shop Section** — Full weapon grid with pricing and add-to-cart
- 🦶 **Footer** — Clean, dark-themed footer

---

## 🗂️ Project Structure

```
NEXUS_ARMS/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── WeaponScroll.tsx
│   │   ├── ShopSection.tsx
│   │   ├── CartSidebar.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── LoreSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── RevealBlock.tsx
│   │   ├── SplitText.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useCountUp.ts     # Animated number counter hook
│   └── store/
│       └── cartStore.ts      # Zustand cart state
├── public/
│   ├── frames/               # Hero animation frames (100 frames)
│   ├── weapons/              # Weapon images
│   └── gun-hero.jpeg
├── extra/                    # Extra weapon assets
└── ...config files
```

---

## 🔫 Weapons in the Catalog

| Weapon | Type |
|--------|------|
| **VENOM-X** | Assault |
| **WRAITH-9** | Stealth Pistol |
| **DUSKBRINGER** | Sniper |
| **HELLGATE MK2** | Shotgun |
| **NX-7 PHANTOM** | SMG |
| **ZERO-K** | Energy Rifle |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/KAMADO-999/NEXUS_ARMS.git

# Move into the project
cd NEXUS_ARMS

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **Next.js 14** | React Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Zustand** | Cart State Management |
| **PostCSS** | CSS Processing |

---

## 📦 Deploy on Vercel

The fastest way to deploy NEXUS ARMS:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KAMADO-999/NEXUS_ARMS)

---

## 👤 Author

**KAMADO-999**
- GitHub: [@KAMADO-999](https://github.com/KAMADO-999)

---

## 📄 License

This project is for portfolio/personal use. All weapon names and designs are fictional.

---

<div align="center">

**⚔️ NEXUS ARMS — Arm Yourself.**

</div>
