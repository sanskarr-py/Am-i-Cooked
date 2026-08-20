/* ==========================================================================
   AM I COOKED? 🔥 — APPLICATION CONTROLLER
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
        soundEnabled: true
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
    const soundToggle = document.getElementById('sound-toggle');
    const soundIconDisplay = document.getElementById('sound-icon-display');

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
    const nativeShareBtn = document.getElementById('native-share-btn');
    const retakeCalcBtn = document.getElementById('retake-calc-btn');

    // Micro-interactions & Modals
    const procrastinateTriggerBtn = document.getElementById('procrastinate-trigger-btn');
    const howItWorksBtn = document.getElementById('how-it-works-btn');
    const aboutBtn = document.getElementById('about-btn');
    const howModal = document.getElementById('how-modal');
    const aboutModal = document.getElementById('about-modal');
    const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
    const appToast = document.getElementById('app-toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMsg = document.getElementById('toast-msg');

    // ----------------------------------------------------------------------
    // 3. SYNTHETIC AUDIO ENGINE (Web Audio API)
    // ----------------------------------------------------------------------
    let audioCtx = null;

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
                // Subtle tactile click
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
                // Pleasant step transition tone
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
                // Low tension drone
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
                // Harmonic chord for result reveal
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
            }
        } catch (e) {
            // Audio context failed or blocked by policy
        }
    }

    // Toggle sound
    soundToggle.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        soundIconDisplay.textContent = state.soundEnabled ? '🔊' : '🔇';
        soundToggle.setAttribute('aria-label', state.soundEnabled ? 'Mute sound effects' : 'Enable sound effects');
        if (state.soundEnabled) playSound('click');
        showToast(state.soundEnabled ? '🔊' : '🔇', state.soundEnabled ? 'Sound enabled' : 'Sound muted');
    });

    // ----------------------------------------------------------------------
    // 4. VIEW NAVIGATION & TRANSITIONS
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

    // ----------------------------------------------------------------------
    // 5. MULTI-STEP LOGIC & VALIDATION
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

        // Clear active pill state
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

        // Find caption
        for (let cap of studyCaptions) {
            if (state.studiedPercent <= cap.max) {
                studyCaptionDisplay.textContent = cap.text;
                break;
            }
        }
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
        });
    });

    step4Next.addEventListener('click', () => {
        setStep(5);
    });

    // STEP 5: DAILY STUDY HOURS
    hoursSlider.addEventListener('input', (e) => {
        state.dailyHours = parseFloat(e.target.value);
        hoursValDisplay.textContent = state.dailyHours;
    });

    // ----------------------------------------------------------------------
    // 6. COOKED SCORE ALGORITHM & CALCULATION ENGINE
    // ----------------------------------------------------------------------
    function calculateCookedScore() {
        const days = Math.max(0, state.daysLeft);
        const studied = state.studiedPercent;
        const dailyHrs = state.dailyHours;

        // Syllabus topic count weighting
        const topicCounts = {
            small: 4,
            medium: 8,
            large: 15,
            massive: 24
        };
        const topicCount = topicCounts[state.syllabusSize] || 8;

        // Baseline hours required per topic
        const hoursPerTopicMap = {
            small: 4.5,
            medium: 6.0,
            large: 7.5,
            massive: 9.0
        };
        const hoursPerTopic = hoursPerTopicMap[state.syllabusSize] || 6.0;

        // Basics multiplier (higher if basics are missing)
        const basicsMultiplierMap = {
            yes: 1.0,
            some: 1.35,
            none: 1.8
        };
        const basicsMultiplier = basicsMultiplierMap[state.basicsKnowledge] || 1.35;

        // Remaining workload
        const unstudiedRatio = (100 - studied) / 100;
        const totalHoursNeeded = topicCount * hoursPerTopic * unstudiedRatio * basicsMultiplier;

        // Total available study capacity
        const totalAvailableHours = days * dailyHrs;

        let finalScore = 0;

        if (studied >= 100) {
            // Completely studied
            finalScore = state.basicsKnowledge === 'none' ? 12 : 4;
        } else if (days === 0) {
            // Exam is today
            finalScore = Math.max(85, 100 - Math.round(studied * 0.4));
        } else if (dailyHrs === 0) {
            // 0 hours/day available
            finalScore = 98;
        } else {
            // Workload ratio
            const workloadRatio = totalHoursNeeded / Math.max(totalAvailableHours, 0.5);

            // Calibrated curve
            if (workloadRatio <= 0.3) {
                // 0 - 20 range (Chilling)
                finalScore = Math.round(workloadRatio * 60);
            } else if (workloadRatio <= 0.65) {
                // 21 - 40 range (Lightly toasted)
                finalScore = Math.round(20 + ((workloadRatio - 0.3) / 0.35) * 20);
            } else if (workloadRatio <= 1.0) {
                // 41 - 60 range (Getting warm)
                finalScore = Math.round(40 + ((workloadRatio - 0.65) / 0.35) * 20);
            } else if (workloadRatio <= 1.5) {
                // 61 - 80 range (You're cooked)
                finalScore = Math.round(60 + ((workloadRatio - 1.0) / 0.5) * 20);
            } else if (workloadRatio <= 2.2) {
                // 81 - 95 range (Deep fried)
                finalScore = Math.round(80 + ((workloadRatio - 1.5) / 0.7) * 15);
            } else {
                // 96 - 100 range (Academic emergency)
                finalScore = Math.min(100, Math.round(95 + (workloadRatio - 2.2) * 2.5));
            }
        }

        // Clamp between 0 and 100
        finalScore = Math.max(0, Math.min(100, finalScore));
        state.cookedScore = finalScore;
        return finalScore;
    }

    // ----------------------------------------------------------------------
    // 7. SUSPENSE TRANSITION & RESULT RENDERING
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

        // 1. Animate Score Counter
        let currentCount = 0;
        const duration = 1200;
        const startTime = performance.now();

        function animateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
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

        // 2. Animate Circular Meter SVG
        const circumference = 2 * Math.PI * 94; // ~590.62
        const targetOffset = circumference - (score / 100) * circumference;
        meterSvgStroke.style.strokeDashoffset = targetOffset;

        // 3. Verdict Tier Styling & Text
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

        // 4. Statistics Breakdown Grid
        statDaysVal.textContent = `${state.daysLeft}d`;
        statSyllabusVal.textContent = `${100 - state.studiedPercent}%`;
        statHoursVal.textContent = `${state.dailyHours}h`;
        
        const basicsLabels = { none: 'NOT REALLY', some: 'SOMEWHAT', yes: 'YES' };
        statBasicsVal.textContent = basicsLabels[state.basicsKnowledge] || 'SOMEWHAT';

        // 5. "Why?" Factors Breakdown
        // Time pressure factor
        const timeFactor = Math.min(100, Math.max(10, Math.round(100 - (state.daysLeft / 20) * 100)));
        factorTimePct.textContent = `${timeFactor}%`;
        factorTimeBar.style.width = `${timeFactor}%`;

        // Study completed factor
        factorStudyPct.textContent = `${state.studiedPercent}%`;
        factorStudyBar.style.width = `${state.studiedPercent}%`;

        // Syllabus size factor
        const syllabusFactorMap = { small: 25, medium: 50, large: 75, massive: 95 };
        const syllabusFactor = syllabusFactorMap[state.syllabusSize] || 50;
        factorSyllabusPct.textContent = `${syllabusFactor}%`;
        factorSyllabusBar.style.width = `${syllabusFactor}%`;

        // Foundation factor
        const basicsFactorMap = { yes: 20, some: 55, none: 90 };
        const basicsFactor = basicsFactorMap[state.basicsKnowledge] || 55;
        factorBasicsPct.textContent = `${basicsFactor}%`;
        factorBasicsBar.style.width = `${basicsFactor}%`;

        // 6. Dynamic Personalized Survival Plan
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
    // 8. SHARE & RE-TAKE INTERACTIONS
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
            } catch (e) {
                // User cancelled share
            }
        } else {
            // Fallback to copy
            copyResultBtn.click();
        }
    });

    retakeCalcBtn.addEventListener('click', () => {
        playSound('click');
        setStep(1);
        switchView('calculator');
    });

    // ----------------------------------------------------------------------
    // 9. FUN MICRO-INTERACTIONS & TOASTS
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
    // 10. MODAL DIALOGS
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
    aboutBtn.addEventListener('click', () => openModal(aboutModal));

    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            if (modal) closeModal(modal);
        });
    });

    [howModal, aboutModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (howModal.style.display === 'flex') closeModal(howModal);
            if (aboutModal.style.display === 'flex') closeModal(aboutModal);
        }
    });

    // ----------------------------------------------------------------------
    // 11. SUBTLE AMBIENT CANVAS PARTICLES (RESTFUL FLOATING EMBERS)
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

        // 35 subtle slow-moving warm ember particles
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
                hue: Math.random() > 0.6 ? 24 : 14 // warm orange / fire tones
            });
        }

        let animationFrameId;

        function animateAmbient() {
            ctx.clearRect(0, 0, width, height);

            for (let p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
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

        // Only run animation if user doesn't prefer reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            animateAmbient();
        }
    }

    // ----------------------------------------------------------------------
    // 12. INITIALIZATION
    // ----------------------------------------------------------------------
    initializeDefaultDate();
    updateStudySliderDisplay(studySlider.value);
});
