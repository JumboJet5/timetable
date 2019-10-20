declare interface UniversitiesResponseInterface {
  next: string | null;
  previous: string | null;
  count: number;
  results: UniversityInterface[];
}
