import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const ImageGallery = ({ images, variant = 'default' }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="my-6 flex justify-center">
        <img
          src={images[0]}
          alt="Event"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    );
  }

  // Compact variant for columns - smaller carousel that fits within column
  if (variant === 'compact') {
    return (
      <div className="my-4 w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg shadow-md w-full"
          style={{ maxWidth: '100%' }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-auto max-h-[300px] object-contain rounded-lg bg-gray-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Default variant - full carousel with thumbnails
  return (
    <div className="my-8">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="mb-4 rounded-lg shadow-lg"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-auto max-h-[600px] object-contain rounded-lg bg-gray-100"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="thumbs-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-20 object-cover rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity border-2 border-transparent hover:border-coral"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImageGallery;
