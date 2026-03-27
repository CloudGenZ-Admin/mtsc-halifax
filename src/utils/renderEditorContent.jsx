import ImageGallery from '../components/event/ImageGallery';

export const renderEditorContent = (content) => {
  try {
    const parsed = JSON.parse(content);
    const blocks = Array.isArray(parsed) ? parsed : parsed.blocks || [];
    const elements = [];
    let imageBuffer = [];

    const flushImageBuffer = () => {
      if (imageBuffer.length === 0) return;
      if (imageBuffer.length === 1) {
        elements.push(
          <div key={`img-${elements.length}`} className="my-6">
            <img src={imageBuffer[0].url} alt={imageBuffer[0].caption || 'Event'} className="w-full rounded-lg shadow-lg" />
            {imageBuffer[0].caption && (
              <p className="text-center text-sm text-text-mid mt-2">{imageBuffer[0].caption}</p>
            )}
          </div>
        );
      } else {
        elements.push(
          <ImageGallery key={`gallery-${elements.length}`} images={imageBuffer.map(img => img.url)} />
        );
      }
      imageBuffer = [];
    };

    blocks.forEach((block, index) => {
      // Buffer consecutive images
      if (block.type === 'image' && block.data?.file?.url) {
        imageBuffer.push({ url: block.data.file.url, caption: block.data.caption });
        return;
      }

      flushImageBuffer();

      // Heading
      if (block.type === 'header') {
        const level = block.data?.level || 2;
        const Tag = `h${level}`;
        const cls = level === 1
          ? 'text-4xl font-bold text-navy mt-8 mb-4'
          : level === 2
            ? 'text-3xl font-bold text-navy mt-8 mb-4 border-b-2 border-coral pb-2'
            : level === 3
              ? 'text-2xl font-bold text-navy mt-6 mb-3'
              : 'text-xl font-bold text-navy mt-4 mb-2';
        elements.push(<Tag key={index} className={cls} dangerouslySetInnerHTML={{ __html: block.data.text }} />);
        return;
      }

      // Paragraph
      if (block.type === 'paragraph') {
        elements.push(
          <p key={index} className="text-text-mid leading-relaxed mb-4 text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
        return;
      }

      // List
      if (block.type === 'list') {
        const Tag = block.data.style === 'ordered' ? 'ol' : 'ul';
        const listCls = block.data.style === 'ordered' ? 'list-decimal ml-6 mb-4' : 'list-disc ml-6 mb-4';
        elements.push(
          <Tag key={index} className={listCls}>
            {block.data.items.map((item, idx) => {
              const text = typeof item === 'string' ? item : (item?.content || '');
              return <li key={idx} className="text-text-mid leading-relaxed mb-2 text-lg" dangerouslySetInnerHTML={{ __html: text }} />;
            })}
          </Tag>
        );
        return;
      }

      // Checklist
      if (block.type === 'checklist') {
        elements.push(
          <ul key={index} className="mb-4 space-y-2">
            {block.data.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-text-mid text-lg">
                <span className={`mt-1 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center ${item.checked ? 'bg-coral border-coral text-white' : 'border-gray-400'}`}>
                  {item.checked && '✓'}
                </span>
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </li>
            ))}
          </ul>
        );
        return;
      }

      // Quote
      if (block.type === 'quote') {
        elements.push(
          <blockquote key={index} className="border-l-4 border-periwinkle bg-gray-50 p-6 my-6 rounded-r-lg">
            <p className="text-navy text-lg italic" dangerouslySetInnerHTML={{ __html: block.data.text }} />
            {block.data.caption && (
              <cite className="text-text-mid text-sm mt-2 block">— {block.data.caption}</cite>
            )}
          </blockquote>
        );
        return;
      }

      // Warning
      if (block.type === 'warning') {
        elements.push(
          <div key={index} className="border-l-4 border-yellow-400 bg-yellow-50 p-6 my-6 rounded-r-lg">
            {block.data.title && <p className="font-bold text-yellow-800 mb-1">{block.data.title}</p>}
            <p className="text-yellow-700" dangerouslySetInnerHTML={{ __html: block.data.message }} />
          </div>
        );
        return;
      }

      // Alert
      if (block.type === 'alert') {
        const alertColors = {
          primary: 'border-blue-400 bg-blue-50 text-blue-800',
          secondary: 'border-gray-400 bg-gray-50 text-gray-800',
          info: 'border-cyan-400 bg-cyan-50 text-cyan-800',
          success: 'border-green-400 bg-green-50 text-green-800',
          warning: 'border-yellow-400 bg-yellow-50 text-yellow-800',
          danger: 'border-red-400 bg-red-50 text-red-800',
          light: 'border-gray-200 bg-gray-50 text-gray-700',
          dark: 'border-gray-700 bg-gray-800 text-white',
        };
        const colorCls = alertColors[block.data.type] || alertColors.primary;
        elements.push(
          <div key={index} className={`border-l-4 p-4 my-4 rounded-r-lg ${colorCls}`}>
            <p dangerouslySetInnerHTML={{ __html: block.data.message }} />
          </div>
        );
        return;
      }

      // Delimiter
      if (block.type === 'delimiter') {
        elements.push(
          <div key={index} className="flex items-center justify-center my-8">
            <span className="text-coral text-2xl tracking-widest">* * *</span>
          </div>
        );
        return;
      }

      // Table
      if (block.type === 'table') {
        elements.push(
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                {block.data.content.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx === 0 && block.data.withHeadings ? 'bg-navy text-white' : rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cIdx) => {
                      const Tag = rIdx === 0 && block.data.withHeadings ? 'th' : 'td';
                      return <Tag key={cIdx} className="border border-gray-300 px-4 py-2 text-left" dangerouslySetInnerHTML={{ __html: cell }} />;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return;
      }

      // Embed (YouTube, Vimeo, etc.)
      if (block.type === 'embed') {
        elements.push(
          <div key={index} className="my-6">
            <div className="relative w-full aspect-video">
              <iframe
                src={block.data.embed}
                title={block.data.caption || 'Embedded content'}
                className="w-full h-full rounded-lg shadow-lg"
                allowFullScreen
                frameBorder="0"
              />
            </div>
            {block.data.caption && (
              <p className="text-center text-sm text-text-mid mt-2">{block.data.caption}</p>
            )}
          </div>
        );
        return;
      }

      // Button
      if (block.type === 'button') {
        const isFilled = block.data.style !== 'outline';
        const alignCls = block.data.align === 'left' ? 'text-left' : block.data.align === 'right' ? 'text-right' : 'text-center';
        const btnCls = isFilled
          ? 'inline-block bg-coral text-white border-2 border-coral px-7 py-2.5 rounded-lg font-bold no-underline hover:bg-coral-light transition-colors'
          : 'inline-block bg-transparent text-coral border-2 border-coral px-7 py-2.5 rounded-lg font-bold no-underline hover:bg-coral hover:text-white transition-colors';
        elements.push(
          <div key={index} className={`my-6 ${alignCls}`}>
            <a href={block.data.link} target="_blank" rel="noopener noreferrer" className={btnCls}>
              {block.data.text}
            </a>
          </div>
        );
        return;
      }

      // Audio
      if (block.type === 'audio') {
        const url = block.data?.url || block.data?.file?.url;
        if (url) {
          elements.push(
            <div key={index} className="my-6">
              <audio controls className="w-full rounded-lg">
                <source src={url} />
                Your browser does not support the audio element.
              </audio>
              {block.data.caption && (
                <p className="text-center text-sm text-text-mid mt-2">{block.data.caption}</p>
              )}
            </div>
          );
        }
        return;
      }

      // Link tool (link preview card)
      if (block.type === 'linkTool') {
        const meta = block.data?.meta || {};
        elements.push(
          <a
            key={index}
            href={block.data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 border border-gray-200 rounded-xl p-4 my-4 hover:border-coral transition-colors no-underline"
          >
            {meta.image?.url && (
              <img src={meta.image.url} alt={meta.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
            )}
            <div>
              <p className="font-bold text-navy">{meta.title || block.data.link}</p>
              {meta.description && <p className="text-text-mid text-sm mt-1">{meta.description}</p>}
              <p className="text-coral text-xs mt-1">{block.data.link}</p>
            </div>
          </a>
        );
        return;
      }
    });

    flushImageBuffer();
    return elements;
  } catch (error) {
    console.error('Error rendering content:', error);
    return <div className="text-text-mid">{content}</div>;
  }
};
