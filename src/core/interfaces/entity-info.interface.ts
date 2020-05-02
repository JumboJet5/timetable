import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { IRoom } from 'src/core/interfaces/room.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

export interface IEntityInfo {
  type: EntityTypesEnum;
  entity: IFaculty | ISpecialty | ICourse | IGroup | ILessonTime | ITheme | ISemester | IHousing | IRoom;
}

export enum EntityTypesEnum {
  FACULTY = 'FACULTY',
  SPECIALTY = 'SPECIALTY',
  COURSE = 'COURSE',
  GROUP = 'GROUP',
  LESSONTIME = 'LESSONTIME',
  THEME = 'THEME',
  SEMESTER = 'SEMESTER',
  HOUSING = 'HOUSING',
  ROOM = 'ROOM',
}