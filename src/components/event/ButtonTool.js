/**
 * Custom Button block tool for EditorJS - no webpack/scss deps, Vite compatible
 */
export default class ButtonTool {
  static get toolbox() {
    return {
      title: 'Button',
      icon: '<svg width="17" height="15" viewBox="0 0 336 64" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="334" height="62" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="6"/><text x="168" y="42" font-size="30" text-anchor="middle" fill="currentColor" font-family="sans-serif">Button</text></svg>',
    };
  }

  static get DEFAULT_BUTTON_TEXT() { return 'Click here'; }
  static get DEFAULT_BUTTON_URL() { return ''; }

  constructor({ data, config, api }) {
    this.api = api;
    this.config = config || {};
    this.data = {
      text: data.text || ButtonTool.DEFAULT_BUTTON_TEXT,
      link: data.link || ButtonTool.DEFAULT_BUTTON_URL,
      style: data.style || 'filled', // filled | outline
      align: data.align || 'center', // left | center | right
    };
    this._wrapper = null;
  }

  render() {
    this._wrapper = document.createElement('div');
    this._wrapper.style.cssText = 'padding: 8px 0;';
    this._renderUI();
    return this._wrapper;
  }

  _renderUI() {
    this._wrapper.innerHTML = '';

    // Controls row
    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:center;';

    // Text input
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = this.data.text;
    textInput.placeholder = 'Button text';
    textInput.style.cssText = 'flex:1;min-width:120px;padding:6px 10px;border:1px solid #ccc;border-radius:6px;font-size:14px;';
    textInput.addEventListener('input', (e) => { this.data.text = e.target.value; this._updatePreview(); });

    // URL input
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.value = this.data.link;
    urlInput.placeholder = 'https://...';
    urlInput.style.cssText = 'flex:2;min-width:180px;padding:6px 10px;border:1px solid #ccc;border-radius:6px;font-size:14px;';
    urlInput.addEventListener('input', (e) => { this.data.link = e.target.value; });

    // Style toggle
    const styleBtn = document.createElement('button');
    styleBtn.type = 'button';
    styleBtn.textContent = this.data.style === 'filled' ? 'Filled' : 'Outline';
    styleBtn.style.cssText = 'padding:6px 12px;border:1px solid #ccc;border-radius:6px;cursor:pointer;font-size:13px;background:#f5f5f5;';
    styleBtn.addEventListener('click', () => {
      this.data.style = this.data.style === 'filled' ? 'outline' : 'filled';
      styleBtn.textContent = this.data.style === 'filled' ? 'Filled' : 'Outline';
      this._updatePreview();
    });

    // Align toggle
    const alignBtn = document.createElement('button');
    alignBtn.type = 'button';
    alignBtn.textContent = `Align: ${this.data.align}`;
    alignBtn.style.cssText = 'padding:6px 12px;border:1px solid #ccc;border-radius:6px;cursor:pointer;font-size:13px;background:#f5f5f5;';
    alignBtn.addEventListener('click', () => {
      const aligns = ['left', 'center', 'right'];
      const next = aligns[(aligns.indexOf(this.data.align) + 1) % aligns.length];
      this.data.align = next;
      alignBtn.textContent = `Align: ${next}`;
      this._updatePreview();
    });

    controls.appendChild(textInput);
    controls.appendChild(urlInput);
    controls.appendChild(styleBtn);
    controls.appendChild(alignBtn);

    // Preview
    this._preview = document.createElement('div');
    this._preview.style.cssText = `text-align:${this.data.align};`;
    this._updatePreview();

    this._wrapper.appendChild(controls);
    this._wrapper.appendChild(this._preview);
  }

  _updatePreview() {
    if (!this._preview) return;
    this._preview.style.textAlign = this.data.align;
    const isFilled = this.data.style === 'filled';
    this._preview.innerHTML = `
      <a href="${this.data.link || '#'}" 
         style="display:inline-block;padding:10px 28px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;cursor:pointer;
                ${isFilled
                  ? 'background:#e05c3a;color:#fff;border:2px solid #e05c3a;'
                  : 'background:transparent;color:#e05c3a;border:2px solid #e05c3a;'}"
         onclick="return false;">
        ${this.data.text || 'Button'}
      </a>`;
  }

  save() {
    return {
      text: this.data.text,
      link: this.data.link,
      style: this.data.style,
      align: this.data.align,
    };
  }

  static get sanitize() {
    return {
      text: false,
      link: false,
      style: false,
      align: false,
    };
  }
}
