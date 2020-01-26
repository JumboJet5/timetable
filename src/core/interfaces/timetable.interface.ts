declare interface ITimetable {
  info: ITimetableInfo;
  lessons: ILesson[];
  periods: IPeriod[];
  lesson_time?: ILessonTime[];
  show_numbers?: boolean;
  interface_type?: number;
  controls_exists?: boolean;
}
