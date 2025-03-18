import { useState } from "react";
import { useSearchParams } from "react-router";

interface PaginationProps{
  totalProducts: number,
  productsPerPage: number,
  onPageChange: (page: string) => void
}

function Pagination({totalProducts, productsPerPage, onPageChange}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)

  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  function handlePageChange(page: number) {
    if (page <= 0 || page === currentPage) return
    if (page > totalPages) return

    setSearchParams((prevParams) => {
      prevParams.set('page', page.toString())
      return prevParams
    })

    let queryParams = []
    for (const [key, value] of searchParams.entries()) {
      queryParams.push(`${key}=${value}`)
    }
    
    setCurrentPage(page)
    onPageChange(queryParams.join('&'))
  }

  return ( 
    <div className="join mt-16">
      <button className="join-item btn" onClick={() => {
        handlePageChange(currentPage - 1)
      }}
      >
        PREV
      </button>
      {pages.map(page => 
        <button key={page} className="join-item btn btn-square" onClick={() => {
          handlePageChange(page)
        }}>
          {page}
        </button>
      )}
      <button className="join-item btn" onClick={() => {
        handlePageChange(currentPage + 1)
      }}
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;