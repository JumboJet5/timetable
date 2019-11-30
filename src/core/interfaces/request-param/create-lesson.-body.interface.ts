declare interface ICreateLessonBody {
    theme: string;
    format: string;
    teachers: string | string[];
    room: string;
    weeks: string;
    lesson_time: string;
    day: string;
    group_semester: string;
}
