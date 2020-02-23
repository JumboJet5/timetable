import { teacherDegreeTypesMap } from '@const/collections';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { ILesson } from 'src/core/interfaces/lesson.interface';
import { TimetableTeacherInfoInterface } from 'src/core/interfaces/timetable-teacher-info.interface';

export class Lesson implements ILesson {
  public day: number;
  public dates: string[];
  public format: number;
  public housing: number | { id: number; name: string; short_name: string; location: null };
  public id: number;
  public lesson_time: number | ILessonTime;
  public name_full: string;
  public name_short: string;
  public room: number | { id: number; num: string; floor: number };
  public subgroup: number | string;
  public teachers: TimetableTeacherInfoInterface[];
  public weeks: string;

  constructor(lesson: ILesson) {
    Object.assign(this, lesson);
    this.day = this._getDay();
  }

  public isWeekVacant(associatedLesson: Lesson, index: number): boolean {
    return this.isVacantByWeek(index) || this._hasLessonDifferentSubgroup(associatedLesson)
      || this._isLessonSimilar(associatedLesson);
  }

  public hasLessonsInsertConflicts(that: Lesson): boolean {
    return (this._hasLessonsScheduleConflicts(that) || !this._hasLessonDifferentRooms(that))
      && !this._hasLessonDifferentSubgroup(that) && !this._isLessonSimilar(that);
  }

  public getLessonWeekSchedule(): boolean[] {
    return this.weeks.split('').map(week => !!+week);
  }

  public isVacantByWeek(index: number): boolean {
    return this.weeks.split('')[index] === '0';
  }

  public getWeeksAsString(): string {
    return this.getLessonWeekSchedule()
      .reduce((weeksSequence, isLesson, index, weeksBool) => {
        switch (true) {
          case isLesson && !weeksSequence:
            return weeksSequence = (index + 1).toString();
          case isLesson && !weeksBool[index - 1]:
            return weeksSequence + ', ' + (index + 1);
          case isLesson && index === weeksBool.length - 1:
            return weeksSequence + '-' + (index + 1);
          case !isLesson && weeksBool[index - 1] && weeksBool[index - 2]:
            return weeksSequence + '-' + index;
          default:
            return weeksSequence;
        }
      }, '');
  }

  public getTeachersInfoString(): string {
    return this.teachers.map(
      teacher => `${teacherDegreeTypesMap.get(teacher.degree) || ''}\xa0${teacher.short_name}`).join(', ');
  }

  public getLocation(): string {
    const housing = !!this.housing && typeof this.housing === 'object' ? `${this.housing.short_name}-` : '';
    return !!this.room && typeof this.room === 'object' ? housing + this.room.num : '-';
  }

  private _hasLessonDifferentSubgroup(that: Lesson): boolean {
    return !!that && !!this.subgroup && !!that.subgroup && this.subgroup !== that.subgroup;
  }

  private _hasLessonDifferentRooms(that: Lesson): boolean {
    const bothNumbersSame = typeof this.room === 'number' && typeof that.room === 'number' && this.room === that.room;
    const bothObjectsSame = typeof this.room === 'object' && typeof that.room === 'object' && this.room.id === that.room.id;
    const objectNumberSame = typeof this.room === 'object' && typeof that.room === 'number' && this.room.id === that.room;
    const numberObjectSame = typeof this.room === 'number' && typeof that.room === 'object' && this.room === that.room.id;
    return !bothNumbersSame && !bothObjectsSame && !objectNumberSame && !numberObjectSame;
  }

  private _isLessonSimilar(that: Lesson): boolean {
    return that && (this.id === that.id || (!this.subgroup && !that.subgroup
      && this.name_full === that.name_full && this._hasDifferentTeachers(that)));
  }

  private _getDay(): number {
    if (this.dates && this.dates.length) return new Date(this.dates[0]).getDay() - 1;
    return undefined;
  }

  private _hasLessonsScheduleConflicts(that: Lesson): boolean {
    const thisWeeks = this.getLessonWeekSchedule();
    const thatWeeks = that.getLessonWeekSchedule();
    return thisWeeks.some((week, index) => week && thatWeeks[index]);
  }

  private _hasDifferentTeachers(that: Lesson): boolean {
    return !!that && this.teachers.map(item => item.id).toString() !== that.teachers.map(item => item.id).toString();
  }
}
