import { useEditor, EditorContent, Node, mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import ImageExt from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useEffect, useRef, useState } from 'react';
import { uploadService } from '../../services/uploadService';
import toast from 'react-hot-toast';

// ── Custom: Callout/Alert block ──────────────────────────────────────────────
const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  defining: true,
  addAttributes() {
    return {
      type: { default: 'info' }, // info | success | warning | danger
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },
  renderHTML({ HTMLAttributes, node }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-callout': node.attrs.type, class: `callout callout-${node.attrs.type}` }), 0];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => this.editor.commands.exitCode(),
    };
  },
});

// ── Custom: Section with background color ────────────────────────────────────
const Section = Node.create({
  name: 'section',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() {
    return {
      bgcolor: { default: '#f0f4ff' },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-bgcolor]' }];
  },
  renderHTML({ HTMLAttributes, node }) {
    return ['section', mergeAttributes(HTMLAttributes, {
      'data-bgcolor': node.attrs.bgcolor,
      style: `background:${node.attrs.bgcolor};border-radius:8px;padding:1.5rem;margin:1.5rem 0;`,
    }), 0];
  },
});

// ── Custom: Audio block ──────────────────────────────────────────────────────
const Audio = Node.create({
  name: 'audio',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      caption: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-audio]' }];
  },
  renderHTML({ node }) {
    return ['div', { 'data-audio': true, class: 'audio-block' },
      ['audio', { controls: true, src: node.attrs.src, style: 'width:100%' }],
      node.attrs.caption ? ['p', { class: 'audio-caption' }, node.attrs.caption] : '',
    ];
  },
});

// ── Custom: Button block ─────────────────────────────────────────────────────
const ButtonBlock = Node.create({
  name: 'buttonBlock',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      text: { default: 'Click here' },
      href: { default: '#' },
      variant: { default: 'filled' }, // filled | outline
      align: { default: 'center' },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-button-block]' }];
  },
  renderHTML({ node }) {
    const { text, href, variant, align } = node.attrs;
    const style = variant === 'filled'
      ? 'display:inline-block;background:#e05a2b;color:#fff;border:2px solid #e05a2b;padding:10px 28px;border-radius:8px;font-weight:700;text-decoration:none;'
      : 'display:inline-block;background:transparent;color:#e05a2b;border:2px solid #e05a2b;padding:10px 28px;border-radius:8px;font-weight:700;text-decoration:none;';
    return ['div', { 'data-button-block': true, style: `text-align:${align};margin:1.5rem 0;` },
      ['a', { href, style }, text],
    ];
  },
});

// ── Custom: Columns (2-column layout) ────────────────────────────────────────
const Columns = Node.create({
  name: 'columns',
  group: 'block',
  content: 'column column',
  defining: true,
  parseHTML() {
    return [{ tag: 'div[data-columns]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-columns': true,
      style: 'display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin:1.5rem 0;',
    }), 0];
  },
});

const Column = Node.create({
  name: 'column',
  content: 'block+',
  isolating: true,
  parseHTML() {
    return [{ tag: 'div[data-column]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 
      'data-column': true,
      style: 'display:flex;flex-direction:column;justify-content:center;'
    }), 0];
  },
  addKeyboardShortcuts() {
    return {
      // Keep Enter inside the column
      'Enter': () => {
        const { state } = this.editor;
        const { $from } = state.selection;
        
        // Check if we're in a column
        for (let d = $from.depth; d > 0; d--) {
          if ($from.node(d).type.name === 'column') {
            // Stay in column and create new paragraph
            return this.editor.commands.splitBlock();
          }
        }
        return false;
      },
      // Allow Tab to move between columns
      'Tab': () => {
        const { state } = this.editor;
        const { $from } = state.selection;
        
        // Find if we're in a column
        for (let d = $from.depth; d > 0; d--) {
          if ($from.node(d).type.name === 'column') {
            // Try to move to next column
            const columnsNode = $from.node(d - 1);
            if (columnsNode.type.name === 'columns') {
              const currentColumnIndex = $from.index(d - 1);
              if (currentColumnIndex < columnsNode.childCount - 1) {
                // Move to next column
                const nextColumnPos = $from.before(d) + $from.node(d).nodeSize;
                this.editor.commands.focus(nextColumnPos + 1);
                return true;
              }
            }
          }
        }
        return false;
      },
      // Allow Shift+Tab to move to previous column
      'Shift-Tab': () => {
        const { state } = this.editor;
        const { $from } = state.selection;
        
        // Find if we're in a column
        for (let d = $from.depth; d > 0; d--) {
          if ($from.node(d).type.name === 'column') {
            const columnsNode = $from.node(d - 1);
            if (columnsNode.type.name === 'columns') {
              const currentColumnIndex = $from.index(d - 1);
              if (currentColumnIndex > 0) {
                // Move to previous column
                const prevColumnPos = $from.before(d) - $from.node(d - 1).nodeSize;
                this.editor.commands.focus(prevColumnPos + 1);
                return true;
              }
            }
          }
        }
        return false;
      }
    };
  }
});

