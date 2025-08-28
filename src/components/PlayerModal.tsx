// components/PlayerModal.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface PlayerModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export const PlayerModal = ({ videoId, title, onClose }: PlayerModalProps) => (
  <div className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-4">
    <div className="relative w-full max-w-4xl">
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
        aria-label="Close video"
      >
        <FontAwesomeIcon icon={faXmark} size="2x" />
      </button>

      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  </div>
);
