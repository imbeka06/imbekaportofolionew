        // --- Themed Background Images ---
        const themeBackgrounds = {
            got: {
                story: "https://images.unsplash.com/photo-1551493693-13895c024d20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                home: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                recruiter: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                developer: "https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                unfiltered: "https://images.unsplash.com/photo-1530103862676-de8c9de2d11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                adventure: "https://images.unsplash.com/photo-1605648437318-97c7b856e6aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                philosophy: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                'writings-blog-hub': "https://images.unsplash.com/photo-1506784983877-45594efa4c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                writings: "https://images.unsplash.com/photo-1506784983877-45594efa4c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Writings uses hub bg
                blog: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Blog uses hub bg initially
                 // NEW backgrounds for individual posts
                'blog-post-karura': "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Forest
                'blog-post-photography': "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Camera/Travel
                'blog-post-balance': "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // Nature/Calm
                photography: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                fails: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            },
            netflix: {
                story: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                home: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                recruiter: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                developer: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                unfiltered: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                adventure: "https://images.unsplash.com/photo-1464822759849-deb7485f1edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                philosophy: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                'writings-blog-hub': "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                writings: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                blog: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                 // NEW backgrounds for individual posts (using same as unfiltered for Netflix)
                'blog-post-karura': "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                'blog-post-photography': "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                'blog-post-balance': "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                photography: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
                fails: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            }
        };
        
        let currentView = 'story'; // Keep track of the current view

        document.addEventListener('DOMContentLoaded', function() {
            // Show STORY view by default
            showView('story');
            
            // Add scroll event listener to header
            window.addEventListener('scroll', function() {
                const header = document.querySelector('.theme-header');
                if (!header) return; // Don't run if header isn't visible
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

             // Initialize mobile menu
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            const mobileThemeSwitcher = document.querySelector('.mobile-theme-switcher'); // Get mobile switcher

            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close mobile menu when clicking on a link OR the mobile theme switcher
            document.querySelectorAll('#navLinks a, .mobile-theme-switcher').forEach(link => {
                link.addEventListener('click', function(e) { // Add event argument
                    // Only close menu if it's NOT opening a modal
                    const onclickAttr = link.getAttribute('onclick');
                    if (!onclickAttr || !onclickAttr.includes('openModal')) {
                         navLinks.classList.remove('active');
                         mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                         mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    }
                    // For modal links, let the default onclick handle it, don't close menu yet
                });
            });

            // Handle form submission
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                // We're avoiding alert(). We can add a simple confirmation.
                const form = document.getElementById('contactForm');
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.textContent = 'Sending...'; // Indicate processing
                submitBtn.disabled = true; // Disable button briefly

                // Simulate sending
                setTimeout(() => {
                     closeModal('contactModal');
                     submitBtn.textContent = 'Send Message';
                     submitBtn.disabled = false; // Re-enable
                     form.reset();
                     // You could add a success message here using a toast notification if desired
                }, 1500); // Shorter delay
            });
        });
        
        function showView(view) {
            // Hide all views first
            document.querySelectorAll('.view-content').forEach(el => {
                el.style.display = 'none'; // Ensure all are hidden immediately
            });
        
            // Show/Hide Header based on view
            const header = document.querySelector('.theme-header');
            if (view === 'story') {
                if (header) header.style.display = 'none';
            } else {
                if (header) header.style.display = 'flex';
            }
            
            // Show selected view
            const viewToShow = document.getElementById(`${view}-view`);
            if (viewToShow) {
                viewToShow.style.display = 'block'; // Make it visible
            } else {
                // Fallback to story view if not found
                const storyView = document.getElementById(`story-view`);
                if (storyView) storyView.style.display = 'block';
                view = 'story';
                if (header) header.style.display = 'none'; // Hide header for story fallback too
            }
            
            currentView = view; // Update global tracker
            
            // Change background image
            changeBackgroundImage(view);
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        
        function changeBackgroundImage(view) {
            const backgroundContainer = document.getElementById('backgroundContainer');
            if (!backgroundContainer) return; // Safety check

            const isNetflix = document.body.classList.contains('netflix-theme');
            const currentTheme = isNetflix ? 'netflix' : 'got';
            
            // Use the image for the current view, or story as a fallback
            const imageUrl = themeBackgrounds[currentTheme][view] || themeBackgrounds[currentTheme]['story'];
            
            // Apply fade-out effect (optional, simple approach)
            backgroundContainer.style.opacity = '0'; 

            // Change image after a short delay to allow fade-out
            setTimeout(() => {
                backgroundContainer.style.backgroundImage = `url('${imageUrl}')`;
                 // Apply fade-in effect
                backgroundContainer.style.opacity = '1';
            }, 500); // Match half the transition duration
        }

        function toggleTheme() {
            const body = document.body;
            const themeSwitchers = document.querySelectorAll('.theme-switcher'); // Get both switchers
            
            const isSwitchingToNetflix = !body.classList.contains('netflix-theme');
            
            if (isSwitchingToNetflix) {
                 body.classList.add('netflix-theme');
            } else {
                 body.classList.remove('netflix-theme');
            }

            // Update both buttons
            themeSwitchers.forEach(switcher => {
                const themeIcon = switcher.querySelector('i');
                const themeText = switcher.querySelector('span');
                if (isSwitchingToNetflix) {
                    themeIcon.className = 'fas fa-dragon'; // Show GoT icon to switch back
                    if(themeText) themeText.textContent = 'Switch to GoT Theme';
                } else {
                    themeIcon.className = 'fas fa-film'; // Show Netflix icon to switch back
                    if(themeText) themeText.textContent = 'Switch to Netflix Theme';
                }
            });
            
            // Update background for current view immediately
            changeBackgroundImage(currentView);
        }
        
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if(modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        }
        
        function closeModal(modalId) {
             const modal = document.getElementById(modalId);
             if(modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
             }
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target.id);
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                   closeModal(modal.id);
                });
            }
        });

