// ===================================
// Quiz Engine
// ===================================

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;

// ===================================
// Quiz Data Structure
// ===================================
const QUIZ_DATA = {
    'module-1-1': {
        title: 'Computer Fundamentals Quiz',
        description: 'Test your knowledge of basic computer operations',
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: 'What is the brain of the computer called?',
                options: ['Monitor', 'CPU (Central Processing Unit)', 'Keyboard', 'Mouse'],
                correctAnswer: 1,
                explanation: 'The CPU is the central processing unit, often called the "brain" of the computer because it processes all instructions.'
            },
            {
                id: 2,
                question: 'Which of the following is an input device?',
                options: ['Printer', 'Monitor', 'Keyboard', 'Speaker'],
                correctAnswer: 2,
                explanation: 'A keyboard is an input device because it allows you to enter data into the computer.'
            },
            {
                id: 3,
                question: 'What does RAM stand for?',
                options: ['Random Access Memory', 'Read All Memory', 'Run All Memory', 'Rapid Access Memory'],
                correctAnswer: 0,
                explanation: 'RAM stands for Random Access Memory, which is temporary storage used while the computer is running.'
            },
            {
                id: 4,
                question: 'Which storage device has the largest capacity?',
                options: ['USB Flash Drive', 'CD-ROM', 'Hard Disk Drive', 'Floppy Disk'],
                correctAnswer: 2,
                explanation: 'Hard Disk Drives typically have the largest storage capacity among these options.'
            },
            {
                id: 5,
                question: 'What is the main function of an operating system?',
                options: [
                    'To browse the internet',
                    'To manage computer hardware and software',
                    'To create documents',
                    'To play games'
                ],
                correctAnswer: 1,
                explanation: 'The operating system manages all hardware and software on the computer, acting as an intermediary between users and the computer hardware.'
            }
        ]
    },
    'module-2-1': {
        title: 'Safe Browsing Practices Quiz',
        description: 'Test your knowledge of internet safety',
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: 'What does HTTPS in a website URL indicate?',
                options: [
                    'The website is very fast',
                    'The website is secure and encrypted',
                    'The website has many pages',
                    'The website is popular'
                ],
                correctAnswer: 1,
                explanation: 'HTTPS indicates that the connection between your browser and the website is encrypted and secure.'
            },
            {
                id: 2,
                question: 'Which of these is a sign of a phishing email?',
                options: [
                    'It comes from a known sender',
                    'It asks you to click a link and enter personal information',
                    'It has proper grammar',
                    'It has a company logo'
                ],
                correctAnswer: 1,
                explanation: 'Phishing emails often try to trick you into clicking links and entering personal information on fake websites.'
            },
            {
                id: 3,
                question: 'What should you do if you receive a suspicious email?',
                options: [
                    'Click all the links to investigate',
                    'Reply with your personal information',
                    'Delete it and report it as spam',
                    'Forward it to all your contacts'
                ],
                correctAnswer: 2,
                explanation: 'The safest action is to delete suspicious emails and mark them as spam to protect yourself and others.'
            },
            {
                id: 4,
                question: 'What is a strong password?',
                options: [
                    'Your name and birthday',
                    'A mix of letters, numbers, and symbols',
                    'The word "password"',
                    'Your phone number'
                ],
                correctAnswer: 1,
                explanation: 'Strong passwords combine uppercase and lowercase letters, numbers, and special symbols to make them harder to guess.'
            },
            {
                id: 5,
                question: 'Why should you avoid using public Wi-Fi for banking?',
                options: [
                    'It is too slow',
                    'It may not be secure and hackers can intercept your data',
                    'It costs money',
                    'It is illegal'
                ],
                correctAnswer: 1,
                explanation: 'Public Wi-Fi networks are often unsecured, making it easier for hackers to intercept sensitive information like banking details.'
            }
        ]
    },
    'module-2-2': {
        title: 'Cybersecurity Basics Quiz',
        description: 'Test your understanding of online threats and protection',
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: 'What is malware?',
                options: [
                    'A type of hardware',
                    'Malicious software designed to harm your computer',
                    'A web browser',
                    'An email service'
                ],
                correctAnswer: 1,
                explanation: 'Malware is short for malicious software - programs designed to damage, disrupt, or gain unauthorized access to computer systems.'
            },
            {
                id: 2,
                question: 'What is the purpose of antivirus software?',
                options: [
                    'To speed up your computer',
                    'To detect and remove malicious software',
                    'To browse the internet',
                    'To create documents'
                ],
                correctAnswer: 1,
                explanation: 'Antivirus software scans your computer for malicious programs and removes them to keep your system safe.'
            },
            {
                id: 3,
                question: 'What is two-factor authentication?',
                options: [
                    'Using two passwords',
                    'An extra layer of security requiring two forms of verification',
                    'Having two email accounts',
                    'Using two different browsers'
                ],
                correctAnswer: 1,
                explanation: 'Two-factor authentication adds an extra security layer by requiring two different forms of verification, like a password and a code sent to your phone.'
            },
            {
                id: 4,
                question: 'What should you do before downloading software from the internet?',
                options: [
                    'Download it immediately',
                    'Verify it is from a trusted source',
                    'Share it with friends',
                    'Turn off your antivirus'
                ],
                correctAnswer: 1,
                explanation: 'Always verify that software comes from a trusted, official source before downloading to avoid malware.'
            },
            {
                id: 5,
                question: 'What is social engineering in cybersecurity?',
                options: [
                    'Building social media websites',
                    'Manipulating people to reveal confidential information',
                    'Creating computer networks',
                    'Designing user interfaces'
                ],
                correctAnswer: 1,
                explanation: 'Social engineering is a manipulation technique that exploits human psychology to trick people into revealing sensitive information.'
            }
        ]
    }
};

