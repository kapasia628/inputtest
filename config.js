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
        publisherId: "ca-pub-3940256099942544", // Put your real Google AdSense Publisher ID here (e.g. ca-pub-xxxxxxx)
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
            // Show custom elegant placeholder indicating ad zone
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-xs text-slate-500 font-mono select-none">
                    <span class="tracking-widest opacity-40 uppercase">ADVERTISEMENT</span>
                    <span class="text-[10px] opacity-30 mt-1">${this.adsense.publisherId}</span>
                </div>
            `;
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
    }
};

// Auto apply brand properties on page load
document.addEventListener("DOMContentLoaded", () => {
    SiteConfig.applyBrand();
});
