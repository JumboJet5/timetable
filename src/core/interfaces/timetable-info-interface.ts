declare interface ITimetableInfo {
  university: {
    img: string;
    name: string;
    short_name: string;
    id: number;
    slug: string;
  };
  specialty?: {
    img: null;
    name: string;
    short_name: string;
    id: number;
    slug: string;
  };
  year?: {
    start: string;
    end: string;
    id: number;
  };
  course?: {
    name: string;
    degree: number;
    id: number;
  };
  semester?: {
    num: number;
    start: string;
    end: string;
    id: number;
  };
  faculty?: {
    img: string;
    name: string;
    short_name: string;
    id: number;
    slug: string;
  };
  group?: {
    name: string;
    short_name: string;
    id: number;
    slug: string;
  };
  teacher?: {
    degree: number;
    full_name: string;
    id: number;
    img: string;
    short_name: string;
    slug: string;
  };

}

