import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import ColorPlugin from 'editorjs-text-color-plugin';
import Alert from 'editorjs-alert';
import Delimiter from '@editorjs/delimiter';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import ButtonTool from './ButtonTool.js';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import TextVariantTune from '@editorjs/text-variant-tune';
import LinkTool from '@editorjs/link';
import AudioPlayer from 'editorjs-audio-player';
import HyperlinkTool from './HyperlinkTool.js';
import Tooltip from 'editorjs-tooltip';

// Custom inline tool: Text Background Color
class TextBackground {
  static get isInline() { return true; }
  static get title() { return 'Background Color'; }
  static get sanitize() {
    return { mark: { style: true } };
  }

  get state() { return this._state; }
  set state(val) {
    this._state = val;
    this.button?.classList.toggle(this.api.styles.inlineToolButtonActive, val);
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this._state = false;
    this.currentColor = '#FFEB3B';
    this.colors = ['#FFEB3B', '#A5D6A7', '#90CAF9', '#F48FB1', '#FFCC80', '#CE93D8', '#80DEEA', '#EF9A9A', '#ffffff', '#000000'];
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.title = 'Background Color';
    this.button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15a1.49 1.49 0 000 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);
    return this.button;
  }

  renderActions() {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:6px;';

    const label = document.createElement('div');
    label.textContent = 'Background color:';
    label.style.cssText = 'font-size:11px;color:#666;margin-bottom:4px;';

    const swatches = document.createElement('div');
    swatches.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;max-width:160px;';

    this.colors.forEach(color => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.style.cssText = `width:22px;height:22px;background:${color};border:2px solid ${color === '#ffffff' ? '#ccc' : color};border-radius:4px;cursor:pointer;`;
      swatch.addEventListener('mousedown', (e) => {
        e.preventDefault(); // keep selection alive
        this.currentColor = color;
        this._applyColor();
        // highlight selected
        swatches.querySelectorAll('button').forEach(s => s.style.outline = 'none');
        swatch.style.outline = '2px solid #333';
      });
      swatches.appendChild(swatch);
    });

    // Remove bg button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '✕ Remove';
    removeBtn.style.cssText = 'margin-top:4px;width:100%;padding:2px 6px;font-size:11px;border:1px solid #ccc;border-radius:4px;cursor:pointer;background:#f5f5f5;';
    removeBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this._removeColor();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(swatches);
    wrapper.appendChild(removeBtn);
    return wrapper;
  }

  _applyColor() {
    // Remove existing mark first
    this._removeColor();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const mark = document.createElement('mark');
    mark.style.backgroundColor = this.currentColor;
    mark.style.padding = '0 2px';
    mark.style.borderRadius = '2px';
    try {
      range.surroundContents(mark);
    } catch {
      const fragment = range.extractContents();
      mark.appendChild(fragment);
      range.insertNode(mark);
    }
  }

  _removeColor() {
    const mark = this.api.selection.findParentTag('MARK');
    if (mark) {
      const text = mark.innerHTML;
      mark.outerHTML = text;
    }
  }

  surround() {
    // handled in swatch mousedown to preserve selection
  }

  checkState() {
    const mark = this.api.selection.findParentTag('MARK');
    this.state = !!mark;
  }
}

const EditorJSComponent = ({ initialContent, onChange, editable = true }) => {
  const instanceRef = useRef(null);
  const holderId = useRef(`editor-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (instanceRef.current) return;

    let blocks = [];
    if (initialContent) {
      try {
        const parsed = JSON.parse(initialContent);
        blocks = Array.isArray(parsed) ? parsed : parsed.blocks || [];
      } catch (e) {
        console.error('Failed to parse initial content:', e);
      }
    }

    const editor = new EditorJS({
      holder: holderId.current,
      readOnly: !editable,
      data: { blocks },
      tunes: ['textVariant'],
      tools: {
        header: {
          class: Header,
          config: { levels: [1, 2, 3, 4], defaultLevel: 2 },
          tunes: ['textVariant'],
          inlineToolbar: ['bold', 'italic', 'underline', 'textColor', 'bgColor', 'hyperlink'],
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: ['bold', 'italic', 'underline', 'textColor', 'bgColor', 'hyperlink', 'inlineCode', 'marker', 'tooltip'],
          tunes: ['textVariant'],
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: { defaultStyle: 'unordered' },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve({ success: 1, file: { url: reader.result } });
                  reader.readAsDataURL(file);
                });
              },
              uploadByUrl(url) {
                return Promise.resolve({ success: 1, file: { url } });
              },
            },
          },
        },
        linkTool: {
          class: LinkTool,
          config: { endpoint: '' }, // no server-side fetch, just stores the URL
        },
        embed: {
          class: Embed,
          config: {
            services: { youtube: true, vimeo: true, twitter: true, instagram: true },
          },
        },
        audio: {
          class: AudioPlayer,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: { rows: 2, cols: 3, withHeadings: true },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: { quotePlaceholder: 'Enter a quote', captionPlaceholder: 'Quote author' },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          config: { titlePlaceholder: 'Title', messagePlaceholder: 'Message' },
        },
        alert: {
          class: Alert,
          inlineToolbar: true,
          config: { defaultType: 'primary', messagePlaceholder: 'Enter message' },
        },
        delimiter: Delimiter,
        button: {
          class: ButtonTool,
          config: {},
        },
        // Inline tools
        textColor: {
          class: ColorPlugin,
          config: {
            colorCollections: ['#FF1300','#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39','#000000','#FFFFFF'],
            defaultColor: '#0070FF',
            type: 'text',
            customPicker: true,
          },
        },
        bgColor: {
          class: TextBackground,
        },
        hyperlink: {
          class: HyperlinkTool,
          config: {
            shortcut: 'CMD+L',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
        tooltip: {
          class: Tooltip,
          config: {
            location: 'left',
            highlightColor: '#FFEFD5',
            underline: true,
            backgroundColor: '#154360',
            textColor: '#FDFEFE',
          },
        },
        marker: Marker,
        inlineCode: InlineCode,
        underline: Underline,
        // Block tunes
        textVariant: TextVariantTune,
      },
      onReady: () => {
        if (editable) {
          new DragDrop(editor);
          new Undo({ editor });
        }
      },
      onChange: async () => {
        if (onChange && editable) {
          try {
            const outputData = await editor.save();
            onChange(JSON.stringify(outputData.blocks));
          } catch (error) {
            console.error('Saving failed:', error);
          }
        }
      },
    });

    instanceRef.current = editor;

    return () => {
      if (instanceRef.current?.destroy) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg p-4 min-h-[400px]">
      <div id={holderId.current} />
    </div>
  );
};

export default EditorJSComponent;
