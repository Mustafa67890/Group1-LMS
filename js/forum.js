// ===================================
// Forum JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    initializeForum();
    initializeForumPlaceholders();
});

// ===================================
// Forum Initialization
// ===================================
function initializeForum() {
    setupCategoryFilters();
    setupPostActions();
}

// ===================================
// Category Filters
// ===================================
function setupCategoryFilters() {
    const categoryTabs = document.querySelectorAll('.category-tab');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));

            // Add active to clicked tab
            this.classList.add('active');

            // Filter posts
            const category = this.getAttribute('data-category');
            filterPosts(category);
        });
    });
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.discussion-post');

    posts.forEach(post => {
        if (category === 'all') {
            post.style.display = 'flex';
        } else {
            const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
            post.style.display = postCategory.includes(category) ? 'flex' : 'none';
        }
    });
}

// ===================================
// Post Actions
// ===================================
function setupPostActions() {
    // Like buttons
    document.querySelectorAll('.post-actions button').forEach(button => {
        if (button.textContent.includes('Like')) {
            button.addEventListener('click', function () {
                handleLike(this);
            });
        }
    });
}

function handleLike(button) {
    const post = button.closest('.discussion-post');
    const likesSpan = post.querySelector('.post-likes');

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        button.innerHTML = '<i class="bi bi-heart"></i> Like';
    } else {
        button.classList.add('liked');
        button.innerHTML = '<i class="bi bi-heart-fill"></i> Liked';

        // Award points for helping peers
        window.gamification.awardPoints('FORUM_POST');
        window.gamification.checkBadges('forum_help');
    }
}

// ===================================
// Create New Post
// ===================================
function createNewPost(title, category, description) {
    const post = {
        id: Date.now(),
        title: title,
        category: category,
        description: description,
        author: 'Amjad Hussain',
        timestamp: new Date(),
        replies: 0,
        likes: 0
    };

    // In a real application, this would be sent to a server
    // For now, we'll just show a success notification
    window.appUtils.showNotification(
        'Post Created!',
        'Your post has been published to the forum',
        'success'
    );

    // Award points
    window.gamification.awardPoints('FORUM_POST');
}

// ===================================
// Initialize Forum Placeholders
// ===================================
function initializeForumPlaceholders() {
    // Generate placeholder avatars for forum users
    const forumUsers = [
        { id: 'forumUser1', initials: 'SM', color: '#4CAF50' },
        { id: 'forumUser2', initials: 'JK', color: '#2196F3' },
        { id: 'forumUser3', initials: 'GN', color: '#FF9800' },
        { id: 'forumUser4', initials: 'DO', color: '#9C27B0' }
    ];

    forumUsers.forEach(user => {
        const element = document.getElementById(user.id);
        if (element && !element.src.includes('http')) {
            element.src = generateAvatarPlaceholder(user.initials, user.color);
        }
    });

    // Contributors
    const contributors = [
        { id: 'contributor1', initials: 'GN', color: '#4CAF50' },
        { id: 'contributor2', initials: 'MC', color: '#2196F3' },
        { id: 'contributor3', initials: 'SM', color: '#FF9800' }
    ];

    contributors.forEach(contributor => {
        const element = document.getElementById(contributor.id);
        if (element && !element.src.includes('http')) {
            element.src = generateAvatarPlaceholder(contributor.initials, contributor.color);
        }
    });
}

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
// Export functions
// ===================================
window.forumUtils = {
    createNewPost,
    handleLike
};
