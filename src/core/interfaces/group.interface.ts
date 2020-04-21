export interface IGroup {
  subgroups: number;
  course?: number;
  course_degree: string;
  course_name: string;
  year: number;
  name: string;
  short_name: string;
  id: number;
  __unicode__: string;
  slug: string;
  url: string;
}

export interface IUpdateGroup {
  subgroups: number;
  year: number;
  course: number;
  name: string;
  short_name: string;
  slug: string;
}
