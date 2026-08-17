// IndexNow URL Submission Script for inputtest.online
// This script submits all site URLs to Bing via IndexNow API
// Run automatically by GitHub Actions on every deploy

const https = require("https");

const INDEXNOW_KEY = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4";
const SITE_HOST = "inputtest.online";
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

// All URLs from sitemap.xml
const urlList = [
  "https://inputtest.online/",
  "https://inputtest.online/keyboard",
  "https://inputtest.online/mouse",
  "https://inputtest.online/sound",
  "https://inputtest.online/gamepad",
  "https://inputtest.online/mic",
  "https://inputtest.online/webcam",
  "https://inputtest.online/display",
  "https://inputtest.online/draw",
  "https://inputtest.online/latency",
  "https://inputtest.online/usb",
  "https://inputtest.online/usb-c",
  "https://inputtest.online/biometric",
  "https://inputtest.online/battery",
  "https://inputtest.online/printer",
  "https://inputtest.online/scanner",
  "https://inputtest.online/vr",
  "https://inputtest.online/lan",
  "https://inputtest.online/hdmi",
  "https://inputtest.online/vga",
  "https://inputtest.online/specs",
  "https://inputtest.online/report",
  "https://inputtest.online/blog",
  "https://inputtest.online/cps-test",
  "https://inputtest.online/typing",
  "https://inputtest.online/reaction",
  "https://inputtest.online/about",
  "https://inputtest.online/contact",
  "https://inputtest.online/privacy",
  "https://inputtest.online/terms",
  "https://inputtest.online/blog-battery-health",
  "https://inputtest.online/blog-battery-cycles",
  "https://inputtest.online/blog-keyboard-keys",
  "https://inputtest.online/blog-gamepad-drift",
  "https://inputtest.online/blog-dualshock-drift",
  "https://inputtest.online/blog-mouse-double-click",
  "https://inputtest.online/blog-mouse-polling-rate",
  "https://inputtest.online/blog-monitor-hz",
  "https://inputtest.online/blog-network-jitter",
  "https://inputtest.online/blog-drawing-tablet",
  "https://inputtest.online/blog-microphone-setup",
  "https://inputtest.online/blog-headphone-test",
  "https://inputtest.online/blog-usb-c-speeds",
  "https://inputtest.online/blog-vga-calibration",
  "https://inputtest.online/blog-webcam-resolution",
];

const payload = JSON.stringify({
  host: SITE_HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList,
});

const options = {
  hostname: "api.indexnow.org",
  path: "/IndexNow",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  },
};

console.log(`\n🚀 Submitting ${urlList.length} URLs to IndexNow (Bing)...`);
console.log(`📍 Host: ${SITE_HOST}`);
console.log(`🔑 Key: ${INDEXNOW_KEY}\n`);

const req = https.request(options, (res) => {
  console.log(`✅ Response Status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log("🎉 All URLs submitted successfully to Bing IndexNow!");
  } else if (res.statusCode === 202) {
    console.log("✅ URLs accepted for processing.");
  } else if (res.statusCode === 400) {
    console.error("❌ Bad request - Invalid format");
  } else if (res.statusCode === 403) {
    console.error("❌ Forbidden - Key not valid");
  } else if (res.statusCode === 422) {
    console.error("❌ Unprocessable - URLs don't belong to host");
  } else if (res.statusCode === 429) {
    console.error("❌ Too Many Requests - slow down submissions");
  } else {
    console.log(`ℹ️  Status: ${res.statusCode}`);
  }

  res.on("data", (chunk) => {
    if (chunk.toString().trim()) {
      console.log("Response body:", chunk.toString());
    }
  });
});

req.on("error", (err) => {
  console.error("❌ Error submitting to IndexNow:", err.message);
  process.exit(1);
});

req.write(payload);
req.end();
