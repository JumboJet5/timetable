import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';

@Component({
    selector: 'app-week-schedule',
    templateUrl: './week-schedule.component.html',
    styleUrls: ['./week-schedule.component.scss'],
})
export class WeekScheduleComponent implements OnInit {
    public isDragging = false;
    public weekDays = this.formatService.weekDays();
    public lessonTimes: LessonTimeInterface[] = [];
    public week: LessonInterface[][][] = [];
    public clipboard: LessonInterface;
    public groupIdControl: FormControl = new FormControl(undefined);
    public isLoading = false;
    private _groupSlug: string;
    private _groupsemester: number;

    private _groupSchedule: TimetableInterface;

    private get groupSchedule(): TimetableInterface {
        return this._groupSchedule;
    }

    private set groupSchedule(value: TimetableInterface) {
        this._groupSchedule = value;
        [this.lessonTimes, this.week] = this.formatService.initSchedule(value);
    }

    constructor(private scheduleService: ScheduleService,
                private lessonService: LessonService,
                private route: ActivatedRoute,
                private formatService: FormatService,
                private router: Router) {
    }

    public ngOnInit(): void {
        this._updatePage();
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd && !/\(modal/.test(event.url)))
            .subscribe(() => this._updatePage());
    }

    public loadGroups = (option: LoadPageInterface): Observable<GroupsResponseInterface> => this.scheduleService.getGroups({...option});

    public loadGroup = (id: number): Observable<GroupInterface> => this.scheduleService.getGroup(id);

    public changeSlug(event: OptionInterface[]) {
        if (event && event.length) this.router.navigate(['dashboard', 'lessons-schedule', event[0].slug, event[0].id]);
    }

    public openLessonDetail(lesson: LessonInterface, associatedLessons: LessonInterface[]) {
        const state = {associatedLessons, groupSchedule: this._groupSchedule, groupsemester: this._groupsemester};
        this.router.navigate([{outlets: {modal: ['modal', 'lesson', lesson.id, this._groupSlug]}}], {state: {state}});
    }

    public openAddLessonModal(time: number, day: number) {
        const state = {day, time: this.lessonTimes[time].id, groupSchedule: this._groupSchedule, groupsemester: this._groupsemester};
        this.router.navigate([{outlets: {modal: ['modal', 'lesson', this._groupSlug]}}], {state: {state}});
    }

    public delete(lessonId: number) {
        this.isLoading = true;
        this.scheduleService.deleteLesson(lessonId)
            .subscribe(() => this._updatePage());
    }

    public moveLesson(lessonId: number, time: number, day: number) {
        this.isLoading = true;
        this.lessonService.getLesson(lessonId)
            .pipe(switchMap(lesson => this.scheduleService.updateLesson({
                theme: lesson.theme.toString(),
                format: lesson.format.toString(),
                weeks: lesson.weeks,
                room: lesson.room.toString(),
                teachers: lesson.teachers.map(teacher => teacher.toString()),
                lesson_time: this.lessonTimes[time].id.toString(),
                day: day.toString(),
                group_semester: this._groupsemester.toString(),
            }, lesson.id)))
            .subscribe(() => this._updatePage());
    }

    public pasteLesson(time: number, day: number) {
        this.isLoading = true;
        this.lessonService.getLesson(this.clipboard.id)
            .pipe(switchMap(lesson => this.scheduleService.createLesson({
                theme: lesson.theme.toString(),
                format: lesson.format.toString(),
                weeks: lesson.weeks,
                room: lesson.room.toString(),
                teachers: lesson.teachers.map(teacher => teacher.toString()),
                lesson_time: this.lessonTimes[time].id.toString(),
                day: day.toString(),
                group_semester: this._groupsemester.toString(),
            })))
            .subscribe(() => this._updatePage());
    }

    private _updatePage() {
        const isSlugChanged = !this._groupSlug || this._groupSlug !== this.route.snapshot.paramMap.get('groupSlug');
        this._groupSlug = this.route.snapshot.paramMap.get('groupSlug');
        if (this._groupSlug !== 'groupSlug') {
            this.isLoading = true;
            this.groupIdControl.patchValue(+this.route.snapshot.paramMap.get('groupId'));
            this.scheduleService.getTimetable(this._groupSlug)
                .subscribe(res => this.groupSchedule = res)
                .add(() => isSlugChanged ? this._getGroupsemester() : null)
                .add(() => this.isLoading = false);
        }
    }

    private _getGroupsemester() {
        this.scheduleService.getGroupsemester(this.groupSchedule.info.group.id, this.groupSchedule.info.semester.id)
            .subscribe(res => this._groupsemester = res && res.count ? res.results[0].id : undefined);
    }
}
