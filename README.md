# ASCEND PERFORMANCE - Cinematic Landing Page

A premium, immersive landing page for a luxury fitness and performance club featuring cinematic scroll-driven animations, Three.js 3D effects, and GSAP ScrollTrigger.

## 🎬 Features

### Cinematic Experience
- **Scroll-driven storytelling** - Continuous camera-like motion through scenes
- **Three.js integration** - Floating particles, geometric shapes, and atmospheric effects
- **GSAP ScrollTrigger** - Smooth, buttery animations synced with scroll
- **Parallax depth system** - Multi-layer depth illusion for immersive experience
- **Atmospheric effects** - Smoke, fog, particles, and dynamic lighting

### Sections
1. **Hero** - Dramatic entrance with smoke effects and floating particles
2. **Mindset** - 5 chapters on athletic philosophy (Discipline, Consistency, Strength, Focus, Recovery)
3. **Training Experience** - 5 immersive training category showcases
4. **Performance Tunnel** - Futuristic perspective-transform sequence
5. **Performance Core** - Interactive Three.js 3D scene
6. **Final CTA** - Emotional cinematic ending

### Visual Design
- Dark luxury aesthetic (matte black, metallic silver, red accents)
- High-contrast cinematic lighting
- Editorial typography with Bebas Neue
- Glass UI overlays
- Industrial textures

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in your web browser. No build process required!

### Option 2: Local Server (Recommended)
For best performance, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
ascend-fitness/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS with animations
├── script.js           # Three.js + GSAP animation logic
└── README.md           # This file
```

## 🎨 Tech Stack

- **HTML5** - Semantic markup
- **TailwindCSS** - Utility-first CSS (via CDN)
- **Custom CSS** - Smoke effects, particles, animations
- **Three.js** - 3D graphics and particle systems
- **GSAP** - Professional animation library
- **ScrollTrigger** - Scroll-based animations
- **JavaScript (ES6+)** - Modern vanilla JS

## 🎯 Key Features Explained

### 1. Three.js Background System
- 2000+ floating particles
- Rotating geometric shapes (icosahedron, torus, octahedron)
- Mouse-reactive camera movement
- Scroll-based camera transitions
- GPU-optimized rendering

### 2. ScrollTrigger Animations
- Hero parallax zoom on scroll
- Mindset sections with staggered reveals
- Training cards with progressive display
- Performance tunnel with depth simulation
- All animations use smooth easing

### 3. Performance Core Scene
- Dedicated Three.js scene
- Pulsing core geometry
- Particle ring system
- Scroll-triggered scale and camera movement

### 4. Atmospheric Effects
- CSS-based smoke layers
- Floating particle system
- Light sweep animations
- Cinematic grain overlay
- Red accent lighting

## ⚡ Performance Optimizations

- **Throttled scroll events** - Smooth 60fps scrolling
- **GPU acceleration** - Hardware-accelerated transforms
- **Optimized particle counts** - Balanced visual quality/performance
- **Reduced motion support** - Respects user preferences
- **Tab visibility detection** - Pauses animations when inactive
- **Responsive design** - Mobile-optimized

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
/* Main accent color */
color: 0x00ff00; /* Change this in script.js for Three.js */
```

### Animation Timing
Adjust in `script.js`:
```javascript
// Change scroll duration
scrub: 1  // Higher = smoother but slower
```

### Particle Count
Modify in `script.js`:
```javascript
const particlesCount = 2000; // Reduce for better performance
```

### Typography
Fonts are loaded from Google Fonts:
- **Bebas Neue** - Headlines (bold, cinematic)
- **Inter** - Body text (clean, readable)

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 (not supported - uses modern JS)

## 🎬 Animation Flow

1. **Hero loads** → Dramatic text reveal, smoke activates
2. **User scrolls** → Camera zooms out, transitions to Mindset
3. **Mindset sections** → Each chapter reveals with parallax
4. **Training cards** → Immersive fullscreen showcases
5. **Performance tunnel** → Perspective-transform journey
6. **Performance core** → 3D scene activates, geometry pulses
7. **Final CTA** → Emotional fade to join button

## 🚀 Production Deployment

### Vercel/Netlify
Simply drag and drop the folder or connect your Git repo.

### GitHub Pages
1. Create a new repository
2. Push the files
3. Enable GitHub Pages in settings
4. Select main branch

### Traditional Hosting
Upload all files to your web server. No build process needed!

## 🔧 Troubleshooting

### Canvas not rendering
- Check browser console for errors
- Ensure WebGL is supported
- Try clearing browser cache

### Animations not smooth
- Close other tabs
- Check hardware acceleration is enabled
- Reduce particle count in script.js

### Mobile issues
- Ensure viewport meta tag is present
- Test on actual device (not just browser DevTools)

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify all CDN links are loading
- Test in different browsers

## 🎓 Learning Resources

- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Three.js Documentation](https://threejs.org/docs/)
- [TailwindCSS](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with cinematic excellence. Built for performance.**

ASCEND PERFORMANCE © 2024
