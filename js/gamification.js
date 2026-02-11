// ===================================
// Gamification Engine
// ===================================

// Points system
const POINTS = {
    LESSON_COMPLETE: 50,
    MODULE_COMPLETE: 100,
    QUIZ_PASS: 150,
    QUIZ_PERFECT: 200,
    DAILY_LOGIN: 10,
    FORUM_POST: 25,
    HELP_PEER: 30,
    WEEK_COMPLETE: 250
};

// Badge definitions
const BADGES = {
    FIRST_STEPS: {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: 'bi-star',
        requirement: { type: 'lessons', count: 1 }
    },
    QUICK_LEARNER: {
        id: 'quick_learner',
        name: 'Quick Learner',
        description: 'Complete a module in one day',
        icon: 'bi-lightning',
        requirement: { type: 'module_one_day', count: 1 }
    },
    QUIZ_MASTER: {
        id: 'quiz_master',
        name: 'Quiz Master',
        description: 'Score 100% on any quiz',
        icon: 'bi-trophy',
        requirement: { type: 'perfect_quiz', count: 1 }
    },
    HELPFUL_PEER: {
        id: 'helpful_peer',
        name: 'Helpful Peer',
        description: 'Help 5 classmates in the forum',
        icon: 'bi-people',
        requirement: { type: 'forum_helps', count: 5 }
    },
    WEEK_WARRIOR: {
        id: 'week_warrior',
        name: 'Week Warrior',
        description: 'Complete an entire week',
        icon: 'bi-calendar-check',
        requirement: { type: 'weeks', count: 1 }
    },
    CYBER_GUARDIAN: {
        id: 'cyber_guardian',
        name: 'Cyber Guardian',
        description: 'Master online safety modules',
        icon: 'bi-shield-check',
        requirement: { type: 'safety_modules', count: 2 }
    },
    COLLABORATION_CHAMPION: {
        id: 'collaboration_champion',
        name: 'Collaboration Champion',
        description: 'Complete all collaboration projects',
        icon: 'bi-diagram-3',
        requirement: { type: 'collaboration_complete', count: 1 }
    },
    DIGITAL_CITIZEN: {
        id: 'digital_citizen',
        name: 'Digital Citizen',
        description: 'Complete the entire course',
        icon: 'bi-award',
        requirement: { type: 'course_complete', count: 1 }
    }
};

// Level thresholds
const LEVELS = [
    { level: 1, points: 0 },
    { level: 2, points: 200 },
    { level: 3, points: 500 },
    { level: 4, points: 900 },
    { level: 5, points: 1400 },
    { level: 6, points: 2000 },
    { level: 7, points: 2700 },
    { level: 8, points: 3500 },
    { level: 9, points: 4400 },
    { level: 10, points: 5500 }
];

// ===================================
// Gamification Functions
// ===================================

// Award points
function awardPoints(pointType, customAmount = null) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    const points = customAmount || POINTS[pointType] || 0;

    userData.points += points;

    // Check for level up
    const newLevel = calculateLevel(userData.points);
    if (newLevel > userData.level) {
        userData.level = newLevel;
        showLevelUpNotification(newLevel);
    }

    localStorage.setItem('userData', JSON.stringify(userData));

    // Update UI
    updatePointsDisplay();

    return points;
}

// Calculate level based on points
function calculateLevel(points) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (points >= LEVELS[i].points) {
            return LEVELS[i].level;
        }
    }
    return 1;
}

// Show level up notification
function showLevelUpNotification(level) {
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
        <div class="level-up-content">
            <i class="bi bi-trophy fs-1 text-warning"></i>
            <h3 class="fw-bold mt-3">Level Up!</h3>
            <p class="fs-4">You've reached Level ${level}!</p>
            <button class="btn btn-primary mt-3" onclick="this.parentElement.parentElement.remove()">Awesome!</button>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Check and award badges
function checkBadges(actionType, actionData = {}) {
    let userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData.badges) {
        userData.badges = [];
    }

    if (!userData.badgeData) {
        userData.badgeData = {
            lessons_completed: 0,
            modules_completed: 0,
            perfect_quizzes: 0,
            forum_helps: 0,
            weeks_completed: 0,
            safety_modules_completed: 0
        };
    }

    // Update badge data based on action
    switch (actionType) {
        case 'lesson_complete':
            userData.badgeData.lessons_completed++;
            break;
        case 'module_complete':
            userData.badgeData.modules_completed++;
            if (actionData.moduleId && actionData.moduleId.includes('module-2')) {
                userData.badgeData.safety_modules_completed++;
            }
            break;
        case 'perfect_quiz':
            userData.badgeData.perfect_quizzes++;
            break;
        case 'forum_help':
            userData.badgeData.forum_helps++;
            break;
        case 'week_complete':
            userData.badgeData.weeks_completed++;
            break;
    }

    // Check each badge
    Object.values(BADGES).forEach(badge => {
        if (!userData.badges.includes(badge.id)) {
            if (checkBadgeRequirement(badge, userData.badgeData)) {
                userData.badges.push(badge.id);
                showBadgeUnlockedNotification(badge);
            }
        }
    });

    localStorage.setItem('userData', JSON.stringify(userData));
}

