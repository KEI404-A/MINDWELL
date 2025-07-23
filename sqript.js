
        // Scroll animations
        function setupScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Smooth scrolling
        function setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
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

        // Navbar scroll effect
        function setupNavbarEffect() {
            const navbar = document.querySelector('.navbar');
            let lastScrollY = window.scrollY;

            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 100) {
                    navbar.style.background = 'rgba(26, 35, 126, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                } else {
                    navbar.style.background = 'rgba(26, 35, 126, 0.95)';
                    navbar.style.boxShadow = 'none';
                }

                lastScrollY = currentScrollY;
            });
        }

        // Form submission
        function setupFormSubmission() {
            const form = document.getElementById('contact-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(form);
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;

                button.textContent = 'Sending...';
                button.disabled = true;

                fetch('https://formsubmit.co/ajax/2acfa1008d7a71c730d351c559d65d1e', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok.');
                    return response.json();
                })
                .then(data => {
                    button.textContent = 'Message Sent!';
                    button.style.background = 'var(--gradient-secondary)';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.background = '';
                        form.reset();
                    }, 2000);
                })
                .catch(error => {
                    button.textContent = 'Error!';
                    console.error('Error:', error);
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 2000);
                });
            });
        }
document.addEventListener('DOMContentLoaded', setupFormSubmission);


        // Mouse parallax effect
        function setupParallaxEffect() {
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                document.querySelectorAll('.floating-element').forEach((element, index) => {
                    const speed = (index + 1) * 2;
                    const x = (mouseX - 0.5) * speed;
                    const y = (mouseY - 0.5) * speed;
                    
                    element.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }

        // Button hover effects
        function setupButtonEffects() {
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Resize handler
        function setupResizeHandler() {
            window.addEventListener('resize', () => {
                if (camera && renderer) {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            init3D();
            setupScrollAnimations();
            setupSmoothScrolling();
            setupNavbarEffect();
            setupFormSubmission();
            setupParallaxEffect();
            setupButtonEffects();
            setupResizeHandler();
            // Add loading animation
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('screen-video');
            
            if (video) {
                video.loop = true;
                video.muted = true;
                video.autoplay = true;
                video.addEventListener('ended', function() {
                    video.currentTime = 0;
                    video.play();
                });
                video.addEventListener('loadeddata', function() {
                    video.play().catch(function(error) {
                        console.log('Auto-play dicegah oleh browser:', error);
                    });
                });
                video.addEventListener('timeupdate', function() {
                    if (video.duration - video.currentTime < 0.1) {
                        video.currentTime = 0;
                    }
                });
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => console.log('Play failed:', e));
                        }
                    });
                });
                
                observer.observe(video);
            }
        });

                const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');

        function toggleMenu() {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        function closeMenu() {
            menuToggle.classList.remove('open');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);

        // Close menu when clicking on nav links
        const navLinkElements = navLinks.querySelectorAll('a');
        navLinkElements.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });