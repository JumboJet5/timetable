import { LessonFormatInterface } from '../interfaces/lesson-format.interface';

export const lessonTypes: () => LessonFormatInterface[] = () => [
    {id: 0, class: 'lecture', name: 'лекція', shortName: 'л.'},
    {id: 1, class: 'seminar', name: 'семінар', shortName: 'сем.'},
    {id: 2, class: 'practice', name: 'практика', shortName: 'пр.'},
    {id: 3, class: 'lab', name: 'лабораторні', shortName: 'лаб.'},
    {id: 4, class: 'other', name: 'інше', shortName: ''},
];

export const degreeTypes: () => LessonFormatInterface[] = () => [
    {id: 0, class: 'bachelor', name: 'бакалавр', shortName: 'б.'},
    {id: 1, class: 'master', name: 'магістр', shortName: 'м.'},
    {id: 2, class: 'specialist', name: 'спеціаліст', shortName: 'сп.'},
    {id: 3, class: 'other', name: 'інше', shortName: ''},
];

export const lessonTypesMap = () => new Map(lessonTypes().map(i => [i.id, i]));

export const weekDays = () => ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];

export const dayMap = () => new Map(weekDays().map((day, index) => [index, day]));
export const degreeMap = () => new Map(degreeTypes().map((degree, index) => [index, degree]));

export const teacherDegreeTypesMap = new Map([
  [0, 'викл.'],
  [1, 'ст.\xa0в.'],
  [2, 'доц.'],
  [3, 'проф.'],
  [4, 'ас.'],
  [5, ''],
]);

export const teacherDegreesMap = () => new Map([
  [0, 'викладач'],
  [1, 'старший викладач'],
  [2, 'доцент'],
  [3, 'професор'],
  [4, 'асистент'],
  [5, 'інше'],
]);

export const controlTypesMap = () => new Map([
  [0, 'інше'],
  [1, 'екзамен'],
  [2, 'консультація'],
  [3, 'залік'],
  [4, 'захист кваліфікаційних робіт'],
  [5, 'комісія'],
  [6, 'практика'],
  [7, 'захист курсових робіт'],
  [8, 'перездача'],
]);
