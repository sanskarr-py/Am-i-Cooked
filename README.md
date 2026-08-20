# Am I Cooked? 🔥

> **"Know your exam situation before your exam knows you."**  
> A playful, brutally honest, but genuinely useful exam-readiness calculator for students.

---

## ⚡ Overview

**Am I Cooked?** calculates your exact academic survival odds (0–100% Cooked Score) based on:
1. **Exam Date** (days remaining countdown)
2. **Syllabus Size** (Small, Medium, Large, Massive)
3. **Study Progress** (brutally honest % completed)
4. **Foundation Knowledge** (Do you know the basics?)
5. **Real-world Available Study Time** (sustainable hours per day)

Designed with a minimal dark-first aesthetic inspired by Linear, Vercel, and Raycast.

---

## 🎯 Key Features

- 🎛️ **Focused Multi-Step Flow**: Silky smooth 5-step guided calculator with persistent state, progress tracking, and validation.
- 🔥 **Circular Cooked Meter (0–100%)**: Smoothly animating SVG gauge with color-coded tier states:
  - `0–20%`: *You're chilling* 😎
  - `21–40%`: *Lightly toasted* 🍞
  - `41–60%`: *Getting warm* 🔥
  - `61–80%`: *You're cooked* 🫠
  - `81–95%`: *Deep fried* 💀
  - `96–100%`: *Academic emergency* 🚨
- 📊 **"Why?" Factor Breakdown**: Visual progress bars showing how time remaining, syllabus size, progress, and foundation impact your risk level.
- 📋 **Personalized Survival Action Plan**: Calibrated recommendations for topic prioritization, daily time-blocking, and revision buffers.
- 🔗 **Instant 1-Click Sharing**: Copy formatted status or trigger native Web Share for Discord, WhatsApp, and X.
- 💀 **"I'm Procrastinating" Micro-interaction**: Quick reality-check toast alert.
- 🔊 **Synthetic Web Audio FX**: Crisp tactile clicks and suspense audio cues using pure Web Audio API synthesis (with sound toggle).
- 🎨 **Minimal Obsidian & Ember Aesthetic**: Glassmorphism cards, restrained warm fire glow, Geist Mono / Inter typography.

---

## 🚀 Running Locally

No npm dependencies or build steps required. Simply open `index.html` in any browser or launch a local server:

```bash
# Using Python
python -m http.server 3000

# Or using npx
npx serve .
```

Visit `http://localhost:3000` in your browser.

---

## 🛠️ Tech Stack

- **HTML5** (Semantic structure, SVG gauges, accessibility tags)
- **Vanilla CSS** (Custom properties, 8px spacing, glassmorphism, responsive breakpoints)
- **Vanilla JavaScript (ES6+)** (State machine, deterministic algorithm, Web Audio API synthesis)

---

## 📄 License

MIT License © 2026 Sanskar
