import { useState } from "react";
import { useSearchParams } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface PaginationProps{
  totalItems: number,
  itemsPerPage: number,
}

function Pagination({totalItems, itemsPerPage}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  function handlePageChange(page: number) {
    if (page <= 0 || page === currentPage) return
    if (page > totalPages) return

    setSearchParams((prevParams) => {
      prevParams.set('page', page.toString())
      return prevParams
    })

    setCurrentPage(page)
  }

  return ( 
    <div className="join mt-16">
      <button id="prev" aria-label="prev" className="join-item btn btn-sm" onClick={() => {
        handlePageChange(currentPage - 1)
      }}
      >
        <IoIosArrowBack />
      </button>
      {totalPages <= 10 && pages.map(page => 
        <button key={page} className={`join-item btn btn-square btn-sm ${currentPage === page && 'btn-primary'}`} onClick={() => {
          handlePageChange(page)
        }}>
          {page}
        </button>
      )}
      {totalPages > 10 &&
      <div>
        <button className={`join-item btn btn-square btn-sm ${currentPage === 1 && 'btn-primary'}`} onClick={() => {
          handlePageChange(1)
        }}>
          {1}
        </button >

          {currentPage < 5 && 
          <>
            <button className={`join-item btn btn-square btn-sm ${currentPage === 2 && 'btn-primary'}`} onClick={() => {handlePageChange(2)}}>
              2
            </button>
            <button className={`join-item btn btn-square btn-sm ${currentPage === 3 && 'btn-primary'}`} onClick={() => {handlePageChange(3)}}>
              3
            </button>
            <button className={`join-item btn btn-square btn-sm ${currentPage === 4 && 'btn-primary'}`} onClick={() => {handlePageChange(4)}}>
              4
            </button>
            <button className={`join-item btn btn-square btn-sm ${currentPage === 5 && 'btn-primary'}`} onClick={() => {handlePageChange(5)}}>
              5
            </button>
          </>}

          {currentPage >= 5 && currentPage <= totalPages - 4 &&
          <>
            <button className="join-item btn btn-disabled btn-sm">
              ...
            </button>
            <button className="join-item btn btn-square btn-sm" onClick={() => {handlePageChange(currentPage - 1)}}>
              {currentPage - 1}
            </button>
            <button className="join-item btn btn-square btn-sm btn-primary" onClick={() => {handlePageChange(currentPage)}}>
              {currentPage}
            </button>
            <button className="join-item btn btn-square btn-sm" onClick={() => {handlePageChange(currentPage + 1)}}>
              {currentPage + 1}
            </button>
          </>}

          <button className="join-item btn btn-disabled btn-sm">
            ...
          </button>

          {currentPage > totalPages - 4 && 
          <>
            <button className={`join-item btn btn-square btn-sm ${currentPage === totalPages - 4 && 'btn-primary'}`} onClick={() => {handlePageChange(totalPages - 4)}}>
              {totalPages - 4}
            </button>
            <button className={`join-item btn btn-square btn-sm ${currentPage === totalPages - 3 && 'btn-primary'}`} onClick={() => {handlePageChange(totalPages - 3)}}>
              {totalPages - 3}
            </button>
            <button className={`join-item btn btn-square btn-sm ${currentPage === totalPages - 2 && 'btn-primary'}`} onClick={() => {handlePageChange(totalPages - 2)}}>
              {totalPages - 2}
            </button>
            <button className={`join-item btn btn-square btn-sm ${currentPage === totalPages - 1 && 'btn-primary'}`} onClick={() => {handlePageChange(totalPages - 1)}}>
              {totalPages - 1}
            </button>
          </>}
        
        <button className={`join-item btn btn-square btn-sm ${currentPage === totalPages && 'btn-primary'}`} onClick={() => {handlePageChange(totalPages)}}>
          {totalPages}
        </button>
      </div>
      }
      <button id="next" aria-label="next" className="join-item btn btn-sm" onClick={() => {
        handlePageChange(currentPage + 1)
      }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default Pagination;