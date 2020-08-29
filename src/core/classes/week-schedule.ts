import { dayMap, weekDays } from '@const/collections';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ILesson } from 'src/core/interfaces/lesson.interface';
import { IPeriod } from '../interfaces/period.interface';
import { ITimetable } from '../interfaces/timetable.interface';
import { VacantWeekInfoInterface } from '../interfaces/vacant-week-info.interface';
import { Lesson } from './lesson';

export class WeekSchedule {
  private _daysScheduleMap: Map<string, Map<number, Lesson[]>> = new Map();
  private _days: string[] = weekDays();
  private readonly _schedule: ITimetable;
  private readonly _period: IPeriod = {end: undefined, id: undefined, kind: undefined, start: undefined};

  constructor(schedule?: ITimetable) {
    if (!schedule) return;

    schedule.lessons.forEach(lesson => this.insertLesson(lesson));
    this._schedule = schedule;
    this._period = schedule.periods.find(period => period.kind === 0) || this._period;
    this._days.forEach(day => schedule.lesson_time
      .forEach(time => this.sortLessons(this._getCellByDayAndTime(day, time.id))));
  }

  public getSchedule(): ITimetable {
    return this._schedule;
  }

  public getScheduleTimes(): ILessonTime[] {
    return this._schedule && this._schedule.lesson_time || [];
  }

  public getSchedulePeriod(): IPeriod {
    return this._period;
  }

  public getScheduleDays(): string[] {
    return weekDays();
  }

  public getScheduleGroup(): { name: string; short_name: string; id: number; slug: string } {
    return this._schedule && this._schedule.info ? this._schedule.info.group : undefined;
  }

  public getScheduleGroupId(): number {
    return (this.getScheduleGroup() || {id: undefined}).id;
  }

  public getScheduleSemesterId(): number {
    return this._schedule && this._schedule.info && this._schedule.info.semester ? this._schedule.info.semester.id : undefined;
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
    return true; // todo remove temporary week vacant filter
    // const lessons = this.getConcreteLessons(day, timeId);
    // return lessons.every(item => lesson.hasLessonsInsertConflicts(item));
  }

  public insertLesson(lessonInfo: ILesson): boolean {
    const lesson = new Lesson(lessonInfo);
    if (this.canLessonBeInserted(this._days[lesson.day], lesson.lesson_time as number, lesson))
      return this._addLesson(this._days[lesson.day], lesson.lesson_time as number, lesson);
    return false;
  }

  public getDateByWeekIndexAndDay(index: number, day: number) {
    const firstDateOfSemester = new Date(this.getSchedulePeriod().start);
    const year = firstDateOfSemester.getFullYear();
    const month = firstDateOfSemester.getMonth();
    const dayOffset = day - firstDateOfSemester.getDay() + 1;
    const firstDateOfSemesterByDayNumber = firstDateOfSemester.getDate() + dayOffset;
    return new Date(year, month, firstDateOfSemesterByDayNumber + index * 7);
  }

  public sortLessons(array: Lesson[]): Lesson[] {
    return array.sort((l1, l2) => {
      if (l1.format !== l2.format) return l1.format - l2.format;
      if (l1.name_full !== l2.name_full) return l1.name_full > l2.name_full ? 1 : -1;
      if (l1.getWeeksAsString() !== l2.getWeeksAsString()) return l1.weeks > l2.weeks ? 1 : -1;
      if (!!l1.subgroup && !!l2.subgroup && l1.subgroup !== l2.subgroup) return (+l1.subgroup) - (+l2.subgroup);
      return 0;
    });
  }

  public isLessonAdditional(lesson: Lesson, associativeLessons: Lesson[]): boolean {
    const mainLesson = associativeLessons.find(item => item.format === lesson.format
      && item.name_full === lesson.name_full && item.getWeeksAsString() === lesson.getWeeksAsString());
    return mainLesson !== lesson;
  }

  public hasLessonConflictsWithAssociative(lesson: Lesson, associativeLessons: Lesson[]): boolean {
    return associativeLessons.some(item => item.hasLessonsInsertConflicts(lesson));
  }

  private _getVacantWeekInfo(concreteLesson: Lesson, day: number,
                             timeId: number, weekIndex: number): VacantWeekInfoInterface {
    const fistDate = new Date(this.getSchedulePeriod().start);
    const lastDate = new Date(this.getSchedulePeriod().end);
    const startOffset = new Date(fistDate).getTimezoneOffset() * 60000;
    const endOffset = new Date(lastDate).getTimezoneOffset() * 60000;
    const firstTime = fistDate.getTime() + startOffset;
    const lastTime = lastDate.getTime() + endOffset;
    // todo remove temporary week vacant filter
    const date = this.getDateByWeekIndexAndDay(weekIndex, day);
    return {
      date,
      isUsed: !!concreteLesson && !concreteLesson.isVacantByWeek(weekIndex),
      isVacant: true,
      isConflicted: this.getAssociativeLessons(dayMap().get(day), timeId, concreteLesson)
        .every(associatedLesson => associatedLesson.isWeekVacant(concreteLesson, weekIndex)),
      isHidden: date.getTime() < firstTime || date.getTime() > lastTime,
    };
  }

  private _addLesson(day: string, timeId: number, lesson: Lesson): boolean {
    this._getCellByDayAndTime(day, timeId).push(lesson);
    return true;
  }

  private _getCellByDayAndTime(day: string, timeId: number): Lesson[] {
    if (!this._daysScheduleMap.has(day)) this._daysScheduleMap.set(day, new Map<number, Lesson[]>());
    const dayScheduleMap = this._daysScheduleMap.get(day);
    if (!dayScheduleMap.has(timeId)) dayScheduleMap.set(timeId, []);
    return dayScheduleMap.get(timeId);
  }
}
