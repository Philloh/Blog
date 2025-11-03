# CyberPulse KE - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
Blog/
├── app/                      # Next.js app directory
│   ├── components/          # Reusable components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── BlogCard.tsx     # Blog post card
│   │   └── CTFChallengeCard.tsx  # CTF challenge card
│   ├── ctf/                 # CTF section
│   │   ├── components/      # CTF-specific components
│   │   │   └── CTFChallenge.tsx  # Interactive challenge viewer
│   │   ├── [id]/           # Dynamic challenge pages
│   │   │   └── page.tsx
│   │   └── page.tsx         # CTF listing page
│   ├── blog/                # Blog section
│   │   ├── [id]/           # Dynamic blog pages
│   │   │   └── page.tsx
│   │   └── page.tsx         # Blog listing page
│   ├── about/               # About page
│   │   └── page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   └── not-found.tsx        # 404 page
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind CSS config
├── next.config.js           # Next.js config
└── README.md               # Project documentation
```

## 🎨 Key Features Implemented

### ✅ Homepage
- Animated hero section with gradient text
- Statistics dashboard
- Featured CTF challenges
- Recent blog posts
- Call-to-action sections

### ✅ CTF Challenges Page
- Challenge listing with filtering
- Search functionality
- Category and difficulty filters
- Interactive challenge viewer with:
  - Description tab
  - Files tab with download
  - Virtual terminal
  - Hints with progressive reveal
  - Flag submission system
  - Challenge statistics

### ✅ Blog System
- Article listing with search
- Category filters
- Individual blog post pages
- Reading time and date display

### ✅ About Page
- Mission statement
- Core values
- Journey timeline
- Community statistics
- Join CTA

### ✅ Design Features
- Dark cyberpunk theme with neon accents
- Smooth animations with Framer Motion
- Fully responsive design
- Custom scrollbar
- Interactive hover effects
- Loading animations

## 🎨 Color Scheme

- **Background Dark**: `#0a0a0f`
- **Background Darker**: `#050508`
- **Dark Gray**: `#1a1a2e`
- **Cyber Green**: `#00ff88`
- **Cyber Blue**: `#00d4ff`
- **Cyber Purple**: `#6c5ce7`
- **Neon Pink**: `#ff006e`
- **Yellow**: `#ffd700`

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🛠️ Customization Guide

### Adding Content

#### Add Blog Posts
Edit `app/blog/page.tsx` and add to the `blogPosts` array.

#### Add CTF Challenges
Edit `app/ctf/page.tsx` and add to the `challenges` array.

#### Modify Colors
Edit `tailwind.config.ts` under the `cyber` theme extension.

### Deploying

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Docker
```bash
docker build -t kenyan-ctf .
docker run -p 3000:3000 kenyan-ctf
```

## 📞 Next Steps

1. **Customize Content**: Replace sample content with your own
2. **Add Authentication**: Implement user login/signup
3. **Add Database**: Connect to MongoDB or PostgreSQL
4. **Add CMS**: Integrate Contentful or Sanity
5. **Add Analytics**: Integrate Google Analytics
6. **SEO**: Add Open Graph tags and sitemap

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
npm run dev -- -p 3001
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
npm run build
npm run lint
```

## 📚 Documentation

For more information, see:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Happy Hacking! 🚀**

