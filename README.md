# Pivotto

**Learn academic papers through a dating sim experience**

An open-source web app that transforms academic papers (PDFs) into interactive visual novel/dating sim experiences, where an anime character guides you through the content while you build a connection with them.

## ✨ Features

- **Upload any PDF** - Text is extracted
- **5 unique characters** - Each with different personality and context
- **Comprehension questions** - Your answers affect the story ending
- **3 possible endings** - Good, neutral, or bad based on your score
- **Bilingual** - English and Spanish support

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



## 📄 License

MIT License - Use, modify, and distribute freely.

---

Made with love, RedBull and vibe-coding, btw, I'm not going to pretend I'm a super web developer. Most of the project has been written by Claude's Opus 4.5, and probably is stagnant at this stage, since AI tends to give you exactly what you ask for, which means that this doesn't scale up. That being said, I like the idea and I'm glad I could see something. If more people like it, I might see what this can become. For now, I'll concentrate on creating characters with Vocaloid references and try to comission some art for them. Please, wait.

## Name inspo

I've been developing this while listening to EZFG's Pipivovotto, that make's a reference to the pivoting move (I think so, these songs are always so esoteric). And I've been wanting something like sounds like `Piapro` since that's a completely respectable name in my mind.
