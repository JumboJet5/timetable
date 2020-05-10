import { IControl } from 'src/core/interfaces/control.interface';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IGroup } from 'src/core/interfaces/group.interface';
import { IHousing } from 'src/core/interfaces/housing.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import { IPeriod } from 'src/core/interfaces/period.interface';
import { IRoom } from 'src/core/interfaces/room.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import { ITeacher } from 'src/core/interfaces/teacher.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';
import { IYear } from 'src/core/interfaces/year.interface';

export interface IEntityInfo {
  type: EntityTypesEnum;
  entity: IFaculty | ISpecialty | ICourse | IGroup | ILessonTime | ITheme
    | IYear | ISemester | IPeriod | IHousing | IRoom | ITeacher | IControl;
}

export enum EntityTypesEnum {
  FACULTY = 'FACULTY',
  SPECIALTY = 'SPECIALTY',
  COURSE = 'COURSE',
  GROUP = 'GROUP',
  LESSONTIME = 'LESSONTIME',
  THEME = 'THEME',
  YEAR = 'YEAR',
  SEMESTER = 'SEMESTER',
  PERIOD = 'PERIOD',
  HOUSING = 'HOUSING',
  ROOM = 'ROOM',
  TEACHER = 'TEACHER',
  CONTROL = 'CONTROL',
}
