import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class FormatService {

  constructor() { }

  public isDifferentSubgroups(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
    return !!lesson1.subgroup && !!lesson2.subgroup && lesson1.subgroup !== lesson2.subgroup;
  }

  public isSameName(lesson1: LessonInterface, lesson2: LessonInterface): boolean {
    return !lesson1.subgroup && !lesson2.subgroup && lesson1.name_full === lesson2.name_full;
  }

  public unificationOptions(array: OptionInterface[], sortByField: string): void {
    const sortedCopy = [...array.sort((first, second) =>
      first[sortByField] ? first[sortByField].localeCompare(second[sortByField]) : first[sortByField] === second[sortByField])];
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
}
