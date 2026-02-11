# Digital Tools & Online Safety - Learning Management System

A blended Learning Management System designed for Form 2 students in rural Tanzania, focusing on ICT skills development with limited internet access.

## 🎯 Overview

This LMS implements a 4-week course titled **"Introduction to Digital Tools and Online Safety"** combining:
- **30%** in-school computer lab sessions
- **70%** mobile-accessible online content

## 📚 Educational Framework

### Learning Theory
- **Social Development Theory (Vygotsky)**: Collaborative learning through peer interaction and discussion forums
- **Self-Determination Theory**: Gamification for motivation (autonomy, competence, relatedness)

### Instructional Design
- **ADDIE Model**: Systematic approach to course development
  - Analysis: Identified need for basic ICT skills
  - Design: 4-week blended course structure
  - Development: Interactive multimedia content
  - Implementation: Mobile-first LMS
  - Evaluation: Continuous assessment and feedback

## ✨ Features

### 🎮 Gamification System
- **Points**: Earn points for completing lessons, quizzes, and helping peers
- **Badges**: 8 unique badges to unlock
- **Levels**: Progress through 10 levels
- **Leaderboard**: Compete with classmates
- **Streaks**: Daily login rewards

### 📖 Course Structure
**Week 1: Digital Tools Basics**
- Module 1: Computer Fundamentals
- Module 2: Word Processing Fundamentals

**Week 2: Internet & Online Safety**
- Module 3: Safe Browsing Practices
- Module 4: Cybersecurity Basics

**Week 3: Collaboration Tools**
- Module 5: Online Communication
- Module 6: Peer Collaboration Projects

**Week 4: Digital Citizenship**
- Module 7: Ethical Technology Use
- Module 8: Final Project & Certification

### 🧪 Assessment System
- Interactive quizzes with immediate feedback
- Multiple-choice questions
- Automated grading
- Answer explanations
- Progress tracking

### 💬 Discussion Forum
- Peer-to-peer support
- Category-based discussions
- Top contributors recognition
- Forum guidelines

### 📱 Mobile-First Design
- Responsive layout for all devices
- Optimized for low bandwidth
- Touch-friendly interface
- Progressive content loading

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser
- LocalStorage enabled for progress tracking

### Installation

1. **Download or clone the project**
   ```bash
   git clone <repository-url>
   cd LEARNING-SYSTEM
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **Access the LMS**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or directly open `index.html`

## 📁 Project Structure

```
LEARNING-SYSTEM/
├── index.html              # Landing page
├── dashboard.html          # Student dashboard
├── courses.html           # Course catalog
├── module.html            # Individual module view
├── forum.html             # Discussion forum
├── quiz.html              # Quiz interface
├── css/
│   ├── main.css          # Core styles
│   ├── dashboard.css     # Dashboard styles
│   ├── modules.css       # Module & quiz styles
│   └── forum.css         # Forum styles
├── js/
│   ├── main.js           # Core functionality
│   ├── dashboard.js      # Dashboard logic
│   ├── courses.js        # Course navigation
│   ├── gamification.js   # Points, badges, levels
│   ├── quiz-engine.js    # Quiz functionality
│   └── forum.js          # Forum features
├── data/
│   └── course-content.json  # Course data (future)
└── assets/
    └── images/           # Images and icons
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Interactive functionality
- **Bootstrap 5.3**: Responsive framework
- **Bootstrap Icons**: Icon library
- **Chart.js**: Activity visualization
- **LocalStorage API**: Client-side data persistence

## 🎯 Key Features Explained

### Gamification Engine
The gamification system awards points for various activities:
- Lesson completion: 50 points
- Module completion: 100 points
- Quiz pass: 150 points
- Perfect quiz score: 200 points
- Daily login: 10 points
- Forum participation: 25-30 points

### Progress Tracking
- Real-time progress updates
- Visual progress bars
- Module completion status
- Overall course completion percentage

### Quiz System
- 5 questions per module
- Immediate feedback
- Detailed explanations
- Review mode
- Retake option
- 70% passing score

### Accessibility
- Keyboard navigation
- Screen reader friendly
- High contrast ratios
- Touch-friendly buttons (min 44x44px)
- Responsive text sizing

## 📊 Learning Analytics

The dashboard provides:
- Weekly activity chart
- Course progress overview
- Points and level display
- Badge collection
- Upcoming assessments

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Data Privacy

- All data stored locally in browser
- No external data transmission
- No user registration required
- Can be used offline (after initial load)

## 🤝 Contributing

This is an educational project. Suggestions for improvement:
1. Add more quiz questions
2. Create additional learning modules
3. Enhance mobile experience
4. Add more gamification elements
5. Improve accessibility features

## 📝 License

This project is created for educational purposes.

## 👥 Credits

**Developed for**: ICT Teachers, Private Secondary School, Tanzania
**Target Audience**: Form 2 Students (60 students)
**Course Duration**: 4 weeks
**Learning Theories**: Social Development Theory, Self-Determination Theory
**Design Model**: ADDIE

## 🆘 Support

For questions or issues:
1. Check the forum guidelines
2. Review module content
3. Contact your ICT teacher

## 🎓 Learning Outcomes

By completing this course, students will:
1. Understand basic computer operations
2. Create and format documents
3. Browse the internet safely
4. Recognize and avoid cyber threats
5. Communicate effectively online
6. Collaborate on digital projects
7. Practice ethical technology use
8. Demonstrate digital citizenship

---

**Version**: 1.0.0  
**Last Updated**: February 2024  
**Status**: Production Ready
