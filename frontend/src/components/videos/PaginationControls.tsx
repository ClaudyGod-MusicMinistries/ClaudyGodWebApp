import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const PaginationControls: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate visible page range (max 5 pages visible at a time)
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-md"
          aria-label="Previous page"
        >
          <FontAwesomeIcon 
            icon={faChevronLeft} 
            className="text-purple-900 text-sm" 
          />
        </button>
        
        {/* First Page */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-medium text-sm ${
                1 === currentPage 
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-purple-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } transition-all duration-300`}
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}
        
        {/* Visible Page Numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium text-sm transition-all duration-300 ${
              currentPage === page
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-purple-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Last Page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-medium text-sm ${
                totalPages === currentPage 
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-purple-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } transition-all duration-300`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-md"
          aria-label="Next page"
        >
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className="text-purple-900 text-sm" 
          />
        </button>
      </div>
      
      {/* Page Info */}
      <div className="mt-3 text-sm text-gray-600 font-medium">
        Page <span className="text-purple-700">{currentPage}</span> of <span className="text-purple-700">{totalPages}</span>
      </div>
    </div>
  );
};

export default PaginationControls;