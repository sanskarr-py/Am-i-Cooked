/* ==========================================================================
   AM I COOKED? 🔥 - COMPLETE SCRIPT WITH STANDARD ENGLISH VOICE & FULL ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. STATE MANAGEMENT
    // ----------------------------------------------------------------------
    const state = {
        examDate: null,
        daysLeft: 7,
        syllabusSize: 'medium', // small, medium, large, massive
        studiedPercent: 25,
        basicsKnowledge: 'little', // none, little, yes
        dailyHours: 4,
        calculatedScore: 0,
        currentVerdict: null,
        soundEnabled: true,
        lastExcuseIndex: -1,
        lastVoiceIndexes: { tier1: -1, tier2: -1, tier3: -1, tier4: -1, tier5: -1 },
        timerInterval: null,
        timerSeconds: 25 * 60,
        timerRunning: false
    };

    // ----------------------------------------------------------------------
    // 2. DOM ELEMENTS
    // ----------------------------------------------------------------------
    const dateInput = document.getElementById('exam-date');
    const countdownText = document.getElementById('countdown-text');
    const countdownSub = document.getElementById('countdown-sub');
    const studySlider = document.getElementById('study-slider');
    const studyPercentText = document.getElementById('study-percent-text');
    const studyQuoteText = document.getElementById('study-quote');
    const hoursSlider = document.getElementById('hours-slider');
    const hoursText = document.getElementById('hours-text');
    const hoursQuoteText = document.getElementById('hours-quote');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultScreen = document.getElementById('result-screen');
    const calculatorForm = document.getElementById('calculator-form');
    const liveLevelVal = document.getElementById('live-level-val');
    const liveTickerTrack = document.getElementById('live-ticker-track');

    // Roast Elements
    const roastDate = document.getElementById('roast-date');
    const roastSyllabus = document.getElementById('roast-syllabus');
    const roastStudy = document.getElementById('roast-study');
    const roastBasics = document.getElementById('roast-basics');
    const roastHours = document.getElementById('roast-hours');

    // Result Elements
    const meterCircle = document.getElementById('meter-circle');
    const meterScoreText = document.getElementById('meter-score-text');
    const meterFireIcon = document.getElementById('meter-fire');
    const meterHalo = document.getElementById('meter-halo');
    const verdictTitle = document.getElementById('verdict-title');
    const verdictSubtitle = document.getElementById('verdict-subtitle');
    const motivationalQuote = document.getElementById('motivational-quote');
    const summaryDays = document.getElementById('summary-days');
    const summarySyllabus = document.getElementById('summary-syllabus');
    const summaryBasics = document.getElementById('summary-basics');
    const summaryHours = document.getElementById('summary-hours');
    const survivalPlanList = document.getElementById('survival-plan-list');
    const retryBtn = document.getElementById('retry-btn');
    const shareBtn = document.getElementById('share-btn');

    // Voice Roast Elements
    const voiceTranscriptText = document.getElementById('voice-transcript-text');
    const soundwaveAnim = document.getElementById('soundwave-anim');
    const replayVoiceBtn = document.getElementById('replay-voice-btn');

    // Excuse Elements
    const excuseBtn = document.getElementById('excuse-btn');
    const copyExcuseBtn = document.getElementById('copy-excuse-btn');
    const excuseDisplay = document.getElementById('excuse-display');
    const excuseBubble = document.getElementById('excuse-bubble');

    // Timer Elements
    const timerDisplay = document.getElementById('timer-display');
    const timerToggleBtn = document.getElementById('timer-toggle-btn');

    // Modal & Audio Controls
    const procrastinateBtn = document.getElementById('procrastinate-btn');
    const procrastinateModal = document.getElementById('procrastinate-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const soundBtn = document.getElementById('sound-btn');
    const soundIcon = document.getElementById('sound-icon');
    const soundText = document.getElementById('sound-text');
    const toast = document.getElementById('toast-notification');

    // ----------------------------------------------------------------------
    // 3. POLISHED LIVE SUBMISSIONS TICKER ENGINE
    // ----------------------------------------------------------------------
    const initialSubmissions = [
        { avatar: "💀", user: "Anonymous", subject: "CS Major @ MIT", score: 98, tag: "tag-deepfried", label: "98% DEEP FRIED", time: "1m ago" },
        { avatar: "🍞", user: "Sarah L.", subject: "Biology @ UCLA", score: 38, tag: "tag-toasted", label: "38% TOASTED", time: "2m ago" },
        { avatar: "🔥", user: "Marcus K.", subject: "Calculus III @ NYU", score: 84, tag: "tag-cooked", label: "84% COOKED", time: "3m ago" },
        { avatar: "😎", user: "Elena R.", subject: "Microeconomics @ Oxford", score: 14, tag: "tag-fine", label: "14% SAFE", time: "4m ago" },
        { avatar: "☠️", user: "Dave P.", subject: "Organic Chem @ Harvard", score: 100, tag: "tag-deepfried", label: "100% GONE", time: "5m ago" },
        { avatar: "☕", user: "Jordan M.", subject: "Physics II @ Stanford", score: 62, tag: "tag-warm", label: "62% WARM", time: "7m ago" },
        { avatar: "🫠", user: "Chloe B.", subject: "Data Structures @ Berkeley", score: 79, tag: "tag-cooked", label: "79% COOKED", time: "9m ago" }
    ];

    function renderTicker() {
        if (!liveTickerTrack) return;
        
        let html = '';
        const fullList = [...initialSubmissions, ...initialSubmissions];

        fullList.forEach(sub => {
            html += `
                <div class="sub-badge ${sub.isUser ? 'user-new' : ''}">
                    <span class="sub-avatar">${sub.avatar}</span>
                    <span class="sub-user">${sub.user} <span style="color:var(--text-dim);font-weight:400;">(${sub.subject})</span></span>
                    <span class="sub-score-tag ${sub.tag}">${sub.label}</span>
                    <span class="sub-time">${sub.time}</span>
                </div>
            `;
        });

        liveTickerTrack.innerHTML = html;
    }
    renderTicker();

    function addLiveSubmissionToTicker(score) {
        let tag = "tag-warm";
        let label = `${score}% WARM`;
        let avatar = "🔥";

        if (score >= 95) {
            tag = "tag-deepfried";
            label = `${score}% DEEP FRIED`;
            avatar = "💀";
        } else if (score >= 75) {
            tag = "tag-cooked";
            label = `${score}% COOKED`;
            avatar = "🫠";
        } else if (score >= 50) {
            tag = "tag-warm";
            label = `${score}% WARM`;
            avatar = "🔥";
        } else if (score >= 25) {
            tag = "tag-toasted";
            label = `${score}% TOASTED`;
            avatar = "🍞";
        } else {
            tag = "tag-fine";
            label = `${score}% SAFE`;
            avatar = "😎";
        }

        const newSub = {
            avatar: avatar,
            user: "YOU",
            subject: "Your Exam",
            score: score,
            tag: tag,
            label: label,
            time: "just now",
            isUser: true
        };

        initialSubmissions.unshift(newSub);
        if (initialSubmissions.length > 10) initialSubmissions.pop();
        renderTicker();
    }

    // ----------------------------------------------------------------------
    // 4. REALISTIC ACOUSTIC LAUGH & WEB AUDIO SYNTHESIZER
    // ----------------------------------------------------------------------
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    ['click', 'touchstart', 'keydown'].forEach(evt => {
        document.addEventListener(evt, () => {
            const ctx = getAudioContext();
            if (ctx && ctx.state === 'suspended') {
                ctx.resume();
            }
        }, { once: false });
    });

    function playRealisticLaugh(bursts = 5) {
        if (!state.soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            for (let i = 0; i < bursts; i++) {
                const burstTime = now + (i * 0.12);
                const pitch = 390 - (i * 20) + (Math.random() * 20 - 10);
                
                const osc = ctx.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(pitch, burstTime);
                osc.frequency.exponentialRampToValueAtTime(pitch * 0.7, burstTime + 0.09);

                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(980, burstTime);
                filter.Q.setValueAtTime(3.6, burstTime);

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.001, burstTime);
                gain.gain.linearRampToValueAtTime(0.28, burstTime + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.1);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);

                osc.start(burstTime);
                osc.stop(burstTime + 0.11);
            }
        } catch (e) {
            console.warn("Laughter synth error:", e);
        }
    }

    function playSound(type) {
        if (!state.soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const now = ctx.currentTime;
            const masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);

            if (type === 'click') {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(580, now);
                osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
                masterGain.gain.setValueAtTime(0.32, now);
                masterGain.gain.linearRampToValueAtTime(0.01, now + 0.08);
                osc.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'excuse' || type === 'toggle') {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const noteGain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.05);
                    noteGain.gain.setValueAtTime(0.28, now + idx * 0.05);
                    noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);
                    osc.connect(noteGain);
                    noteGain.connect(ctx.destination);
                    osc.start(now + idx * 0.05);
                    osc.stop(now + idx * 0.05 + 0.2);
                });
            } else if (type === 'calculate') {
                const osc = ctx.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(900, now + 0.38);
                masterGain.gain.setValueAtTime(0.35, now);
                masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
                osc.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.42);
            } else if (type === 'fanfare') {
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const g = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                    g.gain.setValueAtTime(0.25, now + idx * 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
                    osc.connect(g);
                    g.connect(ctx.destination);
                    osc.start(now + idx * 0.08);
                    osc.stop(now + idx * 0.08 + 0.3);
                });
            } else if (type === 'slider') {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320 + Math.random() * 200, now);
                masterGain.gain.setValueAtTime(0.15, now);
                masterGain.gain.linearRampToValueAtTime(0.01, now + 0.04);
                osc.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'modal') {
                const osc = ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
                masterGain.gain.setValueAtTime(0.45, now);
                masterGain.gain.linearRampToValueAtTime(0.01, now + 0.25);
                osc.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        } catch (e) {
            console.warn("AudioContext error:", e);
        }
    }

    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        getAudioContext();
        state.soundEnabled = !state.soundEnabled;
        
        if (state.soundEnabled) {
            soundIcon.textContent = "🔊";
            soundText.textContent = "AUDIO ON";
            soundBtn.classList.add('active');
            playSound('toggle');
            showToast("Audio & Voice FX Enabled! 🔊");
        } else {
            soundIcon.textContent = "🔇";
            soundText.textContent = "MUTED";
            soundBtn.classList.remove('active');
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            if (soundwaveAnim) soundwaveAnim.classList.remove('active');
            showToast("Audio Muted 🔇");
        }
    });

    // ----------------------------------------------------------------------
    // 5. FLOATING PARTICLES CANVAS
    // ----------------------------------------------------------------------
    function initCanvasParticles() {
        const canvas = document.getElementById('ember-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const count = Math.min(Math.floor(width / 20), 45);

        class Ember {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 50;
                this.size = Math.random() * 2.5 + 1;
                this.speedY = Math.random() * 1.2 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.65 + 0.2;
                this.color = Math.random() > 0.4 ? '#ff5c38' : (Math.random() > 0.5 ? '#fbb03b' : '#ff3366');
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.opacity -= 0.002;
                if (this.y < -10 || this.opacity <= 0) {
                    this.reset();
                }
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < count; i++) {
            particles.push(new Ember());
        }

        function render() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(render);
        }
        render();
    }
    initCanvasParticles();

    // ----------------------------------------------------------------------
    // 6. LIVE SCORE CALCULATION ENGINE
    // ----------------------------------------------------------------------
    function computeScore() {
        const days = Math.max(state.daysLeft, 0);
        const unstudiedPct = 100 - state.studiedPercent;

        let syllabusMult = 1.0;
        if (state.syllabusSize === 'small') syllabusMult = 0.7;
        else if (state.syllabusSize === 'medium') syllabusMult = 1.1;
        else if (state.syllabusSize === 'large') syllabusMult = 1.7;
        else if (state.syllabusSize === 'massive') syllabusMult = 2.5;

        let basicsMult = 1.0;
        if (state.basicsKnowledge === 'none') basicsMult = 1.45;
        else if (state.basicsKnowledge === 'little') basicsMult = 1.1;
        else if (state.basicsKnowledge === 'yes') basicsMult = 0.8;

        const totalHours = Math.max(days * state.dailyHours, 0.5);
        const requiredHours = (unstudiedPct / 100) * 20 * syllabusMult * basicsMult;

        let rawScore = 0;

        if (state.studiedPercent === 100) {
            rawScore = 5;
        } else if (days === 0) {
            rawScore = unstudiedPct > 30 ? 98 : 75;
        } else {
            const burdenRatio = requiredHours / totalHours;
            rawScore = Math.min(100, Math.round(burdenRatio * 50 + (unstudiedPct * 0.3)));
        }

        return Math.min(100, Math.max(0, Math.round(rawScore)));
    }

    function updateLivePreview() {
        const liveScore = computeScore();
        if (liveLevelVal) {
            if (liveScore <= 25) {
                liveLevelVal.textContent = `FINE ${liveScore}% 😎`;
                liveLevelVal.style.color = "#10b981";
            } else if (liveScore <= 50) {
                liveLevelVal.textContent = `TOASTED ${liveScore}% 🍞`;
                liveLevelVal.style.color = "#fbb03b";
            } else if (liveScore <= 75) {
                liveLevelVal.textContent = `WARM ${liveScore}% 🔥`;
                liveLevelVal.style.color = "#ff5c38";
            } else if (liveScore <= 90) {
                liveLevelVal.textContent = `COOKED ${liveScore}% 🫠`;
                liveLevelVal.style.color = "#ff3366";
            } else {
                liveLevelVal.textContent = `DEEP FRIED ${liveScore}% 💀`;
                liveLevelVal.style.color = "#e11d48";
            }
        }
    }

    // ----------------------------------------------------------------------
    // 7. DATE SELECTION & COUNTDOWN
    // ----------------------------------------------------------------------
    function initDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;

        const defaultDate = new Date(today);
        defaultDate.setDate(defaultDate.getDate() + 7);
        const defYyyy = defaultDate.getFullYear();
        const defMm = String(defaultDate.getMonth() + 1).padStart(2, '0');
        const defDd = String(defaultDate.getDate()).padStart(2, '0');
        dateInput.value = `${defYyyy}-${defMm}-${defDd}`;
        
        refreshCountdown();
    }

    function refreshCountdown() {
        if (!dateInput.value) return;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const parts = dateInput.value.split('-');
        const examDate = new Date(parts[0], parts[1] - 1, parts[2]);

        const diffDays = Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        state.examDate = dateInput.value;
        state.daysLeft = Math.max(diffDays, 0);

        if (diffDays <= 0) {
            countdownText.textContent = "EXAM TODAY 💀";
            countdownSub.textContent = "EMERGENCY PROTOCOL ACTIVE";
            roastDate.textContent = `"It's literally today. May the odds be in your favor 💀"`;
        } else if (diffDays === 1) {
            countdownText.textContent = "TOMORROW 🚨";
            countdownSub.textContent = "24 HOURS REMAINING";
            roastDate.textContent = `"24 hours left. Full panic mode 🚨"`;
        } else if (diffDays <= 3) {
            countdownText.textContent = `${diffDays} DAYS LEFT 🔥`;
            countdownSub.textContent = `${diffDays * 24} HOURS REMAINING`;
            roastDate.textContent = `"Panic window is officially open 🔥"`;
        } else {
            countdownText.textContent = `${diffDays} DAYS LEFT`;
            countdownSub.textContent = `${diffDays * 24} HOURS REMAINING`;
            roastDate.textContent = `"Tick tock. Time is running out ⏳"`;
        }

        updateLivePreview();
    }

    dateInput.addEventListener('change', () => {
        playSound('click');
        refreshCountdown();
    });
    initDate();

    // ----------------------------------------------------------------------
    // 8. SYLLABUS & BASICS INTERACTION
    // ----------------------------------------------------------------------
    const syllabusCards = document.querySelectorAll('.syllabus-choice');
    syllabusCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            syllabusCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.syllabusSize = card.dataset.value;

            if (state.syllabusSize === 'small') roastSyllabus.textContent = `"Basically a pop quiz 🟢"`;
            else if (state.syllabusSize === 'medium') roastSyllabus.textContent = `"Standard academic pain. Manageable if you lock in 🟡"`;
            else if (state.syllabusSize === 'large') roastSyllabus.textContent = `"Heavy reading ahead. Say goodbye to sleep 🟠"`;
            else roastSyllabus.textContent = `"Are you taking 5 PhDs at once? 🔴💀"`;

            updateLivePreview();
        });
    });

    const basicsCards = document.querySelectorAll('.basics-choice');
    basicsCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            basicsCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.basicsKnowledge = card.dataset.value;

            if (state.basicsKnowledge === 'none') roastBasics.textContent = `"Starting from sub-zero, respect 💀"`;
            else if (state.basicsKnowledge === 'little') roastBasics.textContent = `"Vibes and guesswork mode active 🎲"`;
            else roastBasics.textContent = `"Solid foundation. Don't waste it 🧠"`;

            updateLivePreview();
        });
    });

    // ----------------------------------------------------------------------
    // 9. SLIDERS & PRESETS
    // ----------------------------------------------------------------------
    function setStudyProgress(val) {
        val = parseInt(val);
        state.studiedPercent = val;
        studySlider.value = val;
        studyPercentText.textContent = `${val}%`;

        document.querySelectorAll('.preset-btn').forEach(pill => {
            if (parseInt(pill.dataset.pct) === val) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        if (val === 0) {
            studyQuoteText.textContent = `"I haven't opened the book 💀"`;
            roastStudy.textContent = `"Bold strategy, let's see if it pays off 💀"`;
        } else if (val <= 25) {
            studyQuoteText.textContent = `"I've seen the syllabus."`;
            roastStudy.textContent = `"You read the table of contents. Proud of you 👏"`;
        } else if (val <= 50) {
            studyQuoteText.textContent = `"Halfway there, halfway in denial."`;
            roastStudy.textContent = `"Halfway there, halfway in denial 📈"`;
        } else if (val <= 75) {
            studyQuoteText.textContent = `"Actually studying."`;
            roastStudy.textContent = `"Actual effort detected! 🤯"`;
        } else if (val < 100) {
            studyQuoteText.textContent = `"Almost ready to ace this."`;
            roastStudy.textContent = `"Almost ready to ace this 🚀"`;
        } else {
            studyQuoteText.textContent = `"I'm built different."`;
            roastStudy.textContent = `"Why are you even on this website? Go sleep 🗿"`;
        }

        updateLivePreview();
    }

    studySlider.addEventListener('input', (e) => {
        playSound('slider');
        setStudyProgress(e.target.value);
    });

    document.querySelectorAll('.preset-btn').forEach(pill => {
        pill.addEventListener('click', () => {
            playSound('click');
            setStudyProgress(pill.dataset.pct);
        });
    });

    function setDailyHours(val) {
        val = parseFloat(val);
        state.dailyHours = val;
        hoursSlider.value = val;
        hoursText.textContent = `${val} hrs / day`;

        if (val === 0) {
            hoursQuoteText.textContent = `Living dangerously 💀`;
            roastHours.textContent = `"Speedrunning academic failure 🏎️"`;
        } else if (val <= 2) {
            hoursQuoteText.textContent = `Light grind ☕`;
            roastHours.textContent = `"Delusional but hopeful ☕"`;
        } else if (val <= 5) {
            hoursQuoteText.textContent = `Solid effort 💪`;
            roastHours.textContent = `"Lock in season 💪"`;
        } else if (val <= 8) {
            hoursQuoteText.textContent = `Academic weapon status ⚔️`;
            roastHours.textContent = `"Academic weapon status activated ⚔️"`;
        } else {
            hoursQuoteText.textContent = `Are you a machine? 🤖`;
            roastHours.textContent = `"Bro is built like a study bot 🤖"`;
        }

        updateLivePreview();
    }

    hoursSlider.addEventListener('input', (e) => {
        playSound('slider');
        setDailyHours(e.target.value);
    });

    // ----------------------------------------------------------------------
    // 10. EXCUSE GENERATOR (25+ EXCUSES WITH GUARANTEED REFRESH)
    // ----------------------------------------------------------------------
    const excusesList = [
        "My dog ate my Wi-Fi router and now I can only access offline thoughts 🐶📡",
        "I was trapped in a temporal loop reviewing Chapter 3 for 14 hours straight ⏳",
        "Solar flares corrupted my short-term memory during my cram session ☀️🧠",
        "I had a staring contest with my textbook and unfortunately lost 👁️📚",
        "My cat walked across my keyboard and submitted an unfinished draft into the void 🐱💻",
        "I was mentally calculating my cooked score on am-i-cooked.com and passed out 💀",
        "I accidentally fell asleep doing active recall in my lucid dreams 💤",
        "A sudden surge of emotional damage rendered me unable to open PDF files 💔",
        "My alarm clock decided to update its firmware at 7:00 AM sharp ⏰📱",
        "I got trapped in a Wikipedia rabbit hole researching why quantum physics won't help me pass 🔬",
        "My brain entered power-saving mode without prior notification 🔋💤",
        "I was victimized by the TikTok algorithm at 2:45 AM 📱💀",
        "My notes spontaneously combusted from sheer academic pressure 🔥📖",
        "I was spiritually aligned with the subject, but not physically prepared 🧘‍♂️✨",
        "My Wi-Fi developed separation anxiety and disconnected every 3 minutes 📶😭",
        "I accidentally highlighted the entire page instead of the key concepts 🖍️📄",
        "A rogue squirrel disconnected the main power grid on my street 🐿️⚡",
        "I misread the syllabus and studied for a class I'm not even enrolled in 🤦‍♂️📚",
        "My printer sensed fear and ran out of magenta ink on an all-text document 🖨️💀",
        "I was locked in a philosophical debate with my coffee maker about caffeine limits ☕🤖",
        "Gravity felt unusually heavy today, pinning me to my bed 🛌🌌",
        "My brain performed an unexpected system reboot right before the study session 🔄🧠",
        "I spent 6 hours searching for the perfect study playlist instead of actually studying 🎧🎵",
        "I was waiting for my study motivation to download, but the speed was 0 kb/s ⏳📉",
        "My pencil went on strike demanding better working conditions ✏️🛑"
    ];

    function rollNewExcuse() {
        playSound('excuse');
        
        let newIndex = Math.floor(Math.random() * excusesList.length);
        while (newIndex === state.lastExcuseIndex && excusesList.length > 1) {
            newIndex = Math.floor(Math.random() * excusesList.length);
        }
        state.lastExcuseIndex = newIndex;
        const selected = excusesList[newIndex];

        if (excuseBubble) {
            excuseBubble.classList.remove('flash');
            void excuseBubble.offsetWidth;
            excuseBubble.classList.add('flash');
        }

        excuseDisplay.style.opacity = '0';
        excuseDisplay.style.transform = 'translateY(4px)';

        setTimeout(() => {
            excuseDisplay.textContent = `"${selected}"`;
            excuseDisplay.style.opacity = '1';
            excuseDisplay.style.transform = 'translateY(0)';
        }, 120);
    }

    if (excuseBtn) {
        excuseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            rollNewExcuse();
        });
    }

    if (copyExcuseBtn) {
        copyExcuseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSound('click');
            const rawExcuse = excuseDisplay.textContent.replace(/^"|"$/g, '').trim();
            if (rawExcuse.startsWith('Click')) {
                showToast("Generate an excuse first! 🎲");
                return;
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(rawExcuse).then(() => {
                    showToast("Copied excuse to clipboard! 📋");
                }).catch(() => {
                    fallbackCopy(rawExcuse);
                });
            } else {
                fallbackCopy(rawExcuse);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 11. DYNAMIC MULTI-ROAST VOICE LIBRARY WITH REFRESH ON EVERY CLICK
    // ----------------------------------------------------------------------
    const voiceRoastLibrary = {
        tier5: [ // 95% - 100%
            {
                laughCount: 7,
                speech: "Ha ha ha ha ha! Oh bro... you are not just cooked, you are turned to pure carbon ash! The entire kitchen has burned down! Academic comeback DLC required! Drink six cups of coffee and pray right now!",
                transcript: `"Ha ha ha ha ha! Oh bro, you are not just cooked, you are turned to pure carbon ash! The kitchen burned down! 💀🔥"`
            },
            {
                laughCount: 6,
                speech: "Bwahahaha! Ha ha ha! Are you taking an exam or donating your tuition money? You haven't opened the textbook in three months and you're here testing your luck! Rest in peace your GPA! Hahaha!",
                transcript: `"Bwahahaha! Are you taking an exam or donating your tuition? Rest in peace your GPA! 💀"`
            },
            {
                laughCount: 8,
                speech: "Oh my goodness... ha ha ha ha ha! Bro is running on one percent battery and zero percent knowledge! You are deep fried, battered, and served on a platter! Hahaha!",
                transcript: `"Oh my goodness... ha ha ha! Running on 1% battery and 0% knowledge! Deep fried and served! ☠️"`
            }
        ],
        tier4: [ // 75% - 94%
            {
                laughCount: 5,
                speech: "Ha ha ha ha! Oh man! Emergency alert! Emergency alert! You and your syllabus are officially in an abusive relationship. Put down TikTok right now before it's too late!",
                transcript: `"Ha ha ha ha! Emergency alert! You and your syllabus are in an abusive relationship. Put down TikTok! 🫠"`
            },
            {
                laughCount: 4,
                speech: "Hehehe ha ha! The panic window is officially wide open! If you don't lock in within the next ten minutes, you're gonna be telling your parents a very interesting story!",
                transcript: `"Hehehe ha ha! The panic window is open! Lock in before you have to explain this to your parents! 🚨"`
            },
            {
                laughCount: 5,
                speech: "Hahaha! You're staring at a mountain of lecture slides with zero comprehension! Stop listening to lo-fi beats and start cramming for your life!",
                transcript: `"Hahaha! Staring at 400 slides with zero comprehension! Stop the lo-fi beats and cram! 📚🔥"`
            }
        ],
        tier3: [ // 50% - 74%
            {
                laughCount: 3,
                speech: "He he he, it's getting pretty warm in here! Stop watching three-hour video essays on YouTube and actually open chapter one. You can still pass if you lock in!",
                transcript: `"He he he, getting toasty! Stop watching 3-hour YouTube video essays and open chapter 1! 🔥"`
            },
            {
                laughCount: 3,
                speech: "Hehehe, you are halfway to safety and halfway to catastrophe! Put your phone on airplane mode, stretch your back, and let's get to work!",
                transcript: `"Hehehe, halfway to safety and halfway to catastrophe! Airplane mode time! ✈️"`
            },
            {
                laughCount: 2,
                speech: "Chuckles... you know some of the basics, but time is evaporating! Drink some water and start active recall right now!",
                transcript: `"Chuckles... time is evaporating! Drink water and start active recall! 💡"`
            }
        ],
        tier2: [ // 25% - 49%
            {
                laughCount: 0,
                speech: "Slightly toasted! You're in a manageable zone, but don't get cocky. Start studying today and you'll survive with flying colors!",
                transcript: `"Slightly toasted! Manageable zone, but don't get cocky. Start today! 🍞"`
            },
            {
                laughCount: 0,
                speech: "Not bad at all! You have time and you have the foundation. Just stick to the plan and don't procrastinate!",
                transcript: `"Not bad at all! Stick to the plan and don't procrastinate! 📈"`
            }
        ],
        tier1: [ // 0% - 24%
            {
                laughCount: 0,
                speech: "Wait a minute... why are you even on this website? You have nothing to worry about! Go touch some grass or get some sleep, you overachiever!",
                transcript: `"Wait... why are you even on this website? Go touch some grass, overachiever! 😎"`
            },
            {
                laughCount: 0,
                speech: "Haha, look at you! Completely prepared and still stressed out! Go take a nap, you are definitely acing this exam!",
                transcript: `"Completely prepared and still stressed! Take a nap, you're acing this! 🗿"`
            }
        ]
    };

    function getDynamicVoiceRoast(score) {
        let tierKey = 'tier1';
        if (score >= 95) tierKey = 'tier5';
        else if (score >= 75) tierKey = 'tier4';
        else if (score >= 50) tierKey = 'tier3';
        else if (score >= 25) tierKey = 'tier2';

        const list = voiceRoastLibrary[tierKey];
        let newIndex = Math.floor(Math.random() * list.length);
        while (newIndex === state.lastVoiceIndexes[tierKey] && list.length > 1) {
            newIndex = Math.floor(Math.random() * list.length);
        }
        state.lastVoiceIndexes[tierKey] = newIndex;
        return list[newIndex];
    }

    function speakVoiceRoast(score) {
        const roastData = getDynamicVoiceRoast(score);
        
        if (voiceTranscriptText) {
            voiceTranscriptText.style.opacity = '0';
            setTimeout(() => {
                voiceTranscriptText.textContent = roastData.transcript;
                voiceTranscriptText.style.opacity = '1';
            }, 100);
        }

        if (!state.soundEnabled) return;

        // Trigger realistic acoustic laugh bursts if applicable
        if (roastData.laughCount > 0) {
            playRealisticLaugh(roastData.laughCount);
        } else {
            playSound('fanfare');
        }

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(roastData.speech);
            utterance.rate = 1.08;
            utterance.pitch = score >= 75 ? 1.05 : 1.12;

            const voices = window.speechSynthesis.getVoices();
            const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Guy') || v.name.includes('Samantha')));
            if (englishVoice) {
                utterance.voice = englishVoice;
            }

            utterance.onstart = () => {
                if (soundwaveAnim) soundwaveAnim.classList.add('active');
            };

            utterance.onend = () => {
                if (soundwaveAnim) soundwaveAnim.classList.remove('active');
            };

            utterance.onerror = () => {
                if (soundwaveAnim) soundwaveAnim.classList.remove('active');
            };

            // Speak right as acoustic laughter begins
            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
            }, 300);
        }
    }

    if (replayVoiceBtn) {
        replayVoiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSound('click');
            speakVoiceRoast(state.calculatedScore);
            showToast("Shuffling new voice roast! 🎙️");
        });
    }

    // ----------------------------------------------------------------------
    // 12. RESULT CALCULATION & VERDICT DATA
    // ----------------------------------------------------------------------
    const motivationalQuotes = [
        "Lock in. The academic comeback starts now 🔒",
        "Cs get degrees, but passing gets sleep 😴",
        "Your future self is begging you to close TikTok 💀",
        "It's not over until the exam paper is turned in 📄",
        "Channel your inner academic weapon ⚔️",
        "Coffee + Panic = Unstoppable force ☕🔥",
        "Pain is temporary, GPA is forever 🗿",
        "Do it for the satisfaction of closing all 47 open tabs 💻"
    ];

    const funnyWarnings = [
        "Stop pretending you'll study at 3 AM 😭",
        "Put your phone in airplane mode right now 📱✈️",
        "No, listening to lo-fi beats while scrolling IG does not count as studying 🎧",
        "Close YouTube. Yes, even the tutorial you were 'definitely' about to watch 🛑",
        "Tell your friends you're entering monk mode until exam day 🧘‍♂️"
    ];

    function getVerdict(score) {
        if (score <= 20) {
            return {
                title: "YOU ARE ABSOLUTELY FINE 😎",
                subtitle: "Go revise key formulas and touch some grass.",
                color: "#10b981",
                emoji: "😎"
            };
        } else if (score <= 40) {
            return {
                title: "SLIGHTLY TOASTED 🍞",
                subtitle: "You still have plenty of time. Start now and don't slack.",
                color: "#fbb03b",
                emoji: "🍞"
            };
        } else if (score <= 60) {
            return {
                title: "GETTING WARM 🔥",
                subtitle: "Maybe stop watching YouTube shorts and actually start studying.",
                color: "#ff5c38",
                emoji: "🔥"
            };
        } else if (score <= 80) {
            return {
                title: "YOU'RE COOKED 🫠",
                subtitle: "Emergency study protocol is now mandatory.",
                color: "#ff3366",
                emoji: "🫠"
            };
        } else if (score <= 95) {
            return {
                title: "DEEP FRYER MODE 💀🔥",
                subtitle: "You and the syllabus are currently in an abusive relationship.",
                color: "#e11d48",
                emoji: "💀"
            };
        } else {
            return {
                title: "IT'S OVER 💀",
                subtitle: "Academic comeback DLC required. Drink coffee and pray.",
                color: "#dc2626",
                emoji: "☠️"
            };
        }
    }

    function buildSurvivalProtocol(score) {
        const days = Math.max(state.daysLeft, 1);
        const unstudied = 100 - state.studiedPercent;
        const targetHours = Math.min(12, Math.max(2, Math.ceil((unstudied / 10) / (days * 0.5))));
        const studyDays = Math.max(1, Math.floor(days * 0.7));
        const revDays = days - studyDays;

        const list = [];
        list.push(`Target study quota: <strong>${targetHours} hours / day</strong> minimum.`);
        
        if (unstudied > 0) {
            list.push(`Finish the remaining <strong>${unstudied}% syllabus</strong> in the next <strong>${studyDays} day(s)</strong>.`);
        } else {
            list.push(`Full syllabus covered! Spend all <strong>${days} day(s)</strong> doing timed mock exams.`);
        }

        if (revDays > 0) {
            list.push(`Reserve <strong>${revDays} day(s)</strong> exclusively for past papers & formula memorization.`);
        } else {
            list.push(`Do 30-minute flashcard recall every night before sleeping.`);
        }

        list.push(`Strict rule: Pomodoro 25 min study / 5 min break. No social media during breaks.`);

        const warn = funnyWarnings[Math.floor(Math.random() * funnyWarnings.length)];
        list.push(`<strong>Survival tip:</strong> ${warn}`);

        return list;
    }

    calculateBtn.addEventListener('click', () => {
        playSound('calculate');
        const score = computeScore();
        state.calculatedScore = score;
        const verdict = getVerdict(score);
        state.currentVerdict = verdict;

        resultScreen.classList.remove('hidden');

        verdictTitle.textContent = verdict.title;
        verdictTitle.style.color = verdict.color;
        verdictSubtitle.textContent = verdict.subtitle;
        meterFireIcon.textContent = verdict.emoji;

        if (meterHalo) {
            meterHalo.style.background = `radial-gradient(circle, ${verdict.color}55, transparent 70%)`;
        }

        const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        motivationalQuote.textContent = `"${quote}"`;

        summaryDays.textContent = `${state.daysLeft} days`;
        summarySyllabus.textContent = `${100 - state.studiedPercent}% remaining`;
        summaryBasics.textContent = state.basicsKnowledge === 'none' ? 'Not really' : (state.basicsKnowledge === 'little' ? 'A little' : 'Yes');
        summaryHours.textContent = `${state.dailyHours} hrs/day`;

        const protocols = buildSurvivalProtocol(score);
        survivalPlanList.innerHTML = '';
        protocols.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            survivalPlanList.appendChild(li);
        });

        // Add user result to live ticker feed!
        addLiveSubmissionToTicker(score);

        resultScreen.scrollIntoView({ behavior: 'smooth' });
        animateGauge(score, verdict.color);

        // TRIGGER SHUFFLED VOICE ROAST
        setTimeout(() => {
            speakVoiceRoast(score);
        }, 500);
    });

    function animateGauge(target, color) {
        const circumference = 565.48; // 2 * PI * 90
        const offset = circumference - (target / 100) * circumference;

        meterCircle.style.stroke = color;
        meterCircle.style.strokeDashoffset = circumference;

        let current = 0;
        const duration = 1200;
        const start = performance.now();

        setTimeout(() => {
            meterCircle.style.strokeDashoffset = offset;
        }, 40);

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(progress * target);
            meterScoreText.textContent = `${current}%`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                meterScoreText.textContent = `${target}%`;
            }
        }
        requestAnimationFrame(update);
    }

    // ----------------------------------------------------------------------
    // 13. 25-MIN LOCK-IN POMODORO SPRINT TIMER
    // ----------------------------------------------------------------------
    function updateTimerDisplay() {
        const mins = Math.floor(state.timerSeconds / 60);
        const secs = state.timerSeconds % 60;
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    timerToggleBtn.addEventListener('click', () => {
        playSound('click');
        if (state.timerRunning) {
            clearInterval(state.timerInterval);
            state.timerRunning = false;
            timerToggleBtn.textContent = "RESUME SPRINT 🚀";
            showToast("Timer paused ⏸️");
        } else {
            state.timerRunning = true;
            timerToggleBtn.textContent = "PAUSE SPRINT ⏸️";
            showToast("Lock in sprint started! 🔒");

            state.timerInterval = setInterval(() => {
                if (state.timerSeconds > 0) {
                    state.timerSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(state.timerInterval);
                    state.timerRunning = false;
                    playSound('excuse');
                    timerToggleBtn.textContent = "RESTART SPRINT 🚀";
                    state.timerSeconds = 25 * 60;
                    showToast("Sprint finished! Great job 👏");
                }
            }, 1000);
        }
    });

    // ----------------------------------------------------------------------
    // 14. RETRY, SHARE & PROCRASTINATE MODAL
    // ----------------------------------------------------------------------
    retryBtn.addEventListener('click', () => {
        playSound('click');
        calculatorForm.scrollIntoView({ behavior: 'smooth' });
    });

    shareBtn.addEventListener('click', () => {
        playSound('excuse');
        const shareText = `I am ${state.calculatedScore}% COOKED 🔥 for my exam in ${state.daysLeft} days!\nCalculate your score on am-i-cooked.com 💀`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareText).then(() => {
                showToast("Copied share card text! 📋");
            }).catch(() => {
                fallbackCopy(shareText);
            });
        } else {
            fallbackCopy(shareText);
        }
    });

    function fallbackCopy(text) {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast("Copied to clipboard! 📋");
    }

    function showToast(msg) {
        const toastMsg = document.getElementById('toast-message');
        toastMsg.textContent = msg;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2800);
    }

    procrastinateBtn.addEventListener('click', () => {
        playSound('modal');
        procrastinateModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        playSound('click');
        procrastinateModal.classList.add('hidden');
        calculatorForm.scrollIntoView({ behavior: 'smooth' });
    });

    procrastinateModal.addEventListener('click', (e) => {
        if (e.target === procrastinateModal) {
            procrastinateModal.classList.add('hidden');
        }
    });

    // Initial Live Preview computation
    updateLivePreview();
});
