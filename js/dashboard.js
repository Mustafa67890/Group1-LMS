// ===================================
// Dashboard JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    initializeDashboard();
});

// ===================================
// Dashboard Initialization
// ===================================
function initializeDashboard() {
    initializeCalendar();
    initializeActivityChart();
    initializeCourseFilters();
    loadDashboardData();
}

// ===================================
// Calendar Functionality
// ===================================
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    // Days of week headers
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of month
    const completedDays = [2, 5, 9, 12, 16, 19, 23]; // Example completed days

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (day === currentDay) {
            dayElement.classList.add('active');
        }

        if (completedDays.includes(day)) {
            dayElement.classList.add('completed');
        }

        dayElement.addEventListener('click', function () {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });

        calendarGrid.appendChild(dayElement);
    }
}

// ===================================
// Activity Chart
// ===================================
function initializeActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Sample data for the week
    const data = {
        labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Activity',
            data: [30, 45, 60, 40, 70, 55, 65],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#4CAF50',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    borderRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y + '% activity';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

// ===================================
// Course Filters
// ===================================
function initializeCourseFilters() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter courses based on selection
            const filter = this.textContent.toLowerCase();
            filterCourses(filter);
        });
    });
}

function filterCourses(filter) {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        const progressText = card.querySelector('.progress-bar').style.width;
        const progress = parseInt(progressText);

        let show = true;

        if (filter === 'completed') {
            show = progress === 100;
        } else if (filter === 'in progress') {
            show = progress > 0 && progress < 100;
        }

        card.closest('.col-md-4').style.display = show ? 'block' : 'none';
    });
}

// ===================================
// Load Dashboard Data
// ===================================
function loadDashboardData() {
    const userData = window.appUtils.initializeUserSession();

    // Update welcome message
    const welcomeHeading = document.querySelector('.welcome-card h2');
    if (welcomeHeading) {
        welcomeHeading.textContent = `Hi ${userData.name}`;
    }

    // Update progress
    const progressFill = document.querySelector('.welcome-card .progress-fill');
    if (progressFill) {
        progressFill.style.width = userData.progress + '%';
    }

    const progressText = document.querySelector('.welcome-card p');
    if (progressText) {
        progressText.innerHTML = `You Have Completed ${userData.progress}% of your course<br>Please check your progress`;
    }

    // Update gamification stats
    const badgeStats = document.querySelectorAll('.badge-stat span');
    if (badgeStats.length >= 3) {
        badgeStats[0].textContent = `Level ${userData.level}`;
        badgeStats[1].textContent = `${userData.points} Points`;
        badgeStats[2].textContent = `${userData.badges} Badges`;
    }
}

// ===================================
// Course Progress Update
// ===================================
function updateCourseProgress(courseId, progress) {
    const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
    if (!courseCard) return;

    const progressBar = courseCard.querySelector('.progress-bar');
    const progressText = courseCard.querySelector('.progress-wrapper small:last-child');

    if (progressBar) {
        progressBar.style.width = progress + '%';

        // Update color based on progress
        progressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
        if (progress >= 70) {
            progressBar.classList.add('bg-success');
        } else if (progress >= 40) {
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.add('bg-danger');
        }
    }

    if (progressText) {
        progressText.textContent = progress + '%';
    }
}

// ===================================
// Export functions
// ===================================
window.dashboardUtils = {
    updateCourseProgress,
    loadDashboardData
};
