import React, { useState } from 'react';

const ImageUploader = ({ onImageUrl }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onImageUrl(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter image URL..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-coral hover:bg-coral-light text-white rounded-lg font-semibold transition-colors"
      >
        Add Image
      </button>
    </form>
  );
};

export default ImageUploader;