// Check if badge requirement is met
function checkBadgeRequirement(badge, badgeData) {
    const req = badge.requirement;

    switch (req.type) {
        case 'lessons':
            return badgeData.lessons_completed >= req.count;
        case 'perfect_quiz':
            return badgeData.perfect_quizzes >= req.count;
        case 'forum_helps':
            return badgeData.forum_helps >= req.count;
        case 'weeks':
            return badgeData.weeks_completed >= req.count;
        case 'safety_modules':
            return badgeData.safety_modules_completed >= req.count;
        case 'course_complete':
            return badgeData.modules_completed >= 8;
        default:
            return false;
    }
}

// Show badge unlocked notification
function showBadgeUnlockedNotification(badge) {
    window.appUtils.showNotification(
        'Badge Unlocked!',
        `You've earned the "${badge.name}" badge!`,
        'success'
    );
}

// Update points display
function updatePointsDisplay() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const pointsElements = document.querySelectorAll('[data-user-points]');
    const levelElements = document.querySelectorAll('[data-user-level]');

    pointsElements.forEach(el => {
        el.textContent = userData.points;
    });

    levelElements.forEach(el => {
        el.textContent = userData.level;
    });
}

// Get leaderboard data
function getLeaderboardData() {
    // In a real application, this would fetch from a server
    // For demo purposes, we'll generate sample data
    const userData = JSON.parse(localStorage.getItem('userData'));

    return [
        { name: userData.name, points: userData.points, level: userData.level, rank: 1 },
        { name: 'Sarah Johnson', points: 920, level: 5, rank: 2 },
        { name: 'Michael Chen', points: 850, level: 5, rank: 3 },
        { name: 'Fatima Hassan', points: 780, level: 4, rank: 4 },
        { name: 'David Mwangi', points: 720, level: 4, rank: 5 }
    ].sort((a, b) => b.points - a.points)
        .map((user, index) => ({ ...user, rank: index + 1 }));
}

// Display leaderboard
function displayLeaderboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const leaderboard = getLeaderboardData();
    const userData = JSON.parse(localStorage.getItem('userData'));

    container.innerHTML = leaderboard.map(user => `
        <div class="leaderboard-item ${user.name === userData.name ? 'current-user' : ''}">
            <div class="rank-badge">${user.rank}</div>
            <div class="user-info">
                <p class="mb-0 fw-bold">${user.name}</p>
                <small class="text-muted">Level ${user.level}</small>
            </div>
            <div class="user-points">
                <span class="fw-bold text-primary">${user.points}</span>
                <small class="text-muted">pts</small>
            </div>
        </div>
    `).join('');
}

// ===================================
// Streak Tracking
// ===================================
function updateStreak() {
    let userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData.streak) {
        userData.streak = {
            current: 0,
            longest: 0,
            lastLogin: null
        };
    }

    const today = new Date().toDateString();
    const lastLogin = userData.streak.lastLogin;

    if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastLogin === yesterday.toDateString()) {
            // Consecutive day
            userData.streak.current++;
            awardPoints('DAILY_LOGIN');
        } else {
            // Streak broken
            userData.streak.current = 1;
        }

        userData.streak.lastLogin = today;

        if (userData.streak.current > userData.streak.longest) {
            userData.streak.longest = userData.streak.current;
        }

        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

// ===================================
// Initialize Gamification
// ===================================
function initializeGamification() {
    updateStreak();
    updatePointsDisplay();
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', initializeGamification);

// ===================================
// Export functions
// ===================================
window.gamification = {
    awardPoints,
    checkBadges,
    getLeaderboardData,
    displayLeaderboard,
    updateStreak,
    POINTS,
    BADGES,
    LEVELS
};
