// Smooth Scroll Effect

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({
                behavior: 'smooth'
            });
    });
});

// Header Shadow on Scroll

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
});

// Simple Counter Animation

const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));

        let count = 0;

        const increment = target / 100;

        const interval = setInterval(() => {

            count += increment;

            if (count >= target) {
                counter.innerText = target + "+";
                clearInterval(interval);
            } else {
                counter.innerText = Math.floor(count);
            }

        }, 20);

    };

    updateCounter();
});

// Mobile Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

// Role Selector Toggling (Login Page)
const roleButtons = document.querySelectorAll('.role-btn');
const usernameInput = document.getElementById('username');

if (roleButtons && usernameInput) {
    roleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            roleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Adjust input placeholder based on selected role
            const role = btn.dataset.role;
            if (role === 'student') {
                usernameInput.placeholder = 'e.g., student@kristujayanti.edu.in';
            } else if (role === 'faculty') {
                usernameInput.placeholder = 'e.g., faculty@kristujayanti.edu.in';
            } else {
                usernameInput.placeholder = 'e.g., admin@kristujayanti.edu.in';
            }
        });
    });
}

// Password Visibility Toggle
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the icon
        const icon = passwordToggle.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });
}

// Mock Login Form Submission Validation
const loginForm = document.getElementById('loginForm');
const formFeedback = document.getElementById('formFeedback');

if (loginForm && formFeedback) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const activeRole = document.querySelector('.role-btn.active').innerText.trim();
        
        // Mock validation loading feedback
        const submitBtn = loginForm.querySelector('.login-submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('.btn-icon');
        
        const originalText = submitBtnText.innerText;
        submitBtnText.innerText = 'Validating...';
        submitBtnIcon.className = 'fa-solid fa-circle-notch fa-spin btn-icon';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Restore button state
            submitBtnText.innerText = originalText;
            submitBtnIcon.className = 'fa-solid fa-arrow-right-to-bracket btn-icon';
            submitBtn.disabled = false;
            
            if (password.length < 6) {
                formFeedback.className = 'form-feedback error';
                formFeedback.innerText = 'Password must be at least 6 characters long.';
            } else {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerText = `Successfully logged in as ${activeRole} (${username})! Redirecting...`;
                
                // Clear form
                loginForm.reset();
                
                // Reset role buttons to student
                roleButtons.forEach(b => b.classList.remove('active'));
                if (roleButtons[0]) roleButtons[0].classList.add('active');
            }
        }, 1200);
    });
}