import { useState } from "react";

export const usePagination = (data: any[], countItemsOnPage: number) => {
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * countItemsOnPage;
  const countPages = Math.ceil(data.length / countItemsOnPage);

  const dataWithPagination = data.slice(
    pagesVisited,
    pagesVisited + countItemsOnPage
  );

  return {pageNumber, setPageNumber, dataWithPagination, countPages}
};
