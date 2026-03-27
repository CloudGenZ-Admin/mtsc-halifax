import { useMemo } from 'react';
import ImageGallery from './ImageGallery';

const TiptapRender = ({ content }) => {
  const renderedContent = useMemo(() => {
    if (!content) return null;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      
      const renderNode = (node, index) => {
        try {
          // Text nodes
          if (node.nodeType === 3) {
            return node.textContent;
          }

          // Element nodes
          if (node.nodeType === 1) {
            const tagName = node.tagName.toLowerCase();
            const children = Array.from(node.childNodes).map((child, i) => renderNode(child, i));
            const props = {};

            // Copy attributes safely
            try {
              Array.from(node.attributes || []).forEach(attr => {
                if (!attr || !attr.name) return;
                
                if (attr.name === 'class') {
                  props.className = attr.value;
                } else if (attr.name === 'style') {
                  // Parse inline styles
                  const styleObj = {};
                  (attr.value || '').split(';').forEach(rule => {
                    const [key, value] = rule.split(':').map(s => s.trim());
                    if (key && value) {
                      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                      styleObj[camelKey] = value;
                    }
                  });
                  if (Object.keys(styleObj).length > 0) {
                    props.style = styleObj;
                  }
                } else if (attr.name.startsWith('data-')) {
                  props[attr.name] = attr.value;
                } else if (['href', 'src', 'alt', 'target', 'rel'].includes(attr.name)) {
                  props[attr.name] = attr.value;
                }
              });
            } catch (e) {
              console.warn('Error parsing attributes:', e);
            }

            // Void elements (self-closing tags)
            const voidElements = ['img', 'br', 'hr', 'input', 'meta', 'link'];
            
            if (voidElements.includes(tagName)) {
              const Element = tagName;
              return <Element key={index} {...props} />;
            }

            // Handle special elements
            if (tagName === 'a') {
              return <a key={index} {...props}>{children}</a>;
            }

            if (tagName === 'iframe') {
              return <iframe key={index} {...props} />;
            }

            // Standard HTML elements
            const Element = tagName;
            return <Element key={index} {...props}>{children}</Element>;
          }

          return null;
        } catch (e) {
          console.warn('Error rendering node:', e);
          return null;
        }
      };

      // Group consecutive images and render - with column detection
      const processChildren = (nodes, isInsideColumn = false) => {
        const result = [];
        let imageBuffer = [];
        let i = 0;

        const flushImages = () => {
          if (imageBuffer.length > 1) {
            result.push(
              <ImageGallery 
                key={`gallery-${result.length}`} 
                images={imageBuffer} 
                variant={isInsideColumn ? 'compact' : 'default'}
              />
            );
          } else if (imageBuffer.length === 1) {
            result.push(
              <div key={`img-${result.length}`} className="my-6">
                <img src={imageBuffer[0]} alt="Event" className="w-full rounded-lg shadow-lg" />
              </div>
            );
          }
          imageBuffer = [];
        };

        try {
          nodes.forEach((node) => {
            try {
              // Check if it's a column container
              const isColumn = node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-column');
              const isColumns = node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-columns');

              if (isColumn || isColumns) {
                flushImages();
                // Process column children with column flag
                const columnChildren = processChildren(Array.from(node.childNodes || []), true);
                const props = {};
                
                try {
                  if (node.hasAttribute('data-column')) props['data-column'] = node.getAttribute('data-column');
                  if (node.hasAttribute('data-columns')) props['data-columns'] = node.getAttribute('data-columns');
                  if (node.hasAttribute('style')) {
                    const styleObj = {};
                    (node.getAttribute('style') || '').split(';').forEach(rule => {
                      const [key, value] = rule.split(':').map(s => s.trim());
                      if (key && value) {
                        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        styleObj[camelKey] = value;
                      }
                    });
                    if (Object.keys(styleObj).length > 0) {
                      props.style = styleObj;
                    }
                  }
                } catch (e) {
                  console.warn('Error parsing column attributes:', e);
                }
                
                result.push(<div key={i++} {...props}>{columnChildren}</div>);
                return;
              }

              // Check if it's an image
              const isImg = node.nodeType === 1 && node.tagName === 'IMG';
              const isPWithImg = node.nodeType === 1 && node.tagName === 'P' && 
                node.childNodes && node.childNodes.length === 1 && 
                node.childNodes[0] && node.childNodes[0].tagName === 'IMG';

              if (isImg || isPWithImg) {
                const src = isImg 
                  ? node.getAttribute('src') 
                  : (node.childNodes[0] && node.childNodes[0].getAttribute('src'));
                if (src) {
                  imageBuffer.push(src);
                }
              } else {
                flushImages();
                result.push(renderNode(node, i++));
              }
            } catch (e) {
              console.warn('Error processing node:', e);
            }
          });

          flushImages();
        } catch (e) {
          console.error('Error processing children:', e);
        }

        return result;
      };

      return processChildren(Array.from(doc.body.childNodes || []));
    } catch (e) {
      console.error('Error rendering content:', e);
      // Fallback: render as plain text
      return <div className="text-gray-600">{content}</div>;
    }
  }, [content]);

  if (!content) return null;

  return (
    <div className="tiptap-render max-w-none">
      {renderedContent}
    </div>
  );
};

export default TiptapRender;
