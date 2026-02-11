// ===================================
// Courses JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    initializeCourses();
});

// ===================================
// Courses Initialization
// ===================================
function initializeCourses() {
    loadCourseProgress();
    setupModuleNavigation();
}

// ===================================
// Load Course Progress
// ===================================
function loadCourseProgress() {
    const userData = window.appUtils.initializeUserSession();

    // Update overall progress
    const overallProgress = document.getElementById('overallProgress');
    const overallProgressBar = document.getElementById('overallProgressBar');
    const totalPoints = document.getElementById('totalPoints');

    if (overallProgress) {
        overallProgress.textContent = userData.progress + '%';
    }

    if (overallProgressBar) {
        overallProgressBar.style.width = userData.progress + '%';
    }

    if (totalPoints) {
        totalPoints.textContent = userData.points;
    }

    // Update module states based on completed modules
    updateModuleStates(userData.completedModules);
}

// ===================================
// Update Module States
// ===================================
function updateModuleStates(completedModules) {
    const allModules = document.querySelectorAll('.module-card');

    allModules.forEach((module, index) => {
        const moduleId = module.getAttribute('data-module-id');

        if (completedModules.includes(moduleId)) {
            module.classList.add('completed');
            module.classList.remove('in-progress', 'locked');
        } else if (index === completedModules.length) {
            // Next module should be in progress
            module.classList.add('in-progress');
            module.classList.remove('completed', 'locked');
        }
    });
}

// ===================================
// Module Navigation
// ===================================
function setupModuleNavigation() {
    // This would typically navigate to a module detail page
    // For now, we'll show a modal or redirect
}

function openModule(moduleId) {
    // Store current module in session
    sessionStorage.setItem('currentModule', moduleId);

    // Navigate to module page
    window.location.href = `module.html?id=${moduleId}`;
}

// ===================================
// Module Unlock Logic
// ===================================
function unlockNextModule() {
    const userData = window.appUtils.initializeUserSession();
    const allModules = ['module-1-1', 'module-1-2', 'module-2-1', 'module-2-2',
        'module-3-1', 'module-3-2', 'module-4-1', 'module-4-2'];

    const nextModuleIndex = userData.completedModules.length;

    if (nextModuleIndex < allModules.length) {
        const nextModule = allModules[nextModuleIndex];
        window.appUtils.showNotification(
            'New Module Unlocked!',
            `You can now access ${getModuleName(nextModule)}`,
            'success'
        );
    }
}

function getModuleName(moduleId) {
    const moduleNames = {
        'module-1-1': 'Computer Fundamentals',
        'module-1-2': 'Word Processing Fundamentals',
        'module-2-1': 'Safe Browsing Practices',
        'module-2-2': 'Cybersecurity Basics',
        'module-3-1': 'Online Communication',
        'module-3-2': 'Peer Collaboration Projects',
        'module-4-1': 'Ethical Technology Use',
        'module-4-2': 'Final Project & Certification'
    };

    return moduleNames[moduleId] || 'Unknown Module';
}

// ===================================
// Export functions
// ===================================
window.coursesUtils = {
    openModule,
    unlockNextModule,
    getModuleName
};
