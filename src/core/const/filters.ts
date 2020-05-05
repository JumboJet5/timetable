import { IFilterConfig } from 'src/core/interfaces/filter-config.interface';

export const SPECIALTIES_FILTER_CONFIG: IFilterConfig = {withCourse: true, withSpecialty: true, withFaculty: true};
export const FACULTIES_FILTER_CONFIG: IFilterConfig = {withCourse: false, withSpecialty: false, withFaculty: true};
export const UNIVERSITIES_FILTER_CONFIG: IFilterConfig = {withCourse: false, withSpecialty: false, withFaculty: false};
