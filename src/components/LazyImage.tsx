import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  width = '100%',
  height = 'auto',
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!imgRef.current) return;

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setError(true);

    const imgElement = imgRef.current;

    // Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isLoaded && !error) {
            const img = new Image();
            img.src = src;
            img.onload = handleLoad;
            img.onerror = handleError;
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    observerRef.current.observe(imgElement);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, isLoaded, error]);

  return (
    <div
      className={`lazy-image-container ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && !error && (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-2 border-dashed border-red-300 rounded-xl w-full h-full flex items-center justify-center">
          <span className="text-red-500 text-sm">Image failed to load</span>
        </div>
      )}

      <img
        ref={imgRef}
        src={isLoaded ? src : ''}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
        style={{ width, height }}
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  );
};
