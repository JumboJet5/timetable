import { LessonFormatInterface } from '../interfaces/lesson-format.interface';

export const lessonTypes: () => LessonFormatInterface[] = () => [
    {id: 0, class: 'lecture', name: 'лекція', shortName: 'л.'},
    {id: 1, class: 'seminar', name: 'семінар', shortName: 'сем.'},
    {id: 2, class: 'practice', name: 'практика', shortName: 'пр.'},
    {id: 3, class: 'lab', name: 'лабораторні', shortName: 'лаб.'},
    {id: 4, class: 'other', name: 'інше', shortName: ''},
];

export const lessonTypesMap = () => new Map(lessonTypes().map(i => [i.id, i]));

export const weekDays = () => ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];

export const dayMap = () => new Map(weekDays().map((day, index) => [index, day]));

export const teacherDegreeTypesMap = new Map([
  [0, 'викл.'],
  [1, 'ст.\xa0в.'],
  [2, 'доц.'],
  [3, 'проф.'],
  [4, 'ас.'],
  [5, ''],
]);
