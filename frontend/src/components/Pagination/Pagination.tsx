import React from "react";
import { CursorT } from "../../types";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  cursor: CursorT;
  handlePageChange: (page: number) => void;
}
export const Pagination = ({ cursor, handlePageChange }: PaginationProps) => {
  let page = parseInt(cursor.current);
  // never let the page be less than 1
  if (page < 0) page = 0;
  // don't render buttons if no assets
  if (!cursor.totalRecords) return <div />;

  return (
    <div className={styles.container}>
      {page > 0 && (
        <div
          className={styles.arrowButton}
          onClick={() => handlePageChange(-1)}
        >
          <ArrowLeft />
        </div>
      )}
      <div className={styles.spacer12}></div>
      <div className={styles.pageSelectorContainer}>
        <div className={styles.currentPage}>Page {page}</div>
        {/* <div className={styles.downArrowContainer}>
          <DownArrowSvg />
        </div> */}
      </div>
      <div className={styles.spacer12}></div>
      {cursor.next && (
        <div className={styles.arrowButton} onClick={() => handlePageChange(1)}>
          <ArrowRight />
        </div>
      )}
    </div>
  );
};
