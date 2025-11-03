# CyberPulse KE — Premier Cybersecurity Blog & CTF Platform

A modern, interactive cybersecurity blog and CTF platform built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Designed for Kenya’s cyber community with a neon-lit, high‑impact UI and interactive challenges.

## 🌟 Features

- **Stunning Dark Theme**: Cyberpunk-inspired design with neon accents
- **Interactive CTF Challenges**: Real-world challenges based on Kenyan infrastructure
- **Blog System**: Latest cybersecurity news and tutorials
- **Responsive Design**: Mobile-first approach for all devices
- **Smooth Animations**: Powered by Framer Motion
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Highlighting**: Rehype Highlight

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Features Overview

### Homepage
- Hero section with animated background
- Stats dashboard
- Featured CTF challenges
- Recent blog posts
- Call-to-action sections

### CTF Challenges
- Interactive challenge viewer with tabs (Description, Files, Terminal, Hints)
- Virtual terminal for command interaction
- Flag submission system
- Challenge statistics and tags
- Difficulty-based filtering

### Blog System
- Article listing with search and filters
- Individual blog post pages
- Category-based organization
- Reading time and date display

### About Page
- Mission statement
- Core values
- Journey timeline
- Community statistics

## 🎯 Key Pages

- `/` - Homepage with hero and features
- `/ctf` - CTF challenges listing
- `/ctf/[id]` - Individual challenge view
- `/blog` - Blog posts listing
- `/blog/[id]` - Individual blog post
- `/about` - About page

## 🎨 Color Scheme

- **Dark Background**: `#0a0a0f`
- **Cyber Green**: `#00ff88`
- **Cyber Blue**: `#00d4ff`
- **Cyber Purple**: `#6c5ce7`
- **Neon**: `#ff006e`

## 🛠️ Customization

### Adding Blog Posts
Create new entries in the blog posts array with the following structure:
```typescript
{
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
}
```

### Adding CTF Challenges
Create new challenges with:
```typescript
{
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  category: string
  points: number
  solved: number
  description: string
  hints: string[]
  files: { name: string; size: string }[]
}
```

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Fast loading times

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with 💚 for the Kenyan cybersecurity community

