import { useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import ImageGallery from './ImageGallery';


const TiptapRender = ({ content }) => {
  const containerRef = useRef(null);
  const rootsRef = useRef([]);

  const processedContent = useMemo(() => {
    if (!content) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Function to group consecutive images in any container
    const groupImages = (container, isInsideColumn = false) => {
      const children = Array.from(container.childNodes);
      let i = 0;
      
      while (i < children.length) {
        const node = children[i];
        
        // Recursively process nested containers (like columns)
        if (node.nodeType === 1 && node.hasAttribute('data-column')) {
          groupImages(node, true); // Mark as inside column
          i++;
          continue;
        }
        
        if (node.nodeType === 1 && node.hasAttribute('data-columns')) {
          groupImages(node, false);
          i++;
          continue;
        }
        
        // Check if this is an image node
        const isImg = node.nodeName === 'IMG';
        const isPWithImg = node.nodeName === 'P' && 
          node.childNodes.length === 1 && 
          node.childNodes[0].nodeName === 'IMG';
        
        if (isImg || isPWithImg) {
          // Collect consecutive images
          const images = [];
          const nodesToRemove = [];
          let j = i;
          
          // Get fresh reference to children for each iteration
          const currentChildren = Array.from(container.childNodes);
          
          while (j < currentChildren.length) {
            const current = currentChildren[j];
            const currentIsImg = current.nodeName === 'IMG';
            const currentIsPWithImg = current.nodeName === 'P' && 
              current.childNodes.length === 1 && 
              current.childNodes[0].nodeName === 'IMG';
            
            if (!currentIsImg && !currentIsPWithImg) break;
            
            const src = currentIsImg 
              ? current.getAttribute('src')
              : current.childNodes[0].getAttribute('src');
            
            if (src) {
              images.push(src);
              nodesToRemove.push(current);
            }
            j++;
          }
          
          // If we have multiple images, create a gallery wrapper
          if (images.length > 1) {
            const galleryDiv = doc.createElement('div');
            const galleryId = `gallery-${Math.random().toString(36).substr(2, 9)}`;
            galleryDiv.setAttribute('data-image-gallery', galleryId);
            galleryDiv.setAttribute('data-gallery-images', JSON.stringify(images));
            // Mark if inside column for compact variant
            if (isInsideColumn) {
              galleryDiv.setAttribute('data-gallery-variant', 'compact');
            }
            
            // Get the first node to remove (it should still be in the container)
            const firstNode = nodesToRemove[0];
            
            // Verify the first node is still a child of container
            if (firstNode && firstNode.parentNode === container) {
              // Insert gallery div before the first image
              container.insertBefore(galleryDiv, firstNode);
              
              // Remove the original image nodes
              nodesToRemove.forEach(nodeToRemove => {
                if (nodeToRemove.parentNode === container) {
                  container.removeChild(nodeToRemove);
                }
              });
            }
            
            // Move to next node after the gallery
            i++;
          } else {
            i++;
          }
        } else {
          i++;
        }
      }
    };
    
    groupImages(doc.body);
    return doc.body.innerHTML;
  }, [content]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous roots
    rootsRef.current.forEach(root => {
      try {
        root.unmount();
      } catch (e) {
        // Ignore unmount errors
      }
    });
    rootsRef.current = [];

    // Find all gallery placeholders and render ImageGallery components
    const galleries = containerRef.current.querySelectorAll('[data-image-gallery]');
    
    galleries.forEach((galleryDiv) => {
      const images = JSON.parse(galleryDiv.getAttribute('data-gallery-images'));
      const variant = galleryDiv.getAttribute('data-gallery-variant') || 'default';
      
      // Clear the div and render the gallery
      galleryDiv.innerHTML = '';
      const root = createRoot(galleryDiv);
      root.render(<ImageGallery images={images} variant={variant} />);
      rootsRef.current.push(root);
    });

    // Cleanup function
    return () => {
      rootsRef.current.forEach(root => {
        try {
          root.unmount();
        } catch (e) {
          // Ignore unmount errors
        }
      });
      rootsRef.current = [];
    };
  }, [processedContent]);

  if (!content) return null;

  return (
    <div 
      ref={containerRef}
      className="tiptap-render max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default TiptapRender;
