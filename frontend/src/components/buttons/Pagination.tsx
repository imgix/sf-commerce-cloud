import React, { ReactElement } from "react";
import "../../styles/Pagination.css";
import { CursorT } from "../../types";
import { Button } from "./Button";
import styles from "./Pagination.module.scss";

interface Props {
  cursor: CursorT;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  cursor,
  handlePageChange,
}: Props): ReactElement {
  let page = parseInt(cursor.current);
  // never let the page be less than 1
  if (page < 0) page = 0;
  // don't render buttons if no assets
  if (!cursor.totalRecords) return <div />;

  return (
    <div className={styles.pagination}>
      <div>
        {page > 0 && (
          <Button label="< previous" onClick={() => handlePageChange(-1)} />
        )}
      </div>

      <div>
        {cursor.next && (
          <Button label="next >" onClick={() => handlePageChange(1)} />
        )}
      </div>
    </div>
  );
}
