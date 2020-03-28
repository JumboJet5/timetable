import { environment } from 'src/environments/environment';

const HOST = environment.host;
const API = HOST + environment.api;

export const NEW_TOKEN: string = HOST + '/api-token-auth/';

export const GROUPS = API + '/groups/';
export const GROUP = (id: number | string): string => `${GROUPS}${id}/`;

export const THEMES = API + '/themes/';
export const THEME = (id: number): string => `${THEMES}${id}/`;

export const HOUSINGS = API + '/housings/';
export const HOUSING = (id: number): string => `${HOUSINGS}${id}/`;

export const ROOMS = API + '/rooms/';
export const ROOM = (id: number): string => `${ROOMS}${id}/`;

export const TEACHERS = API + '/teachers/';
export const TEACHER = (id: number): string => `${TEACHERS}${id}/`;

export const LESSONS = API + '/lessons/';
export const LESSON = (id: number): string => `${LESSONS}${id}/`;

export const COURSES = API + '/courses/';
export const COURSE = (id: number): string => `${COURSES}${id}/`;

export const SPECIALTIES = API + '/specialties/';
export const SPECIALTY = (id: number): string => `${SPECIALTIES}${id}/`;

export const FACULTIES = API + '/faculties/';
export const FACULTY = (id: number): string => `${FACULTIES}${id}/`;

export const UNIVERSITIES = API + '/universities/';
export const UNIVERSITY = (id: number): string => `${UNIVERSITIES}${id}/`;

export const SEMESTERS = API + '/semesters/';
export const SEMESTER = (id: number): string => `${SEMESTERS}${id}/`;

export const LESSON_TIMES = API + '/lessontime/';
export const LESSON_TIME = (id: number): string => `${LESSON_TIMES}${id}/`;

export const TIMETABLE = API + '/timetable/';

export const GROUPSEMESTER = API + '/groupsemester/';
