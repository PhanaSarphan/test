document.addEventListener('DOMContentLoaded', function () {
  // Menu toggle
  const menu = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
  };

  // Slideshow logic
  let slideIndex = 1;
  showSlides(slideIndex);

  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  window.currentSlide = function (n) {
    showSlides(slideIndex = n);
  };

  function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach(slide => slide.style.display = "none");
    Array.from(dots).forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
  }

  setInterval(() => plusSlides(1), 5000); // Auto-slide

  // Navbar active link
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Scroll active link update
  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // Highlight current hash on load
  const currentHash = window.location.hash;
  if (currentHash) {
    const activeLink = document.querySelector(`.navbar a[href="${currentHash}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  // Email/Password Validation (for login page)
  const form = document.querySelector("form");
  if (form) {
    const eField = form.querySelector(".email"),
          eInput = eField.querySelector("input"),
          pField = form.querySelector(".password"),
          pInput = pField.querySelector("input");

    form.onsubmit = (e) => {
      e.preventDefault();

      (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
      (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

      setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
      }, 500);

      eInput.onkeyup = () => checkEmail();
      pInput.onkeyup = () => checkPass();

      function checkEmail() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        let errorTxt = eField.querySelector(".error-txt");
        if (!eInput.value.match(pattern)) {
          eField.classList.add("error");
          eField.classList.remove("valid");
          errorTxt.innerText = eInput.value != "" ? "Enter a valid email address" : "Email can't be blank";
        } else {
          eField.classList.remove("error");
          eField.classList.add("valid");
        }
      }

      function checkPass() {
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let errorTxt = pField.querySelector(".error-txt");
        if (!pInput.value.match(pattern)) {
          pField.classList.add("error");
          pField.classList.remove("valid");
          errorTxt.innerText = pInput.value != "" ? 
            "Must be 8+ characters, include 1 number, 1 uppercase and 1 lowercase letter" : 
            "Password can't be blank";
        } else {
          pField.classList.remove("error");
          pField.classList.add("valid");
        }
      }

      if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        window.location.href = form.getAttribute("action");
      }
    }
  }
});

  // Check for existing login on page load
  document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    checkDirectBlogAccess();
});

// Get all the navbar links
const navbarLinks = document.querySelectorAll('.navbar a');

// Add click event listener to each link
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove the 'active' class from all links
        navbarLinks.forEach(item => item.classList.remove('active'));
        
        // Add 'active' class to the clicked link
        link.classList.add('active');
    });
});

// Login Panel Functions
const loginButton = document.getElementById('login-button');
const loginPanel = document.getElementById('login-panel');
const loginClose = document.getElementById('login-close');
const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('login-form');
const emailField = loginForm.querySelector('.email');
const passwordField = loginForm.querySelector('.password');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const userProfile = document.getElementById('user-profile');
const profileButton = document.getElementById('profile-button');
const dropdownMenu = document.getElementById('dropdown-menu');
const logoutButton = document.getElementById('logout-button');
const blogLink = document.querySelector('.blog-link');
const blogLinkElement = document.getElementById('blog-link');
const unauthorizedModal = document.getElementById('unauthorized-modal');
const modalLoginButton = document.getElementById('modal-login-button');
const modalCancelButton = document.getElementById('modal-cancel-button');
const userName = document.getElementById('user-name');

// Test credentials
const validEmail = "sarphan.phana@gmail.com";
const validPassword = "SPr01121980!@";

// Local storage keys
const USER_LOGIN_KEY = "insightUserLoggedIn";
const USER_EMAIL_KEY = "insightUserEmail";

// Open login panel
function openLoginPanel() {
    loginPanel.classList.add('active');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
}

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginPanel();
});

// Close login panel
function closeLoginPanel() {
    loginPanel.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Enable scrolling again
}

loginClose.addEventListener('click', closeLoginPanel);
overlay.addEventListener('click', closeLoginPanel);

// Form validation and login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Email validation
    if(emailInput.value.trim() === '') {
        emailField.classList.add('error');
        emailField.querySelector('.error-txt').textContent = "Email can't be blank";
        return;
    } else if(!isValidEmail(emailInput.value)) {
        emailField.classList.add('error');
        emailField.querySelector('.error-txt').textContent = "Enter a valid email";
        return;
    } else {
        emailField.classList.remove('error');
    }
    
    // Password validation
    if(passwordInput.value === '') {
        passwordField.classList.add('error');
        return;
    } else {
        passwordField.classList.remove('error');
    }
    
    // Check credentials
    if(emailInput.value === validEmail && passwordInput.value === validPassword) {
        // Save login state to local storage
        localStorage.setItem(USER_LOGIN_KEY, "true");
        localStorage.setItem(USER_EMAIL_KEY, emailInput.value);
        
        // Update UI for logged-in user
        updateUIForLoggedInUser();
        
        // Close the login panel
        closeLoginPanel();
    } else {
        // Show error for invalid credentials
        passwordField.classList.add('error');
        passwordField.querySelector('.error-txt').textContent = "Invalid email or password";
    }
});

// Check login status on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem(USER_LOGIN_KEY) === "true";
    const userEmail = localStorage.getItem(USER_EMAIL_KEY);
    
    if(isLoggedIn && userEmail) {
        updateUIForLoggedInUser(userEmail);
    }
}

// Update the UI for logged-in users
function updateUIForLoggedInUser(email = emailInput.value) {
    // Hide login button and show user profile
    loginButton.style.display = 'none';
    userProfile.style.display = 'block';
    
    // Show the blog link
    blogLink.classList.add('visible');
    
    // Update user name (show email or extract name from email)
    const displayName = email.split('@')[0];
    userName.textContent = displayName;
}

// Logout function
function logoutUser() {
    // Clear local storage
    localStorage.removeItem(USER_LOGIN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    
    // Update UI for logged out user
    loginButton.style.display = 'block';
    userProfile.style.display = 'none';
    blogLink.classList.remove('visible');
    dropdownMenu.classList.remove('active');
}

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

// Toggle dropdown menu
profileButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if(!profileButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('active');
    }
});

// Handle blog link click
blogLinkElement.addEventListener('click', (e) => {
    const isLoggedIn = localStorage.getItem(USER_LOGIN_KEY) === "true";
    
    // If not logged in, prevent navigation and show modal
    if(!isLoggedIn) {
        e.preventDefault();
        unauthorizedModal.style.display = 'block';
    }
});

// Check if user is directly accessing blog page
function checkDirectBlogAccess() {
    // This function would be called on the blog page to redirect unauthorized users
    if(window.location.href.includes("blog.html")) {
        const isLoggedIn = localStorage.getItem(USER_LOGIN_KEY) === "true";
        if(!isLoggedIn) {
            window.location.href = "index.html";
        }
    }
}

// Modal buttons
modalLoginButton.addEventListener('click', () => {
    unauthorizedModal.style.display = 'none';
    openLoginPanel();
});

modalCancelButton.addEventListener('click', () => {
    unauthorizedModal.style.display = 'none';
});

// Remove error on input
emailInput.addEventListener('input', () => {
    emailField.classList.remove('error');
});

passwordInput.addEventListener('input', () => {
    passwordField.classList.remove('error');
});

// Email validation function
function isValidEmail(email) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return emailPattern.test(email);
}
// Blog visibility script - Add this to your script.js file

document.addEventListener('DOMContentLoaded', function () {
    // Local storage keys
    const USER_LOGIN_KEY = "insightUserLoggedIn";
    
    // Elements
    const blogSection = document.getElementById('latest-posts');
    const blogLink = document.querySelector('.blog-link');
    
    // Check if user is logged in
    function checkBlogAccess() {
      const isLoggedIn = localStorage.getItem(USER_LOGIN_KEY) === "true";
      
      // Show/hide blog based on login status
      if (blogSection) {
        if (isLoggedIn) {
          blogSection.style.display = 'block';
        } else {
          blogSection.style.display = 'none';
        }
      }
      
      // Update blog link visibility
      if (blogLink) {
        if (isLoggedIn) {
          blogLink.classList.add('visible');
          blogLink.style.display = 'block';
        } else {
          blogLink.classList.remove('visible');
          blogLink.style.display = 'none';
        }
      }
    }
    
    // Run on page load
    checkBlogAccess();
    
    // Listen for login/logout events
    document.addEventListener('login-status-changed', checkBlogAccess);
    
    // Modify existing login function to dispatch event when status changes
    const originalUpdateUIForLoggedInUser = window.updateUIForLoggedInUser;
    if (typeof originalUpdateUIForLoggedInUser === 'function') {
      window.updateUIForLoggedInUser = function(email) {
        originalUpdateUIForLoggedInUser(email);
        document.dispatchEvent(new Event('login-status-changed'));
      };
    }
    
    const originalLogoutUser = window.logoutUser;
    if (typeof originalLogoutUser === 'function') {
      window.logoutUser = function() {
        originalLogoutUser();
        document.dispatchEvent(new Event('login-status-changed'));
      };
    }
  });