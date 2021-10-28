export type CursorT = {
  current: string;
  next: string;
  limit?: number;
  hasMore: boolean;
  totalRecords: number;
};
