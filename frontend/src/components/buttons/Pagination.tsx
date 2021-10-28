import React, { ReactElement } from "react";
import { Button } from "./Button";
import "../../styles/Pagination.css";
import { CursorT } from "../../types";

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
    <div className="ix-pagination">
      <div className="ix-pagination-button">
        {page > 0 && (
          <Button label="< previous" onClick={() => handlePageChange(-1)} />
        )}
      </div>

      <div className="ix-pagination-button">
        {cursor.next && (
          <Button label="next >" onClick={() => handlePageChange(1)} />
        )}
      </div>
    </div>
  );
}
