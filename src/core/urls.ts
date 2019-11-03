const HOST = 'https://api.mytimetable.live/rest';

const valueOf = (value: string | number) => value || '';

const PAGINATION = (params: RequestParamInterface): string =>
  `&limit=${valueOf(params.pageSize)}&offset=${valueOf(params.pageSize * params.pageNumber)}`;
const SEARCH = (params: RequestParamInterface): string => `&search=${valueOf(params.search)}`;
const GROUP = (slug: string | number): string => `&group=${valueOf(slug)}`;
const HOUSING = (params: RoomsRequestParamInterface): string => `&housing=${valueOf(params.housingId)}`;

export const GET_GROUPS = (params: GroupsRequestParamInterface): string =>
  `${HOST}/groups/?${SEARCH(params)}${PAGINATION(params)}`;
export const GET_GROUP = (id: number): string => `${HOST}/groups/${id}/`;
export const GET_THEMES = (params: ThemesRequestParamInterface): string =>
  `${HOST}/themes/?${GROUP(params.groupId)}${PAGINATION(params)}`;
export const GET_THEME = (id: number): string => `${HOST}/themes/${id}/`;
export const GET_HOUSINGS = (params: HousingsRequestParamInterface): string =>
  `${HOST}/housings/?${GROUP(params.groupId)}${PAGINATION(params)}`;
export const GET_HOUSING = (id: number): string => `${HOST}/housings/${id}/`;
export const GET_ROOMS = (params: RoomsRequestParamInterface): string =>
  `${HOST}/rooms/?${HOUSING(params)}${PAGINATION(params)}`;
export const GET_ROOM = (id: number): string => `${HOST}/rooms/${id}/`;
export const GET_TEACHERS = (params: TeachersRequestParamInterface): string =>
  `${HOST}/teachers/?${SEARCH(params)}${GROUP(params.groupId)}${PAGINATION(params)}`;
export const GET_TEACHER = (id: number): string => `${HOST}/teachers/${id}/`;
export const GET_TIMETABLE_LIST = (slug: string) => `${HOST}/timetable/?${GROUP(slug)}`;
export const GET_LESSON = (id: number): string => `${HOST}/lessons/${id}/`;
