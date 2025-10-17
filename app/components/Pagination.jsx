export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 my-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-[#AD8A64] text-white"
              : "bg-[#1A1F23] text-[#4E6E5D] hover:bg-[#4E6E5D] hover:text-white"
          } transition`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
