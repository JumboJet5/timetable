import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
// @ts-ignore
import { weekDays } from 'src/core/const/collections';

@Injectable({
    providedIn: 'root',
})
export class FormatService {

    public weekDays = weekDays;

    constructor() { }

    public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
        control = control || (formGroup ? formGroup.get(controlName) : undefined);
        return control && (control.valid || control.untouched);
    }

    public getControlError(formGroup: FormGroup, controlName: string): string {
        const control = formGroup ? formGroup.get(controlName) : undefined;
        return this.isControlValid(formGroup, controlName, control) ? '' : control.errors.custom;
    }

    public getFormDataFromObject(obj: object): FormData {
        const formData = new FormData();
        Object.keys(obj).forEach(key => {
            if (obj[key] instanceof Array) obj[key].forEach(item => formData.append(key, item !== null && item !== undefined ? item : ''));
            else formData.append(key, obj[key] !== null && obj[key] !== undefined ? obj[key] : '');
        });
        return formData;
    }

    public isDifferentSubgroups(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
        return !!lesson1 && !!lesson2 && !!lesson1.subgroup && !!lesson2.subgroup && lesson1.subgroup !== lesson2.subgroup;
    }

    public isSameName(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
        return !!lesson1 && !!lesson2 && !lesson1.subgroup && !lesson2.subgroup && lesson1.name_full === lesson2.name_full;
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

    public getVacantWeeks(groupSchedule: TimetableInterface, weekSchedule: LessonInterface[][][], lessonTimes: LessonTimeInterface[],
                          day: number, timeId: number, lesson?: LessonInterface): VacantWeekInfoInterface[] {
        const timeIndex = lessonTimes.findIndex(time => time.id === timeId);
        const associatedLessons = (weekSchedule[timeIndex][day] || []).filter(aLesson => !lesson || lesson.id !== aLesson.id);
        const firstDate = new Date((groupSchedule.periods.find(period => period.kind === 0) || {start: ''}).start);
        const lastDate = new Date((groupSchedule.periods.find(period => period.kind === 0) || {end: ''}).end);
        return new Array(20).fill(true)
                            .map((week, index) => this._getVacantWeekInfo(associatedLessons, index, firstDate, lastDate, day, lesson));
    }

    private _getVacantWeekInfo(associatedLessons: LessonInterface[], index: number, firstDate: Date, lastDate: Date,
                               day: number, concreteLesson: LessonInterface): VacantWeekInfoInterface {
        const currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + index * 7 + day);
        return {
            date: currentDate,
            isUsed: concreteLesson && concreteLesson.weeks.split('')[index] === '1',
            isVacant: associatedLessons.every(associatedLesson => this._isWeekVacant(associatedLesson, index, concreteLesson)),
            isHidden: currentDate.getTime() > lastDate.getTime(),
        };
    }

    private _isWeekVacant(associatedLesson: LessonInterface, index: number, lesson?: LessonInterface): boolean {
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
