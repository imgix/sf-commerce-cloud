import React from "react";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import styles from "./Pagination.module.scss";

export type IPaginationData = {
  /**
   * 0-indexed
   */
  current: number;
  hasPrev: boolean;
  hasNext: boolean;
  totalNumPages: number;
};

interface PaginationProps {
  data: IPaginationData;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  disabled?: boolean;
}
export const Pagination = ({
  data: { current, hasPrev, hasNext, totalNumPages },
  onNextPage,
  onPrevPage,
  disabled,
}: PaginationProps) => {
  return (
    <div className={styles.container}>
      <div
        className={
          styles.arrowButton +
          (disabled || !hasPrev ? ` ${styles.disabled}` : "")
        }
        onClick={() => hasPrev && onPrevPage && onPrevPage()}
      >
        <ArrowLeft />
      </div>
      <div className={styles.spacer12}></div>
      <div className={styles.pageSelectorContainer}>
        <div className={styles.currentPage}>Page {current + 1}</div>
        {/* <div className={styles.downArrowContainer}>
          <DownArrowSvg />
        </div> */}
      </div>
      <div className={styles.spacer12}></div>
      <div
        className={
          styles.arrowButton +
          (disabled || !hasNext ? ` ${styles.disabled}` : "")
        }
        onClick={() => hasNext && onNextPage && onNextPage()}
      >
        <ArrowRight />
      </div>
    </div>
  );
};
