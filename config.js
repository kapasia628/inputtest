/**
 * InputTest.online - Global Site Configuration
 * 
 * Update this single file to manage brand names, emails, features status, 
 * social media links, and Google AdSense slot credentials across all pages.
 */

const SiteConfig = {
    brandName: "InputTest.online",
    brandSlogan: "Universal Hardware & Input Device Tester",
    logoEmoji: "⌨️",
    supportEmail: "support@inputtest.online",
    
    // Google AdSense Settings
    adsense: {
        enabled: true,
        publisherId: "ca-pub-2485510445228691", // Put your real Google AdSense Publisher ID here (e.g. ca-pub-xxxxxxx)
        slots: {
            topLeaderboard: "9012345678",        // Top standard banner ad unit ID
            bottomLeaderboard: "8901234567",     // Bottom standard banner ad unit ID
            sidebarSquare: "7890123456"          // Standard square ad unit ID for layout slots
        }
    },

    // OneSignal Web Push Settings
    onesignal: {
        enabled: true,
        appId: "446f7df1-abdd-472b-b2ad-92e54dfac7fb" // Replace with your real OneSignal App ID from dashboard
    },

    // Monetization & PDF Report Settings
    monetization: {
        enablePdfPaywall: false, // Set to true to require payment to download certified PDFs, false for free downloads
        pdfPriceINR: 19,        // Price in Rupees for UPI QR payment modal
        pdfPriceUSD: 0.99       // Price in USD for Card payment modal
    },

    // Chrome Web Store Extension Settings
    chromeExtension: {
        enabled: true,
        storeUrl: "#", // Update with your live Chrome Web Store URL once Google review completes
        downloadZipUrl: "/inputtest-chrome-extension.zip"
    },
    
    // Feature Toggles (true = fully active, false = shows premium 'Coming Soon' placeholder)
    features: {
        keyboardTester: true,
        mouseTester: true,
        gamepadTester: true,
        microphoneTester: true,
        webcamTester: true,
        displayTester: true,
        drawingTester: true,
        latencyTester: true,
        usbProfiler: true,
        biometricTester: true,
        printerTester: true,
        scannerTester: true,
        vrTester: true
    },
    
    // Social Links & Resources
    socials: {
        twitter: "https://twitter.com/InputTestOnline",
        github: "https://github.com/Abbas/inputtest-online"
    },
    
    // Application Helper Methods
    initAdSense: function(slotElementId, slotType) {
        if (!this.adsense.enabled) return;
        
        const container = document.getElementById(slotElementId);
        if (!container) return;
        
        // Remove skeleton class
        container.classList.remove('animate-pulse');
        
        // Inject Google AdSense Ins Tag
        container.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block; text-align:center;"
                 data-ad-client="${this.adsense.publisherId}"
                 data-ad-slot="${this.adsense.slots[slotType]}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        `;
        
        // Try to trigger AdSense push
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // AdSense script not loaded yet or blocked by ad-blocker
            console.log("AdSense load skipped or adblocker detected: " + e.message);
            // Hide container if ad cannot be loaded
            if (container) container.style.display = "none";
        }
    },
    
    // Helper to dynamically update Brand Title and details in Header & Footer
    applyBrand: function() {
        document.querySelectorAll('.brand-name').forEach(el => el.textContent = this.brandName);
        document.querySelectorAll('.brand-slogan').forEach(el => el.textContent = this.brandSlogan);
        document.querySelectorAll('.logo-emoji').forEach(el => el.textContent = this.logoEmoji);
        document.querySelectorAll('.brand-email').forEach(el => {
            el.textContent = this.supportEmail;
            el.href = `mailto:${this.supportEmail}`;
        });
        document.querySelectorAll('.twitter-link').forEach(el => el.href = this.socials.twitter);
        document.querySelectorAll('.github-link').forEach(el => el.href = this.socials.github);
    },

    // Universal Header & Theme Interactivity across all pages
    initNavAndTheme: function() {
        // Theme toggle
        const themeToggleBtn = document.getElementById('theme-toggle');
        const sunIcon = document.getElementById('theme-toggle-sun');
        const moonIcon = document.getElementById('theme-toggle-moon');

        function syncThemeIcons() {
            if (document.documentElement.classList.contains('dark')) {
                sunIcon && sunIcon.classList.remove('hidden');
                moonIcon && moonIcon.classList.add('hidden');
            } else {
                sunIcon && sunIcon.classList.add('hidden');
                moonIcon && moonIcon.classList.remove('hidden');
            }
        }
        syncThemeIcons();

        if (themeToggleBtn && !themeToggleBtn.dataset.themeBound) {
            themeToggleBtn.dataset.themeBound = 'true';
            themeToggleBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                syncThemeIcons();
                localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            });
        }

        // Search Palette in Navbar
        const searchBar = document.getElementById("nav-search-bar");
        const searchPanel = document.getElementById("search-dropdown-panel");
        
        if (searchBar && searchPanel && !searchBar.dataset.searchBound) {
            searchBar.dataset.searchBound = 'true';
            const searchDatabase = [
                { title: "Keyboard Tester Online", desc: "Test switches, ghosting, key codes", url: "/keyboard" },
                { title: "Mouse & CPS Checker", desc: "Test clicks & CPS rate", url: "/mouse" },
                { title: "Scroll Wheel Jump Tester", desc: "Detect inverted ticks & jumping", url: "/scroll-test" },
                { title: "Mouse Polling Rate (Hz)", desc: "1000Hz to 8000Hz report rate", url: "/mouse-polling-rate" },
                { title: "Gamepad & Joystick Drift", desc: "Stick drift analyzer", url: "/gamepad" },
                { title: "Display & Monitor Tester", desc: "Dead pixels, refresh Hz", url: "/display" },
                { title: "Microphone Audio Check", desc: "Decibel meter & gain staging", url: "/mic" },
                { title: "Speaker & Sound Test", desc: "Stereo balance frequency sweep", url: "/sound" },
                { title: "Webcam Calibration Check", desc: "Resolution & FPS sensor test", url: "/webcam" },
                { title: "Audio & Bluetooth Latency", desc: "Wireless lag audit", url: "/latency" },
                { title: "Mouse Double Click Test", desc: "Detect faulty microswitch debounce chatter", url: "/mouse-double-click-test" },
                { title: "Keyboard Chatter Test", desc: "Detect multi-chatter mechanical switches", url: "/keyboard-chatter-test" },
                { title: "Controller Stick Drift Test", desc: "Measure stick circularity error & drift", url: "/controller-stick-drift-test" },
                { title: "USB-C Profiler", desc: "Power delivery profiles & Alt-mode", url: "/usb-c" },
                { title: "Certified Hardware PDF Report", desc: "Official verification certificate", url: "/report" }
            ];

            window.addEventListener("keydown", (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                    e.preventDefault();
                    searchBar.focus();
                }
            });

            document.addEventListener("click", (e) => {
                if (!searchBar.contains(e.target) && !searchPanel.contains(e.target)) {
                    searchPanel.classList.add("hidden");
                }
            });

            function showSearchResults() {
                const query = searchBar.value.toLowerCase().trim();
                searchPanel.innerHTML = '<div class="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">Diagnostic Modules</div>';
                
                const filtered = searchDatabase.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.desc.toLowerCase().includes(query)
                );

                if (filtered.length === 0) {
                    searchPanel.innerHTML += `<div class="px-3 py-2 text-xs text-slate-400 font-mono">No matching modules for "${searchBar.value}"</div>`;
                } else {
                    filtered.forEach(item => {
                        const a = document.createElement("a");
                        a.href = item.url;
                        a.className = "flex flex-col px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors";
                        a.innerHTML = `
                            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${item.title}</span>
                            <span class="text-[10px] text-slate-400 font-medium">${item.desc}</span>
                        `;
                        searchPanel.appendChild(a);
                    });
                }
                searchPanel.classList.remove("hidden");
            }

            searchBar.addEventListener("focus", showSearchResults);
            searchBar.addEventListener("input", showSearchResults);
        }

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        const mobileNavPanel = document.getElementById("mobile-nav-panel");
        const hamburgerIcon = document.getElementById("hamburger-icon");
        const hamburgerClose = document.getElementById("hamburger-close");

        if (mobileMenuToggle && mobileNavPanel && !mobileMenuToggle.dataset.menuBound) {
            mobileMenuToggle.dataset.menuBound = 'true';
            mobileMenuToggle.addEventListener("click", () => {
                mobileNavPanel.classList.toggle("hidden");
                hamburgerIcon && hamburgerIcon.classList.toggle("hidden");
                hamburgerClose && hamburgerClose.classList.toggle("hidden");
            });
        }
    }
};

// Auto apply brand properties and global features on page load
document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load internationalization (i18n) if not present
    if (!window.InputTestI18n && !document.querySelector('script[src*="i18n.js"]')) {
        const s = document.createElement('script');
        s.src = '/i18n.js';
        s.defer = true;
        document.head.appendChild(s);
    }
    SiteConfig.applyBrand();
    SiteConfig.initNavAndTheme();
});
