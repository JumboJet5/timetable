export interface IRequestParams extends IPaginationParams, IFilterParams {}

export interface IPaginationParams {
  offset?: number;
  limit?: number;
}

export interface IFilterParams {
  universityId?: number;
  group?: number;
  housing?: number;
  facultyId?: number;
  degreeId?: number | string;
  specialtyId?: number;
  search?: string;
}
