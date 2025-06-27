// Main JavaScript file for EduTech Institute

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCounters();
    initForms();
    initCourseFilter();
    initCourseModal();
    initScrollToTop();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    // Highlight active navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile menu close on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks2 = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks2.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Form validation and submission
function initForms() {
    // Registration form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Password confirmation validation
    const signupPassword = document.getElementById('signupPassword');
    const signupConfirmPassword = document.getElementById('signupConfirmPassword');
    
    if (signupPassword && signupConfirmPassword) {
        signupConfirmPassword.addEventListener('input', function() {
            if (this.value !== signupPassword.value) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

// Handle registration form submission
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showAlert('success', 'Application submitted successfully! We will contact you within 2-3 business days.');
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showAlert('success', 'Message sent successfully! We will get back to you soon.');
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle signup form submission
function handleSignupSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Creating Account...';
    submitBtn.disabled = true;

    // Simulate account creation
    setTimeout(() => {
        showAlert('success', 'Account created successfully! Please check your email to verify your account.');
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle login form submission
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Logging in...';
    submitBtn.disabled = true;

    // Simulate login
    setTimeout(() => {
        showAlert('success', 'Login successful! Redirecting to dashboard...');
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Course filter functionality
function initCourseFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const courseItems = document.querySelectorAll('.course-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courseItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// Course modal functionality
function initCourseModal() {
    const courseModal = document.getElementById('courseModal');
    if (!courseModal) return;

    const modalContent = document.getElementById('courseModalContent');
    const modalTitle = document.getElementById('courseModalLabel');

    // Course data
    const courseData = {
        webdev: {
            title: 'Full Stack Web Development',
            duration: '6 Months',
            price: '$1,299',
            description: 'Master modern web development with our comprehensive full-stack program.',
            curriculum: [
                'HTML5, CSS3, and Responsive Design',
                'JavaScript ES6+ and DOM Manipulation',
                'React.js and Component-Based Architecture',
                'Node.js and Express.js Backend Development',
                'Database Design with MongoDB and SQL',
                'RESTful APIs and GraphQL',
                'Authentication and Security',
                'Deployment and DevOps Basics'
            ],
            prerequisites: 'Basic computer skills and commitment to learning',
            outcomes: 'Build full-stack web applications and secure employment as a web developer'
        },
        datascience: {
            title: 'Data Science & Analytics',
            duration: '8 Months',
            price: '$1,599',
            description: 'Transform data into insights with Python, machine learning, and statistical analysis.',
            curriculum: [
                'Python Programming for Data Science',
                'Statistics and Probability',
                'Data Manipulation with Pandas and NumPy',
                'Data Visualization with Matplotlib and Seaborn',
                'Machine Learning Algorithms',
                'Deep Learning with TensorFlow',
                'Big Data Technologies',
                'Real-world Capstone Projects'
            ],
            prerequisites: 'Basic mathematics and analytical thinking',
            outcomes: 'Analyze complex datasets and build predictive models for business insights'
        },
        marketing: {
            title: 'Digital Marketing Mastery',
            duration: '4 Months',
            price: '$899',
            description: 'Master digital marketing strategies and grow your online presence.',
            curriculum: [
                'Digital Marketing Fundamentals',
                'Search Engine Optimization (SEO)',
                'Pay-Per-Click Advertising (PPC)',
                'Social Media Marketing',
                'Content Marketing Strategy',
                'Email Marketing Automation',
                'Analytics and Performance Tracking',
                'Marketing Campaign Management'
            ],
            prerequisites: 'Basic computer skills and creativity',
            outcomes: 'Create and manage successful digital marketing campaigns'
        },
        mobile: {
            title: 'Mobile App Development',
            duration: '7 Months',
            price: '$1,499',
            description: 'Build native and cross-platform mobile applications.',
            curriculum: [
                'Mobile Development Fundamentals',
                'React Native Development',
                'iOS Development with Swift',
                'Android Development with Kotlin',
                'Mobile UI/UX Design Principles',
                'API Integration and Data Management',
                'App Store Deployment',
                'Mobile App Testing and Optimization'
            ],
            prerequisites: 'Basic programming knowledge preferred',
            outcomes: 'Develop and publish mobile applications for iOS and Android'
        },
        design: {
            title: 'UX/UI Design',
            duration: '5 Months',
            price: '$1,199',
            description: 'Create user-centered designs and intuitive interfaces.',
            curriculum: [
                'Design Thinking and User Research',
                'Wireframing and Prototyping',
                'Visual Design Principles',
                'Figma and Adobe Creative Suite',
                'User Experience (UX) Design',
                'User Interface (UI) Design',
                'Usability Testing',
                'Design Systems and Style Guides'
            ],
            prerequisites: 'Creative mindset and attention to detail',
            outcomes: 'Design beautiful and functional user experiences'
        },
        ml: {
            title: 'Machine Learning & AI',
            duration: '10 Months',
            price: '$1,899',
            description: 'Advanced machine learning and artificial intelligence techniques.',
            curriculum: [
                'Advanced Python Programming',
                'Linear Algebra and Calculus',
                'Machine Learning Algorithms',
                'Deep Learning and Neural Networks',
                'Natural Language Processing',
                'Computer Vision',
                'AI Ethics and Bias',
                'MLOps and Model Deployment'
            ],
            prerequisites: 'Strong mathematical background and programming experience',
            outcomes: 'Build and deploy AI solutions for real-world problems'
        }
    };

    // Handle modal trigger
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-bs-target="#courseModal"]')) {
            const courseId = e.target.getAttribute('data-course');
            const course = courseData[courseId];
            
            if (course) {
                modalTitle.textContent = course.title;
                modalContent.innerHTML = generateCourseModalContent(course);
            }
        }
    });
}

// Generate course modal content
function generateCourseModalContent(course) {
    return `
        <div class="row">
            <div class="col-md-8">
                <h5>Course Overview</h5>
                <p>${course.description}</p>
                
                <h5 class="mt-4">Curriculum</h5>
                <ul class="list-group list-group-flush">
                    ${course.curriculum.map(item => `<li class="list-group-item"><i class="bi bi-check-circle text-success me-2"></i>${item}</li>`).join('')}
                </ul>
                
                <h5 class="mt-4">Prerequisites</h5>
                <p>${course.prerequisites}</p>
                
                <h5 class="mt-4">Learning Outcomes</h5>
                <p>${course.outcomes}</p>
            </div>
            <div class="col-md-4">
                <div class="card border-primary">
                    <div class="card-header bg-primary text-white">
                        <h6 class="mb-0">Course Details</h6>
                    </div>
                    <div class="card-body">
                        <p><strong>Duration:</strong> ${course.duration}</p>
                        <p><strong>Price:</strong> ${course.price}</p>
                        <p><strong>Format:</strong> Online/In-person</p>
                        <p><strong>Certificate:</strong> Yes</p>
                        <p><strong>Support:</strong> 24/7</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Show alert messages
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation to buttons
function addLoadingToButton(button, loadingText = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="bi bi-hourglass-split me-2"></i>${loadingText}`;
    button.disabled = true;
    
    return function removeLoading() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Initialize tooltips and popovers if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = 'Come back! - EduTech Institute';
    } else {
        document.title = document.querySelector('title').textContent;
    }
});

// Console welcome message
console.log('%cWelcome to EduTech Institute!', 'color: #0d6efd; font-size: 20px; font-weight: bold;');
console.log('%cInterested in our code? Check out our courses!', 'color: #198754; font-size: 14px;');