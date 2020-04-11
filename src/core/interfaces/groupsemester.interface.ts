import { IOverSimplifiedLessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ISimplifiedTheme } from 'src/core/interfaces/theme.interface';

export interface IGroupsemester {
  id: number;
  url: string;
  group: number;
  semester: number;
  themes: ISimplifiedTheme[];
  show_lessons_number: boolean;
  lessons_time: IOverSimplifiedLessonTime[];
  last_modified: string;
}

export interface IGroupsemesterSimplified {
  id: number;
  url: string;
  group: number;
  semester: number;
  themes: number[];
  show_lessons_number: boolean;
  lessons_time: number[];
  last_modified: string;
}
