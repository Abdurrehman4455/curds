import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-100 ${
            currentPage === i
              ? 'text-white bg-blue-600 hover:bg-blue-700'
              : 'text-gray-700 bg-white'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 disabled:bg-gray-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Number Buttons */}
      {getPaginationButtons()}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-800 disabled:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
