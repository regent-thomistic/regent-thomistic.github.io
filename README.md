# Thomistic Institute Website - Multi-Page Version

A modern, responsive multi-page website for the Thomistic Institute at Regent University, optimized for GitHub Pages hosting.

🌐 **Live Demo**: [View Live Site](https://regent-thomistic.github.io)

## ✨ New Features in Multi-Page Version

### Multi-Page Navigation
- **Separate Pages**: Home, About, Events, and Newsletter each have their own HTML file
- **Direct URL Access**: Navigate directly to `/home.html`, `/about.html`, `/events.html`, or `/newsletter.html`
- **Logo in Navigation**: Thomistic Institute logo displayed prominently in navbar

### Enhanced Events
- **📸 Event Photos**: Optional background images for event cards (place images in `images/photos/`)
- **🗺️ Interactive Maps**: Click location to open Google Maps in new window
- **📅 Calendar Integration**: 
  - Add events to Google Calendar with one click
  - Download .ics files for Apple Calendar/Outlook
  - Automatic 2-hour event duration

## 🚀 Quick Start - Deploy in 2 Minutes!

### Option 1: Use This Template (Easiest)

1. Click "Use this template" button → "Create a new repository"
2. Name it `Thomistic-institute` (or any name you prefer)
3. Go to Settings → Pages
4. Source: Deploy from a branch
5. Branch: `main` / Folder: `/ (root)`
6. Click Save

✅ Your site will be live at `https://[your-username].github.io/[repository-name]` in ~5 minutes!

## 📁 File Structure

```
Thomistic-institute/
├── 📄 index.html              # Redirects to home.html
├── 📄 home.html               # Home page
├── 📄 about.html              # About page (board & awards)
├── 📄 events.html             # Events page
├── 📄 newsletter.html         # Newsletter page
├── 🎨 css/
│   └── styles.css            # All styles (includes logo support)
├── ⚙️ js/
│   ├── main.js               # Core functionality
│   └── events.js             # Enhanced events features
├── 📊 data/                  # JSON content files
│   ├── board.json
│   ├── awards.json  
│   ├── events.json          # Now with optional image support
│   └── newsletters.json
├── 🖼️ images/
│   ├── ti-logo.png           # Main logo (used in navbar)
│   ├── board/                # Member photos
│   ├── photos/               # Event background images
│   └── default-avatar.png
├── 📰 newsletters/           # PDF files
└── 🚫 404.html              # Custom error page
```

## 📝 Content Management

### Adding Events with Photos

Edit `data/events.json`:
```json
{
    "title": "Philosophy Symposium",
    "date": "December 15, 2024",
    "time": "6:00 PM",
    "location": "Robertson Hall",
    "description": "An evening of philosophical discourse.",
    "speaker": "Dr. Robert Williams",
    "image": "symposium.jpg"     // Optional - omit for no background
}
```

**Photo Guidelines:**
- Place images in `images/photos/` directory
- Recommended size: 800x400px or similar 2:1 ratio
- Formats: JPG, PNG
- Images will be used as card background with overlay

### Adding Executive Board Members

Edit `data/board.json`:
```json
{
    "name": "Sarah Thompson",
    "position": "President",
    "bio": "Senior Philosophy major passionate about intellectual discourse.",
    "image": "images/board/sarah.jpg"
}
```

### Logo Configuration

- Logo file: `images/ti-logo.png`
- The logo is taller than wide and sized to 60px height (50px on mobile)
- Logo appears next to "Thomistic Institute" text in navigation bar
- To replace: Simply replace `images/ti-logo.png` with your own image

## 🎨 Customization

### 1. Update Contact Info & Newsletter Form

Edit `js/main.js`:
```javascript
const CONFIG = {
    newsletterFormUrl: 'YOUR_GOOGLE_FORM_LINK_HERE',
    contactEmail: 'info@Thomistic.regent.edu',
    contactPhone: '(757) 352-4000'
};
```

### 2. Customize Colors

Edit `css/styles.css`:
```css
:root {
    --primary-color: #003366;    /* Navy */
    --secondary-color: #8B0000;   /* Dark red */
    --accent-color: #FFD700;      /* Gold */
}
```

## 🗺️ Location Settings

The maps feature automatically appends "Regent University, Virginia Beach, VA" to location searches. To change this:

Edit `js/events.js`, find the `showMap` function:
```javascript
const encodedLocation = encodeURIComponent(
    location + ', Your University, Your City, Your State'
);
```

## 📅 Calendar Event Duration

By default, calendar events are set to 2 hours. To change:

Edit `js/events.js`, find both `addToGoogleCalendar` and `addToAppleCalendar` functions:
```javascript
endDate.setHours(endDate.getHours() + 2); // Change 2 to desired hours
```

## 🛠️ Local Development

### Test Locally Before Pushing

```bash
# Python
python -m http.server 8000

# Node.js  
npx http-server

# PHP
php -S localhost:8000
```

Visit `http://localhost:8000`

## 📤 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update content"
git push
```

Changes appear live in 2-5 minutes!

## 🌐 URL Structure

After deployment, your pages will be accessible at:
- `https://yourdomain.com/` or `/index.html` → Redirects to home
- `https://yourdomain.com/home.html` → Home page
- `https://yourdomain.com/about.html` → About page
- `https://yourdomain.com/events.html` → Events page
- `https://yourdomain.com/newsletter.html` → Newsletter page

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Logo not showing | Check that `images/ti-logo.png` exists and path is correct |
| Events not sorting | Use format "Month DD, YYYY" for dates |
| Map not opening | Check browser popup blocker settings |
| Calendar not downloading | Check browser download settings |
| Images not loading | Verify images are in correct directories and paths match JSON |

## 💡 Pro Tips

1. **Event Photos**: Use consistent aspect ratios (2:1 recommended) for best appearance
2. **Calendar Integration**: Test calendar links to ensure they work with your event data
3. **Mobile Menu**: Logo scales down to 50px on mobile for better fit
4. **Maps**: Location searches work best with specific building names
5. **Multi-Page Benefits**: Better SEO, easier navigation, shareable URLs

## 📝 Migration from Single Page

If you're updating from the old single-page version:

1. Replace your entire site with these new files
2. Update any external links to point to specific pages (e.g., `/about.html` instead of `/#about`)
3. Test all navigation links
4. Add logo image to `images/ti-logo.png`
5. Optionally add event photos to `images/photos/`

## 📞 Support

- Check [Issues](https://github.com/yourusername/Thomistic-institute/issues)
- Review this README
- Contact maintainers

---

Built with ❤️ for the Thomistic Institute at Regent University
