import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CommonPaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CommonPagination = ({
  pageNumber,
  totalPages,
  onPageChange,
}: CommonPaginationProps) => {
  const renderPageNumbers = () => {
    const startPage = Math.max(1, pageNumber - 1);
    const endPage = Math.min(totalPages, pageNumber + 1);
    const pages = [];

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={() => onPageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => onPageChange(i)}
            isActive={i === pageNumber}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(Math.min(totalPages, pageNumber + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CommonPagination;
