import { ITimetableInfo } from 'src/core/interfaces/timetable-info.interface';
import { IPeriod } from './period.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ILesson } from 'src/core/interfaces/lesson.interface';

export interface ITimetable {
  info: ITimetableInfo;
  lessons: ILesson[];
  periods: IPeriod[];
  lesson_time?: ILessonTime[];
  show_numbers?: boolean;
  interface_type?: number;
  controls_exists?: boolean;
}
