import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
    <button
      className={`${currentPage === 1 ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'}  text-white font-bold py-2 px-4 rounded`}
      disabled={currentPage === 1}
      onClick={onPrevious}
    >
      Previous
    </button>
    <p >
      Page {currentPage} of {totalPages}
    </p>
    <button
      className={`${currentPage === totalPages ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'}  text-white font-bold py-2 px-4 rounded`}
      disabled={currentPage === totalPages}
      onClick={onNext}
    >
      Next
    </button>
  </div>
  );
};
