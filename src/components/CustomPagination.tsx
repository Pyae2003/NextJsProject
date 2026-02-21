"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";

type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
};
const CustomPagination = ({
  currentPage,
  totalPages,
}: CustomPaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const handleChangePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1) {
      params.set("page", pageNumber.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              size={"sm"}
              variant={"outline"}
              disabled={currentPage <= 1}
              onClick={() => handleChangePage(currentPage - 1)}
            >
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              of
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button
              size={"sm"}
              variant={"outline"}
              disabled={currentPage == totalPages}
              onClick={() => handleChangePage(currentPage + 1)}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
