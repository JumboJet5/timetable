export interface ICreateLessonBody {
    theme: number;
    format: number;
    teachers: string | string[];
    room: number;
    weeks: string;
    lesson_time: number;
    day: number;
    group_semester: number;
}
