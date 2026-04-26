/* HydraComix — i18n Language Engine
   To add a new language:
   1. Add a translations/<code>.json file
   2. Add an entry to LANGUAGES below
   3. Add a <div class="lang-option"> in the navbar dropdown
*/

const LANGUAGES = {
  en: { label: '🇬🇧 English',  file: 'translations/en.json' },
  fr: { label: '🇫🇷 Français', file: 'translations/fr.json', comingSoon: true },
  de: { label: '🇩🇪 Deutsch',  file: 'translations/de.json', comingSoon: true },
  ro: { label: '🇷🇴 Română',   file: 'translations/ro.json', comingSoon: true },
};

let currentLang = 'en';
let translations = {};

async function loadLanguage(code) {
  if (LANGUAGES[code]?.comingSoon) return;
  try {
    const res = await fetch(LANGUAGES[code].file);
    if (!res.ok) throw new Error(`Failed to load ${code}`);
    translations = await res.json();
    currentLang = code;
    localStorage.setItem('hydracomix-lang', code);
    applyTranslations();
    updateLangButton(code);
  } catch (err) {
    console.warn('i18n load error:', err);
  }
}

function t(key) {
  const parts = key.split('.');
  let val = translations;
  for (const part of parts) {
    if (val == null) return key;
    val = val[part];
  }
  return val ?? key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    const text = t(key);
    if (attr) {
      el.setAttribute(attr, text);
    } else {
      el.textContent = text;
    }
  });
}

function updateLangButton(code) {
  const btn = document.getElementById('lang-btn-label');
  if (btn) btn.textContent = LANGUAGES[code]?.label ?? code.toUpperCase();

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === code);
  });
}

function toggleLangDropdown() {
  document.querySelector('.lang-dropdown')?.classList.toggle('open');
}

function closeLangDropdown(e) {
  const dropdown = document.querySelector('.lang-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
}

function initI18n() {
  const saved = localStorage.getItem('hydracomix-lang') || 'en';
  loadLanguage(saved);

  document.addEventListener('click', closeLangDropdown);

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const code = opt.dataset.lang;
      if (!LANGUAGES[code]?.comingSoon) {
        loadLanguage(code);
      }
      document.querySelector('.lang-dropdown')?.classList.remove('open');
    });
  });
}

function toggleMobileNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', initI18n);
