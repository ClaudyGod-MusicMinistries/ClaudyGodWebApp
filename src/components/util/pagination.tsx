import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Add current and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Always show last page if there are at least 2 pages
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Add ellipses as needed
    const result = [];
    let prevPage = 0;

    for (const page of pages) {
      if (page - prevPage > 1) {
        result.push('...');
      }
      result.push(page);
      prevPage = page;
    }

    return result;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition"
      >
        Previous
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === page
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="text-gray-500">
            ...
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
