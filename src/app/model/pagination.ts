export interface Pagination<T> {
  items: T[];
  metadata: PaginationMetadata;
}

export interface PaginationMetadata {
  hasNext: boolean;
  limit: number;
  totalRecords: number;
  next?: string;
}
