import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { ScheduleLessonsComponent } from 'src/app/week-schedule/schedule-lessons/schedule-lessons.component';

@Component({
    selector: 'app-week-schedule',
    templateUrl: './week-schedule.component.html',
    styleUrls: ['./week-schedule.component.scss'],
})
export class WeekScheduleComponent implements OnInit {
    public dropLists: CdkDropList[] = [];
    public isDragging = false;
    public weekDays = this.formatService.weekDays();
    public lessonTimes: LessonTimeInterface[] = [];
    public week: LessonInterface[][][] = [];
    public clipboard: LessonInterface;
    public groupIdControl: FormControl = new FormControl(undefined);
    private _groupSlug: string;

    @ViewChildren(ScheduleLessonsComponent)
    public set lessons(value: QueryList<ScheduleLessonsComponent>) {
        setTimeout(() => this.dropLists = value.toArray().map(lesson => lesson.dropList));
    }

    private _groupSchedule: TimetableInterface;

    private get groupSchedule(): TimetableInterface {
        return this._groupSchedule;
    }

    private set groupSchedule(value: TimetableInterface) {
        this._groupSchedule = value;
        [this.lessonTimes, this.week] = this.formatService.initSchedule(value);
    }

    constructor(private scheduleService: ScheduleService,
                private route: ActivatedRoute,
                private formatService: FormatService,
                private router: Router) {
    }

    public ngOnInit(): void {
        this._updatePage();
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this._updatePage());
    }

    public loadGroups = (option: LoadPageInterface): Observable<GroupsResponseInterface> => this.scheduleService.getGroups({...option});

    public loadGroup = (id: number): Observable<GroupInterface> => this.scheduleService.getGroup(id);

    public paste(lesson: ScheduleLessonsComponent, index: number) {
        lesson.lessons[index] = this.clipboard || lesson.lessons[index];
        this.clipboard = undefined;
    }

    public changeSlug(event: OptionInterface[]) {
        if (event && event.length) this.router.navigate([event[0].slug, event[0].id]);
    }

    public openLessonDetail(lesson: LessonInterface, associatedLessons: LessonInterface[]) {
        const state = {associatedLessons, groupSchedule: this._groupSchedule};
        this.router.navigate([{outlets: {modal: ['modal', 'lesson', lesson.id, this._groupSlug]}}], {state: {state}});
    }

    public openAddLessonModal(day: number, time: number) {
        const state = {day, time: this.lessonTimes[time].id, groupSchedule: this._groupSchedule};
        this.router.navigate([{outlets: {modal: ['modal', 'lesson', this._groupSlug]}}], {state: {state}});
    }

    private _updatePage() {
        this._groupSlug = this.route.snapshot.paramMap.get('groupSlug');
        if (this._groupSlug !== 'groupSlug') {
            this.groupIdControl.patchValue(+this.route.snapshot.paramMap.get('groupId'));
            this.scheduleService.getTimetable(this._groupSlug)
                .subscribe(res => this.groupSchedule = res);
        }
    }
}
