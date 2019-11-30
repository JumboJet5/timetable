import { environment } from 'src/environments/environment';

const HOST = environment.host;
const API = HOST + environment.api;
export const TOKEN = 'dd02dd802fcc6145fab73e111a99f799fd28c5ce';

const valueOf = (value: string | number) => value || '';

const PAGINATION = (params: RequestParamInterface): string =>
  `&limit=${valueOf(params.pageSize)}&offset=${valueOf(params.pageSize * params.pageNumber)}`;
const SEARCH = (params: RequestParamInterface): string => `&search=${valueOf(params.search)}`;
const GROUP = (slug: string | number): string => `&group=${valueOf(slug)}`;
const HOUSING = (params: RoomsRequestParamInterface): string => `&housing=${valueOf(params.housingId)}`;

export const GET_NEW_TOKEN: string = HOST + '/api-token-auth/';
export const GET_GROUPS = (params: GroupsRequestParamInterface): string =>
  `${API}/groups/?${SEARCH(params)}${PAGINATION(params)}`;
export const GET_GROUP = (id: number): string => `${API}/groups/${id}/`;
export const GET_THEMES = (params: ThemesRequestParamInterface): string =>
  `${API}/themes/?${GROUP(params.groupId)}${PAGINATION(params)}`;
export const GET_THEME = (id: number): string => `${API}/themes/${id}/`;
export const GET_HOUSINGS = (params: HousingsRequestParamInterface): string =>
  `${API}/housings/?${GROUP(params.groupId)}${PAGINATION(params)}`;
export const GET_HOUSING = (id: number): string => `${API}/housings/${id}/`;
export const GET_ROOMS = (params: RoomsRequestParamInterface): string =>
  `${API}/rooms/?${HOUSING(params)}${PAGINATION(params)}`;
export const GET_ROOM = (id: number): string => `${API}/rooms/${id}/`;
export const GET_TEACHERS = (params: TeachersRequestParamInterface): string =>
  `${API}/teachers/?${SEARCH(params)}${GROUP(params.groupId)}${PAGINATION(params)}`;
export const GET_TEACHER = (id: number): string => `${API}/teachers/${id}/`;
export const GET_TIMETABLE_LIST = (slug: string) => `${API}/timetable/?${GROUP(slug)}`;
export const GET_LESSON = (id: number): string => `${API}/lessons/${id}/`;
export const GET_GROUPSEMESTER = (groupId: number, semesterId: number): string =>
    `${API}/groupsemester/?group=${groupId}&semester=${semesterId}`;
export const CREATE_LESSON = `${API}/lessons/`;
export const UPDATE_LESSON = (id: number) => `${API}/lessons/${id}/`;
export const DELETE_LESSON = UPDATE_LESSON;
