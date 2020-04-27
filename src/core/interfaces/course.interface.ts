export interface ICourse {
  url: string;
  id: number;
  __unicode__: string;
  name: string;
  degree: number;
  specialty: number;
}

export interface ICourseEntity {
  url: string;
  id: number;
  __unicode__: string;
  name: string;
  degree: number;
  univ: number;
  faculty: number;
  specialty: number;
}
