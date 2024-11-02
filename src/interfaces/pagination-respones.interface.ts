export interface IPaginationRes<T> {
  page: number;
  perPage: number;
  count: number;
  records: T[];
}
