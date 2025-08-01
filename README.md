# Portfolio Website

A fully customizable modern portfolio website built with React, TypeScript, and Express.js.

## ✨ Features

- **Fully Configurable**: All content managed from a single configuration file
- **Modern Design**: Dark theme with blue accents and smooth animations
- **Music Player**: Advanced player with playlist support
- **Click Effects**: Beautiful blue sparkle effects on clicks
- **Responsive**: Works perfectly on all devices
- **Smooth Scrolling**: Ultra-smooth scroll experience
- **SEO Ready**: Optimized for search engines

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Customize your content**
   Edit `client/src/config/constants.ts` to personalize your portfolio

## 📝 Customization

All website content can be customized by editing the `PORTFOLIO_CONFIG` object in:
```
client/src/config/constants.ts
```

### What you can customize:
- Personal information (name, title, bio, images)
- Social media links
- Skills and skill levels
- Projects with descriptions and links
- Music player playlist
- Logo colors and animations
- Footer text
- And much more!

## 🌐 Deployment

### Option 1: Automated Build (Recommended)
```bash
npm run build:deploy
```

This creates deployment files for multiple platforms.

### Option 2: Static Hosting (Netlify, Vercel, etc.)
1. Run `npm run build`
2. Upload the `dist/public` folder
3. Configure SPA routing (handled automatically with our config files)

### Option 3: Node.js Hosting (Railway, Render, etc.)
1. Upload the entire project
2. Set build command: `npm run build`
3. Set start command: `npm start`

### Platform-Specific Instructions

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
- Drag `dist/public` folder to Netlify dashboard
- Or connect your Git repository

**Railway:**
- Connect your Git repository
- Railway will auto-deploy with our configuration

**Render:**
- Connect repository
- Build command: `npm run build`
- Start command: `npm start`

## 🛠 Development

### Project Structure
```
├── client/           # Frontend React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── config/       # Configuration file
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities
├── server/           # Backend Express server
├── shared/           # Shared types and schemas
└── dist/             # Built files
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:deploy` - Build with deployment configs
- `npm start` - Start production server

### Key Files to Customize
1. **`client/src/config/constants.ts`** - Main configuration
2. **`client/src/index.css`** - Global styles
3. **`client/src/components/`** - Component customization

## 🎨 Customization Examples

### Change Personal Info
```typescript
personal: {
  fullName: "Your Name",
  displayTitle: "Your Title",
  profileImage: "your-image-url.jpg",
  // ... more options
}
```

### Add Music Tracks
```typescript
musicPlayer: {
  enabled: true,
  playlist: [
    {
      url: "your-music-url.mp3",
      title: "Song Name"
    }
  ]
}
```

### Update Projects
```typescript
projects: [
  {
    title: "Your Project",
    description: "Project description",
    technologies: ["React", "TypeScript"],
    projectUrl: "https://github.com/username/project"
  }
]
```

## 🔧 Performance Features

- **Smooth Scrolling**: Native smooth scroll with momentum
- **Optimized Animations**: Framer Motion with performance optimizations
- **Lazy Loading**: Components load as needed
- **Responsive Images**: Optimized for all screen sizes
- **Code Splitting**: Automatic bundle optimization

## 📱 Mobile Optimization

- Touch-friendly interface
- Smooth scroll with momentum on iOS
- Responsive breakpoints
- Optimized touch interactions

## 🐛 Troubleshooting

**Build Issues:**
- Make sure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

**Deployment Issues:**
- Check that all URLs in config are accessible
- Ensure environment variables are set correctly
- Verify build command completes without errors

**Performance Issues:**
- Images should be optimized and properly sized
- Music files should be compressed
- Use CDN URLs when possible

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the configuration examples
3. Ensure all URLs in config are working

---

Made with ❤️ using React, TypeScript, and Express.js