// ===================================
// Initialize Quiz
// ===================================
function initializeQuiz(moduleId) {
    currentQuiz = QUIZ_DATA[moduleId];
    if (!currentQuiz) {
        console.error('Quiz not found for module:', moduleId);
        return;
    }

    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;

    displayQuizIntro();
}

// ===================================
// Display Quiz Introduction
// ===================================
function displayQuizIntro() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    quizContainer.innerHTML = `
        <div class="quiz-intro text-center">
            <i class="bi bi-question-circle fs-1 text-primary mb-3"></i>
            <h2 class="fw-bold mb-3">${currentQuiz.title}</h2>
            <p class="lead mb-4">${currentQuiz.description}</p>
            <div class="quiz-info mb-4">
                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="info-box">
                            <i class="bi bi-list-ol text-primary"></i>
                            <p class="mb-0"><strong>${currentQuiz.questions.length}</strong> Questions</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info-box">
                            <i class="bi bi-clock text-primary"></i>
                            <p class="mb-0"><strong>~${currentQuiz.questions.length * 2}</strong> Minutes</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info-box">
                            <i class="bi bi-trophy text-primary"></i>
                            <p class="mb-0"><strong>${currentQuiz.passingScore}%</strong> to Pass</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary btn-lg" onclick="startQuiz()">
                <i class="bi bi-play-circle me-2"></i>Start Quiz
            </button>
        </div>
    `;
}

// ===================================
// Start Quiz
// ===================================
function startQuiz() {
    displayQuestion();
}

