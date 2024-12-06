document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to initial signup form
    document.querySelector('.signup-form').classList.add('page-transition', 'active');

    // Navigation handling
    const navItems = {
        'home-nav': showHomeForm,
        'api-nav': showApiKeyForm,
        'analytics-nav': showAnalyticsForm,
        'settings-nav': showSettingsForm
    };

    // Initialize nav indicator position
    const indicator = document.querySelector('.nav-indicator');
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        updateIndicatorPosition(activeNav);
    }

    // Add click handlers to all nav items
    Object.keys(navItems).forEach(navId => {
        const navElement = document.querySelector(`#${navId}`);
        if (navElement) {
            navElement.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all nav items
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                // Add active class to clicked nav item
                e.currentTarget.classList.add('active');
                // Update indicator position
                updateIndicatorPosition(e.currentTarget);
                // Call the corresponding function
                navItems[navId]();
            });
        }
    });

    // Set home as active by default and position indicator
    const homeNav = document.querySelector('#home-nav');
    homeNav.classList.add('active');
    updateIndicatorPosition(homeNav);

    // Ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;

        ripple.classList.add('ripple');
        button.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    // Add ripple to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Smooth scroll handling
    function smoothScroll(element, target, duration) {
        const start = element.scrollTop;
        const distance = target - start;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            element.scrollTop = start + distance * easeInOutQuad(progress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        requestAnimationFrame(animation);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '20px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

function showApiKeyForm() {
    const container = document.querySelector('.content-container');
    const currentContent = container.children[0];
    currentContent.classList.add('page-transition');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('#api-nav').classList.add('active');
    
    setTimeout(() => {
        container.innerHTML = `
            <div class="api-dashboard page-transition">
                <h2>API Integration</h2>
                
                <div class="api-stats">
                    <div class="api-stat-card">
                        <div class="stat-icon success">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <h4>API Status</h4>
                            <p>Active</p>
                        </div>
                    </div>
                    <div class="api-stat-card">
                        <div class="stat-icon info">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2v20M2 12h20" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <h4>Requests Today</h4>
                            <p>2,459</p>
                        </div>
                    </div>
                </div>

                <div class="api-section">
                    <h3>Your API Key</h3>
                    <div class="api-key-input">
                        <input type="text" value="sk_live_xxxxx" readonly>
                        <button class="copy-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="api-section">
                    <h3>Recent Requests</h3>
                    <div class="request-list">
                        <div class="request-item">
                            <div class="request-status success"></div>
                            <div class="request-details">
                                <h4>GET /api/v1/users</h4>
                                <p>200 OK • 2 seconds ago</p>
                            </div>
                        </div>
                        <div class="request-item">
                            <div class="request-status error"></div>
                            <div class="request-details">
                                <h4>POST /api/v1/data</h4>
                                <p>403 Forbidden • 5 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        requestAnimationFrame(() => {
            const newContent = container.querySelector('.api-dashboard');
            newContent.classList.add('active');
        });
    }, 300);
}

function showHomeForm() {
    const container = document.querySelector('.content-container');
    const currentContent = container.children[0];
    currentContent.classList.add('page-transition');
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('#home-nav').classList.add('active');
    
    setTimeout(() => {
        container.innerHTML = `
            <form class="signup-form page-transition">
                <h2>Sign Up</h2>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Choose a password">
                </div>
                <button type="submit" class="submit-button">Sign Up</button>
                <p class="login-link">Already have an account? <a href="#">Sign in</a></p>
            </form>
        `;
        
        requestAnimationFrame(() => {
            const newContent = container.querySelector('.signup-form');
            newContent.classList.add('active');
        });
    }, 300);
}

function showAnalyticsForm() {
    const container = document.querySelector('.content-container');
    const currentContent = container.children[0];
    currentContent.classList.add('page-transition');
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('#analytics-nav').classList.add('active');
    
    setTimeout(() => {
        container.innerHTML = `
            <div class="analytics-dashboard page-transition">
                <h2>Dashboard</h2>
                
                <div class="project-summary">
                    <h3>Project Summary</h3>
                    <div class="summary-grid">
                        <div class="summary-card progress">
                            <h4>24</h4>
                            <p>In Progress</p>
                        </div>
                        <div class="summary-card review">
                            <h4>56</h4>
                            <p>In Review</p>
                        </div>
                        <div class="summary-card hold">
                            <h4>16</h4>
                            <p>On Hold</p>
                        </div>
                        <div class="summary-card completed">
                            <h4>45</h4>
                            <p>Completed</p>
                        </div>
                    </div>
                </div>

                <div class="stats-container">
                    <div class="stats-box">
                        <h4>Total working hour</h4>
                        <div class="stats-value">
                            <span>50:25:06</span>
                            <span class="badge success">↑ 34%</span>
                        </div>
                    </div>
                    <div class="stats-box">
                        <h4>Total task activity</h4>
                        <div class="stats-value">
                            <span>125 Task</span>
                            <span class="badge info">↓ 50%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        requestAnimationFrame(() => {
            const newContent = container.querySelector('.analytics-dashboard');
            newContent.classList.add('active');
        });
    }, 300);
}

function showSettingsForm() {
    const container = document.querySelector('.content-container');
    const currentContent = container.children[0];
    currentContent.classList.add('page-transition');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('#settings-nav').classList.add('active');
    
    setTimeout(() => {
        container.innerHTML = `
            <div class="settings-dashboard page-transition">
                <h2>Settings</h2>
                
                <div class="settings-section">
                    <h3>Account</h3>
                    <div class="settings-card">
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <h4>Profile Picture</h4>
                                <p>Change your avatar</p>
                            </div>
                            <button class="settings-action">Update</button>
                        </div>
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <h4>Email Address</h4>
                                <p>parsa@example.com</p>
                            </div>
                            <button class="settings-action">Change</button>
                        </div>
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <h4>Password</h4>
                                <p>Last changed 2 months ago</p>
                            </div>
                            <button class="settings-action">Update</button>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Preferences</h3>
                    <div class="settings-card">
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <h4>Dark Mode</h4>
                                <p>Toggle dark theme</p>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <h4>Notifications</h4>
                                <p>Manage alerts</p>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Danger Zone</h3>
                    <div class="settings-card danger">
                        <div class="settings-item">
                            <div class="settings-item-content">
                                <h4>Delete Account</h4>
                                <p>Permanently remove your account</p>
                            </div>
                            <button class="settings-action danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        requestAnimationFrame(() => {
            const newContent = container.querySelector('.settings-dashboard');
            newContent.classList.add('active');
        });
    }, 300);
}

// Add helper function to handle nav closing
function closeNav() {
    document.querySelector('.side-nav').classList.remove('open');
    document.querySelector('.content-container').classList.remove('nav-open');
}

// Function to update indicator position
function updateIndicatorPosition(element) {
    const indicator = document.querySelector('.nav-indicator');
    const rect = element.getBoundingClientRect();
    const navRect = document.querySelector('.bottom-nav').getBoundingClientRect();
    
    const left = rect.left - navRect.left + (rect.width - 64) / 2;
    
    // Add rotation based on the direction of movement
    const currentLeft = parseFloat(getComputedStyle(indicator).transform.split(',')[4]) || 0;
    const rotationDeg = left > currentLeft ? 180 : -180;
    
    indicator.style.transform = `translate(${left}px, -50%) rotate(${rotationDeg}deg)`;
    
    // Reset rotation after transition
    setTimeout(() => {
        indicator.style.transition = 'none';
        indicator.style.transform = `translate(${left}px, -50%) rotate(0deg)`;
        setTimeout(() => {
            indicator.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 50);
    }, 500);
} 