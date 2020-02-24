import { environment } from 'src/environments/environment';

const HOST = environment.host;
const API = HOST + environment.api;

export const NEW_TOKEN: string = HOST + '/api-token-auth/';

export const GROUPS = API + '/groups/';
export const GROUP = (id: number): string => `${GROUPS}${id}/`;

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

export const UNIVERSITIES = API + '/universities/';
export const UNIVERSITY = (id: number): string => `${UNIVERSITIES}${id}/`;

export const TIMETABLE = API + '/timetable/';

export const GROUPSEMESTER = API + '/groupsemester/';