// ── Custom: Embed/iFrame ─────────────────────────────────────────────────────
const Embed = Node.create({
  name: 'embed',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      height: { default: '400' },
    };
  },
  parseHTML() {
    return [{
      tag: 'div[data-embed]',
      getAttrs: (dom) => {
        const iframe = dom.querySelector('iframe');
        if (!iframe) return false;
        
        return {
          src: iframe.getAttribute('src'),
          height: iframe.style.height ? parseInt(iframe.style.height) : '400',
        };
      },
    }];
  },
  renderHTML({ node }) {
    return ['div', { 'data-embed': true, style: 'margin:1.5rem 0;' },
      ['iframe', {
        src: node.attrs.src,
        style: `width:100%;height:${node.attrs.height}px;border:0;border-radius:8px;`,
        allowfullscreen: true,
      }],
    ];
  },
});

// ── Custom: Image with Caption ───────────────────────────────────────────────
const ImageWithCaption = Node.create({
  name: 'imageWithCaption',
  group: 'block',
  content: 'inline*',
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'figure[data-image-caption]' }];
  },
  renderHTML({ HTMLAttributes, node }) {
    return ['figure', mergeAttributes(HTMLAttributes, {
      'data-image-caption': true,
      style: 'margin:1.5rem 0;text-align:center;',
    }),
      ['img', { src: node.attrs.src, alt: node.attrs.alt, style: 'max-width:100%;height:auto;border-radius:8px;' }],
      ['figcaption', { style: 'margin-top:0.5rem;font-size:0.875rem;color:#666;font-style:italic;' }, 0],
    ];
  },
});

