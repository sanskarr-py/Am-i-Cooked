# Am I Cooked? 🔥

> **"Know your exam situation before your exam knows you."**  
> A playful, brutally honest, and genuinely useful exam-readiness calculator for students.  
> 🔗 Live App: [am-i-cooked-ten.vercel.app](https://am-i-cooked-ten.vercel.app/)

---

## ⚡ Overview

**Am I Cooked?** calculates your exact academic survival odds (0–100% Cooked Score) based on:
1. **Exam Date** (real-time days remaining countdown)
2. **Syllabus Size** (Small, Medium, Large, Massive)
3. **Study Progress** (brutally honest % completed)
4. **Foundation Knowledge** (Do you know the basics?)
5. **Real-world Available Study Time** (sustainable hours per day)

Designed with a high-precision, minimal dark-first aesthetic inspired by Linear, Vercel, and Raycast.

---

## 🎯 Complete Feature Suite

- 🎛️ **Focused Multi-Step Flow**: Silky smooth 5-step guided calculator with persistent state, progress tracking, and validation.
- 🔥 **Circular Cooked Meter (0–100%)**: Smoothly animating SVG gauge with color-coded tier states:
  - `0–20%`: *You're chilling* 😎
  - `21–40%`: *Lightly toasted* 🍞
  - `41–60%`: *Getting warm* 🔥
  - `61–80%`: *You're cooked* 🫠
  - `81–95%`: *Deep fried* 💀
  - `96–100%`: *Academic emergency* 🚨
- 🎙️ **AI Voice Roast Engine**: Speeches synthesized commentary live with speech synthesis and animated soundwave indicators.
- 📸 **Downloadable Official Cooked Card PNG**: Generates a high-res 800x600 report card badge via HTML5 Canvas for Discord, Instagram, and X.
- 🎧 **Panic Room Ambient Focus Audio**: Procedurally generated soundscapes via Web Audio API:
  - 🌧️ *Heavy Rain*
  - 🪐 *Binaural Alpha Waves (10Hz focus)*
  - ☕ *Coffee Shop Cafe*
  - ⚡ *Cyber Synthwave Drone*
- ⏱️ **25-Min "Lock-In" Pomodoro Sprint Timer**: Quick countdown widget with audio alerts.
- 😴⚡ **"Cram vs. Sleep" All-Nighter Simulator**: Interactive trade-off matrix computing cognitive alertness vs memory retention penalty.
- 📊🎯 **Grade Saver / Final Exam Score Calculator**: Calculates exact minimum final exam score needed to pass or achieve your target grade.
- 📝🎲 **Emergency Professor Excuse Generator**: Instant witty, non-repeating excuses with 1-click clipboard copy.
- 📡 **Live Roast Feed Ticker**: Top community marquee tracking student survival statuses worldwide.
- 💀 **"I'm Procrastinating" Micro-interaction**: Reality-check toast notification.
- 🔊 **Synthetic Web Audio FX**: Crisp tactile clicks, suspense drones, and result chords.

---

## 🚀 Running Locally

No npm dependencies or build steps required. Simply open `index.html` in any modern web browser:

```bash
# Using Python
python -m http.server 3000

# Or using npx
npx serve .
```

Visit `http://localhost:3000` in your browser.

---

## 🛠️ Tech Stack

- **HTML5** (Semantic structure, SVG gauges, Canvas export, accessibility tags)
- **Vanilla CSS** (Custom properties, 8px spacing, glassmorphism, responsive breakpoints)
- **Vanilla JavaScript (ES6+)** (State machine, deterministic calculation algorithm, Web Audio API synthesis, Web Speech API)

---

## 📄 License

MIT License © 2026 Sanskar
