/* =========================================================
   Scriptorium frontend logic
   Shared across index.html, pages/history.html and pages/about.html
   ========================================================= */

// Point this at wherever the backend (server.js) is actually running.
const API_BASE = 'http://localhost:5000/api';

// Fallback catalog used only if the backend is unreachable, so the
// language pickers and background backdrop still work offline.
const FALLBACK_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', font: "'Inter', sans-serif", sample: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', font: "'Noto Sans Tamil', sans-serif", sample: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', font: "'Noto Sans Devanagari', sans-serif", sample: 'अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह' },
  { code: 'fr', name: 'French', nativeName: 'Français', font: "'Inter', sans-serif", sample: 'AÀÂÇÉÈÊËÎÏÔŒÙÛÜŸBCDFGHJKLMNPQRSTVWXZ' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', font: "'Inter', sans-serif", sample: 'AÁÉÍÑÓÚÜBCDFGHJKLMNPQRSTVWXYZ' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文', font: "'Noto Sans SC', sans-serif", sample: '一二三四五六七八九十你好世界中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', font: "'Noto Sans JP', sans-serif", sample: 'あいうえおかきくけこアイウエオ' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', font: "'Noto Naskh Arabic', serif", sample: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', font: "'Inter', sans-serif", sample: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' }
];

const THEME_KEY = 'scriptorium.theme';

/* ---------------------------------------------------------
   Theme (accent color / light-dark mode / ink density)
   --------------------------------------------------------- */
const Theme = {
  defaults: { accent: '#e7b84b', mode: 'dark', density: 55 },

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(THEME_KEY));
      return { ...this.defaults, ...(saved || {}) };
    } catch {
      return { ...this.defaults };
    }
  },

  save(theme) {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  },

  apply(theme) {
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.setAttribute('data-mode', theme.mode);
    document.documentElement.style.setProperty('--glyph-count', theme.density);
  }
};

function initThemeControls() {
  const theme = Theme.load();
  Theme.apply(theme);

  const accentPicker = document.getElementById('accentPicker');
  const modeToggle = document.getElementById('modeToggle');
  const densitySlider = document.getElementById('densitySlider');
  const densityValue = document.getElementById('densityValue');
  const resetBtn = document.getElementById('resetTheme');

  if (accentPicker) accentPicker.value = theme.accent;
  if (modeToggle) modeToggle.checked = theme.mode === 'light';
  if (densitySlider) densitySlider.value = theme.density;
  if (densityValue) densityValue.textContent = theme.density;

  accentPicker && accentPicker.addEventListener('input', (e) => {
    theme.accent = e.target.value;
    Theme.apply(theme);
    Theme.save(theme);
  });

  modeToggle && modeToggle.addEventListener('change', (e) => {
    theme.mode = e.target.checked ? 'light' : 'dark';
    Theme.apply(theme);
    Theme.save(theme);
  });

  densitySlider && densitySlider.addEventListener('input', (e) => {
    theme.density = Number(e.target.value);
    densityValue.textContent = theme.density;
    Theme.apply(theme);
    Theme.save(theme);
    Backdrop.render(Backdrop.currentLang);
  });

  resetBtn && resetBtn.addEventListener('click', () => {
    Object.assign(theme, Theme.defaults);
    Theme.apply(theme);
    Theme.save(theme);
    if (accentPicker) accentPicker.value = theme.accent;
    if (modeToggle) modeToggle.checked = false;
    if (densitySlider) densitySlider.value = theme.density;
    if (densityValue) densityValue.textContent = theme.density;
    Backdrop.render(Backdrop.currentLang);
  });
}

