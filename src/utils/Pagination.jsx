export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
}) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2">
      <span>
        Menampilkan <strong>{from}</strong> - <strong>{to}</strong> dari{" "}
        <strong>{totalItems}</strong> data
      </span>

      <div className="flex gap-2 items-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          « Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-sm"
        >
          Next »
        </button>
      </div>
    </div>
  );
}
