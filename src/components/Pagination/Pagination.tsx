import './Pagination.css';

type Props={
    currentPage:number,
    totalPages:number,
    onPageChange:(page:number)=>void
}

export function Pagination({ currentPage, totalPages, onPageChange }:Props) {
    const screenWidth = window.innerWidth;
  let maxButtons = 6;
  if (screenWidth < 480) {
    maxButtons = 3;
  } else if (screenWidth < 768) {
    maxButtons = 4;
  }

  const pageButtons = [];
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxButtons / 2), totalPages - maxButtons + 1)
  );
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (startPage > 1) {
    pageButtons.push(
      <button key={1} onClick={() => onPageChange(1)}>
        1
      </button>
    );
    if (startPage > 2) {
      pageButtons.push(<span key="start-ellipsis">...</span>);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        className={i === currentPage ? 'active' : ''}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageButtons.push(<span key="end-ellipsis">...</span>);
    }
    pageButtons.push(
      <button key={totalPages} onClick={() => onPageChange(totalPages)}>
        {totalPages}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pageButtons}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  )
}
