export interface IRequestParams extends IPaginationParams, IFilterParams {}

export interface IPaginationParams {
  offset?: number;
  limit?: number;
}

export interface IFilterParams {
  univ?: number | string;
  group?: number;
  group_slug?: string;
  housing?: number;
  faculty?: number | string;
  degreeId?: number | string;
  specialty?: number | string;
  search?: string;
  ordering?: string;
  visible?: boolean;
  semester?: string;
  year?: number;
}
