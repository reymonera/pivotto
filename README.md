# Paper Romance 💕📚

**Learn academic papers through a dating sim experience**

An open-source web app that transforms academic papers (PDFs) into interactive visual novel/dating sim experiences, where an anime character guides you through the content while you build a connection with them.

## ✨ Features

- 📄 **Upload any PDF** - Text is extracted locally in your browser
- 💕 **5 unique characters** - Each with different personality and context
- ❓ **Comprehension questions** - Your answers affect the story ending
- 🎭 **3 possible endings** - Good, neutral, or bad based on your score
- 🌐 **Bilingual** - English and Spanish support
- 🔒 **Privacy first** - Your PDF never leaves your browser
- 🆓 **Free** - Use Gemini free tier or cheap DeepSeek API

## 📁 Project Structure

```
paper-romance/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── state.js            # Global state management
│   ├── config.js           # Configuration & translations
│   ├── characters.js       # Character definitions
│   ├── api.js              # API service (Gemini/DeepSeek)
│   ├── pdf.js              # PDF processing
│   ├── game.js             # Game engine
│   └── ui.js               # UI management
├── assets/
│   ├── characters/         # Character sprites
│   │   ├── badboy/
│   │   │   ├── avatar.png  # Selection screen (80x80)
│   │   │   ├── normal.png  # Expression sprites
│   │   │   ├── happy.png
│   │   │   ├── angry.png
│   │   │   ├── blush.png
│   │   │   ├── surprised.png
│   │   │   └── thinking.png
│   │   ├── president/
│   │   ├── shy/
│   │   ├── tutor/
│   │   └── rival/
│   ├── backgrounds/        # Scene backgrounds
│   │   ├── library.png
│   │   ├── classroom.png
│   │   └── council.png
│   └── ui/                 # UI elements
└── README.md
```

## 🎨 Adding Custom Character Sprites

The app uses **emoji fallbacks** by default. To add real character art:

### 1. Prepare your images

For each character, you need:
- **avatar.png** - 80x80px, circular crop works best
- **normal.png** - Full body or bust, transparent background
- **happy.png** - Happy expression
- **angry.png** - Angry/annoyed expression
- **blush.png** - Embarrassed/blushing
- **surprised.png** - Surprised expression
- **thinking.png** - Thoughtful expression

**Recommended sprite size:** 400-600px height, transparent PNG

### 2. Place files in the correct folder

```
assets/characters/{character_id}/
```

Character IDs are: `badboy`, `president`, `shy`, `tutor`, `rival`

### 3. The app automatically detects images

If an image file exists, it uses it. If not, it falls back to emoji.

### Free Asset Sources

- [itch.io Visual Novel Assets](https://itch.io/game-assets/tag-visual-novel)
- [OpenGameArt.org](https://opengameart.org/)
- [Kenney.nl](https://kenney.nl/assets)

**Note:** Always check licenses before using assets!

## 🚀 Quick Start

### Option 1: Run locally
```bash
# Clone the repo
git clone https://github.com/your-username/paper-romance.git
cd paper-romance

# Serve with any static server
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`

### Option 2: Deploy to GitHub Pages
1. Fork this repo
2. Go to Settings > Pages
3. Select "main" branch
4. Your app will be at `https://yourusername.github.io/paper-romance`

## ⚙️ Configuration

### Changing Default Language

Edit `js/config.js`:
```javascript
const CONFIG = {
    defaultLanguage: 'en', // Change to 'es' for Spanish
    // ...
};
```

### Adding a New Language

1. Add translations to `TRANSLATIONS` object in `js/config.js`
2. Add language option to the select in `index.html`

### Adding a New Character

Edit `js/characters.js` and add a new object to the `CHARACTERS` array:

```javascript
{
    id: 'newchar',
    name: 'Character Name',
    type: {
        en: 'The Type',
        es: 'El Tipo'
    },
    color: '#hexcolor',
    desc: {
        en: 'English description',
        es: 'Spanish description'
    },
    fallbackEmoji: '😊',
    images: {
        normal: 'assets/characters/newchar/normal.png',
        // ... other expressions
    },
    avatar: 'assets/characters/newchar/avatar.png',
    personality: {
        en: `English personality prompt...`,
        es: `Spanish personality prompt...`
    },
    context: {
        en: `English story context...`,
        es: `Spanish story context...`
    }
}
```

## 🔐 Privacy

- ✅ PDF processed **locally** with PDF.js
- ✅ Only extracted text sent to AI API
- ✅ No data stored on servers
- ✅ API key stored only in your localStorage (optional)
- ⚠️ Paper text IS sent to Google/DeepSeek to generate the story

## 📄 License

MIT License - Use, modify, and distribute freely.

## 🤝 Contributing

Contributions welcome! Ideas for improvement:
- [ ] More character routes/stories
- [ ] Voice synthesis for dialogue
- [ ] More languages
- [ ] Offline mode with Ollama
- [ ] Figure/chart extraction and explanation
- [ ] Save/load game progress
- [ ] Custom background support

---

Made with 💕 to make learning more fun.
