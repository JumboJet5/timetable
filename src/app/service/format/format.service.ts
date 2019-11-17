import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
// @ts-ignore
import { weekDays } from 'src/core/const/collections';

@Injectable()
export class FormatService {

    public weekDays = weekDays;

    constructor() { }

    public isDifferentSubgroups(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
        return !!lesson1.subgroup && !!lesson2.subgroup && lesson1.subgroup !== lesson2.subgroup;
    }

    public isSameName(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
        return !lesson1.subgroup && !lesson2.subgroup && lesson1.name_full === lesson2.name_full;
    }

    public unificationOptions(array: OptionInterface[], sortByField: string): void {
        const sortedCopy = [...array.sort((first, second) => this._compareOptions(first, second, sortByField))];
        array.splice(0, array.length);
        array.push(...sortedCopy.filter((item, index, arr) => !arr[index + 1] || item.id !== arr[index + 1].id));
    }

    public isOptionSearched(option: OptionInterface, search: string): boolean {
        return option.name.includes(search) || option.short_name.includes(search) || option.slug.includes(search);
    }

    public unsubscribeFromAllSubscriptions(subscriptions: Subscription[]): void {
        subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : undefined);
    }

    public getLessonDay(lesson: LessonInterface) {
        return lesson.dates && lesson.dates.length ? new Date(lesson.dates[0]).getDay() - 1 : -1;
    }

    public initSchedule(schedule: TimetableInterface): [LessonTimeInterface[], LessonInterface[][][]] {
        const week = schedule.lesson_time.map(() => this.weekDays().map(() => []));
        schedule.lessons.forEach(lesson => this._addLessonToSchedule(lesson, schedule.lesson_time, week));
        return [schedule.lesson_time, week];
    }

    public getVacantWeeks(groupSchedule: TimetableInterface, weekSchedule: LessonInterface[][][],
                          lessonTimes: LessonTimeInterface[], lesson: LessonInterface): VacantWeekInfoInterface[] {
        const timeIndex = lessonTimes.findIndex(time => time.id === lesson.lesson_time);
        const associatedLessons = (weekSchedule[timeIndex][lesson.day] || []).filter(aLesson => lesson.id !== aLesson.id);
        const firstDate = new Date((groupSchedule.periods.find(period => period.kind === 0) || {start: ''}).start);
        const lastDate = new Date((groupSchedule.periods.find(period => period.kind === 0) || {end: ''}).end);
        return new Array(20).fill(true)
                            .map((week, index) => this._getVacantWeekInfo(associatedLessons, lesson, index, firstDate, lastDate));
    }

    private _getVacantWeekInfo(associatedLessons: LessonInterface[], lesson: LessonInterface,
                               index: number, firstDate: Date, lastDate: Date): VacantWeekInfoInterface {
        const currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + index * 7 + lesson.day);
        return {
            date: currentDate,
            isUsed: lesson.weeks.split('')[index] === '1',
            isVacant: associatedLessons.every(associatedLesson => this._isWeekVacant(associatedLesson, index, lesson)),
            isHidden: currentDate.getTime() > lastDate.getTime(),
        };
    }

    private _isWeekVacant(associatedLesson: LessonInterface, index: number, lesson: LessonInterface): boolean {
        return associatedLesson.weeks.split('')[index] === '0' || this.isDifferentSubgroups(associatedLesson, lesson)
            || this.isSameName(associatedLesson, lesson);
    }

    private _compareOptions(first: OptionInterface, second: OptionInterface, byField: string): number {
        return first[byField] ? first[byField].localeCompare(second[byField]) : first[byField] === second[byField];
    }

    private _addLessonToSchedule(lesson: LessonInterface, lessonTimes: LessonTimeInterface[], week: LessonInterface[][][]) {
        const day = this.getLessonDay(lesson);
        const index = lessonTimes.findIndex(time => time.id === lesson.lesson_time);
        if (index > -1 && day > -1) week[index][day].push(lesson);
    }
}
