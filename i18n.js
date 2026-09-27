/**
 * InputTest.online - Internationalization (i18n) Engine
 * Multi-Language Global SEO & Dynamic Translation Layer
 * Supported: English (en), Español (es), Português (pt), Deutsch (de), हिन्दी (hi)
 */

(function () {
    'use strict';

    const I18N_CONFIG = {
        defaultLang: 'en',
        supportedLangs: {
            'en': { name: 'English', flag: '🇺🇸', dir: 'ltr' },
            'es': { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
            'pt': { name: 'Português', flag: '🇧🇷', dir: 'ltr' },
            'de': { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
            'hi': { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
        },
        storageKey: 'inputtest_lang_preference'
    };

    const TRANSLATIONS = {
        en: {
            // Navbar
            nav_keyboard: "Keyboard",
            nav_mouse: "Mouse",
            nav_polling: "Polling Rate",
            nav_scroll: "Scroll Jump",
            nav_display: "Display",
            nav_gamepad: "Gamepad",
            nav_more_tools: "More Tools",
            nav_report: "Certified Report",
            nav_search_placeholder: "Search module...",
            nav_mic: "Microphone Test",
            nav_speakers: "Stereo Speakers",
            nav_webcam: "Webcam Quality",
            nav_latency: "Bluetooth Latency",
            nav_cps: "CPS Click Tester",
            nav_typing: "Typing Speed WPM",
            nav_reaction: "Reaction Reflex",
            nav_stylus: "Stylus Pressure",
            nav_usb: "USB Device Profiler",
            nav_battery: "Battery Health",
            nav_mouse_double_click: "Mouse Double Click Test",
            nav_keyboard_chatter: "Keyboard Chatter Test",
            nav_stick_drift: "Controller Stick Drift Test",

            // General & Actions
            btn_start_test: "Start Test",
            btn_reset: "Reset Test",
            btn_share_score: "Share Score Badge",
            btn_copy_link: "Copy Link",
            btn_download_png: "Download Badge PNG",
            btn_share_x: "Post on X / Twitter",
            btn_share_reddit: "Post to Reddit",
            copied_toast: "Link copied to clipboard!",
            privacy_badge: "100% Client-Side Private • Zero Installation",
            footer_rights: "All rights reserved. Free browser-based hardware diagnostics.",
            footer_tagline: "Universal input hardware test lab for gamers, engineers, and technicians."
        },
        es: {
            // Navbar
            nav_keyboard: "Teclado",
            nav_mouse: "Ratón",
            nav_polling: "Tasa de Sondeo",
            nav_scroll: "Salto de Scroll",
            nav_display: "Pantalla",
            nav_gamepad: "Mando",
            nav_more_tools: "Más Herramientas",
            nav_report: "Informe Certificado",
            nav_search_placeholder: "Buscar módulo...",
            nav_mic: "Prueba de Micrófono",
            nav_speakers: "Altavoces Estéreo",
            nav_webcam: "Calidad de Cámara",
            nav_latency: "Latencia Bluetooth",
            nav_cps: "Probador de Clics CPS",
            nav_typing: "Velocidad de Escritura WPM",
            nav_reaction: "Reflejo de Reacción",
            nav_stylus: "Presión del Lápiz",
            nav_usb: "Perfilador USB",
            nav_battery: "Salud de Batería",
            nav_mouse_double_click: "Prueba Doble Clic Ratón",
            nav_keyboard_chatter: "Prueba de Rebote de Teclado",
            nav_stick_drift: "Prueba de Deriva de Palanca",

            // General & Actions
            btn_start_test: "Iniciar Prueba",
            btn_reset: "Reiniciar",
            btn_share_score: "Compartir Tarjeta",
            btn_copy_link: "Copiar Enlace",
            btn_download_png: "Descargar PNG",
            btn_share_x: "Publicar en X",
            btn_share_reddit: "Publicar en Reddit",
            copied_toast: "¡Enlace copiado al portapapeles!",
            privacy_badge: "100% Privado en Cliente • Sin Instalación",
            footer_rights: "Todos los derechos reservados. Diagnóstico de hardware en el navegador.",
            footer_tagline: "Laboratorio universal de prueba de hardware para gamers y técnicos."
        },
        pt: {
            // Navbar
            nav_keyboard: "Teclado",
            nav_mouse: "Mouse",
            nav_polling: "Taxa de Sondagem",
            nav_scroll: "Salto de Scroll",
            nav_display: "Monitor",
            nav_gamepad: "Controle",
            nav_more_tools: "Mais Ferramentas",
            nav_report: "Relatório Certificado",
            nav_search_placeholder: "Pesquisar módulo...",
            nav_mic: "Teste de Microfone",
            nav_speakers: "Alto-falantes Estéreo",
            nav_webcam: "Qualidade da Webcam",
            nav_latency: "Latência Bluetooth",
            nav_cps: "Teste de Cliques CPS",
            nav_typing: "Velocidade Digitação WPM",
            nav_reaction: "Reflexo de Reação",
            nav_stylus: "Pressão de Caneta",
            nav_usb: "Perfilador USB",
            nav_battery: "Saúde da Bateria",
            nav_mouse_double_click: "Teste Duplo Clique Mouse",
            nav_keyboard_chatter: "Teste de Repetição Teclado",
            nav_stick_drift: "Teste Drift de Analógico",

            // General & Actions
            btn_start_test: "Iniciar Teste",
            btn_reset: "Redefinir",
            btn_share_score: "Compartilhar Cartão",
            btn_copy_link: "Copiar Link",
            btn_download_png: "Baixar PNG",
            btn_share_x: "Postar no X",
            btn_share_reddit: "Postar no Reddit",
            copied_toast: "Link copiado para a área de transferência!",
            privacy_badge: "100% Privado no Navegador • Sem Instalação",
            footer_rights: "Todos os direitos reservados. Diagnóstico gratuito de hardware.",
            footer_tagline: "Laboratório universal de testes de hardware para jogadores e técnicos."
        },
        de: {
            // Navbar
            nav_keyboard: "Tastatur",
            nav_mouse: "Maus",
            nav_polling: "Abtastrate",
            nav_scroll: "Mausrad-Sprung",
            nav_display: "Bildschirm",
            nav_gamepad: "Gamepad",
            nav_more_tools: "Mehr Tools",
            nav_report: "Zertifizierter Bericht",
            nav_search_placeholder: "Modul suchen...",
            nav_mic: "Mikrofon-Test",
            nav_speakers: "Stereo-Lautsprecher",
            nav_webcam: "Webcam-Qualität",
            nav_latency: "Bluetooth-Latenz",
            nav_cps: "CPS-Klick-Tester",
            nav_typing: "Tippgeschwindigkeit WPM",
            nav_reaction: "Reaktionszeit",
            nav_stylus: "Stiftdruck-Test",
            nav_usb: "USB-Geräte-Profiler",
            nav_battery: "Akkuzustand",
            nav_mouse_double_click: "Maus-Doppelklick-Test",
            nav_keyboard_chatter: "Tastatur-Chatter-Test",
            nav_stick_drift: "Gamepad Stick-Drift-Test",

            // General & Actions
            btn_start_test: "Test Starten",
            btn_reset: "Zurücksetzen",
            btn_share_score: "Ergebnis-Badge Teilen",
            btn_copy_link: "Link Kopieren",
            btn_download_png: "PNG Herunterladen",
            btn_share_x: "Auf X Teilen",
            btn_share_reddit: "Auf Reddit Teilen",
            copied_toast: "Link in die Zwischenablage kopiert!",
            privacy_badge: "100% Lokal im Browser • Keine Installation",
            footer_rights: "Alle Rechte vorbehalten. Kostenlose Hardware-Diagnose im Browser.",
            footer_tagline: "Universelles Hardware-Testlabor für Gamer, Ingenieure und Techniker."
        },
        hi: {
            // Navbar
            nav_keyboard: "कीबोर्ड",
            nav_mouse: "माउस",
            nav_polling: "पोलिंग रेट",
            nav_scroll: "स्क्रॉल जंप",
            nav_display: "डिस्प्ले",
            nav_gamepad: "गेमपैड",
            nav_more_tools: "अन्य टूल्स",
            nav_report: "सर्टिफाइड रिपोर्ट",
            nav_search_placeholder: "मॉड्यूल खोजें...",
            nav_mic: "माइक टेस्ट",
            nav_speakers: "स्टीरियो स्पीकर्स",
            nav_webcam: "वेबकैम टेस्ट",
            nav_latency: "ब्लूटूथ लेटेंसी",
            nav_cps: "CPS क्लिक टेस्ट",
            nav_typing: "टाइपिंग स्पीड WPM",
            nav_reaction: "रिएक्शन टाइम",
            nav_stylus: "स्टाइलस प्रेशर",
            nav_usb: "USB प्रोफाइलर",
            nav_battery: "बैटरी हेल्थ",
            nav_mouse_double_click: "माउस डबल क्लिक टेस्ट",
            nav_keyboard_chatter: "कीबोर्ड चैटर टेस्ट",
            nav_stick_drift: "कंट्रोलर स्टिक ड्रिफ्ट टेस्ट",

            // General & Actions
            btn_start_test: "टेस्ट शुरू करें",
            btn_reset: "रीसेट करें",
            btn_share_score: "स्कोर कार्ड शेयर करें",
            btn_copy_link: "लिंक कॉपी करें",
            btn_download_png: "PNG डाउनलोड करें",
            btn_share_x: "X पर शेयर करें",
            btn_share_reddit: "Reddit पर शेयर करें",
            copied_toast: "लिंक क्लिपबोर्ड पर कॉपी हो गया!",
            privacy_badge: "100% सुरक्षित ब्राउज़र टेस्ट • कोई ऐप इंस्टॉल नहीं",
            footer_rights: "सर्वाधिकार सुरक्षित। निःशुल्क ऑनलाइन हार्डवेयर डायग्नोस्टिक्स।",
            footer_tagline: "गेमर्स और टेक प्रोफेशनल्स के लिए भारत और दुनिया का विश्वसनीय हार्डवेयर लैब।"
        }
    };

    class I18nManager {
        constructor() {
            this.currentLang = this.detectLanguage();
            this.init();
        }

        detectLanguage() {
            // 1. URL parameter check (?lang=es)
            const params = new URLSearchParams(window.location.search);
            const urlLang = params.get('lang');
            if (urlLang && I18N_CONFIG.supportedLangs[urlLang.toLowerCase()]) {
                return urlLang.toLowerCase();
            }

            // 2. LocalStorage check
            try {
                const storedLang = localStorage.getItem(I18N_CONFIG.storageKey);
                if (storedLang && I18N_CONFIG.supportedLangs[storedLang]) {
                    return storedLang;
                }
            } catch (e) {}

            // 3. Browser language
            const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
            if (I18N_CONFIG.supportedLangs[browserLang]) {
                return browserLang;
            }

            return I18N_CONFIG.defaultLang;
        }

        setLanguage(lang) {
            if (!I18N_CONFIG.supportedLangs[lang]) return;
            this.currentLang = lang;
            try {
                localStorage.setItem(I18N_CONFIG.storageKey, lang);
            } catch (e) {}

            // Update html lang attribute
            document.documentElement.lang = lang;
            document.documentElement.dir = I18N_CONFIG.supportedLangs[lang].dir || 'ltr';

            // Update URL without reload
            const url = new URL(window.location);
            if (lang === 'en') {
                url.searchParams.delete('lang');
            } else {
                url.searchParams.set('lang', lang);
            }
            window.history.replaceState({}, '', url);

            // Apply translations to DOM
            this.translatePage();
            this.updateSelectorButton();

            // Trigger global event
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
        }

        t(key, fallback = '') {
            const langTable = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
            if (langTable && langTable[key]) {
                return langTable[key];
            }
            if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
                return TRANSLATIONS.en[key];
            }
            return fallback || key;
        }

        translatePage() {
            // 1. Translate elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translation = this.t(key);
                if (translation) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translation;
                    } else {
                        el.textContent = translation;
                    }
                }
            });

            // 2. Intelligent Auto-translation for Nav links & Search bar across all pages
            const navMap = {
                '/keyboard': 'nav_keyboard',
                '/mouse': 'nav_mouse',
                '/mouse-polling-rate': 'nav_polling',
                '/scroll-test': 'nav_scroll',
                '/display': 'nav_display',
                '/gamepad': 'nav_gamepad',
                '/mic': 'nav_mic',
                '/sound': 'nav_speakers',
                '/webcam': 'nav_webcam',
                '/latency': 'nav_latency',
                '/cps-test': 'nav_cps',
                '/typing': 'nav_typing',
                '/reaction': 'nav_reaction',
                '/draw': 'nav_stylus',
                '/usb': 'nav_usb',
                '/battery': 'nav_battery',
                '/mouse-double-click-test': 'nav_mouse_double_click',
                '/keyboard-chatter-test': 'nav_keyboard_chatter',
                '/controller-stick-drift-test': 'nav_stick_drift'
            };

            document.querySelectorAll('header nav a, #mobile-nav-panel a').forEach(a => {
                const href = a.getAttribute('href');
                if (href && navMap[href]) {
                    const translation = this.t(navMap[href]);
                    if (translation) {
                        // Preserves icon emoji if present
                        const emojiMatch = a.textContent.match(/^[\p{Emoji}\s]+/u);
                        if (emojiMatch && a.children.length === 0) {
                            a.textContent = emojiMatch[0] + ' ' + translation;
                        } else if (a.children.length === 2 && a.children[1].tagName === 'SPAN') {
                            a.children[1].textContent = translation;
                        } else if (a.children.length === 0) {
                            a.textContent = translation;
                        }
                    }
                }
            });

            // Search bar placeholder
            const searchBar = document.getElementById('nav-search-bar');
            if (searchBar) {
                searchBar.placeholder = this.t('nav_search_placeholder', 'Search module...');
            }

            // Dropdown button
            const dropdownBtn = document.getElementById('nav-dropdown-btn');
            if (dropdownBtn && dropdownBtn.querySelector('span')) {
                dropdownBtn.querySelector('span').textContent = this.t('nav_more_tools', 'More Tools');
            }
        }

        renderLanguageSwitcher() {
            // Find theme toggle to place language selector directly adjacent to it
            const themeToggle = document.getElementById('theme-toggle');
            if (!themeToggle || document.getElementById('lang-selector-container')) return;

            const container = document.createElement('div');
            container.id = 'lang-selector-container';
            container.className = 'relative inline-block text-left';

            const activeLangObj = I18N_CONFIG.supportedLangs[this.currentLang] || I18N_CONFIG.supportedLangs.en;

            container.innerHTML = `
                <button id="lang-btn" type="button" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1220] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer text-xs font-semibold shadow-2xs" aria-label="Select language" aria-expanded="false">
                    <span id="lang-flag" class="text-sm leading-none">${activeLangObj.flag}</span>
                    <span id="lang-code" class="uppercase font-mono text-[11px] font-bold">${this.currentLang}</span>
                    <svg class="h-3 w-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div id="lang-dropdown" class="hidden absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 focus:outline-none">
                    <div class="px-2.5 py-1.5 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 mb-1">
                        Select Language
                    </div>
                    ${Object.entries(I18N_CONFIG.supportedLangs).map(([code, data]) => `
                        <button type="button" data-lang-choice="${code}" class="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl font-medium transition-colors ${this.currentLang === code ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">
                            <span class="flex items-center gap-2">
                                <span>${data.flag}</span>
                                <span>${data.name}</span>
                            </span>
                            <span class="text-[10px] font-mono uppercase text-slate-400">${code}</span>
                        </button>
                    `).join('')}
                </div>
            `;

            themeToggle.parentNode.insertBefore(container, themeToggle);

            // Bind click handlers
            const langBtn = container.querySelector('#lang-btn');
            const langDropdown = container.querySelector('#lang-dropdown');

            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('hidden');
            });

            container.querySelectorAll('[data-lang-choice]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const chosen = btn.getAttribute('data-lang-choice');
                    this.setLanguage(chosen);
                    langDropdown.classList.add('hidden');
                });
            });

            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    langDropdown.classList.add('hidden');
                }
            });
        }

        updateSelectorButton() {
            const flagEl = document.getElementById('lang-flag');
            const codeEl = document.getElementById('lang-code');
            const activeLangObj = I18N_CONFIG.supportedLangs[this.currentLang];
            if (flagEl && codeEl && activeLangObj) {
                flagEl.textContent = activeLangObj.flag;
                codeEl.textContent = this.currentLang;
            }

            // Update active state in dropdown list
            document.querySelectorAll('[data-lang-choice]').forEach(btn => {
                const code = btn.getAttribute('data-lang-choice');
                if (code === this.currentLang) {
                    btn.className = 'w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 transition-colors';
                } else {
                    btn.className = 'w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors';
                }
            });
        }

        init() {
            const onReady = () => {
                document.documentElement.lang = this.currentLang;
                this.renderLanguageSwitcher();
                this.translatePage();
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', onReady);
            } else {
                onReady();
            }
        }
    }

    // Expose globally
    window.InputTestI18n = new I18nManager();
})();
