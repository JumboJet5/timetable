import { IFilterConfig } from 'src/core/interfaces/filter-config.interface';

export const GROUPS_FILTER_CONFIG: IFilterConfig = {withGroup: true, withCourse: true, withSpecialty: true, withFaculty: true};
export const COURSES_FILTER_CONFIG: IFilterConfig = {withGroup: false, withCourse: true, withSpecialty: true, withFaculty: true};
export const SPECIALTIES_FILTER_CONFIG: IFilterConfig = {withGroup: false, withCourse: false, withSpecialty: true, withFaculty: true};
export const FACULTIES_FILTER_CONFIG: IFilterConfig = {withGroup: false, withCourse: false, withSpecialty: false, withFaculty: true};
export const UNIVERSITIES_FILTER_CONFIG: IFilterConfig = {withGroup: false, withCourse: false, withSpecialty: false, withFaculty: false};
