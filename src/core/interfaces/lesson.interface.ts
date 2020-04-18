import { TimetableTeacherInfoInterface } from 'src/core/interfaces/timetable-teacher-info.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

export interface ILesson {
  day?: number;
  dates: string[];
  format: number;
  link?: null | string;
  conduct_type?: string;
  housing: number | {
    id: number;
    name: string;
    short_name: string;
    location: null
  };
  id: number;
  lesson_time: number | ILessonTime;
  name_full: string;
  name_short: string;
  room: number | {
    id: number;
    num: string;
    floor: number;
  };
  subgroup: number | string;
  teachers: TimetableTeacherInfoInterface[];
  weeks: string;
  theme?: number;
  group?: {
    id: number;
    list: {name: string, short_name: string, slug: string}[];
    name: string;
    short_name: string;
    slug: string;
  };
  subgroups?: number | string;
}
