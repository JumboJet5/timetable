const HOST = 'https://api.mytimetable.live/rest';

const valueOf = (value: string | number) => value || '';

const PAGINATION = (params: RequestParamInterface): string =>
  `&limit=${valueOf(params.pageSize)}&offset=${valueOf(params.pageSize * params.pageNumber)}`;
const SEARCH = (params: RequestParamInterface): string => `&search=${valueOf(params.search)}`;
const GROUP = (slug: string): string => `&group=${valueOf(slug)}`;

export const GET_GROUPS = (params: GroupsRequestParamInterface): string =>
  `${HOST}/groups/?${SEARCH(params)}${PAGINATION(params)}`;
export const GET_GROUP = (id: number): string => `${HOST}/groups/${id}/`;
export const GET_TIMETABLE_LIST = (slug: string) => `${HOST}/timetable/?${GROUP(slug)}`;
export const GET_LESSON = (id: number): string => `${HOST}/lessons/${id}/`;
