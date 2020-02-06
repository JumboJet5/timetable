export interface IPageable<T> {
  next: string | null;
  previous: string | null;
  count: number;
  results: T[];
}