// ===================================
// Display Question
// ===================================
function displayQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    const question = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    quizContainer.innerHTML = `
        <div class="quiz-header">
            <div class="quiz-progress">
                <span>Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</span>
                <span>${Math.round(progress)}% Complete</span>
            </div>
            <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-primary" style="width: ${progress}%"></div>
            </div>
        </div>
        
        <div class="question-card">
            <h4 class="question-text">${question.question}</h4>
            <div class="answer-options" id="answerOptions">
                ${question.options.map((option, index) => `
                    <div class="answer-option" onclick="selectAnswer(${index})">
                        <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                        <span>${option}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="quiz-actions">
            <button class="btn btn-outline-secondary" onclick="previousQuestion()" 
                    ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                <i class="bi bi-arrow-left me-2"></i>Previous
            </button>
            <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()" disabled>
                Next<i class="bi bi-arrow-right ms-2"></i>
            </button>
        </div>
    `;

    // Restore previous answer if exists
    if (userAnswers[currentQuestionIndex] !== undefined) {
        selectAnswer(userAnswers[currentQuestionIndex], false);
    }
}

// ===================================
// Select Answer
// ===================================
function selectAnswer(index, saveAnswer = true) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Add selection to clicked option
    const options = document.querySelectorAll('.answer-option');
    if (options[index]) {
        options[index].classList.add('selected');
    }

    // Save answer
    if (saveAnswer) {
        userAnswers[currentQuestionIndex] = index;
    }

    // Enable next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

// ===================================
// Next Question
// ===================================
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        window.appUtils.showNotification('Please select an answer', '', 'warning');
        return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.questions.length) {
        displayQuestion();
    } else {
        calculateScore();
        displayResults();
    }
}

// ===================================
// Previous Question
// ===================================
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// ===================================
// Calculate Score
// ===================================
function calculateScore() {
    quizScore = 0;

    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            quizScore++;
        }
    });
}

// ===================================
// Display Results
// ===================================
function displayResults() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    const percentage = Math.round((quizScore / currentQuiz.questions.length) * 100);
    const passed = percentage >= currentQuiz.passingScore;

    // Award points based on performance
    if (percentage === 100) {
        window.gamification.awardPoints('QUIZ_PERFECT');
        window.gamification.checkBadges('perfect_quiz');
    } else if (passed) {
        window.gamification.awardPoints('QUIZ_PASS');
    }

    quizContainer.innerHTML = `
        <div class="quiz-result">
            <div class="result-icon mb-4">
                <i class="bi ${passed ? 'bi-check-circle text-success' : 'bi-x-circle text-danger'}" 
                   style="font-size: 5rem;"></i>
            </div>
            <h2 class="fw-bold mb-3">${passed ? 'Congratulations!' : 'Keep Trying!'}</h2>
            <div class="result-score">${percentage}%</div>
            <p class="result-message">${passed ? 'You passed the quiz!' : 'You need ' + currentQuiz.passingScore + '% to pass'}</p>
            
            <div class="result-stats">
                <div class="stat-box">
                    <div class="stat-value">${quizScore}</div>
                    <div class="stat-label">Correct</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${currentQuiz.questions.length - quizScore}</div>
                    <div class="stat-label">Incorrect</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${passed ? '+' + window.gamification.POINTS[percentage === 100 ? 'QUIZ_PERFECT' : 'QUIZ_PASS'] : '0'}</div>
                    <div class="stat-label">Points</div>
                </div>
            </div>
            
            <div class="mt-4">
                <button class="btn btn-primary me-2" onclick="reviewAnswers()">
                    <i class="bi bi-eye me-2"></i>Review Answers
                </button>
                <button class="btn btn-outline-primary" onclick="retakeQuiz()">
                    <i class="bi bi-arrow-repeat me-2"></i>Retake Quiz
                </button>
            </div>
        </div>
    `;

    // Update module completion if passed
    if (passed) {
        const moduleId = sessionStorage.getItem('currentModule');
        if (moduleId) {
            window.appUtils.updateProgress(moduleId, true);
            window.gamification.checkBadges('module_complete', { moduleId });
        }
    }
}

// ===================================
// Review Answers
// ===================================
function reviewAnswers() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    quizContainer.innerHTML = `
        <div class="quiz-review">
            <h3 class="fw-bold mb-4">Answer Review</h3>
            ${currentQuiz.questions.map((question, qIndex) => {
        const userAnswer = userAnswers[qIndex];
        const isCorrect = userAnswer === question.correctAnswer;

        return `
                    <div class="review-question mb-4">
                        <h5 class="mb-3">
                            <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'} me-2">
                                ${qIndex + 1}
                            </span>
                            ${question.question}
                        </h5>
                        <div class="answer-options">
                            ${question.options.map((option, oIndex) => {
            let className = 'answer-option';
            if (oIndex === question.correctAnswer) {
                className += ' correct';
            } else if (oIndex === userAnswer && !isCorrect) {
                className += ' incorrect';
            }

            return `
                                    <div class="${className}">
                                        <div class="option-letter">${String.fromCharCode(65 + oIndex)}</div>
                                        <span>${option}</span>
                                        ${oIndex === question.correctAnswer ? '<i class="bi bi-check-circle-fill text-success ms-auto"></i>' : ''}
                                        ${oIndex === userAnswer && !isCorrect ? '<i class="bi bi-x-circle-fill text-danger ms-auto"></i>' : ''}
                                    </div>
                                `;
        }).join('')}
                        </div>
                        <div class="alert alert-info mt-2">
                            <strong>Explanation:</strong> ${question.explanation}
                        </div>
                    </div>
                `;
    }).join('')}
            
            <button class="btn btn-primary" onclick="window.location.href='courses.html'">
                Back to Courses
            </button>
        </div>
    `;
}

// ===================================
// Retake Quiz
// ===================================
function retakeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    displayQuizIntro();
}

// ===================================
// Export functions
// ===================================
window.quizEngine = {
    initializeQuiz,
    startQuiz,
    QUIZ_DATA
};
