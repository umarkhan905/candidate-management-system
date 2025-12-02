import { useState } from "react";

export const usePaginate = <T>(
  data: T[],
  itemsPerPage: number = 10,
  currentPage: number = 1
) => {
  const [page, setPage] = useState<number>(currentPage);

  const noOfPages = Math.ceil(data.length / itemsPerPage);
  const skip = (page - 1) * itemsPerPage;

  const onNext = () => {
    setPage((prevPage) => (prevPage < noOfPages ? prevPage + 1 : prevPage));
  };

  const onPrev = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return {
    data: data.slice(skip, itemsPerPage + skip),
    currentPage: page,
    skip,
    noOfPages,
    hasMore: page < noOfPages,
    onNext,
    onPrev,
  };
};