/* ---------------------------------------------------------
   Living script backdrop — the signature visual
   ---------------------------------------------------------
   Scatters glyphs from the active language's script across a
   fixed full-screen layer behind the dashboard, and redraws
   itself whenever the "background script" language changes.
*/
const Backdrop = {
  el: null,
  currentLang: null,

  init(languages) {
    this.el = document.getElementById('scriptBackdrop');
    this.languages = languages;
  },

  render(langCode) {
    if (!this.el) return;
    const lang = this.languages.find(l => l.code === langCode) || this.languages[0];
    this.currentLang = lang.code;

    const count = Number(getComputedStyle(document.documentElement).getPropertyValue('--glyph-count')) || 55;
    const chars = Array.from(lang.sample);

    // Fade the old set out, then swap in the new one.
    this.el.style.transition = 'opacity .35s ease';
    this.el.style.opacity = '0';

    setTimeout(() => {
      this.el.innerHTML = '';
      const frag = document.createDocumentFragment();

      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'glyph';
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.left = Math.random() * 100 + 'vw';
        span.style.top = Math.random() * 100 + 'vh';
        span.style.fontSize = (14 + Math.random() * 40) + 'px';
        span.style.fontFamily = lang.font;
        span.style.setProperty('--rot', (Math.random() * 30 - 15) + 'deg');
        span.style.setProperty('--op-a', (0.05 + Math.random() * 0.08).toFixed(2));
        span.style.setProperty('--op-b', (0.15 + Math.random() * 0.18).toFixed(2));
        span.style.animationDuration = (6 + Math.random() * 10).toFixed(1) + 's, ' + (3 + Math.random() * 5).toFixed(1) + 's';
        span.style.animationDelay = (Math.random() * -10).toFixed(1) + 's';
        frag.appendChild(span);
      }
      this.el.appendChild(frag);
      this.el.style.opacity = '1';
    }, 220);
  }
};

/* ---------------------------------------------------------
   Language catalog loading (backend, with offline fallback)
   --------------------------------------------------------- */
async function loadLanguages() {
  try {
    const res = await fetch(`${API_BASE}/languages`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length) {
      return json.data;
    }
    throw new Error('empty');
  } catch {
    return FALLBACK_LANGUAGES;
  }
}

function populateSelect(select, languages, selectedCode) {
  if (!select) return;
  select.innerHTML = languages
    .map(l => `<option value="${l.code}" ${l.code === selectedCode ? 'selected' : ''}>${l.name} — ${l.nativeName}</option>`)
    .join('');
}

/* ---------------------------------------------------------
   Translator page wiring (index.html)
   --------------------------------------------------------- */
