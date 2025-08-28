import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const VideoPlayerModal: React.FC<{
  videoId: string | null;
  onClose: () => void;
}> = ({ videoId, onClose }) => {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[999] flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="relative w-full max-w-5xl">
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

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-1 -m-1 z-10">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_70%)] animate-rotate"></div>
              </div>
            </div>
          </div>

          {/* Animated background gradient */}
          <div className="absolute inset-0 -z-10 opacity-80">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/80 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900/80 to-transparent"></div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-indigo-500 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-indigo-500 rounded-br-lg"></div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
