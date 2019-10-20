declare interface FacultyResponseInterface {
  next: string | null;
  previous: string | null;
  count: number;
  results: FacultyInterface[];
}
