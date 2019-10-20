declare interface TimetableInterface {
  info: TimetableInfoInterface;
  lessons: LessonInterface[];
  periods: PeriodInterface[];
  lesson_time?: LessonTimeInterface[];
  show_numbers?: boolean;
  interface_type?: number;
  controls_exists?: boolean;
}
