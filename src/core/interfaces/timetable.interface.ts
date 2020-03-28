import { ITimetableInfo } from 'src/core/interfaces/timetable-info.interface';
import { IPeriod } from './period.interface';
import { ISimplifiedLessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ILesson } from 'src/core/interfaces/lesson.interface';

export interface ITimetable {
  info: ITimetableInfo;
  lessons: ILesson[];
  periods: IPeriod[];
  lesson_time?: ISimplifiedLessonTime[];
  show_numbers?: boolean;
  interface_type?: number;
  controls_exists?: boolean;
}
