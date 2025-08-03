// Authentication Service
const AuthService = {
    // Backend API URL - sesuaikan dengan URL backend Anda
    API_BASE_URL: 'https://asia-southeast2-ornate-course-437014-u9.cloudfunctions.net/sakha',

    // Get token from localStorage
    getToken: function () {
        return localStorage.getItem('token');
    },

    // Set token to localStorage
    setToken: function (token) {
        localStorage.setItem('token', token);
    },

    // Remove token from localStorage
    removeToken: function () {
        localStorage.removeItem('token');
    },

    // Check if user is authenticated
    isAuthenticated: function () {
        const token = this.getToken();
        return token && token.length > 0;
    },

    // Validate token with backend
    validateToken: async function () {
        try {
            const token = this.getToken();
            if (!token) {
                return false;
            }

            const response = await fetch(`${this.API_BASE_URL}/auth/validate`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.valid === true;
            }

            return false;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    },

    // Get user profile from backend
    getUserProfile: async function () {
        try {
            const token = this.getToken();
            if (!token) {
                return null;
            }

            const response = await fetch(`${this.API_BASE_URL}/auth/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                return userData;
            }

            return null;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    },

    // Logout user
    logout: async function () {
        try {
            const token = this.getToken();
            if (token) {
                // Call backend logout endpoint
                await fetch(`${this.API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Always remove token locally
            this.removeToken();
            localStorage.removeItem('userData');

            // Clear user session cookie
            document.cookie = 'user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    },

    // Handle login redirect (when user comes back from login page)
    handleLoginRedirect: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userData = urlParams.get('userData');

        if (token) {
            this.setToken(token);

            if (userData) {
                try {
                    const parsedUserData = JSON.parse(decodeURIComponent(userData));
                    localStorage.setItem('userData', JSON.stringify(parsedUserData));
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);

            // Trigger profile update
            this.checkAndUpdateProfile();
        }
    }
};

(function ($) {
    "use strict";

    $(document).ready(function () {
        // Inisialisasi elemen-elemen
        var profileSection = $('#profileSection');
        var profileDropdownBtn = $('#profileDropdownBtn');
        var profileDropdownContent = $('#profileDropdownContent');
        var logoutBtn = $('#logoutBtn');
        var profileName = $('#profileName');
        var profilePhoto = $('#profilePhoto');
        // Ambil elemen loginNav
        const loginNav = $('#loginNav');
        var dashboardNav = $('#dashboardNav');
        var registerNav = $('#registerNav');

        // Newsletter functionality
        const newsletterForm = document.getElementById('newsletterForm');
        const newsletterEmail = document.getElementById('newsletterEmail');
        const newsletterButton = document.getElementById('newsletterButton');
        const newsletterMessage = document.getElementById('newsletterMessage');

        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const email = newsletterEmail.value.trim();
                if (!email) {
                    showNewsletterMessage('Please enter your email address', 'error');
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNewsletterMessage('Please enter a valid email address', 'error');
                    return;
                }

                // Disable button and show loading
                newsletterButton.disabled = true;
                newsletterButton.textContent = 'Subscribing...';

                try {
                    const response = await fetch(`${AuthService.API_BASE_URL}/newsletter/subscribe`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showNewsletterMessage(data.message || 'Successfully subscribed to newsletter!', 'success');
                        newsletterEmail.value = '';
                    } else {
                        showNewsletterMessage(data.message || 'Failed to subscribe. Please try again.', 'error');
                    }
                } catch (error) {
                    console.error('Newsletter subscription error:', error);
                    showNewsletterMessage('Network error. Please try again later.', 'error');
                } finally {
                    // Re-enable button
                    newsletterButton.disabled = false;
                    newsletterButton.textContent = 'Subscribe Our product →';
                }
            });
        }

        function showNewsletterMessage(message, type) {
            newsletterMessage.textContent = message;
            newsletterMessage.style.display = 'block';

            if (type === 'success') {
                newsletterMessage.style.backgroundColor = '#d4edda';
                newsletterMessage.style.color = '#155724';
                newsletterMessage.style.border = '1px solid #c3e6cb';
            } else {
                newsletterMessage.style.backgroundColor = '#f8d7da';
                newsletterMessage.style.color = '#721c24';
                newsletterMessage.style.border = '1px solid #f5c6cb';
            }

            // Hide message after 5 seconds
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        }

        // Cek status login user
        async function checkLoginStatus() {
            try {
                const token = AuthService.getToken();
                console.log('[DEBUG] Token:', token);
                if (!AuthService.isAuthenticated()) {
                    console.log('[DEBUG] Tidak ada token, sembunyikan profile');
                    hideProfile();
                    return;
                }

                // Ambil profile user dari backend
                const userData = await AuthService.getUserProfile();
                console.log('[DEBUG] Data user dari backend:', userData);
                if (userData) {
                    localStorage.setItem('userData', JSON.stringify(userData));
                    showProfile(userData);
                } else {
                    console.log('[DEBUG] Tidak dapat data user, hapus token dan sembunyikan profile');
                    AuthService.removeToken();
                    localStorage.removeItem('userData');
                    hideProfile();
                }
            } catch (error) {
                console.error('[DEBUG] Error checking login status:', error);
                AuthService.removeToken();
                localStorage.removeItem('userData');
                hideProfile();
            }
        }

        function showProfile(userData) {
            profileSection.show();
            profileName.text(userData.username || 'User Name');
            if (userData.photo) {
                profilePhoto.attr('src', userData.photo);
            }
            loginNav.hide();
            registerNav.hide();
            if (userData.role === 'admin') {
                dashboardNav.show();
            } else {
                dashboardNav.hide();
            }
        }

        function hideProfile() {
            profileSection.hide();
            loginNav.show();
            registerNav.show();
            dashboardNav.hide();
        }

        // Logout function
        async function logout() {
            try {
                await AuthService.logout();
                hideProfile();
                window.location.href = 'https://sakhaclothing.shop';
            } catch (e) {
                hideProfile();
                window.location.href = 'https://sakhaclothing.shop';
            }
        }

        // Event handler untuk logout
        logoutBtn.on('click', function (e) {
            e.preventDefault();
            logout();
        });

        // Inisialisasi status profile saat page load
        checkLoginStatus();

        // Handle login redirect (jika login via redirect)
        AuthService.handleLoginRedirect();

        // Profile dropdown functionality
        profileDropdownBtn.on('click', function (e) {
            e.stopPropagation();
            profileDropdownContent.toggleClass('show');
        });

        // Close dropdown when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.profile-dropdown').length) {
                profileDropdownContent.removeClass('show');
            }
        });

        var initScrollNav = function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 200) {
                $('.navbar.fixed-top').addClass("bg-black");
            } else {
                $('.navbar.fixed-top').removeClass("bg-black");
            }
        }

        $(window).scroll(function () {
            initScrollNav();
        });

        var productSwiper = new Swiper(".product-swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 1,
                },
            },
        });

        var testimonialSwiper = new Swiper(".testimonial-swiper", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
})(jQuery);