// ── Toolbar helpers ──────────────────────────────────────────────────────────
const Btn = ({ onClick, active, disabled, title, children, className = '' }) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    disabled={disabled}
    title={title}
    className={`px-2 py-1 rounded text-sm font-medium transition-colors select-none
      ${active ? 'bg-coral text-white' : 'text-gray-700 hover:bg-gray-100'}
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
  >
    {children}
  </button>
);

const Sep = () => <div className="w-px h-5 bg-gray-300 mx-0.5 flex-shrink-0" />;

const ToolGroup = ({ label, children }) => (
  <div className="flex items-center gap-0.5 flex-wrap">
    {children}
  </div>
);

// ── Modal Dialog ─────────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// ── Toolbar ──────────────────────────────────────────────────────────────────
const Toolbar = ({ editor, onImageUpload, onAudioUpload }) => {
  const [linkModal, setLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [videoModal, setVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [sectionModal, setSectionModal] = useState(false);
  const [sectionColor, setSectionColor] = useState('#f0f4ff');
  const [buttonModal, setButtonModal] = useState(false);
  const [buttonData, setButtonData] = useState({ text: 'Click here', href: 'https://', variant: 'filled' });
  const [embedModal, setEmbedModal] = useState(false);
  const [embedData, setEmbedData] = useState({ src: '', height: '400' });
  const [columnsModal, setColumnsModal] = useState(false);

  if (!editor) return null;

  const openLinkModal = () => {
    const prev = editor.getAttributes('link').href || '';
    setLinkUrl(prev);
    setLinkModal(true);
  };

  const applyLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl, target: '_blank' }).run();
    }
    setLinkModal(false);
    setLinkUrl('');
  };

  const openVideoModal = () => {
    setVideoUrl('');
    setVideoModal(true);
  };

  const applyVideo = () => {
    if (videoUrl) {
      editor.chain().focus().setYoutubeVideo({ src: videoUrl, width: 640, height: 360 }).run();
    }
    setVideoModal(false);
    setVideoUrl('');
  };

  const insertCallout = (type) => {
    editor.chain().focus().insertContent({
      type: 'callout',
      attrs: { type },
      content: [{ type: 'text', text: `${type.charAt(0).toUpperCase() + type.slice(1)} message here` }],
    }).run();
  };

  const openSectionModal = () => {
    setSectionColor('#f0f4ff');
    setSectionModal(true);
  };

  const applySection = () => {
    editor.chain().focus().insertContent({
      type: 'section',
      attrs: { bgcolor: sectionColor },
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Section content here...' }] }],
    }).run();
    setSectionModal(false);
  };

  const openButtonModal = () => {
    setButtonData({ text: 'Click here', href: 'https://', variant: 'filled' });
    setButtonModal(true);
  };

  const applyButton = () => {
    if (buttonData.text && buttonData.href) {
      editor.chain().focus().insertContent({
        type: 'buttonBlock',
        attrs: { text: buttonData.text, href: buttonData.href, variant: buttonData.variant, align: 'center' },
      }).run();
    }
    setButtonModal(false);
  };

  const openEmbedModal = () => {
    setEmbedData({ src: '', height: '400' });
    setEmbedModal(true);
  };

  const applyEmbed = () => {
    if (embedData.src) {
      editor.chain().focus().insertContent({
        type: 'embed',
        attrs: { src: embedData.src, height: embedData.height },
      }).run();
    }
    setEmbedModal(false);
  };

  const insertColumns = () => {
    editor.chain().focus().insertContent({
      type: 'columns',
      content: [
        { type: 'column', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Left column content...' }] }] },
        { type: 'column', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Right column content...' }] }] },
      ],
    }).run();
  };

  const textColorVal = editor.getAttributes('textStyle').color || '#000000';
  const highlightVal = editor.getAttributes('highlight').color || '#FFEB3B';

  return (
    <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2 items-center sticky top-0 z-10">

      {/* Heading */}
      <select
        className="text-sm border border-gray-200 rounded px-2 py-1 bg-white cursor-pointer h-7"
        value={
          editor.isActive('heading', { level: 1 }) ? '1' :
          editor.isActive('heading', { level: 2 }) ? '2' :
          editor.isActive('heading', { level: 3 }) ? '3' :
          editor.isActive('heading', { level: 4 }) ? '4' :
          editor.isActive('heading', { level: 5 }) ? '5' : '0'
        }
        onChange={(e) => {
          const v = parseInt(e.target.value);
          v === 0 ? editor.chain().focus().setParagraph().run()
                  : editor.chain().focus().toggleHeading({ level: v }).run();
        }}
      >
        <option value="0">Paragraph</option>
        <option value="2">Section Header</option>
        <option value="1">H1</option>
        <option value="3">H2</option>
        <option value="4">H3</option>
        <option value="5">H4</option>
      </select>

      <Sep />

      {/* Text formatting */}
      <ToolGroup>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><b>B</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><i>I</i></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><u>U</u></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><s>S</s></Btn>
      </ToolGroup>

      <Sep />

      {/* Colors */}
      <ToolGroup>
        <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-600 px-1 py-1 rounded hover:bg-gray-100" title="Text Color (select text first)">
          <span className="font-bold" style={{ color: textColorVal }}>A</span>
          <input type="color" className="w-4 h-4 cursor-pointer p-0 border-0 bg-transparent"
            value={textColorVal}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>
        <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-600 px-1 py-1 rounded hover:bg-gray-100" title="Highlight / BG Color (select text first)">
          <span style={{ background: highlightVal, padding: '0 3px', borderRadius: 2 }}>H</span>
          <input type="color" className="w-4 h-4 cursor-pointer p-0 border-0 bg-transparent"
            value={highlightVal}
            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
          />
        </label>
      </ToolGroup>

      <Sep />

      {/* Alignment */}
      <ToolGroup>
        <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Left">⬅</Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center">↔</Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Right">➡</Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">☰</Btn>
      </ToolGroup>

      <Sep />

      {/* Lists */}
      <ToolGroup>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">• List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">1. List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} title="Checklist">☑ List</Btn>
      </ToolGroup>

      <Sep />

      {/* Blocks */}
      <ToolGroup>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">"Quote"</Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">── HR ──</Btn>
      </ToolGroup>

      <Sep />

      {/* Alerts */}
      <ToolGroup>
        <Btn onClick={() => insertCallout('info')} active={false} title="Info Alert" className="text-blue-600">ℹ Info</Btn>
        <Btn onClick={() => insertCallout('success')} active={false} title="Success Alert" className="text-green-600">✓ Success</Btn>
        <Btn onClick={() => insertCallout('warning')} active={false} title="Warning Alert" className="text-yellow-600">⚠ Warn</Btn>
        <Btn onClick={() => insertCallout('danger')} active={false} title="Danger Alert" className="text-red-600">✕ Danger</Btn>
      </ToolGroup>

      <Sep />

      {/* Section bg */}
      <Btn onClick={openSectionModal} active={false} title="Section with Background Color">🎨 Section</Btn>

      <Sep />

      {/* Media */}
      <ToolGroup>
        <Btn onClick={() => onImageUpload()} active={false} title="Upload Image">🖼 Image</Btn>
        <Btn onClick={() => onAudioUpload()} active={false} title="Upload Audio">🎵 Audio</Btn>
        <Btn onClick={openVideoModal} active={false} title="YouTube / Vimeo">▶ Video</Btn>
      </ToolGroup>

      <Sep />

      {/* Link & Button */}
      <ToolGroup>
        <Btn onClick={openLinkModal} active={editor.isActive('link')} title="Hyperlink">🔗 Link</Btn>
        <Btn onClick={openButtonModal} active={false} title="Button Block">⬛ Button</Btn>
      </ToolGroup>

      <Sep />

      {/* Table */}
      <ToolGroup>
        <Btn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} active={false} title="Insert Table">⊞ Table</Btn>
        {editor.isActive('table') && <>
          <Btn onClick={() => editor.chain().focus().addColumnAfter().run()} active={false} title="Add Column">+Col</Btn>
          <Btn onClick={() => editor.chain().focus().addRowAfter().run()} active={false} title="Add Row">+Row</Btn>
          <Btn onClick={() => editor.chain().focus().deleteColumn().run()} active={false} title="Del Column">-Col</Btn>
          <Btn onClick={() => editor.chain().focus().deleteRow().run()} active={false} title="Del Row">-Row</Btn>
          <Btn onClick={() => editor.chain().focus().deleteTable().run()} active={false} title="Delete Table">✕ Tbl</Btn>
        </>}
      </ToolGroup>

      <Sep />

      {/* Layout & Embed */}
      <ToolGroup>
        <Btn onClick={insertColumns} active={false} title="2-Column Layout">⚏ Columns</Btn>
        <Btn onClick={openEmbedModal} active={false} title="Embed iFrame">🔲 Embed</Btn>
      </ToolGroup>

      <Sep />

      {/* Undo / Redo */}
      <ToolGroup>
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} active={false} title="Undo (Ctrl+Z)">↩ Undo</Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} active={false} title="Redo (Ctrl+Y)">↪ Redo</Btn>
      </ToolGroup>

      {/* Modals */}
      <Modal isOpen={linkModal} onClose={() => setLinkModal(false)} title="Insert/Edit Link">
        <input
          type="url"
          placeholder="https://example.com"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
          onKeyDown={(e) => e.key === 'Enter' && applyLink()}
        />
        <div className="flex gap-2 mt-4">
          <button onClick={applyLink} className="flex-1 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral-dark transition-colors">Apply</button>
          <button onClick={() => setLinkModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        </div>
      </Modal>

      <Modal isOpen={videoModal} onClose={() => setVideoModal(false)} title="Embed YouTube/Vimeo">
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
          onKeyDown={(e) => e.key === 'Enter' && applyVideo()}
        />
        <div className="flex gap-2 mt-4">
          <button onClick={applyVideo} className="flex-1 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral-dark transition-colors">Insert</button>
          <button onClick={() => setVideoModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        </div>
      </Modal>

      <Modal isOpen={sectionModal} onClose={() => setSectionModal(false)} title="Section with Background">
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={sectionColor}
            onChange={(e) => setSectionColor(e.target.value)}
            className="w-16 h-10 cursor-pointer border border-gray-300 rounded"
          />
          <input
            type="text"
            value={sectionColor}
            onChange={(e) => setSectionColor(e.target.value)}
            placeholder="#f0f4ff"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={applySection} className="flex-1 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral-dark transition-colors">Insert</button>
          <button onClick={() => setSectionModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        </div>
      </Modal>

      <Modal isOpen={buttonModal} onClose={() => setButtonModal(false)} title="Insert Button">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={buttonData.text}
              onChange={(e) => setButtonData({ ...buttonData, text: e.target.value })}
              placeholder="Click here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
            <input
              type="url"
              value={buttonData.href}
              onChange={(e) => setButtonData({ ...buttonData, href: e.target.value })}
              placeholder="https://"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => setButtonData({ ...buttonData, variant: 'filled' })}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${buttonData.variant === 'filled' ? 'bg-coral text-white border-coral' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                Filled
              </button>
              <button
                onClick={() => setButtonData({ ...buttonData, variant: 'outline' })}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${buttonData.variant === 'outline' ? 'bg-coral text-white border-coral' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                Outline
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={applyButton} className="flex-1 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral-dark transition-colors">Insert</button>
          <button onClick={() => setButtonModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        </div>
      </Modal>

      <Modal isOpen={embedModal} onClose={() => setEmbedModal(false)} title="Embed iFrame">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Embed URL (Google Maps, Forms, etc.)</label>
            <input
              type="url"
              value={embedData.src}
              onChange={(e) => setEmbedData({ ...embedData, src: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
            <input
              type="number"
              value={embedData.height}
              onChange={(e) => setEmbedData({ ...embedData, height: e.target.value })}
              placeholder="400"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={applyEmbed} className="flex-1 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral-dark transition-colors">Insert</button>
          <button onClick={() => setEmbedModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        </div>
      </Modal>

    </div>
  );
};

// ── Main Editor ──────────────────────────────────────────────────────────────
const TiptapEditor = ({ initialContent, onChange, editable = true }) => {
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5] } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
      ImageExt.configure({ inline: false, allowBase64: true }),
      Youtube.configure({ nocookie: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: 'Start writing your event content...' }),
      Callout,
      Section,
      Audio,
      ButtonBlock,
      Columns,
      Column,
      Embed,
      ImageWithCaption,
    ],
    content: initialContent || '',
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && initialContent !== undefined && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent || '', false);
    }
  }, [initialContent]);

  const handleImageUpload = () => imageInputRef.current?.click();
  const handleAudioUpload = () => audioInputRef.current?.click();

  const onImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const t = toast.loading('Uploading image...');
    try {
      const { url } = await uploadService.uploadFile(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      toast.success('Image uploaded', { id: t });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Upload failed';
      toast.error(`Image upload failed: ${msg}`, { id: t });
    }
    e.target.value = '';
  };

  const onAudioFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const t = toast.loading('Uploading audio...');
    try {
      const { url } = await uploadService.uploadFile(file);
      editor.chain().focus().insertContent({
        type: 'audio',
        attrs: { src: url, caption: file.name },
      }).run();
      toast.success('Audio uploaded', { id: t });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Upload failed';
      toast.error(`Audio upload failed: ${msg}`, { id: t });
    }
    e.target.value = '';
  };

  return (
    <div className="tiptap-wrapper rounded-lg border border-gray-300 overflow-hidden">
      {editable && (
        <>
          <Toolbar editor={editor} onImageUpload={handleImageUpload} onAudioUpload={handleAudioUpload} />
          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={onImageFile} />
          <input ref={audioInputRef} type="file" accept="audio/*" className="hidden" onChange={onAudioFile} />
        </>
      )}
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
};

export default TiptapEditor;
