import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function Reveal({ children, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}