import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { paginationType } from "@/utils/types/Pagination";





const PaginationTable = ({prevClick,pages,currentPage,nextClick,pageClick}:paginationType) => {
  return (
    <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={prevClick} />
            </PaginationItem>
            {pages.map((p, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === p}
                    onClick={() => pageClick(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext href="#" onClick={nextClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  )
}

export default PaginationTable
