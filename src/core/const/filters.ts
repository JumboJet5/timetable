import { IFilterConfig } from 'src/core/interfaces/filter-config.interface';

export const GROUPS_FILTER_CONFIG: IFilterConfig = {withCourse: true, withSpecialty: true, withFaculty: true};
export const SPECIALTIES_FILTER_CONFIG: IFilterConfig = {withCourse: false, withSpecialty: false, withFaculty: true};
