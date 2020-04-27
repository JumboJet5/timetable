export interface ISpecialty {
  url: string;
  id: number;
  __unicode__: string;
  name: string;
  short_name: string;
  img: string;
  desc: string;
  slug: string;
  interface_type: number;
  faculty: number;
}

export interface ISpecialtyEntity {
  url: string;
  id: number;
  __unicode__: string;
  name: string;
  short_name: string;
  img: string;
  desc: string;
  slug: string;
  interface_type: number;
  univ: number;
  faculty: number;
}
