/* HydraComix — i18n Language Engine
   To add a new language:
   1. Add a translations/<code>.json file
   2. Add an entry to LANGUAGES below
   3. Add a <button class="lang-option"> in the navbar dropdown
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
    opt.setAttribute('aria-selected', String(opt.dataset.lang === code));
  });
}

function toggleLangDropdown() {
  const dropdown = document.querySelector('.lang-dropdown');
  const button = document.querySelector('.lang-btn');
  if (!dropdown || !button) return;
  const isOpen = dropdown.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    dropdown.querySelector('.lang-option:not([disabled])')?.focus();
  }
}

function closeDropdown(dropdown) {
  dropdown?.classList.remove('open');
  document.querySelector('.lang-btn')?.setAttribute('aria-expanded', 'false');
}

function closeLangDropdown(e) {
  const dropdown = document.querySelector('.lang-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    closeDropdown(dropdown);
  }
}

function handleLangKeydown(e) {
  const dropdown = document.querySelector('.lang-dropdown');
  if (!dropdown) return;

  if (e.key === 'Escape') {
    closeDropdown(dropdown);
    document.querySelector('.lang-btn')?.focus();
    return;
  }

  const options = [...dropdown.querySelectorAll('.lang-option:not([disabled])')];
  const currentIndex = options.indexOf(document.activeElement);
  if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && options.length) {
    e.preventDefault();
    const direction = e.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + options.length) % options.length;
    options[nextIndex].focus();
  }
}

function initI18n() {
  const saved = localStorage.getItem('hydracomix-lang') || 'en';
  loadLanguage(saved);

  document.addEventListener('click', closeLangDropdown);
  document.addEventListener('keydown', handleLangKeydown);

  document.querySelector('.lang-btn')?.addEventListener('click', toggleLangDropdown);

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const code = opt.dataset.lang;
      if (!LANGUAGES[code]?.comingSoon) {
        loadLanguage(code);
      }
      closeDropdown(document.querySelector('.lang-dropdown'));
    });
  });

  document.querySelector('.hamburger')?.addEventListener('click', toggleMobileNav);
}

function toggleMobileNav() {
  const nav = document.querySelector('.nav-links');
  const button = document.querySelector('.hamburger');
  if (!nav || !button) return;
  const isOpen = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
}

document.addEventListener('DOMContentLoaded', initI18n);
