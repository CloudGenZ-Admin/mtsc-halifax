import React, { useEffect, useRef } from 'react';
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

const EditorJSComponent = ({ initialContent, onChange, editable = true }) => {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);
  const holderId = useRef(`editor-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (instanceRef.current) return; // Already initialized

    // Parse initial content
    let blocks = [];
    if (initialContent) {
      try {
        const parsed = JSON.parse(initialContent);
        blocks = Array.isArray(parsed) ? parsed : parsed.blocks || [];
      } catch (e) {
        console.error('Failed to parse initial content:', e);
      }
    }

    // Initialize Editor.js
    instanceRef.current = new EditorJS({
      holder: holderId.current,
      readOnly: !editable,
      data: {
        blocks: blocks
      },
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    resolve({
                      success: 1,
                      file: {
                        url: reader.result
                      }
                    });
                  };
                  reader.readAsDataURL(file);
                });
              },
              uploadByUrl(url) {
                return Promise.resolve({
                  success: 1,
                  file: {
                    url: url
                  }
                });
              }
            }
          }
        },
        quote: Quote,
        alert: {
          class: Alert,
          inlineToolbar: true,
          config: {
            defaultType: 'primary',
            messagePlaceholder: 'Enter something'
          }
        },
        Color: {
          class: ColorPlugin,
          config: {
            colorCollections: ['#FF1300','#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
            defaultColor: '#FF1300',
            type: 'text',
            customPicker: true
          }
        },
        Marker: {
          class: ColorPlugin,
          config: {
            defaultColor: '#FFBF00',
            type: 'marker',
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
          }
        },
        inlineCode: InlineCode,
        marker: Marker,
        underline: Underline
      },
      onChange: async () => {
        if (onChange && editable) {
          try {
            const outputData = await instanceRef.current.save();
            onChange(JSON.stringify(outputData.blocks));
          } catch (error) {
            console.error('Saving failed:', error);
          }
        }
      }
    });

    return () => {
      if (instanceRef.current && instanceRef.current.destroy) {
        instanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div id={holderId.current} />
    </div>
  );
};

export default EditorJSComponent;
