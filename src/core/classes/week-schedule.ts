import { dayMap, weekDays } from '../const/collections';
import { Lesson } from './lesson';

export class WeekSchedule {
  private _daysScheduleMap: Map<string, Map<number, Lesson[]>> = new Map();
  private readonly _lessonTimes: ILessonTime[] = [];
  private readonly _scheduleInfo: ITimetableInfo;
  private readonly _periods: IPeriod = {end: undefined, id: undefined, kind: undefined, start: undefined};

  constructor(schedule?: ITimetable) {
    if (schedule) {
      const days = weekDays();
      schedule.lessons.forEach(item => {
        const lesson = new Lesson(item);
        return this.insertLesson(days[lesson.day], lesson.lesson_time as number, lesson);
      });
      this._lessonTimes = schedule.lesson_time || [];
      this._scheduleInfo = schedule.info;
      console.log(schedule);
      this._periods = schedule.periods.find(period => period.kind === 0) || this._periods;
      console.log(this._periods);
    }
  }

  public getScheduleTimes(): ILessonTime[] {
    return this._lessonTimes;
  }

  public getSchedulePeriod(): IPeriod {
    return this._periods;
  }

  public getScheduleDays(): string[] {
    return weekDays();
  }

  public getScheduleGroupId(): number {
    return this._scheduleInfo && this._scheduleInfo.group ? this._scheduleInfo.group.id : undefined;
  }

  public getScheduleSemesterId(): number {
    return this._scheduleInfo && this._scheduleInfo.semester ? this._scheduleInfo.semester.id : undefined;
  }

  public hasConcreteLessons(day: string, timeId: number): boolean {
    return this._daysScheduleMap.has(day) && this._daysScheduleMap.get(day).has(timeId);
  }

  public getConcreteLessons(day: string, timeId: number): Lesson[] {
    if (this.hasConcreteLessons(day, timeId)) return this._daysScheduleMap.get(day).get(timeId);
    return [];
  }

  public removeLesson(day: string, timeId: number, lesson: Lesson): void {
    const lessons = this.getConcreteLessons(day, timeId);
    if (lessons.includes(lesson)) lessons.splice(lessons.indexOf(lesson), 1);
  }

  public getVacantWeeks(lesson: Lesson, day: number, timeId: number): VacantWeekInfoInterface[] {
    return new Array(20).fill(true)
      .map((_, index) => this._getVacantWeekInfo(lesson, day, timeId, index));
  }

  public getAssociativeLessons(day: string, timeId: number, lesson: Lesson): Lesson[] {
    return this.getConcreteLessons(day, timeId)
      .filter(item => item !== lesson);
  }

  public canLessonBeInserted(day: string, timeId: number, lesson: Lesson): boolean {
    const lessons = this.getConcreteLessons(day, timeId);
    return lessons.every(item => lesson.hasLessonsInsertConflicts(item));
  }

  public insertLesson(day: string, timeId: number, lesson: Lesson): boolean {
    if (this.canLessonBeInserted(day, timeId, lesson)) return this._addLesson(day, timeId, lesson);
    return false;
  }

  public getDateByWeekIndexAndDay(index: number, day: number) {
    const firstDate = new Date(this.getSchedulePeriod().start);
    return new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + index * 7 + day);
  }

  private _getVacantWeekInfo(concreteLesson: Lesson, day: number, timeId: number, weekIndex: number): VacantWeekInfoInterface {
    const lastDate = new Date(this.getSchedulePeriod().end);
    return {
      date: this.getDateByWeekIndexAndDay(weekIndex, day),
      isUsed: !!concreteLesson && !concreteLesson.isVacantByWeek(weekIndex),
      isVacant: this.getAssociativeLessons(dayMap().get(day), timeId, concreteLesson)
        .every(associatedLesson => associatedLesson.isWeekVacant(concreteLesson, weekIndex)),
      isHidden: this.getDateByWeekIndexAndDay(weekIndex, day).getTime() > lastDate.getTime(),
    };
  }

  private _addLesson(day: string, timeId: number, lesson: Lesson): boolean {
    if (!this._daysScheduleMap.has(day)) this._daysScheduleMap.set(day, new Map<number, Lesson[]>());
    const dayScheduleMap = this._daysScheduleMap.get(day);
    if (!dayScheduleMap.has(timeId)) dayScheduleMap.set(timeId, []);
    dayScheduleMap.get(timeId).push(lesson);
    return true;
  }
}
