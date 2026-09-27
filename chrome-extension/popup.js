/**
 * InputTest - Chrome Extension Popup Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Tab Switching
  const tabCps = document.getElementById('tab-cps');
  const tabKey = document.getElementById('tab-key');
  const paneCps = document.getElementById('pane-cps');
  const paneKey = document.getElementById('pane-key');

  tabCps.addEventListener('click', () => {
    tabCps.classList.add('active');
    tabKey.classList.remove('active');
    paneCps.classList.add('active');
    paneKey.classList.remove('active');
  });

  tabKey.addEventListener('click', () => {
    tabKey.classList.add('active');
    tabCps.classList.remove('active');
    paneKey.classList.add('active');
    paneCps.classList.remove('active');
  });

  // Mini CPS Test Logic
  const cpsBtn = document.getElementById('cps-click-btn');
  const clickCountEl = document.getElementById('click-count');
  const cpsValEl = document.getElementById('cps-val');
  const timerValEl = document.getElementById('timer-val');

  let clicks = 0;
  let isTesting = false;
  let testDuration = 5.0;
  let timeRemaining = testDuration;
  let cpsTimer = null;
  let startTime = null;

  cpsBtn.addEventListener('click', () => {
    if (!isTesting) {
      // Start test
      isTesting = true;
      clicks = 1;
      startTime = performance.now();
      timeRemaining = testDuration;
      clickCountEl.textContent = clicks;
      cpsValEl.textContent = "0.0";
      timerValEl.textContent = testDuration.toFixed(1) + 's';
      cpsBtn.textContent = "KEEP CLICKING!";
      cpsBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";

      cpsTimer = setInterval(() => {
        const elapsed = (performance.now() - startTime) / 1000;
        timeRemaining = Math.max(0, testDuration - elapsed);
        timerValEl.textContent = timeRemaining.toFixed(1) + 's';

        const liveCps = elapsed > 0 ? (clicks / elapsed).toFixed(1) : 0;
        cpsValEl.textContent = liveCps;

        if (timeRemaining <= 0) {
          clearInterval(cpsTimer);
          isTesting = false;
          const finalCps = (clicks / testDuration).toFixed(2);
          cpsValEl.textContent = finalCps;
          cpsBtn.textContent = `DONE! ${finalCps} CPS (CLICK TO RETRY)`;
          cpsBtn.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
        }
      }, 50);
    } else {
      // Record click
      clicks++;
      clickCountEl.textContent = clicks;
      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed > 0) {
        cpsValEl.textContent = (clicks / elapsed).toFixed(1);
      }
    }
  });

  // Mini Key Press Monitor Logic
  const lastKeyEl = document.getElementById('last-key');
  const keyCodeEl = document.getElementById('key-code');
  const keyNameEl = document.getElementById('key-name');
  const keyWhichEl = document.getElementById('key-which');

  window.addEventListener('keydown', (e) => {
    // Prevent default scrolling on spacebar inside popup
    if (e.code === 'Space') {
      e.preventDefault();
    }

    lastKeyEl.textContent = e.key === ' ' ? 'Space' : e.key;
    keyCodeEl.textContent = e.code;
    keyNameEl.textContent = e.key;
    keyWhichEl.textContent = e.keyCode || e.which;

    // Pulse animation
    lastKeyEl.style.transform = 'scale(1.08)';
    lastKeyEl.style.borderColor = '#38bdf8';
    setTimeout(() => {
      lastKeyEl.style.transform = 'scale(1)';
      lastKeyEl.style.borderColor = '#334155';
    }, 100);
  });
});
