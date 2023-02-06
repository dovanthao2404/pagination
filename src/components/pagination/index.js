import React, { useEffect, useState } from "react";

const Pagination = ({
  total,
  onClickNext,
  onClickPrev,
  onClickPage,
  currentPageDefault,
  pageSize,
}) => {
  const [pageSizeSate, setPageSizeState] = useState(20);
  const [currentPageState, setCurrentPageState] = useState(1);

  useEffect(
    (item) => {
      if (pageSize) {
        setPageSizeState(pageSize);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    if (currentPageDefault) {
      setCurrentPageState(currentPageDefault);
    }
  }, [currentPageDefault]);

  const getPageEndNumber = () => {
    return Math.ceil(total / pageSizeSate);
  };

  const numberToList = (number) => {
    let numbers = [];
    for (let i = 1; i <= number; i++) {
      numbers = [...numbers, i];
    }
    return numbers;
  };

  const handleNextPage = () => {
    if (currentPageState < getPageEndNumber()) {
      const newCurrentPage = currentPageState + 1;
      setCurrentPageState(newCurrentPage);
      onClickNext && onClickNext({ currentPage: newCurrentPage });
    }
  };

  const handlePrevPage = () => {
    if (currentPageState > 1) {
      const newCurrentPage = currentPageState - 1;
      setCurrentPageState(newCurrentPage);
      onClickPrev && onClickPrev({ currentPage: newCurrentPage });
    }
  };

  const handleClickPage = (page) => {
    setCurrentPageState(page);
    onClickPage && onClickPage(page)
  };

  const numberToListFromTo = (from, to) => {
    let numbers = [];
    for (let i = from; i <= to; i++) {
      numbers = [...numbers, i];
    }
    return numbers;
  };

  const getPageShow = () => {
    const pageShowDefault = 5;
    if (getPageEndNumber() <= pageShowDefault + 2) {
      return numberToList(getPageEndNumber());
    }
    if (
      currentPageState >= pageShowDefault &&
      getPageEndNumber() - currentPageState >= pageShowDefault
    ) {
      return [
        1,
        { key: currentPageState - 3, value: "..." },
        ...numberToListFromTo(currentPageState - 2, currentPageState + 2),
        { key: currentPageState + 3, value: "..." },
        getPageEndNumber(),
      ];
    } else if (getPageEndNumber() - currentPageState > pageShowDefault) {
      return [...numberToList(pageShowDefault),
        { key: getPageEndNumber() - 1, value: "..." }
        , getPageEndNumber()];
    } else {
      return [
        1,
        { key: 2, value: "..." },
        ...numberToListFromTo(
          getPageEndNumber() - pageShowDefault + 1,
          getPageEndNumber()
        ),
      ];
    }
  };

  return (
    <div>
      <button disabled={currentPageState === 1} onClick={handlePrevPage}>
        prev
      </button>
      {getPageShow().map((item) => {
        if (item.value === '...') {
          return <span key={item.key}>{item.value}</span>
        }
        return (
          <button
            key={item}
            className={item === currentPageState ? "active" : ""}
            onClick={() => handleClickPage(item)}
          >
            {item}
          </button>
        );
      })}

      <button
        disabled={currentPageState === getPageEndNumber()}
        onClick={handleNextPage}
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
