export interface ILessonTime extends ISimplifiedLessonTime {
  url: string;
  __unicode__: string;
  faculty: number;
}

export interface ISimplifiedLessonTime extends  IOverSimplifiedLessonTime {
  half_end: string;
  half_start: string;
  has_break: boolean;
}

export interface IOverSimplifiedLessonTime {
  end: string;
  id: number;
  num: number;
  start: string;
}
