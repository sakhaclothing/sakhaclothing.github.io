// Authentication Service
const AuthService = {
    // Backend API URL - sesuaikan dengan URL backend Anda
    API_BASE_URL: 'https://sakhaclothing.shop/api',

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

            const response = await fetch(`${this.API_BASE_URL}/user/profile`, {
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

        // Profile functionality
        var profileSection = $('#profileSection');
        var profileDropdownBtn = $('#profileDropdownBtn');
        var profileDropdownContent = $('#profileDropdownContent');
        var logoutBtn = $('#logoutBtn');
        var profileName = $('#profileName');
        var profilePhoto = $('#profilePhoto');

        // Check if user is logged in using AuthService
        async function checkLoginStatus() {
            try {
                // First check if we have a token
                const token = AuthService.getToken();
                console.log('[DEBUG] Token:', token);
                if (!AuthService.isAuthenticated()) {
                    console.log('[DEBUG] Tidak ada token, sembunyikan profile');
                    hideProfile();
                    return;
                }

                // Validate token with backend
                const isValid = await AuthService.validateToken();
                console.log('[DEBUG] Hasil validasi token:', isValid);
                if (!isValid) {
                    // Token is invalid, clear everything
                    console.log('[DEBUG] Token tidak valid, hapus token dan sembunyikan profile');
                    AuthService.removeToken();
                    localStorage.removeItem('userData');
                    hideProfile();
                    return;
                }

                // Get user profile from backend
                const userData = await AuthService.getUserProfile();
                console.log('[DEBUG] Data user dari backend:', userData);
                if (userData) {
                    // Store user data locally for faster access
                    localStorage.setItem('userData', JSON.stringify(userData));
                    showProfile(userData);
                } else {
                    console.log('[DEBUG] Tidak dapat data user, sembunyikan profile');
                    hideProfile();
                }
            } catch (error) {
                console.error('[DEBUG] Error checking login status:', error);
                hideProfile();
            }
        }

        function showProfile(userData) {
            profileSection.show();
            profileName.text(userData.name || 'User Name');
            if (userData.photo) {
                profilePhoto.attr('src', userData.photo);
            }
        }

        function hideProfile() {
            profileSection.hide();
        }

        // Make functions globally available
        window.updateProfileDisplay = showProfile;
        window.hideProfileDisplay = hideProfile;

        // Add method to AuthService for checking and updating profile
        AuthService.checkAndUpdateProfile = function () {
            checkLoginStatus();
        };

        async function logout() {
            try {
                await AuthService.logout();
                hideProfile();
                // Redirect to login page
                window.location.href = 'https://sakhaclothing.shop/login';
            } catch (error) {
                console.error('Error during logout:', error);
                // Even if logout fails, hide profile locally
                hideProfile();
                window.location.href = 'https://sakhaclothing.shop/login';
            }
        }

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

        // Logout functionality
        logoutBtn.on('click', function (e) {
            e.preventDefault();
            logout();
        });

        // These functions are now defined globally above

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

        // Initialize profile status on page load
        checkLoginStatus();

        // Handle login redirect on page load
        AuthService.handleLoginRedirect();
    });
})(jQuery);