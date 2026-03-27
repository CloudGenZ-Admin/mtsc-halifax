/**
 * Custom Hyperlink inline tool for EditorJS
 * Supports target (_blank/_self) and rel attributes - no webpack/scss deps
 */
export default class HyperlinkTool {
  static get isInline() { return true; }
  static get title() { return 'Hyperlink'; }

  static get sanitize() {
    return {
      a: { href: true, target: true, rel: true },
    };
  }

  constructor({ api, config }) {
    this.api = api;
    this.config = {
      shortcut: config?.shortcut || 'CMD+L',
      target: config?.target || '_blank',
      rel: config?.rel || 'noopener noreferrer',
    };
    this.button = null;
    this._state = false;
    this.toolbar = null;
    this.nodes = { input: null, targetSelect: null, relSelect: null };
  }

  get state() { return this._state; }
  set state(val) {
    this._state = val;
    this.button?.classList.toggle(this.api.styles.inlineToolButtonActive, val);
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.api.styles.inlineToolButton);
    this.button.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`;
    return this.button;
  }

  renderActions() {
    this.toolbar = document.createElement('div');
    this.toolbar.style.cssText = 'padding:6px;display:none;';

    // URL row
    const urlRow = document.createElement('div');
    urlRow.style.cssText = 'display:flex;gap:4px;margin-bottom:4px;';

    this.nodes.input = document.createElement('input');
    this.nodes.input.type = 'url';
    this.nodes.input.placeholder = 'https://...';
    this.nodes.input.style.cssText = 'flex:1;padding:4px 8px;border:1px solid #ccc;border-radius:4px;font-size:13px;';
    this.nodes.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this._insertLink(); }
    });

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText = 'padding:4px 10px;background:#e05c3a;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;';
    saveBtn.addEventListener('click', () => this._insertLink());

    const unlinkBtn = document.createElement('button');
    unlinkBtn.type = 'button';
    unlinkBtn.textContent = '✕';
    unlinkBtn.title = 'Remove link';
    unlinkBtn.style.cssText = 'padding:4px 8px;background:#ccc;color:#333;border:none;border-radius:4px;cursor:pointer;font-size:13px;';
    unlinkBtn.addEventListener('click', () => this._removeLink());

    urlRow.appendChild(this.nodes.input);
    urlRow.appendChild(saveBtn);
    urlRow.appendChild(unlinkBtn);

    // Options row
    const optRow = document.createElement('div');
    optRow.style.cssText = 'display:flex;gap:4px;';

    this.nodes.targetSelect = document.createElement('select');
    this.nodes.targetSelect.style.cssText = 'flex:1;padding:3px 6px;border:1px solid #ccc;border-radius:4px;font-size:12px;';
    [['_blank', 'New tab'], ['_self', 'Same tab']].forEach(([val, label]) => {
      const opt = document.createElement('option');
      opt.value = val; opt.textContent = label;
      if (val === this.config.target) opt.selected = true;
      this.nodes.targetSelect.appendChild(opt);
    });

    this.nodes.relSelect = document.createElement('select');
    this.nodes.relSelect.style.cssText = 'flex:1;padding:3px 6px;border:1px solid #ccc;border-radius:4px;font-size:12px;';
    [['noopener noreferrer', 'noopener'], ['nofollow', 'nofollow'], ['', 'none']].forEach(([val, label]) => {
      const opt = document.createElement('option');
      opt.value = val; opt.textContent = label;
      if (val === this.config.rel) opt.selected = true;
      this.nodes.relSelect.appendChild(opt);
    });

    optRow.appendChild(this.nodes.targetSelect);
    optRow.appendChild(this.nodes.relSelect);

    this.toolbar.appendChild(urlRow);
    this.toolbar.appendChild(optRow);
    return this.toolbar;
  }

  surround(range) {
    if (this.state) {
      this._removeLink();
      return;
    }
    this._savedRange = range;
    this.toolbar.style.display = 'block';
    // Pre-fill if existing link
    const anchor = this.api.selection.findParentTag('A');
    if (anchor) {
      this.nodes.input.value = anchor.href || '';
      this.nodes.targetSelect.value = anchor.target || '_blank';
      this.nodes.relSelect.value = anchor.rel || '';
    } else {
      this.nodes.input.value = '';
    }
    setTimeout(() => this.nodes.input.focus(), 50);
  }

  _insertLink() {
    const url = this.nodes.input.value.trim();
    if (!url) return;

    const anchor = this.api.selection.findParentTag('A');
    if (anchor) {
      anchor.href = url;
      anchor.target = this.nodes.targetSelect.value;
      anchor.rel = this.nodes.relSelect.value;
    } else if (this._savedRange) {
      const a = document.createElement('a');
      a.href = url;
      a.target = this.nodes.targetSelect.value;
      a.rel = this.nodes.relSelect.value;
      try {
        this._savedRange.surroundContents(a);
      } catch (e) {
        const fragment = this._savedRange.extractContents();
        a.appendChild(fragment);
        this._savedRange.insertNode(a);
      }
    }

    this.toolbar.style.display = 'none';
    this.api.inlineToolbar.close();
  }

  _removeLink() {
    const anchor = this.api.selection.findParentTag('A');
    if (anchor) {
      this.api.selection.expandToTag(anchor);
      const text = document.createTextNode(anchor.textContent);
      anchor.replaceWith(text);
    }
    this.toolbar.style.display = 'none';
    this.state = false;
  }

  checkState() {
    const anchor = this.api.selection.findParentTag('A');
    this.state = !!anchor;
    if (anchor && this.nodes.input) {
      this.nodes.input.value = anchor.href || '';
    }
  }

  static get shortcut() { return 'CMD+L'; }
}