function initTranslatorPage(languages) {
  const sourceLang = document.getElementById('sourceLang');
  const targetLang = document.getElementById('targetLang');
  const backdropLangSelect = document.getElementById('backdropLangSelect');
  const sourceText = document.getElementById('sourceText');
  const targetText = document.getElementById('targetText');
  const sourceCount = document.getElementById('sourceCount');
  const translateBtn = document.getElementById('translateBtn');
  const swapBtn = document.getElementById('swapLangs');
  const copyBtn = document.getElementById('copyResult');
  const statusMsg = document.getElementById('statusMsg');
  const recentList = document.getElementById('recentList');

  if (!sourceLang || !targetLang) return; // not on this page

  populateSelect(sourceLang, languages, 'en');
  populateSelect(targetLang, languages, 'ta');
  populateSelect(backdropLangSelect, languages, 'ta');

  Backdrop.init(languages);
  Backdrop.render(backdropLangSelect.value);

  sourceText.addEventListener('input', () => {
    sourceCount.textContent = `${sourceText.value.length} / 500`;
  });

  // Keep the backdrop language selector and the target language loosely in sync:
  // changing the target language updates the backdrop unless the user has since
  // picked a different backdrop language on purpose.
  let backdropManuallySet = false;
  backdropLangSelect.addEventListener('change', () => {
    backdropManuallySet = true;
    Backdrop.render(backdropLangSelect.value);
  });
  targetLang.addEventListener('change', () => {
    if (!backdropManuallySet) {
      backdropLangSelect.value = targetLang.value;
      Backdrop.render(targetLang.value);
    }
  });

  swapBtn.addEventListener('click', () => {
    const s = sourceLang.value, t = targetLang.value;
    sourceLang.value = t;
    targetLang.value = s;
    const sVal = sourceText.value, tVal = targetText.value;
    sourceText.value = tVal;
    targetText.value = sVal;
    sourceCount.textContent = `${sourceText.value.length} / 500`;
    if (!backdropManuallySet) {
      backdropLangSelect.value = targetLang.value;
      Backdrop.render(targetLang.value);
    }
  });

  copyBtn.addEventListener('click', async () => {
    if (!targetText.value) return;
    await navigator.clipboard.writeText(targetText.value);
    statusMsg.textContent = 'Copied to clipboard.';
    statusMsg.className = 'status status--ok';
  });

  function setStatus(text, kind) {
    statusMsg.textContent = text;
    statusMsg.className = 'status' + (kind ? ` status--${kind}` : '');
  }

  function addRecent(entry) {
    if (recentList.querySelector('.recent__empty')) recentList.innerHTML = '';
    const li = document.createElement('li');
    li.className = 'recent__item';
    li.innerHTML = `<span>${escapeHtml(entry.sourceText)} → ${escapeHtml(entry.translatedText)}</span>
                     <small>${entry.sourceLang.toUpperCase()} → ${entry.targetLang.toUpperCase()}</small>`;
    recentList.prepend(li);
    while (recentList.children.length > 5) recentList.lastChild.remove();
  }

  translateBtn.addEventListener('click', async () => {
    const text = sourceText.value.trim();
    if (!text) {
      setStatus('Type something to translate first.', 'error');
      return;
    }
    setStatus('Translating…');
    translateBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, source: sourceLang.value, target: targetLang.value })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Translation failed.');

      targetText.value = json.data.translatedText;
      setStatus('Done.', 'ok');
      addRecent(json.data);
    } catch (err) {
      setStatus(err.message || 'Something went wrong reaching the translator.', 'error');
    } finally {
      translateBtn.disabled = false;
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------
   History page wiring (pages/history.html)
   --------------------------------------------------------- */
async function initHistoryPage(languages) {
  const list = document.getElementById('historyList');
  const clearBtn = document.getElementById('clearHistory');
  const backdropLangSelect = document.getElementById('backdropLangSelect');
  if (!list) return; // not on this page

  Backdrop.init(languages);
  populateSelect(backdropLangSelect, languages, 'en');
  Backdrop.render(backdropLangSelect.value);
  backdropLangSelect.addEventListener('change', () => Backdrop.render(backdropLangSelect.value));

  async function load() {
    list.innerHTML = '<li class="recent__empty">Loading…</li>';
    try {
      const res = await fetch(`${API_BASE}/history`);
      const json = await res.json();
      const items = (json.data || []);
      if (!items.length) {
        list.innerHTML = '<li class="recent__empty">No translations yet — go translate something!</li>';
        return;
      }
      list.innerHTML = items.map(entry => `
        <li class="recent__item">
          <span>${escapeHtml(entry.sourceText)} → ${escapeHtml(entry.translatedText)}</span>
          <small>${entry.sourceLang.toUpperCase()} → ${entry.targetLang.toUpperCase()} · ${new Date(entry.createdAt).toLocaleString()}</small>
        </li>`).join('');
    } catch {
      list.innerHTML = '<li class="recent__empty">Couldn\'t reach the backend. Is server.js running?</li>';
    }
  }

  clearBtn && clearBtn.addEventListener('click', async () => {
    await fetch(`${API_BASE}/history`, { method: 'DELETE' });
    load();
  });

  load();
}

/* ---------------------------------------------------------
   About page wiring (pages/about.html) — just needs the backdrop
   --------------------------------------------------------- */
function initAboutPage(languages) {
  const backdropLangSelect = document.getElementById('backdropLangSelect');
  if (!backdropLangSelect || document.getElementById('sourceLang') || document.getElementById('historyList')) return;
  Backdrop.init(languages);
  populateSelect(backdropLangSelect, languages, 'en');
  Backdrop.render(backdropLangSelect.value);
  backdropLangSelect.addEventListener('change', () => Backdrop.render(backdropLangSelect.value));
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  initThemeControls();
  const languages = await loadLanguages();
  initTranslatorPage(languages);
  initHistoryPage(languages);
  initAboutPage(languages);
});
