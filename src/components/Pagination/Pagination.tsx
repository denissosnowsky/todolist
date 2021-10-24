import { useEffect, useState } from "react";
import s from "./Pagination.module.css";

interface PaginationType {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  allCount: number;
  portionSize?: number;
}

const Pagination: React.FC<PaginationType> = ({
  page,
  setPage,
  pageSize,
  allCount,
  portionSize = 3,
}) => {
  const [active, setActive] = useState(page);
  let pagesCount = Math.ceil(allCount / pageSize);

  let pageArray = [];
  for (let i = 1; i <= pagesCount; i++) {
    pageArray.push(i);
  }

  //make portions of numbers buttons for pagination
  let [portionNumber, setPortionNumber] = useState(1);
  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  const handleChoosePage = (p: number) => {
    setPage(p);
    setActive(p);
  };

  const handleFirstPage = () => {
    setPortionNumber(1);
    handleChoosePage(1);
  };
  const handleLastPage = () => {
    setPortionNumber(portionCount);
    handleChoosePage(pagesCount);
  };
  const handlePrevPortion = () => {
    setPortionNumber(portionNumber - 1);
  };
  const handleNextPortion = () => {
    setPortionNumber(portionNumber + 1);
  };

  useEffect(() => {
    setActive(page);
    setPortionNumber(Math.ceil(page/portionSize))
  }, [page]);

  return (
    <div className={s.wrapper}>
      {portionNumber > 1 && (
        <>
          <button onClick={handleFirstPage}>{"1..."}</button>
          <button onClick={handlePrevPortion}>Previous</button>
        </>
      )}
      {pageArray
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <button
            key={p}
            onClick={() => handleChoosePage(p)}
            className={p === active ? s.activeBtn : s.default}
          >
            {p}
          </button>
        ))}
      {portionCount > portionNumber && (
        <>
          <button onClick={handleNextPortion}>Next</button>
          <button onClick={handleLastPage}>{`...${pagesCount}`}</button>
        </>
      )}
    </div>
  );
};

export default Pagination;
