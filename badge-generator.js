/**
 * InputTest.online - Viral Result Badge Generator
 * 
 * Generates high-DPI 1200x630 dark-mode social benchmark cards for Twitter, Discord, Reddit, and WhatsApp.
 */

const BadgeGenerator = {
    // Show Modal with Generated Badge
    show: function(options) {
        const config = {
            title: options.title || "HARDWARE BENCHMARK RESULT",
            score: options.score || "0.0",
            scoreUnit: options.scoreUnit || "",
            rankTitle: options.rankTitle || "VERIFIED RESULT",
            rankColor: options.rankColor || "#10b981", // emerald
            percentile: options.percentile || "Top Tier Performance",
            metrics: options.metrics || [
                { label: "Device Telemetry", value: "100% Client-Side" },
                { label: "Matrix Check", value: "Verified NKRO" },
                { label: "Server Delay", value: "0.00ms Zero Latency" }
            ],
            shareText: options.shareText || "Check out my hardware benchmark score on InputTest.online!",
            shareUrl: options.shareUrl || window.location.href
        };

        // Ensure modal DOM exists
        let modal = document.getElementById('badge-share-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'badge-share-modal';
            modal.className = 'fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-fadeIn';
            modal.innerHTML = `
                <div class="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
                    
                    <!-- Close button -->
                    <button id="badge-modal-close" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold z-20">
                        &times;
                    </button>

                    <!-- Header -->
                    <div class="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-1">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Official Benchmark Card</span>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight mb-4">
                        Share Your Achievement
                    </h3>

                    <!-- Canvas Preview Container -->
                    <div class="w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-inner bg-slate-950 flex items-center justify-center mb-5 relative group">
                        <canvas id="badge-canvas" width="1200" height="630" class="w-full h-auto object-contain block rounded-2xl"></canvas>
                        <div id="badge-copied-toast" class="absolute inset-0 bg-blue-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white font-black text-base opacity-0 pointer-events-none transition-opacity duration-200">
                            <span class="text-3xl mb-1">📋</span>
                            <span>Copied to Clipboard!</span>
                            <span class="text-xs font-normal text-blue-100 mt-1">Paste directly into Discord, Twitter, or Reddit</span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-bold text-xs">
                        <button id="badge-btn-copy" class="col-span-2 sm:col-span-1 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer">
                            <span>📋</span>
                            <span>Copy Image</span>
                        </button>
                        <button id="badge-btn-download" class="col-span-2 sm:col-span-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer border border-slate-700">
                            <span>💾</span>
                            <span>Download</span>
                        </button>
                        <a id="badge-btn-twitter" href="#" target="_blank" rel="noopener noreferrer" class="col-span-1 py-3 px-3 rounded-xl bg-[#0f1419] hover:bg-[#1a232c] text-white flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-slate-700">
                            <span>𝕏</span>
                            <span>Tweet</span>
                        </a>
                        <a id="badge-btn-reddit" href="#" target="_blank" rel="noopener noreferrer" class="col-span-1 py-3 px-3 rounded-xl bg-[#ff4500] hover:bg-[#e03d00] text-white flex items-center justify-center gap-1.5 transition-all active:scale-95">
                            <span>👾</span>
                            <span>Reddit</span>
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Close events
            document.getElementById('badge-modal-close').addEventListener('click', () => {
                modal.classList.add('hidden');
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.add('hidden');
            });
        }

        modal.classList.remove('hidden');

        // Draw Canvas Card
        const canvas = document.getElementById('badge-canvas');
        this.renderCanvas(canvas, config);

        // Bind Actions
        const btnCopy = document.getElementById('badge-btn-copy');
        const btnDownload = document.getElementById('badge-btn-download');
        const btnTwitter = document.getElementById('badge-btn-twitter');
        const btnReddit = document.getElementById('badge-btn-reddit');
        const toast = document.getElementById('badge-copied-toast');

        // 1. Copy Image to Clipboard
        btnCopy.onclick = async () => {
            try {
                canvas.toBlob(async (blob) => {
                    if (!blob) return;
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    toast.classList.remove('opacity-0');
                    setTimeout(() => toast.classList.add('opacity-0'), 2000);
                });
            } catch (err) {
                // Fallback copy share link
                navigator.clipboard.writeText(`${config.shareText}\n${config.shareUrl}`);
                alert('Copied share link to clipboard!');
            }
        };

        // 2. Download Image
        btnDownload.onclick = () => {
            const link = document.createElement('a');
            link.download = `inputtest-${config.score.toString().replace(/[^a-zA-Z0-9]/g, '_')}-badge.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };

        // 3. Twitter Intent
        const tweetMsg = encodeURIComponent(`${config.shareText}\n\nVerified on @InputTestOnline 🚀\n${config.shareUrl}`);
        btnTwitter.href = `https://twitter.com/intent/tweet?text=${tweetMsg}`;

        // 4. Reddit Intent
        const redditTitle = encodeURIComponent(`${config.shareText} [InputTest.online]`);
        const redditUrl = encodeURIComponent(config.shareUrl);
        btnReddit.href = `https://www.reddit.com/submit?title=${redditTitle}&url=${redditUrl}`;
    },

    // High-Resolution 1200x630 Card Rendering
    renderCanvas: function(canvas, c) {
        const ctx = canvas.getContext('2d');
        const w = 1200;
        const h = 630;

        // Background Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, '#070b14');
        bgGrad.addColorStop(0.5, '#0b1329');
        bgGrad.addColorStop(1, '#05080f');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Tech Grid Overlay
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Ambient Glow Circle
        const glowGrad = ctx.createRadialGradient(w / 2, h / 2 - 20, 50, w / 2, h / 2 - 20, 380);
        glowGrad.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
        glowGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.08)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, w, h);

        // Border Glow
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
        ctx.lineWidth = 3;
        ctx.strokeRect(24, 24, w - 48, h - 48);

        // Corner accents
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 6;
        // Top-left
        ctx.beginPath(); ctx.moveTo(24, 60); ctx.lineTo(24, 24); ctx.lineTo(60, 24); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(w - 60, 24); ctx.lineTo(w - 24, 24); ctx.lineTo(w - 24, 60); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(24, h - 60); ctx.lineTo(24, h - 24); ctx.lineTo(60, h - 24); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(w - 60, h - 24); ctx.lineTo(w - 24, h - 24); ctx.lineTo(w - 24, h - 60); ctx.stroke();

        // Brand Logo Top Left
        // Logo Box
        ctx.fillStyle = '#2563eb';
        this.roundRect(ctx, 60, 55, 52, 52, 14);
        ctx.fill();

        // Keyboard Icon
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(70, 68, 32, 24);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(75, 74, 4, 3);
        ctx.fillRect(84, 74, 4, 3);
        ctx.fillRect(93, 74, 4, 3);
        ctx.fillRect(77, 82, 18, 3);

        // Ping dot
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(106, 102, 6, 0, Math.PI * 2);
        ctx.fill();

        // Brand Name
        ctx.font = '900 32px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('InputTest', 126, 88);
        ctx.font = '600 20px monospace';
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('.online', 274, 88);

        // Subtitle
        ctx.font = '700 12px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('HARDWARE BENCHMARK & TELEMETRY LAB', 128, 106);

        // Top Right Official Stamp
        ctx.font = '700 13px monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText('● 100% VERIFIED TELEMETRY', w - 290, 85);
        ctx.font = '500 11px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), w - 165, 105);

        // Center Title Pill
        ctx.font = '800 14px monospace';
        ctx.fillStyle = '#93c5fd';
        ctx.textAlign = 'center';
        ctx.fillText(c.title.toUpperCase(), w / 2, 180);

        // Big Hero Score
        ctx.font = '900 130px system-ui, -apple-system, sans-serif';
        const scoreGrad = ctx.createLinearGradient(w / 2 - 150, 220, w / 2 + 150, 340);
        scoreGrad.addColorStop(0, '#ffffff');
        scoreGrad.addColorStop(1, '#60a5fa');
        ctx.fillStyle = scoreGrad;
        ctx.fillText(c.score, w / 2 - (c.scoreUnit ? 35 : 0), 320);

        if (c.scoreUnit) {
            ctx.font = '900 48px system-ui, -apple-system, sans-serif';
            ctx.fillStyle = '#38bdf8';
            ctx.textAlign = 'left';
            ctx.fillText(c.scoreUnit, w / 2 + (ctx.measureText(c.score).width / 2) - 15, 300);
        }

        // Rank Badge Pill
        ctx.textAlign = 'center';
        const rankText = c.rankTitle.toUpperCase();
        ctx.font = '800 20px monospace';
        const pillWidth = ctx.measureText(rankText).width + 60;
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.strokeStyle = c.rankColor || '#10b981';
        ctx.lineWidth = 2;
        this.roundRect(ctx, w / 2 - pillWidth / 2, 360, pillWidth, 44, 22);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = c.rankColor || '#34d399';
        ctx.fillText(rankText, w / 2, 389);

        // Percentile Text
        ctx.font = '600 18px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(c.percentile, w / 2, 435);

        // Bottom Metrics Cards (3 columns)
        const metricBoxWidth = 320;
        const metricBoxHeight = 85;
        const startX = 90;
        const cardY = 475;

        c.metrics.slice(0, 3).forEach((m, idx) => {
            const bx = startX + idx * (metricBoxWidth + 40);
            ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
            ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
            ctx.lineWidth = 1.5;
            this.roundRect(ctx, bx, cardY, metricBoxWidth, metricBoxHeight, 16);
            ctx.fill();
            ctx.stroke();

            ctx.textAlign = 'left';
            ctx.font = '700 11px monospace';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(m.label.toUpperCase(), bx + 20, cardY + 32);

            ctx.font = '800 18px system-ui, -apple-system, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(m.value, bx + 20, cardY + 62);
        });

        // Bottom Watermark
        ctx.textAlign = 'center';
        ctx.font = '600 12px monospace';
        ctx.fillStyle = '#475569';
        ctx.fillText('BENCHMARKED PRIVATELY WITH ZERO SERVER DATA LOGGING • INPUTTEST.ONLINE', w / 2, 595);
    },

    // Helper to draw rounded rectangle on canvas
    roundRect: function(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
};

window.BadgeGenerator = BadgeGenerator;
