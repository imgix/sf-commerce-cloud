import React from "react";
import { CursorT } from "../../types";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  cursor: CursorT;
  onPageChange: (page: number) => void;
}
export const Pagination = ({
  cursor,
  onPageChange: handlePageChange,
}: PaginationProps) => {
  let page = parseInt(cursor.current);
  // never let the page be less than 1
  if (page < 0) page = 0;
  // don't render buttons if no assets
  if (!cursor.totalRecords) return <div />;

  const isFirstPage = page <= 0;
  const isLastPage = !cursor.next;
  return (
    <div className={styles.container}>
      <div
        className={
          styles.arrowButton + (isFirstPage ? ` ${styles.disabled}` : "")
        }
        onClick={() => !isFirstPage && handlePageChange(-1)}
      >
        <ArrowLeft />
      </div>
      <div className={styles.spacer12}></div>
      <div className={styles.pageSelectorContainer}>
        <div className={styles.currentPage}>Page {page}</div>
        {/* <div className={styles.downArrowContainer}>
          <DownArrowSvg />
        </div> */}
      </div>
      <div className={styles.spacer12}></div>
      <div
        className={styles.arrowButton + (isLastPage ? ` ${styles.disabled}` : "")}
        onClick={() => !isLastPage && handlePageChange(1)}
      >
        <ArrowRight />
      </div>
    </div>
  );
};
