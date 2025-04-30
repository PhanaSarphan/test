document.addEventListener('DOMContentLoaded', function () {
    // Add CSS for user profile section and hide premium links by default
    const style = document.createElement('style');
    style.textContent = `
        .user-profile {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .user-email {
            font-size: 14px;
            font-weight: 500;
            color: #333;
        }
        .logout-btn {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        }
        .logout-btn:hover {
            background-color: #d32f2f;
        }
        .premium-link {
            display: none; /* Hide premium links by default */
        }
        body.logged-in .premium-link {
            display: inline-block; /* Show premium links when logged in */
        }
        .blog {
            display: none; /* Hide blog section by default */
        }
        body.logged-in .blog {
            display: block; /* Show blog section when logged in */
        }
    `;
    document.head.appendChild(style);

    // Get the blog section
    const blogSection = document.getElementById('blog');

    // Initially hide premium links and the blog section (in case JS fails)
    const premiumLinks = document.querySelectorAll('.premium-link');
    premiumLinks.forEach(link => {
        link.style.display = 'none';
    });
    if (blogSection) {
        blogSection.style.display = 'none';
    }

    console.log('DOM fully loaded and parsed');

    // Mobile Menu Functionality (remains the same)
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');

    if (menuToggle && mobileMenu && mobileClose) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });

        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Login Modal Functionality
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const modalClose = document.getElementById('modal-close');

    if (loginBtn && loginModal && modalClose) {
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = 'sarphan.phana@gmail.com';
        }

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('open');
        });

        modalClose.addEventListener('click', () => {
            loginModal.classList.remove('open');
        });

        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.classList.remove('open');
            }
        });

        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            const rememberMeContainer = document.createElement('div');
            rememberMeContainer.className = 'remember-me';
            rememberMeContainer.innerHTML = `
                <input type="checkbox" id="remember-me" checked>
                <label for="remember-me">Remember my email</label>
            `;

            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.parentNode.insertBefore(rememberMeContainer, submitBtn);
            }

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const rememberMe = document.getElementById('remember-me').checked;

                console.log('Login submitted with:', email);
                console.log('Remember me:', rememberMe);

                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                setTimeout(() => {
                    loginModal.classList.remove('open');
                    alert('Login successful (simulated)!');

                    const loginBtn = document.getElementById('login-btn');
                    if (loginBtn) {
                        if (!window.originalLoginBtn) {
                            window.originalLoginBtn = loginBtn.cloneNode(true);
                        }

                        const userProfile = document.createElement('div');
                        userProfile.id = 'user-profile';
                        userProfile.className = 'user-profile';
                        userProfile.innerHTML = `
                            <span class="user-email">${email}</span>
                            <button id="logout-btn" class="logout-btn">Logout</button>
                        `;

                        loginBtn.parentNode.replaceChild(userProfile, loginBtn);

                        document.body.classList.add('logged-in');
                        const premiumLinks = document.querySelectorAll('.premium-link');
                        premiumLinks.forEach(link => {
                            link.style.display = 'inline-block';
                        });
                        // Show the blog section on login
                        if (blogSection) {
                            blogSection.style.display = 'block';
                        }

                        document.getElementById('logout-btn').addEventListener('click', () => {
                            const userProfile = document.getElementById('user-profile');
                            const originalBtn = window.originalLoginBtn.cloneNode(true);
                            userProfile.parentNode.replaceChild(originalBtn, userProfile);

                            originalBtn.addEventListener('click', (e) => {
                                e.preventDefault();
                                loginModal.classList.add('open');
                            });

                            document.body.classList.remove('logged-in');
                            const premiumLinks = document.querySelectorAll('.premium-link');
                            premiumLinks.forEach(link => {
                                link.style.display = 'none';
                            });
                            // Hide the blog section on logout
                            if (blogSection) {
                                blogSection.style.display = 'none';
                            }

                            alert('You have been logged out.');
                        });
                    }

                    if (!rememberMe) {
                        loginForm.reset();
                    }
                }, 1000);
            });
        }
    }

    // Rest of the code (Hero Slider, Contact Form, Search Widget) remains the same...
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
    }

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const contactEmail = document.getElementById('contact-email').value;
            const contactName = document.getElementById('contact-name').value;
            const contactSubject = document.getElementById('contact-subject').value;
            const contactMessage = document.getElementById('contact-message').value;

            console.log('Contact form submitted with:', contactEmail, contactName, contactSubject, contactMessage);
            alert('Message sent successfully (simulated)!');
            contactForm.reset();
        });
    }

    const searchForm = document.querySelector('.sidebar .search-box button');
    const searchInput = document.querySelector('.sidebar .search-box input[type="text"]');

    if (searchForm && searchInput) {
        searchForm.addEventListener('click', () => {
            const searchTerm = searchInput.value;
            console.log('Searching for:', searchTerm);
            alert(`Searching for "${searchTerm}" (not implemented).`);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
// Sign Up Modal Functionality
const signupBtnLink = document.querySelector('#login-modal .modal-footer a');
const signupModal = document.getElementById('signup-modal');
const signupModalClose = signupModal ? signupModal.querySelector('.modal-close') : null;
const loginBtnLinkFromSignup = document.querySelector('#signup-modal .modal-footer a');

if (signupBtnLink && signupModal) {
    signupBtnLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-modal').classList.remove('open');
        signupModal.classList.add('open');
    });
}

if (loginBtnLinkFromSignup && document.getElementById('login-modal')) {
    loginBtnLinkFromSignup.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('open');
        document.getElementById('login-modal').classList.add('open');
    });
}

if (signupModal && signupModalClose) {
    signupModalClose.addEventListener('click', () => {
        signupModal.classList.remove('open');
    });

    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.classList.remove('open');
        }
    });

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('signup-modal').querySelector('#email').value; // Be specific with the modal
            const age = document.getElementById('age').value;
            const password = document.getElementById('signup-modal').querySelector('#password').value; // Be specific with the modal

            // Basic validation (you should add more robust validation)
            if (!firstName || !lastName || !email || !age || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // You would typically send this data to a server for actual account creation
            console.log('Sign Up Data:', { firstName, lastName, email, age, password });
            //   alert('Account created successfully (simulated)!');  //  Removed alert

            // 2024-02-29:  AJAX call to your server-side signup endpoint
            fetch('/signup', {  //  Ensure this matches the @WebServlet("/signup") in your Java Servlet
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',  //  Important for form data
                },
                body: new URLSearchParams({  //  Encode the data as form data
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    age: age,
                    password: password, //  SENDING PASSWORD IN PLAIN TEXT IS INSECURE.  Hash on the client-side *before* sending, or, ideally, handle this with a proper auth library.
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json(); //  Expect JSON response from server
                })
                .then(data => {
                    console.log('Response from server:', data);  //  Log the response

                    if (data.status === 'success') {
                        alert(data.message); // Show success message from server
                        signupModal.classList.remove('open');
                        signupForm.reset();

                        // Simulate login after successful signup
                        const loginEmailInput = document.getElementById('email'); // Login modal's email input
                        const loginPasswordInput = document.getElementById('password'); // Login modal's password input
                        const loginModalElement = document.getElementById('login-modal');

                        if (loginEmailInput && loginPasswordInput && loginModalElement) {
                            loginEmailInput.value = email;
                            loginPasswordInput.value = password;
                            loginModalElement.classList.add('open');
                        }

                    } else if (data.status === 'error') {
                        alert(data.message); // Show error message from server
                    } else {
                        alert('Unknown error occurred.'); // Handle unexpected response
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    alert('Failed to create account. Please check your connection and try again.'); // User-friendly error
                });
        });
    }
}
});