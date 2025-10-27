# Thomistic Institute Website

A modern, responsive website for the Thomistic Institute at Regent University, optimized for GitHub Pages hosting.

🌐 **Live Demo**: [View Live Site](https://yourusername.github.io/Thomistic-institute)

## ✨ Features

- 📱 **Fully Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Professional Styling** - Regent University colors and branding
- 📊 **Dynamic Content** - JSON-based data management
- 📅 **Smart Event Management** - Automatic sorting of upcoming/past events
- 👥 **Executive Board Display** - Showcase leadership with photos and bios
- 🏆 **Awards Section** - Display achievements and recognition
- 📰 **Newsletter Integration** - Archive and Google Forms signup
- 🚀 **GitHub Pages Ready** - Zero configuration deployment

## 🚀 Quick Start - Deploy in 2 Minutes!

### Option 1: Use This Template (Easiest)

1. Click "Use this template" button → "Create a new repository"
2. Name it `Thomistic-institute` (or any name you prefer)
3. Go to Settings → Pages
4. Source: Deploy from a branch
5. Branch: `main` / Folder: `/ (root)`
6. Click Save

✅ Your site will be live at `https://[your-username].github.io/[repository-name]` in ~5 minutes!

### Option 2: Fork and Deploy

1. Fork this repository
2. Go to Settings → Pages
3. Enable GitHub Pages (select main branch)
4. Done! Your site is live

### Option 3: Clone and Customize

```bash
git clone https://github.com/yourusername/Thomistic-institute.git
cd Thomistic-institute

# Edit content (see customization guide below)

git add .
git commit -m "Initial customization"
git push origin main
```

## 📝 Content Management

All content is managed through simple JSON files - no coding required!

### Directory Structure
```
data/
├── board.json        # Executive board members
├── awards.json       # Awards and recognition  
├── events.json       # All events (auto-sorted by date!)
└── newsletters.json  # Newsletter archive
```

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

### Adding Events

Edit `data/events.json`:
```json
{
    "title": "Philosophy Symposium",
    "date": "December 15, 2024",
    "time": "6:00 PM",
    "location": "Robertson Hall",
    "description": "An evening of philosophical discourse.",
    "speaker": "Dr. Robert Williams"
}
```

**✨ Magic Feature**: Events automatically move from "Upcoming" to "Past" based on the current date!

### Adding Awards

Edit `data/awards.json`:
```json
{
    "title": "Excellence in Academic Programming",
    "year": "2024",
    "description": "Recognized for outstanding contribution to student development."
}
```

### Adding Newsletters

Edit `data/newsletters.json`:
```json
{
    "title": "Fall Semester Highlights",
    "date": "October 2024",
    "preview": "Read about our recent events and upcoming opportunities.",
    "link": "newsletters/fall-2024.pdf"
}
```

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

### 2. Create Google Form for Newsletter

1. Go to [Google Forms](https://forms.google.com)
2. Create form with Name and Email fields
3. Click Send → Link icon → Copy
4. Paste link in `js/main.js`

### 3. Customize Colors

Edit `css/styles.css`:
```css
:root {
    --primary-color: #003366;    /* Navy */
    --secondary-color: #8B0000;   /* Dark red */
    --accent-color: #FFD700;      /* Gold */
}
```

### 4. Add Images

- Board photos: Add to `images/board/` 
- Recommended: 400x400px JPG/PNG
- Update paths in `data/board.json`

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

**Pro tip**: The site includes fallback data, so you can even double-click `index.html` to preview!

## 📤 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update events and board members"
git push
```

Changes appear live in 2-5 minutes!

## 🌐 Custom Domain Setup

1. Create `CNAME` file with your domain
2. In Settings → Pages → Custom domain
3. Add your domain
4. Configure DNS:
   ```
   A Records: 185.199.108.153
             185.199.109.153
             185.199.110.153
             185.199.111.153
   ```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Site not appearing | Wait 10 minutes, check Settings → Pages for URL |
| 404 Error | Ensure Pages is enabled, repository is public |
| Images broken | Check file paths, case-sensitive names |
| Events not sorting | Use format "Month DD, YYYY" |

## 📁 Complete File Structure

```
Thomistic-institute/
├── 📄 index.html              # Main page
├── 🎨 css/
│   └── styles.css            # All styles
├── ⚙️ js/
│   └── main.js              # JavaScript (with fallback data)
├── 📊 data/                  # JSON content files
│   ├── board.json
│   ├── awards.json  
│   ├── events.json
│   └── newsletters.json
├── 🖼️ images/
│   ├── board/               # Member photos
│   └── default-avatar.png
├── 📰 newsletters/           # PDF files
├── ⚡ .github/
│   └── workflows/
│       └── deploy.yml       # Auto-deployment
├── 🚫 .nojekyll             # Disable Jekyll
└── ⚙️ _config.yml           # GitHub Pages config
```

## 💡 Pro Tips

1. **Automatic Event Management**: Just add all events to `events.json` - they automatically sort!
2. **Fallback Data**: Site works even without a server - great for local testing
3. **Mobile First**: Fully responsive design looks great on all devices
4. **Fast Updates**: Push changes and see them live in minutes

## 📝 License

© 2024 Thomistic Institute, Regent University. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- Check [Issues](https://github.com/yourusername/Thomistic-institute/issues)
- Review this README
- Contact maintainers

---

Built with ❤️ for the Thomistic Institute at Regent University
