const questions = [
    {
        question: "1. Você já tentou ganhar dinheiro pela internet?",
        options: [
            "Sim, e tive resultados.",
            "Sim, mas não consegui resultados.",
            "Nunca tentei.",
            "Estou procurando uma oportunidade agora."
        ]
    },
    {
        question: "2. Qual sua principal motivação hoje?",
        options: [
            "Aumentar minha renda.",
            "Ter uma renda extra.",
            "Sair das dívidas.",
            "Conquistar mais liberdade financeira."
        ]
    },
    {
        question: "3. Quanto você gostaria de ganhar por mês?",
        options: [
            "Até R$1.000",
            "R$1.000 a R$3.000",
            "R$3.000 a R$10.000",
            "Acima de R$10.000"
        ]
    },
    {
        question: "4. Você conhece o mercado de métodos digitais?",
        options: [
            "Sim, bastante.",
            "Conheço um pouco.",
            "Já ouvi falar.",
            "Não conheço."
        ]
    },
    {
        question: "5. Quanto tempo por dia você consegue dedicar para aprender uma nova fonte de renda?",
        options: [
            "Menos de 1 hora.",
            "1 a 2 horas.",
            "2 a 4 horas.",
            "Mais de 4 horas."
        ]
    },
    {
        question: "6. Você estaria disposto a aprender estratégias utilizadas por pessoas que já faturam online?",
        options: [
            "Sim.",
            "Talvez.",
            "Ainda tenho dúvidas.",
            "Não."
        ]
    },
    {
        question: "7. Se encontrasse um método que fizesse sentido para você, começaria quando?",
        options: [
            "Hoje mesmo.",
            "Esta semana.",
            "Este mês.",
            "Ainda não sei."
        ]
    }
];

let currentQuestionIndex = 0;

// DOM Elements
const screenWelcome = document.getElementById('screen-welcome');
const screenQuiz = document.getElementById('screen-quiz');
const screenLoading = document.getElementById('screen-loading');
const screenResult = document.getElementById('screen-result');

const startBtn = document.getElementById('startBtn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const scoreText = document.getElementById('scoreText');
const timerDisplay = document.getElementById('timerDisplay');
const whatsappBtn = document.getElementById('whatsappBtn');

// Event Listeners
startBtn.addEventListener('click', startQuiz);

function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    setTimeout(() => {
        toScreen.classList.add('active');
    }, 400); // Matches CSS transition time
}

function startQuiz() {
    // [PIXEL/ANALYTICS] Disparar evento de início
    console.log("EVENT: Quiz_Started");
    if (typeof fbq === 'function') fbq('trackCustom', 'Quiz_Started');
    
    progressContainer.style.display = 'block';
    updateProgress();
    renderQuestion();
    switchScreen(screenWelcome, screenQuiz);
}

function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        // Add animation delay for staggered entrance
        btn.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
        btn.style.opacity = '0';
        
        btn.addEventListener('click', handleOptionClick);
        optionsContainer.appendChild(btn);
    });
}

function handleOptionClick() {
    // Feedback tátil sutil para celulares
    if (navigator.vibrate) navigator.vibrate(50);
    
    currentQuestionIndex++;
    updateProgress();
    
    if (currentQuestionIndex < questions.length) {
        // Fade out current options quickly before rendering new ones
        optionsContainer.style.opacity = '0';
        setTimeout(() => {
            renderQuestion();
            optionsContainer.style.opacity = '1';
        }, 300);
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    // Show Loading
    switchScreen(screenQuiz, screenLoading);
    progressBar.style.width = '100%';
    
    // Simulate AI Calculation delay
    setTimeout(() => {
        showResult();
    }, 3000); // 3 seconds calculating
}

function showResult() {
    // Generate a high score for positive reinforcement
    const finalScore = Math.floor(Math.random() * (99 - 94 + 1)) + 94; // Random between 94 and 99
    
    // Animate score counting up
    let currentScore = 0;
    const duration = 1500; // 1.5s
    const interval = 20;
    const steps = duration / interval;
    const stepValue = finalScore / steps;
    
    switchScreen(screenLoading, screenResult);
    
    // [PIXEL/ANALYTICS] Disparar evento de conversão
    console.log("EVENT: Lead_Qualified");
    if (typeof fbq === 'function') fbq('track', 'Lead');
    
    // Captura de UTMs e repasse para link do Whatsapp
    const urlParams = new URLSearchParams(window.location.search);
    let utmData = [];
    urlParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
            utmData.push(`${key}=${value}`);
        }
    });
    
    if (utmData.length > 0) {
        console.log("UTMs capturadas: ", utmData.join('&'));
        // Como o link atual é encurtado (wa.me/message/...), parâmetros via URL podem não funcionar diretamente nele.
        // O ideal é usar o link com número: https://wa.me/55ddd99999999?text=texto
        // Exemplo: whatsappBtn.href = `https://wa.me/5511999999999?text=Olá! Quero liberar meu acesso.%0A%0A(Origem: ${utmData.join(', ')})`;
    }
    
    // Inicia o contador regressivo
    startTimer();
    
    const counter = setInterval(() => {
        currentScore += stepValue;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(counter);
        }
        scoreText.textContent = Math.floor(currentScore);
    }, interval);
}

// Keyframes for staggered entrance injected via JS (could also be in CSS)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

function startTimer() {
    let timeLeft = 600; // 10 minutos (em segundos)
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            timerDisplay.style.color = "#ff4444";
        }
    }, 1000);
}
