/* ==========================================================================
   AM I COOKED? 🔥 — APPLICATION CONTROLLER & EXPANDED FEATURE ENGINE
   Clean, modular, deterministic frontend engine with zero external dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. APPLICATION STATE
    // ----------------------------------------------------------------------
    const state = {
        currentView: 'hero', // 'hero' | 'calculator' | 'result'
        currentStep: 1,
        totalSteps: 5,
        examDate: null,
        daysLeft: 12,
        syllabusSize: 'medium', // 'small' | 'medium' | 'large' | 'massive'
        studiedPercent: 30,
        basicsKnowledge: 'some', // 'none' | 'some' | 'yes'
        dailyHours: 4,
        cookedScore: 0,
        soundEnabled: true,
        ambientPlaying: false,
        activeSoundscape: 'rain',
        ambientVolume: 0.5,
        timerRunning: false,
        timerSeconds: 25 * 60,
        timerInterval: null,
        excuseIndex: 0
    };

    // ----------------------------------------------------------------------
    // 2. DOM REFERENCES
    // ----------------------------------------------------------------------
    // Navigation & Views
    const heroView = document.getElementById('hero-view');
    const calculatorView = document.getElementById('calculator-view');
    const resultView = document.getElementById('result-view');
    const heroStartBtn = document.getElementById('hero-start-btn');
    const navCtaBtn = document.getElementById('nav-cta-btn');
    const navBrandBtn = document.getElementById('nav-brand-btn');
    const navLiveScore = document.getElementById('nav-live-score');
    const soundToggle = document.getElementById('sound-toggle');
    const soundIconDisplay = document.getElementById('sound-icon-display');
    const ambientAudioBtn = document.getElementById('ambient-audio-btn');
    const liveTickerTrack = document.getElementById('live-ticker-track');

    // Calculator Controls
    const calcBackBtn = document.getElementById('calc-back-btn');
    const stepNumberDisplay = document.getElementById('step-number-display');
    const progressFillBar = document.getElementById('progress-fill-bar');
    const stepPanels = document.querySelectorAll('.step-panel');

    // Step 1: Exam Date
    const examDateInput = document.getElementById('exam-date-input');
    const datePills = document.querySelectorAll('.date-preset-pill');
    const dateFeedbackIcon = document.getElementById('date-feedback-icon');
    const dateDaysText = document.getElementById('date-days-text');
    const dateSubText = document.getElementById('date-sub-text');
    const step1Next = document.getElementById('step-1-next');

    // Step 2: Syllabus Size
    const syllabusCards = document.querySelectorAll('#step-2 .option-card');
    const step2Next = document.getElementById('step-2-next');

    // Step 3: Study Percentage
    const studySlider = document.getElementById('study-range-input');
    const studyValDisplay = document.getElementById('study-slider-val');
    const studyCaptionDisplay = document.getElementById('study-slider-caption');
    const milestoneBtns = document.querySelectorAll('.milestone-btn');
    const step3Next = document.getElementById('step-3-next');

    // Step 4: Basics Knowledge
    const basicsCards = document.querySelectorAll('#step-4 .option-card');
    const step4Next = document.getElementById('step-4-next');

    // Step 5: Daily Hours & Final CTA
    const hoursSlider = document.getElementById('hours-range-input');
    const hoursValDisplay = document.getElementById('hours-slider-val');
    const calculateTriggerBtn = document.getElementById('calculate-trigger-btn');

    // Suspense Modal
    const suspenseOverlay = document.getElementById('suspense-overlay');
    const suspenseStatusText = document.getElementById('suspense-status-text');

    // Result Elements
    const meterSvgStroke = document.getElementById('meter-svg-stroke');
    const resultScoreVal = document.getElementById('result-score-val');
    const verdictTierBadge = document.getElementById('verdict-tier-badge');
    const verdictTierText = document.getElementById('verdict-tier-text');
    const verdictQuoteText = document.getElementById('verdict-quote-text');

    // AI Voice Roast Elements
    const voiceRoastCard = document.getElementById('voice-roast-card');
    const voiceTranscriptText = document.getElementById('voice-transcript-text');
    const replayVoiceBtn = document.getElementById('replay-voice-btn');

    // Result Stats Breakdown
    const statDaysVal = document.getElementById('stat-days-val');
    const statSyllabusVal = document.getElementById('stat-syllabus-val');
    const statHoursVal = document.getElementById('stat-hours-val');
    const statBasicsVal = document.getElementById('stat-basics-val');

    // Why Factors
    const factorTimePct = document.getElementById('factor-time-pct');
    const factorTimeBar = document.getElementById('factor-time-bar');
    const factorStudyPct = document.getElementById('factor-study-pct');
    const factorStudyBar = document.getElementById('factor-study-bar');
    const factorSyllabusPct = document.getElementById('factor-syllabus-pct');
    const factorSyllabusBar = document.getElementById('factor-syllabus-bar');
    const factorBasicsPct = document.getElementById('factor-basics-pct');
    const factorBasicsBar = document.getElementById('factor-basics-bar');

    // Survival Plan
    const plan1Title = document.getElementById('plan-1-title');
    const plan1Desc = document.getElementById('plan-1-desc');
    const plan2Title = document.getElementById('plan-2-title');
    const plan2Desc = document.getElementById('plan-2-desc');
    const plan3Title = document.getElementById('plan-3-title');
    const plan3Desc = document.getElementById('plan-3-desc');
    const plan4Title = document.getElementById('plan-4-title');
    const plan4Desc = document.getElementById('plan-4-desc');

    // Share & Action Buttons
    const copyResultBtn = document.getElementById('copy-result-btn');
    const copyBtnIcon = document.getElementById('copy-btn-icon');
    const copyBtnText = document.getElementById('copy-btn-text');
    const downloadCardBtn = document.getElementById('download-card-btn');
    const nativeShareBtn = document.getElementById('native-share-btn');
    const retakeCalcBtn = document.getElementById('retake-calc-btn');

    // 25-Min Lock-In Timer
    const timerDigitsDisplay = document.getElementById('timer-digits-display');
    const timerToggleBtn = document.getElementById('timer-toggle-btn');

    // Toolkit Tabs & Tools
    const suiteTabBtns = document.querySelectorAll('.suite-tab-btn');
    const suiteTabPanels = document.querySelectorAll('.suite-tab-panel');
    const cramSleepSlider = document.getElementById('cram-sleep-slider');
    const cramHoursDisplay = document.getElementById('cram-hours-display');
    const cramAlertnessVal = document.getElementById('cram-alertness-val');
    const cramAlertnessFill = document.getElementById('cram-alertness-fill');
    const cramRetentionVal = document.getElementById('cram-retention-val');
    const cramRetentionFill = document.getElementById('cram-retention-fill');
    const cramCrashVal = document.getElementById('cram-crash-val');
    const cramAdviceText = document.getElementById('cram-advice-text');

    // Grade Saver
    const gsCurrentGrade = document.getElementById('gs-current-grade');
    const gsTargetGrade = document.getElementById('gs-target-grade');
    const gsFinalWeight = document.getElementById('gs-final-weight');
    const gsNeededScore = document.getElementById('gs-needed-score');
    const gsVerdictTag = document.getElementById('gs-verdict-tag');

    // Excuses
    const excuseTextDisplay = document.getElementById('excuse-text-display');
    const genExcuseBtn = document.getElementById('gen-excuse-btn');
    const copyExcuseBtn = document.getElementById('copy-excuse-btn');

    // Modals
    const ambientModal = document.getElementById('ambient-modal');
    const howModal = document.getElementById('how-modal');
    const aboutModal = document.getElementById('about-modal');
    const howItWorksBtn = document.getElementById('how-it-works-btn');
    const toolsModalBtn = document.getElementById('tools-modal-btn');
    const aboutBtn = document.getElementById('about-btn');
    const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
    const procrastinateTriggerBtn = document.getElementById('procrastinate-trigger-btn');
    const soundPresetCards = document.querySelectorAll('.sound-preset-card');
    const ambientVolSlider = document.getElementById('ambient-vol-slider');
    const toggleAmbientPlayBtn = document.getElementById('toggle-ambient-play-btn');

    // Hero Preview Cards
    const openCramCard = document.getElementById('open-cram-card');
    const openGradesaverCard = document.getElementById('open-gradesaver-card');
    const openExcuseCard = document.getElementById('open-excuse-card');

    // Toast
    const appToast = document.getElementById('app-toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMsg = document.getElementById('toast-msg');

    // ----------------------------------------------------------------------
    // 3. SYNTHETIC AUDIO ENGINE (Web Audio API)
    // ----------------------------------------------------------------------
    let audioCtx = null;
    let ambientNodes = [];
    let ambientGainNode = null;

    function initAudioContext() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSound(type) {
        if (!state.soundEnabled) return;
        try {
            initAudioContext();
            if (!audioCtx) return;

            const now = audioCtx.currentTime;

            if (type === 'click') {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'step') {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(520, now);
                osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.09);
            } else if (type === 'suspense') {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.linearRampToValueAtTime(220, now + 1.2);
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.12, now + 0.6);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 1.4);
            } else if (type === 'reveal') {
                const freqs = [330, 440, 554, 660];
                freqs.forEach((f, idx) => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(f, now + idx * 0.04);
                    gain.gain.setValueAtTime(0.06, now + idx * 0.04);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now + idx * 0.04);
                    osc.stop(now + 0.6);
                });
            } else if (type === 'toast') {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(580, now + 0.06);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'bell') {
                const freqs = [587.33, 880, 1174.66];
                freqs.forEach(f => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(f, now);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 1.8);
                });
            }
        } catch (e) {}
    }

    // ----------------------------------------------------------------------
    // 4. PANIC ROOM FOCUS AMBIENT SOUNDSCAPE SYNTHESIS
    // ----------------------------------------------------------------------
    function stopAmbientSound() {
        ambientNodes.forEach(node => {
            try {
                if (node.stop) node.stop();
                if (node.disconnect) node.disconnect();
            } catch (e) {}
        });
        ambientNodes = [];
        state.ambientPlaying = false;
        ambientAudioBtn.classList.remove('playing');
        toggleAmbientPlayBtn.textContent = 'Play Soundscape ▶';
    }

    function startAmbientSound(soundscape = state.activeSoundscape) {
        initAudioContext();
        if (!audioCtx) return;
        stopAmbientSound();

        state.activeSoundscape = soundscape;
        state.ambientPlaying = true;
        ambientAudioBtn.classList.add('playing');
        toggleAmbientPlayBtn.textContent = 'Pause Soundscape ⏸';

        ambientGainNode = audioCtx.createGain();
        ambientGainNode.gain.setValueAtTime(state.ambientVolume, audioCtx.currentTime);
        ambientGainNode.connect(audioCtx.destination);
        ambientNodes.push(ambientGainNode);

        if (soundscape === 'rain') {
            // Synthesize Heavy Rain via Buffer Pink Noise
            const bufferSize = 2 * audioCtx.sampleRate;
            const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
                b6 = white * 0.115926;
            }

            const whiteNoise = audioCtx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

            whiteNoise.connect(filter);
            filter.connect(ambientGainNode);
            whiteNoise.start();
            ambientNodes.push(whiteNoise);
        } else if (soundscape === 'binaural') {
            // 200Hz + 210Hz Alpha Waves
            const oscL = audioCtx.createOscillator();
            const oscR = audioCtx.createOscillator();
            oscL.type = 'sine';
            oscR.type = 'sine';
            oscL.frequency.setValueAtTime(200, audioCtx.currentTime);
            oscR.frequency.setValueAtTime(210, audioCtx.currentTime);

            const merger = audioCtx.createChannelMerger(2);
            oscL.connect(merger, 0, 0);
            oscR.connect(merger, 0, 1);
            merger.connect(ambientGainNode);

            oscL.start();
            oscR.start();
            ambientNodes.push(oscL, oscR);
        } else if (soundscape === 'cafe') {
            // Muffled Coffee Shop Rumble
            const osc = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(80, audioCtx.currentTime);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(250, audioCtx.currentTime);

            osc.connect(filter);
            filter.connect(ambientGainNode);
            osc.start();
            ambientNodes.push(osc);
        } else if (soundscape === 'lofi') {
            // Deep Cyber Synthwave Drone
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            osc1.type = 'sawtooth';
            osc2.type = 'sawtooth';
            osc1.frequency.setValueAtTime(110, audioCtx.currentTime);
            osc2.frequency.setValueAtTime(110.5, audioCtx.currentTime);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, audioCtx.currentTime);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(ambientGainNode);
            osc1.start();
            osc2.start();
            ambientNodes.push(osc1, osc2);
        }
    }

    ambientAudioBtn.addEventListener('click', () => {
        openModal(ambientModal);
    });

    toggleAmbientPlayBtn.addEventListener('click', () => {
        if (state.ambientPlaying) {
            stopAmbientSound();
        } else {
            startAmbientSound(state.activeSoundscape);
        }
    });

    soundPresetCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            soundPresetCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const soundscape = card.getAttribute('data-soundscape');
            startAmbientSound(soundscape);
        });
    });

    ambientVolSlider.addEventListener('input', (e) => {
        state.ambientVolume = parseFloat(e.target.value);
        if (ambientGainNode) {
            ambientGainNode.gain.setValueAtTime(state.ambientVolume, audioCtx.currentTime);
        }
    });

    // ----------------------------------------------------------------------
    // 5. LIVE TICKER FEED POPULATION
    // ----------------------------------------------------------------------
    const initialTickerData = [
        { avatar: "💀", major: "CS Major @ MIT", score: "98% DEEP FRIED", tag: "tag-deepfried", time: "1m ago" },
        { avatar: "🍞", major: "Biology @ UCLA", score: "38% TOASTED", tag: "tag-toasted", time: "2m ago" },
        { avatar: "🔥", major: "Calculus III @ NYU", score: "84% COOKED", tag: "tag-cooked", time: "3m ago" },
        { avatar: "😎", major: "Economics @ Oxford", score: "14% SAFE", tag: "tag-fine", time: "4m ago" },
        { avatar: "☠️", major: "Organic Chem @ Harvard", score: "100% GONE", tag: "tag-deepfried", time: "5m ago" },
        { avatar: "☕", major: "Physics II @ Stanford", score: "62% WARM", tag: "tag-warm", time: "7m ago" },
        { avatar: "🚨", major: "Neuroscience @ Johns Hopkins", score: "94% EMERGENCY", tag: "tag-deepfried", time: "8m ago" },
        { avatar: "🥪", major: "Psychology @ Berkeley", score: "28% CRISPY", tag: "tag-toasted", time: "10m ago" }
    ];

    function populateLiveTicker() {
        if (!liveTickerTrack) return;
        const doubled = [...initialTickerData, ...initialTickerData]; // Seamless loop
        liveTickerTrack.innerHTML = doubled.map(item => `
            <div class="ticker-item">
                <span>${item.avatar}</span>
                <span><strong>${item.major}</strong></span>
                <span class="ticker-tag ${item.tag}">${item.score}</span>
                <span style="color:var(--text-dim);font-size:0.7rem;">(${item.time})</span>
            </div>
        `).join('');
    }
    populateLiveTicker();

    // ----------------------------------------------------------------------
    // 6. TOGGLE SOUND
    // ----------------------------------------------------------------------
    soundToggle.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        soundIconDisplay.textContent = state.soundEnabled ? '🔊' : '🔇';
        soundToggle.setAttribute('aria-label', state.soundEnabled ? 'Mute sound effects' : 'Enable sound effects');
        if (state.soundEnabled) playSound('click');
        showToast(state.soundEnabled ? '🔊' : '🔇', state.soundEnabled ? 'Sound enabled' : 'Sound muted');
    });

    // ----------------------------------------------------------------------
    // 7. VIEW NAVIGATION & TRANSITIONS
    // ----------------------------------------------------------------------
    function switchView(viewName) {
        state.currentView = viewName;
        heroView.style.display = 'none';
        calculatorView.style.display = 'none';
        resultView.style.display = 'none';

        if (viewName === 'hero') {
            heroView.style.display = 'flex';
        } else if (viewName === 'calculator') {
            calculatorView.style.display = 'flex';
            updateStepView();
        } else if (viewName === 'result') {
            resultView.style.display = 'flex';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    heroStartBtn.addEventListener('click', () => {
        playSound('step');
        switchView('calculator');
    });

    navCtaBtn.addEventListener('click', () => {
        playSound('step');
        switchView('calculator');
    });

    navBrandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playSound('click');
        switchView('hero');
    });

    // Hero tool preview cards
    if (openCramCard) {
        openCramCard.addEventListener('click', () => {
            switchView('calculator');
        });
    }
    if (openGradesaverCard) {
        openGradesaverCard.addEventListener('click', () => {
            switchView('calculator');
        });
    }
    if (openExcuseCard) {
        openExcuseCard.addEventListener('click', () => {
            switchView('calculator');
        });
    }

    // ----------------------------------------------------------------------
    // 8. MULTI-STEP LOGIC & VALIDATION
    // ----------------------------------------------------------------------
    function setStep(newStep) {
        if (newStep < 1 || newStep > state.totalSteps) return;
        state.currentStep = newStep;
        playSound('step');
        updateStepView();
    }

    function updateStepView() {
        stepNumberDisplay.textContent = String(state.currentStep).padStart(2, '0');
        const progressPct = (state.currentStep / state.totalSteps) * 100;
        progressFillBar.style.width = `${progressPct}%`;
        document.getElementById('progress-bar-container').setAttribute('aria-valuenow', state.currentStep);

        // Back button visibility
        if (state.currentStep > 1) {
            calcBackBtn.classList.add('visible');
        } else {
            calcBackBtn.classList.remove('visible');
        }

        // Active panel
        stepPanels.forEach(panel => {
            const stepIndex = parseInt(panel.getAttribute('data-step'), 10);
            if (stepIndex === state.currentStep) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        updateLiveScorePreview();
    }

    calcBackBtn.addEventListener('click', () => {
        if (state.currentStep > 1) {
            setStep(state.currentStep - 1);
        }
    });

    // STEP 1: DATE LOGIC
    function initializeDefaultDate() {
        const today = new Date();
        const defaultExam = new Date();
        defaultExam.setDate(today.getDate() + 12);
        
        const year = defaultExam.getFullYear();
        const month = String(defaultExam.getMonth() + 1).padStart(2, '0');
        const day = String(defaultExam.getDate()).padStart(2, '0');
        
        examDateInput.value = `${year}-${month}-${day}`;
        examDateInput.min = new Date().toISOString().split('T')[0];
        handleDateChange();
    }

    function handleDateChange() {
        if (!examDateInput.value) {
            dateDaysText.textContent = "Select a date";
            dateSubText.textContent = "Choose your exam date to continue.";
            dateFeedbackIcon.textContent = "📅";
            state.daysLeft = 0;
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const parts = examDateInput.value.split('-');
        const selected = new Date(parts[0], parts[1] - 1, parts[2]);
        selected.setHours(0, 0, 0, 0);

        const diffTime = selected - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        state.daysLeft = diffDays;
        state.examDate = examDateInput.value;

        datePills.forEach(p => p.classList.remove('active'));

        if (diffDays < 0) {
            dateDaysText.textContent = "Exam has passed";
            dateSubText.textContent = "That exam date has already happened. Time travel isn't supported yet.";
            dateFeedbackIcon.textContent = "⚠️";
        } else if (diffDays === 0) {
            dateDaysText.textContent = "Today";
            dateSubText.textContent = "Exam is today. Close this site and review your summary sheets right now.";
            dateFeedbackIcon.textContent = "🚨";
        } else if (diffDays === 1) {
            dateDaysText.textContent = "Tomorrow (1 day left)";
            dateSubText.textContent = "Emergency mode active. Focus only on high-yield formulas & past papers.";
            dateFeedbackIcon.textContent = "🔥";
        } else if (diffDays <= 3) {
            dateDaysText.textContent = `${diffDays} days from now`;
            dateSubText.textContent = "Crunch time. Cut out distractions and maximize your focus sessions.";
            dateFeedbackIcon.textContent = "⏳";
        } else if (diffDays <= 7) {
            dateDaysText.textContent = `${diffDays} days from now`;
            dateSubText.textContent = "One week window. Very doable if you maintain daily discipline.";
            dateFeedbackIcon.textContent = "⚡";
        } else if (diffDays <= 14) {
            dateDaysText.textContent = `${diffDays} days from now`;
            dateSubText.textContent = "Solid buffer. Follow a steady pace and you'll stay cool.";
            dateFeedbackIcon.textContent = "🎯";
        } else {
            dateDaysText.textContent = `${diffDays} days from now`;
            dateSubText.textContent = "Plenty of runway. Don't let procrastination steal your head start.";
            dateFeedbackIcon.textContent = "😎";
        }

        updateLiveScorePreview();
    }

    examDateInput.addEventListener('change', () => {
        playSound('click');
        handleDateChange();
    });

    datePills.forEach(pill => {
        pill.addEventListener('click', () => {
            playSound('click');
            const daysToAdd = parseInt(pill.getAttribute('data-days'), 10);
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + daysToAdd);

            const year = targetDate.getFullYear();
            const month = String(targetDate.getMonth() + 1).padStart(2, '0');
            const day = String(targetDate.getDate()).padStart(2, '0');

            examDateInput.value = `${year}-${month}-${day}`;
            datePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            handleDateChange();
        });
    });

    step1Next.addEventListener('click', () => {
        if (!examDateInput.value) {
            showToast('⚠️', 'Please choose your exam date to continue.');
            return;
        }
        if (state.daysLeft < 0) {
            showToast('⚠️', 'That exam date has already happened.');
            return;
        }
        setStep(2);
    });

    // STEP 2: SYLLABUS SIZE
    syllabusCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            syllabusCards.forEach(c => {
                c.classList.remove('selected');
                c.setAttribute('aria-checked', 'false');
            });
            card.classList.add('selected');
            card.setAttribute('aria-checked', 'true');
            state.syllabusSize = card.getAttribute('data-syllabus');
            updateLiveScorePreview();
        });
    });

    step2Next.addEventListener('click', () => {
        setStep(3);
    });

    // STEP 3: STUDY SLIDER & CAPTIONS
    const studyCaptions = [
        { max: 0, text: '"Not even a page turned. A blank canvas. 💀"' },
        { max: 15, text: '"You opened the PDF once. That counts as effort, right?"' },
        { max: 35, text: '"You\'ve made a start. Still a lot of ground to cover."' },
        { max: 60, text: '"Halfway there. Keep the momentum going."' },
        { max: 85, text: '"Major topics covered. Time to dial in the details."' },
        { max: 100, text: '"Academic weapon in progress. Full mastery."' }
    ];

    function updateStudySliderDisplay(val) {
        state.studiedPercent = parseInt(val, 10);
        studyValDisplay.textContent = state.studiedPercent;

        for (let cap of studyCaptions) {
            if (state.studiedPercent <= cap.max) {
                studyCaptionDisplay.textContent = cap.text;
                break;
            }
        }
        updateLiveScorePreview();
    }

    studySlider.addEventListener('input', (e) => {
        updateStudySliderDisplay(e.target.value);
    });

    milestoneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound('click');
            const val = btn.getAttribute('data-val');
            studySlider.value = val;
            updateStudySliderDisplay(val);
        });
    });

    step3Next.addEventListener('click', () => {
        setStep(4);
    });

    // STEP 4: BASICS
    basicsCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
            basicsCards.forEach(c => {
                c.classList.remove('selected');
                c.setAttribute('aria-checked', 'false');
            });
            card.classList.add('selected');
            card.setAttribute('aria-checked', 'true');
            state.basicsKnowledge = card.getAttribute('data-basics');
            updateLiveScorePreview();
        });
    });

    step4Next.addEventListener('click', () => {
        setStep(5);
    });

    // STEP 5: DAILY STUDY HOURS
    hoursSlider.addEventListener('input', (e) => {
        state.dailyHours = parseFloat(e.target.value);
        hoursValDisplay.textContent = state.dailyHours;
        updateLiveScorePreview();
    });

    // ----------------------------------------------------------------------
    // 9. COOKED SCORE ALGORITHM & CALCULATION ENGINE
    // ----------------------------------------------------------------------
    function calculateCookedScore() {
        const days = Math.max(0, state.daysLeft);
        const studied = state.studiedPercent;
        const dailyHrs = state.dailyHours;

        const topicCounts = { small: 4, medium: 8, large: 15, massive: 24 };
        const topicCount = topicCounts[state.syllabusSize] || 8;

        const hoursPerTopicMap = { small: 4.5, medium: 6.0, large: 7.5, massive: 9.0 };
        const hoursPerTopic = hoursPerTopicMap[state.syllabusSize] || 6.0;

        const basicsMultiplierMap = { yes: 1.0, some: 1.35, none: 1.8 };
        const basicsMultiplier = basicsMultiplierMap[state.basicsKnowledge] || 1.35;

        const unstudiedRatio = (100 - studied) / 100;
        const totalHoursNeeded = topicCount * hoursPerTopic * unstudiedRatio * basicsMultiplier;
        const totalAvailableHours = days * dailyHrs;

        let finalScore = 0;

        if (studied >= 100) {
            finalScore = state.basicsKnowledge === 'none' ? 12 : 4;
        } else if (days === 0) {
            finalScore = Math.max(85, 100 - Math.round(studied * 0.4));
        } else if (dailyHrs === 0) {
            finalScore = 98;
        } else {
            const workloadRatio = totalHoursNeeded / Math.max(totalAvailableHours, 0.5);

            if (workloadRatio <= 0.3) {
                finalScore = Math.round(workloadRatio * 60);
            } else if (workloadRatio <= 0.65) {
                finalScore = Math.round(20 + ((workloadRatio - 0.3) / 0.35) * 20);
            } else if (workloadRatio <= 1.0) {
                finalScore = Math.round(40 + ((workloadRatio - 0.65) / 0.35) * 20);
            } else if (workloadRatio <= 1.5) {
                finalScore = Math.round(60 + ((workloadRatio - 1.0) / 0.5) * 20);
            } else if (workloadRatio <= 2.2) {
                finalScore = Math.round(80 + ((workloadRatio - 1.5) / 0.7) * 15);
            } else {
                finalScore = Math.min(100, Math.round(95 + (workloadRatio - 2.2) * 2.5));
            }
        }

        finalScore = Math.max(0, Math.min(100, finalScore));
        state.cookedScore = finalScore;
        return finalScore;
    }

    function updateLiveScorePreview() {
        const score = calculateCookedScore();
        if (navLiveScore) {
            let label = "CHILLING";
            if (score > 80) label = "DEEP FRIED";
            else if (score > 60) label = "COOKED";
            else if (score > 40) label = "WARM";
            else if (score > 20) label = "TOASTED";
            navLiveScore.textContent = `${label} ${score}%`;
        }
    }

    // ----------------------------------------------------------------------
    // 10. AI VOICE ROAST ENGINE (Web Speech API)
    // ----------------------------------------------------------------------
    const voiceRoasts = {
        tier1: [ // 0-20%
            "Look at you, academic weapon! You're chilling while the rest of campus is having an existential breakdown. Go take a victory lap.",
            "You are actually cruising with total safety. Go drink some water and don't get overconfident."
        ],
        tier2: [ // 21-40%
            "Lightly toasted! You're feeling a gentle warmth, but nothing a few solid study sessions can't handle. Stay locked in.",
            "You have plenty of runway. Just stop opening social media and finish those summary slides."
        ],
        tier3: [ // 41-60%
            "The stove is definitely on. You're hovering in the danger zone where procrastination will turn into a full catastrophe. Lock in now!",
            "Getting warm! You need to treat your daily study hours like an unbreakable contract."
        ],
        tier4: [ // 61-80%
            "Oh bro, you are properly cooked. Medium well with crispy edges. Cancel your weekend plans and open the textbook immediately!",
            "You're in dangerous territory. If you don't start grinding today, that final exam is going to fold you like a lawn chair."
        ],
        tier5: [ // 81-100%
            "Academic emergency! You are deep fried beyond recognition. May the grade curve and caffeine gods have mercy on your GPA! 💀",
            "This isn't even cooked anymore, this is straight carbonized charcoal. Put down the phone and start cramming right now!"
        ]
    };

    function playVoiceRoast(score) {
        if (!state.soundEnabled) return;
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();

        let list = voiceRoasts.tier5;
        if (score <= 20) list = voiceRoasts.tier1;
        else if (score <= 40) list = voiceRoasts.tier2;
        else if (score <= 60) list = voiceRoasts.tier3;
        else if (score <= 80) list = voiceRoasts.tier4;

        const transcript = list[Math.floor(Math.random() * list.length)];
        voiceTranscriptText.textContent = `"${transcript}"`;

        const utterance = new SpeechSynthesisUtterance(transcript);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
            voiceRoastCard.classList.add('speaking');
        };
        utterance.onend = () => {
            voiceRoastCard.classList.remove('speaking');
        };
        utterance.onerror = () => {
            voiceRoastCard.classList.remove('speaking');
        };

        window.speechSynthesis.speak(utterance);
    }

    if (replayVoiceBtn) {
        replayVoiceBtn.addEventListener('click', () => {
            playSound('click');
            playVoiceRoast(state.cookedScore);
        });
    }

    // ----------------------------------------------------------------------
    // 11. SUSPENSE TRANSITION & RESULT RENDERING
    // ----------------------------------------------------------------------
    calculateTriggerBtn.addEventListener('click', () => {
        if (state.dailyHours === 0 && state.studiedPercent < 90) {
            showToast('💡', 'Even 30 minutes is better than zero.');
        }

        playSound('suspense');
        suspenseOverlay.style.display = 'flex';
        suspenseStatusText.textContent = 'Analyzing your situation...';

        setTimeout(() => {
            suspenseStatusText.textContent = 'Calculating academic damage...';
        }, 700);

        setTimeout(() => {
            suspenseOverlay.style.display = 'none';
            calculateCookedScore();
            renderResults();
            switchView('result');
            playSound('reveal');
            playVoiceRoast(state.cookedScore);
        }, 1400);
    });

    const scoreTiers = [
        {
            max: 20,
            badge: "You're chilling 😎",
            quote: '"You\'re in absolute cruise control. Don\'t fumble the bag now."',
            color: '#10b981',
            border: 'rgba(16, 185, 129, 0.3)',
            bg: 'rgba(16, 185, 129, 0.1)'
        },
        {
            max: 40,
            badge: "Lightly toasted 🍞",
            quote: '"A little warmth never hurt anyone. Stick to your schedule."',
            color: '#f59e0b',
            border: 'rgba(245, 158, 11, 0.3)',
            bg: 'rgba(245, 158, 11, 0.1)'
        },
        {
            max: 60,
            badge: "Getting warm 🔥",
            quote: '"The temperature is rising. Consistent daily focus will save you."',
            color: '#ff9a3c',
            border: 'rgba(255, 154, 60, 0.3)',
            bg: 'rgba(255, 154, 60, 0.1)'
        },
        {
            max: 80,
            badge: "You're cooked 🫠",
            quote: '"You\'ve entered dangerous territory. Serious lock-in required."',
            color: '#ff5722',
            border: 'rgba(255, 87, 34, 0.3)',
            bg: 'rgba(255, 87, 34, 0.1)'
        },
        {
            max: 95,
            badge: "Deep fried 💀",
            quote: '"Academic emergency. Cancel all plans and open the course slides immediately."',
            color: '#ef4444',
            border: 'rgba(239, 68, 68, 0.35)',
            bg: 'rgba(239, 68, 68, 0.12)'
        },
        {
            max: 100,
            badge: "Academic emergency 🚨",
            quote: '"May the grade curve and professor\'s mood have mercy on your transcript."',
            color: '#f43f5e',
            border: 'rgba(244, 63, 94, 0.4)',
            bg: 'rgba(244, 63, 94, 0.15)'
        }
    ];

    function renderResults() {
        const score = state.cookedScore;

        let currentCount = 0;
        const duration = 1200;
        const startTime = performance.now();

        function animateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentCount = Math.round(easeOut * score);
            resultScoreVal.textContent = currentCount;

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                resultScoreVal.textContent = score;
            }
        }
        requestAnimationFrame(animateCounter);

        const circumference = 2 * Math.PI * 94;
        const targetOffset = circumference - (score / 100) * circumference;
        meterSvgStroke.style.strokeDashoffset = targetOffset;

        let activeTier = scoreTiers[scoreTiers.length - 1];
        for (let tier of scoreTiers) {
            if (score <= tier.max) {
                activeTier = tier;
                break;
            }
        }

        verdictTierText.textContent = activeTier.badge;
        verdictQuoteText.textContent = activeTier.quote;
        verdictTierBadge.style.color = activeTier.color;
        verdictTierBadge.style.borderColor = activeTier.border;
        verdictTierBadge.style.background = activeTier.bg;

        statDaysVal.textContent = `${state.daysLeft}d`;
        statSyllabusVal.textContent = `${100 - state.studiedPercent}%`;
        statHoursVal.textContent = `${state.dailyHours}h`;
        
        const basicsLabels = { none: 'NOT REALLY', some: 'SOMEWHAT', yes: 'YES' };
        statBasicsVal.textContent = basicsLabels[state.basicsKnowledge] || 'SOMEWHAT';

        const timeFactor = Math.min(100, Math.max(10, Math.round(100 - (state.daysLeft / 20) * 100)));
        factorTimePct.textContent = `${timeFactor}%`;
        factorTimeBar.style.width = `${timeFactor}%`;

        factorStudyPct.textContent = `${state.studiedPercent}%`;
        factorStudyBar.style.width = `${state.studiedPercent}%`;

        const syllabusFactorMap = { small: 25, medium: 50, large: 75, massive: 95 };
        const syllabusFactor = syllabusFactorMap[state.syllabusSize] || 50;
        factorSyllabusPct.textContent = `${syllabusFactor}%`;
        factorSyllabusBar.style.width = `${syllabusFactor}%`;

        const basicsFactorMap = { yes: 20, some: 55, none: 90 };
        const basicsFactor = basicsFactorMap[state.basicsKnowledge] || 55;
        factorBasicsPct.textContent = `${basicsFactor}%`;
        factorBasicsBar.style.width = `${basicsFactor}%`;

        const remainingSyllabus = 100 - state.studiedPercent;
        plan1Title.textContent = `Finish the remaining ${remainingSyllabus}% syllabus`;
        plan1Desc.textContent = remainingSyllabus > 0
            ? `You have ${remainingSyllabus}% left. Prioritize high-weight lecture modules and tutorial assignments first.`
            : `Syllabus is 100% complete. Transition entirely into active recall tests and formula sheets.`;

        plan2Title.textContent = `Study ${state.dailyHours} hours/day consistently`;
        plan2Desc.textContent = state.dailyHours >= 6
            ? `Split your ${state.dailyHours}h into 50/10 Pomodoro blocks. Protect your sleep so retention doesn't collapse.`
            : `Dedicate ${state.dailyHours}h in zero-distraction focus blocks. Put your phone in another room.`;

        const revisionDays = Math.max(1, Math.min(3, Math.floor(state.daysLeft * 0.25)));
        plan3Title.textContent = `Reserve the final ${revisionDays} ${revisionDays === 1 ? 'day' : 'days'}`;
        plan3Desc.textContent = `Use the final ${revisionDays} ${revisionDays === 1 ? 'day' : 'days'} strictly for timed past exam papers and rapid flashcard reviews.`;

        plan4Title.textContent = `Stop procrastinating`;
        plan4Desc.textContent = `Yes, that includes calculating your cooked score on this website instead of opening your notes.`;
    }

    // ----------------------------------------------------------------------
    // 12. 25-MIN POMODORO LOCK-IN SPRINT TIMER
    // ----------------------------------------------------------------------
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    timerToggleBtn.addEventListener('click', () => {
        playSound('click');
        if (state.timerRunning) {
            clearInterval(state.timerInterval);
            state.timerRunning = false;
            timerToggleBtn.textContent = 'RESUME SPRINT 🚀';
        } else {
            state.timerRunning = true;
            timerToggleBtn.textContent = 'PAUSE SPRINT ⏸';
            state.timerInterval = setInterval(() => {
                state.timerSeconds--;
                timerDigitsDisplay.textContent = formatTime(state.timerSeconds);
                if (state.timerSeconds <= 0) {
                    clearInterval(state.timerInterval);
                    state.timerRunning = false;
                    playSound('bell');
                    showToast('🎉', 'Sprint complete! Take a 5-min breather.', 4000);
                    state.timerSeconds = 25 * 60;
                    timerToggleBtn.textContent = 'START NEW SPRINT 🚀';
                }
            }, 1000);
        }
    });

    // ----------------------------------------------------------------------
    // 13. ALL-NIGHTER SIMULATOR (CRAM VS SLEEP)
    // ----------------------------------------------------------------------
    if (cramSleepSlider) {
        cramSleepSlider.addEventListener('input', (e) => {
            const hrs = parseFloat(e.target.value);
            cramHoursDisplay.textContent = `${hrs} hours`;

            const alertness = Math.min(100, Math.round(15 + (hrs / 8) * 85));
            const retention = Math.min(100, Math.round(10 + Math.pow(hrs / 8, 1.3) * 90));

            cramAlertnessVal.textContent = `${alertness}%`;
            cramAlertnessFill.style.width = `${alertness}%`;
            cramRetentionVal.textContent = `${retention}%`;
            cramRetentionFill.style.width = `${retention}%`;

            if (hrs < 2) {
                cramCrashVal.textContent = 'EXTREME 🚨';
                cramCrashVal.style.color = '#f43f5e';
                cramAdviceText.textContent = '"All-nighters reduce test performance by up to 40%. Sleep at least 90 mins for REM memory consolidation."';
            } else if (hrs < 5) {
                cramCrashVal.textContent = 'HIGH 🔥';
                cramCrashVal.style.color = '#ff9a3c';
                cramAdviceText.textContent = '"4 hours gets you in the door, but take 90-minute sleep cycles to avoid heavy morning brain fog."';
            } else {
                cramCrashVal.textContent = 'LOW ☕';
                cramCrashVal.style.color = '#10b981';
                cramAdviceText.textContent = '"Optimal sleep zone! Your hippocampus can actually index the notes you reviewed today."';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 14. GRADE SAVER FINAL EXAM CALCULATOR
    // ----------------------------------------------------------------------
    function updateGradeSaver() {
        const cur = parseFloat(gsCurrentGrade.value) || 0;
        const target = parseFloat(gsTargetGrade.value) || 0;
        const weight = parseFloat(gsFinalWeight.value) || 40;

        if (weight <= 0) return;
        const needed = (target - (cur * (100 - weight) / 100)) / (weight / 100);
        const rounded = Math.round(needed * 10) / 10;

        gsNeededScore.textContent = `${rounded}%`;

        if (rounded <= 50) {
            gsVerdictTag.textContent = 'VERY ACHIEVABLE 😎';
            gsVerdictTag.style.color = '#10b981';
        } else if (rounded <= 75) {
            gsVerdictTag.textContent = 'DOABLE WITH SOLID REVISION ⚡';
            gsVerdictTag.style.color = '#ff9a3c';
        } else if (rounded <= 90) {
            gsVerdictTag.textContent = 'MAJOR LOCK-IN REQUIRED 🔥';
            gsVerdictTag.style.color = '#ef4444';
        } else if (rounded <= 100) {
            gsVerdictTag.textContent = 'ACADEMIC WEAPON MIRACLE NEEDED 💀';
            gsVerdictTag.style.color = '#f43f5e';
        } else {
            gsVerdictTag.textContent = 'MATHEMATICALLY COOKED 🪦';
            gsVerdictTag.style.color = '#f43f5e';
        }
    }

    if (gsCurrentGrade) {
        [gsCurrentGrade, gsTargetGrade, gsFinalWeight].forEach(input => {
            input.addEventListener('input', updateGradeSaver);
        });
    }

    // ----------------------------------------------------------------------
    // 15. EMERGENCY PROFESSOR EXCUSE GENERATOR
    // ----------------------------------------------------------------------
    const excusesList = [
        "My laptop decided that 2 AM before the exam was the optimal moment to initiate a 4-hour critical OS firmware update.",
        "My building's Wi-Fi router suffered an existential crisis and factory-reset itself right during my study upload.",
        "I was reviewing notes so intensely that my alarm thought I was in REM sleep and respectfully chose not to disturb me.",
        "A stray neighborhood cat climbed onto my surge protector and stepped directly onto the master power switch.",
        "My cloud drive desynced and restored an empty folder from 2021 as my master study archive.",
        "I caught a rare temporary strain of seasonal acute amnesia that only affects chapter 4 through 8."
    ];

    if (genExcuseBtn) {
        genExcuseBtn.addEventListener('click', () => {
            playSound('click');
            state.excuseIndex = (state.excuseIndex + 1) % excusesList.length;
            excuseTextDisplay.textContent = `"${excusesList[state.excuseIndex]}"`;
        });
    }

    if (copyExcuseBtn) {
        copyExcuseBtn.addEventListener('click', async () => {
            playSound('click');
            const text = excuseTextDisplay.textContent;
            try {
                if (navigator.clipboard) await navigator.clipboard.writeText(text);
                showToast('📋', 'Excuse copied to clipboard!');
            } catch (e) {}
        });
    }

    // Toolkit Tabs Switching
    suiteTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound('click');
            suiteTabBtns.forEach(b => b.classList.remove('active'));
            suiteTabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const panel = document.getElementById(tabId);
            if (panel) panel.classList.add('active');
        });
    });

    // ----------------------------------------------------------------------
    // 16. DOWNLOAD OFFICIAL COOKED CARD PNG (HTML5 CANVAS)
    // ----------------------------------------------------------------------
    if (downloadCardBtn) {
        downloadCardBtn.addEventListener('click', () => {
            playSound('click');
            const canvas = document.getElementById('cooked-card-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const score = state.cookedScore;
            const days = state.daysLeft;

            // 1. Dark Velvet Background
            ctx.fillStyle = '#09090b';
            ctx.fillRect(0, 0, 800, 600);

            // Subtle gradient overlay
            const grad = ctx.createRadialGradient(400, 200, 50, 400, 200, 450);
            grad.addColorStop(0, 'rgba(255, 107, 0, 0.15)');
            grad.addColorStop(1, 'rgba(9, 9, 11, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 800, 600);

            // 2. Border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 2;
            ctx.strokeRect(30, 30, 740, 540);

            // 3. Header Branding
            ctx.fillStyle = '#ff9a3c';
            ctx.font = 'bold 24px monospace';
            ctx.fillText('🔥 AM I COOKED? — OFFICIAL DIAGNOSTIC REPORT', 60, 80);

            ctx.fillStyle = '#64748b';
            ctx.font = '14px sans-serif';
            ctx.fillText('Exam Readiness & Academic Emergency Survival Report', 60, 110);

            // 4. Large Circular Cooked Gauge in center
            ctx.beginPath();
            ctx.arc(400, 260, 90, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 14;
            ctx.stroke();

            ctx.beginPath();
            const arcEnd = -Math.PI / 2 + (score / 100) * (Math.PI * 2);
            ctx.arc(400, 260, 90, -Math.PI / 2, arcEnd);
            ctx.strokeStyle = score > 60 ? '#ff5722' : (score > 30 ? '#f59e0b' : '#10b981');
            ctx.lineWidth = 14;
            ctx.stroke();

            // Center Score Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 54px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${score}%`, 400, 275);

            ctx.fillStyle = '#ff9a3c';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('COOKED SCORE', 400, 305);

            // 5. Verdict Tier
            let verdictLabel = "YOU'RE COOKED 🫠";
            if (score <= 20) verdictLabel = "YOU'RE CHILLING 😎";
            else if (score <= 40) verdictLabel = "LIGHTLY TOASTED 🍞";
            else if (score <= 60) verdictLabel = "GETTING WARM 🔥";
            else if (score <= 80) verdictLabel = "YOU'RE COOKED 🫠";
            else if (score <= 95) verdictLabel = "DEEP FRIED 💀";
            else verdictLabel = "ACADEMIC EMERGENCY 🚨";

            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(verdictLabel, 400, 390);

            // 6. Metrics Row
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(60, 430, 680, 80);

            ctx.textAlign = 'left';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px monospace';
            ctx.fillText(`${days} DAYS`, 90, 465);
            ctx.fillText(`${100 - state.studiedPercent}% REMAINING`, 260, 465);
            ctx.fillText(`${state.dailyHours}h / DAY`, 490, 465);
            ctx.fillText(`${state.basicsKnowledge.toUpperCase()}`, 640, 465);

            ctx.fillStyle = '#64748b';
            ctx.font = '11px sans-serif';
            ctx.fillText('TIME LEFT', 90, 490);
            ctx.fillText('SYLLABUS', 260, 490);
            ctx.fillText('CAPACITY', 490, 490);
            ctx.fillText('BASICS', 640, 490);

            // 7. Footer Watermark
            ctx.textAlign = 'center';
            ctx.fillStyle = '#475569';
            ctx.font = '12px monospace';
            ctx.fillText('am-i-cooked-ten.vercel.app • Know your exam situation before it knows you', 400, 545);

            // 8. Download PNG
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `am-i-cooked-report-${score}pct.png`;
            link.href = dataUrl;
            link.click();

            showToast('📸', 'Cooked Card PNG downloaded!');
        });
    }

    // ----------------------------------------------------------------------
    // 17. SHARE & RE-TAKE INTERACTIONS
    // ----------------------------------------------------------------------
    function getShareText() {
        const score = state.cookedScore;
        const days = state.daysLeft;
        return `I'm ${score}% cooked 🔥\n${days} ${days === 1 ? 'day' : 'days'} until my exam.\nWish me luck.\nCheck yours: ${window.location.href}`;
    }

    copyResultBtn.addEventListener('click', async () => {
        playSound('click');
        const text = getShareText();

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            copyBtnIcon.textContent = '✓';
            copyBtnText.textContent = 'Copied ✓';
            showToast('📋', 'Result copied to clipboard!');

            setTimeout(() => {
                copyBtnIcon.textContent = '📋';
                copyBtnText.textContent = 'Copy Result';
            }, 2500);
        } catch (err) {
            showToast('⚠️', 'Failed to copy result.');
        }
    });

    nativeShareBtn.addEventListener('click', async () => {
        playSound('click');
        const text = getShareText();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Am I Cooked? 🔥',
                    text: text,
                    url: window.location.href
                });
            } catch (e) {}
        } else {
            copyResultBtn.click();
        }
    });

    retakeCalcBtn.addEventListener('click', () => {
        playSound('click');
        setStep(1);
        switchView('calculator');
    });

    // ----------------------------------------------------------------------
    // 18. FUN MICRO-INTERACTIONS & TOASTS
    // ----------------------------------------------------------------------
    let toastTimeout = null;

    function showToast(icon, message, durationMs = 3000) {
        playSound('toast');
        toastIcon.textContent = icon;
        toastMsg.textContent = message;
        appToast.style.display = 'flex';

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            appToast.style.display = 'none';
        }, durationMs);
    }

    procrastinateTriggerBtn.addEventListener('click', () => {
        playSound('click');
        showToast('💀', "Bro... you're literally using an exam calculator instead of studying. 💀", 3500);
        
        setTimeout(() => {
            showToast('📚', "Okay. Back to work.", 2500);
        }, 3600);
    });

    // ----------------------------------------------------------------------
    // 19. MODAL DIALOGS
    // ----------------------------------------------------------------------
    function openModal(modal) {
        playSound('click');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal(modal) {
        playSound('click');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    howItWorksBtn.addEventListener('click', () => openModal(howModal));
    if (toolsModalBtn) {
        toolsModalBtn.addEventListener('click', () => {
            switchView('result');
            const el = document.querySelector('.extra-suite-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
    }
    aboutBtn.addEventListener('click', () => openModal(aboutModal));

    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            if (modal) closeModal(modal);
        });
    });

    [ambientModal, howModal, aboutModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (ambientModal.style.display === 'flex') closeModal(ambientModal);
            if (howModal.style.display === 'flex') closeModal(howModal);
            if (aboutModal.style.display === 'flex') closeModal(aboutModal);
        }
    });

    // ----------------------------------------------------------------------
    // 20. SUBTLE AMBIENT CANVAS PARTICLES (RESTFUL FLOATING EMBERS)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(30, Math.floor(window.innerWidth / 40));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.35 + 0.1,
                vx: (Math.random() - 0.5) * 0.2,
                vy: -Math.random() * 0.3 - 0.1,
                hue: Math.random() > 0.6 ? 24 : 14
            });
        }

        let animationFrameId;

        function animateAmbient() {
            ctx.clearRect(0, 0, width, height);

            for (let p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${p.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.4)`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animateAmbient);
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            animateAmbient();
        }
    }

    // ----------------------------------------------------------------------
    // 21. INITIALIZATION
    // ----------------------------------------------------------------------
    initializeDefaultDate();
    updateStudySliderDisplay(studySlider.value);
});
