// ===================================
// Main JavaScript - Core Functionality
// ===================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    initializePlaceholderImages();
});

// ===================================
// App Initialization
// ===================================
function initializeApp() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');

            // Create overlay for mobile
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);

                overlay.addEventListener('click', function () {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
            overlay.classList.toggle('active');
        });
    }

    // Initialize user session
    initializeUserSession();

    // Initialize progress tracking
    initializeProgressTracking();
}

// ===================================
// User Session Management
// ===================================
function initializeUserSession() {
    // Check if user data exists in localStorage
    let userData = localStorage.getItem('userData');

    if (!userData) {
        // Create default user data
        userData = {
            name: 'Amjad Hussain',
            level: 5,
            points: 850,
            badges: 3,
            completedModules: ['module-1-1', 'module-1-2', 'module-2-1'],
            currentCourse: 'Digital Tools & Online Safety',
            progress: 45
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        userData = JSON.parse(userData);
    }

    return userData;
}

// ===================================
// Progress Tracking
// ===================================
function initializeProgressTracking() {
    const userData = initializeUserSession();

    // Update progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Update user progress
function updateProgress(moduleId, completed = true) {
    let userData = JSON.parse(localStorage.getItem('userData'));

    if (completed && !userData.completedModules.includes(moduleId)) {
        userData.completedModules.push(moduleId);

        // Award points
        userData.points += 100;

        // Check for level up
        const newLevel = Math.floor(userData.points / 200) + 1;
        if (newLevel > userData.level) {
            userData.level = newLevel;
            showNotification('Level Up!', `You've reached Level ${newLevel}!`, 'success');
        }

        // Update overall progress
        const totalModules = 8; // 4 weeks × 2 modules per week
        userData.progress = Math.round((userData.completedModules.length / totalModules) * 100);

        localStorage.setItem('userData', JSON.stringify(userData));

        // Show achievement notification
        showNotification('Module Completed!', `You earned 100 points!`, 'success');
    }
}

// ===================================
// Notifications
// ===================================
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h6 class="notification-title">${title}</h6>
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add to DOM
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    container.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===================================
// Placeholder Image Generation
// ===================================
function initializePlaceholderImages() {
    // User avatar
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar && !userAvatar.src.includes('http')) {
        userAvatar.src = generateAvatarPlaceholder('AH', '#4CAF50');
    }

    // Upgrade illustration
    const upgradeIllustration = document.getElementById('upgradeIllustration');
    if (upgradeIllustration && !upgradeIllustration.src.includes('http')) {
        upgradeIllustration.src = generatePlaceholderSVG(200, 150, 'Upgrade', '#2196F3');
    }

    // Instructor avatars
    for (let i = 1; i <= 3; i++) {
        const instructor = document.getElementById(`instructor${i}`);
        if (instructor && !instructor.src.includes('http')) {
            const initials = ['JO', 'RI', 'JO'][i - 1];
            const colors = ['#4CAF50', '#FF9800', '#2196F3'][i - 1];
            instructor.src = generateAvatarPlaceholder(initials, colors);
        }
    }
}

// Generate SVG placeholder
function generatePlaceholderSVG(width, height, text, color) {
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${color}15"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" 
                  fill="${color}" text-anchor="middle" dominant-baseline="middle">
                ${text}
            </text>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// Generate avatar placeholder
function generateAvatarPlaceholder(initials, color) {
    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="${color}"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="36" 
                  font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
                ${initials}
            </text>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// ===================================
// Utility Functions
// ===================================

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Calculate time ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return Math.floor(seconds) + ' seconds ago';
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===================================
// Export functions for use in other scripts
// ===================================
window.appUtils = {
    updateProgress,
    showNotification,
    formatDate,
    timeAgo,
    smoothScrollTo,
    initializeUserSession
};
