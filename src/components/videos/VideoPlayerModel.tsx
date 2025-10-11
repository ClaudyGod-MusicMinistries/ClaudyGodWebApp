/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Memoized decorative elements to prevent unnecessary re-renders
const CornerElements = memo(() => (
  <>
    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500 rounded-tl-lg" />
    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-lg" />
    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-indigo-500 rounded-bl-lg" />
    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-indigo-500 rounded-br-lg" />
  </>
));

const BackgroundGradient = memo(() => (
  <div className="absolute inset-0 -z-10 opacity-80">
    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/80 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-indigo-900/80 to-transparent" />
    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/80 to-transparent" />
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900/80 to-transparent" />
  </div>
));

const CloseButton = memo(({ onClose }: { onClose: () => void }) => (
  <div className="absolute -top-12 right-0 z-50">
    <button
      onClick={onClose}
      className="group bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-md rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-xl border border-white/10 hover:scale-105 transition-transform duration-300"
      aria-label="Close video player"
    >
      <FontAwesomeIcon
        icon={faTimes}
        className="text-white text-xl group-hover:text-purple-300 transition-colors duration-300"
      />
    </button>
  </div>
));

const VideoIframe = memo(({ videoId }: { videoId: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Clean up iframe when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0"
      loading="eager"
    />
  );
});

const VideoPlayerModal: React.FC<{
  videoId: string | null;
  onClose: () => void;
}> = memo(({ videoId, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Handle click outside
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  // Add event listeners
  useEffect(() => {
    if (videoId) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // Restore scroll
    };
  }, [videoId, handleEscape, handleClickOutside]);

  // Early return for better performance
  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[999] flex items-center justify-center p-4 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div ref={modalRef} className="relative w-full max-w-5xl">
        <CloseButton onClose={onClose} />

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-1 -m-1 z-10">
            <div className="relative w-full h-full rounded-xl overflow-hidden group">
              <VideoIframe videoId={videoId} />

              {/* Shine effect on hover - only rendered when needed */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_70%)] animate-rotate"></div>
              </div>
            </div>
          </div>

          <BackgroundGradient />
        </div>

        <CornerElements />
      </div>
    </div>
  );
});

VideoPlayerModal.displayName = 'VideoPlayerModal';

export default VideoPlayerModal;
