import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { LessonService } from '@app/service/lesson/lesson.service';
import { ScheduleService } from '@app/service/schedule/schedule.service';
import { Lesson } from '@classes/lesson';
import { WeekSchedule } from '@classes/week-schedule';
import { lessonForm } from '@const/form';
import { IGroup } from '@interfaces';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: [
    '../../../../core/stylesheet/modal.scss',
    '../../../../core/stylesheet/default-form.scss',
    './lesson-editor.component.scss',
  ],
})
export class LessonEditorComponent implements OnInit {
  @HostBinding('tabindex') public tabindex = 0;
  public lessonForm: FormGroup = lessonForm();
  public group: IGroup;
  public weekSchedule: WeekSchedule;
  public lesson: Lesson;
  public isLessonLoading = false;

  constructor(private element: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private groupService: GroupService,
              private lessonService: LessonService) {}

  public ngOnInit(): void {
    setTimeout(() => this.element.nativeElement.focus());
    const params = this.route.snapshot.paramMap;
    this.scheduleService.getTimetable(params.get('groupSlug'));
    this.scheduleService.getActualSchedule$()
      .subscribe(res => this.setWeekSchedule(res));

    if (params.has('lessonId')) this._getLesson(+params.get('lessonId'));
    if (params.has('day') && params.has('time')) this.lessonForm.patchValue({
      day: +params.get('day'),
      lesson_time: +params.get('time'),
      group_semester: +params.get('groupsemesterId'),
    });
    this.onFormatChanges(null);
  }

  public setWeekSchedule(value: WeekSchedule): void {
    this.weekSchedule = value;
    this._getGroup();
  }

  public closeModal(answer: 'accept' | 'cancel' = 'cancel'): void {
    this.router.navigate([{outlets: {modal: null}}], {state: {answer}});
  }

  public onCreate(): void {
    if (this.lessonForm.valid) this.lessonService.createLesson(this.lessonForm.value)
      .subscribe(() => this.closeModal('accept'));
  }

  public onUpdate(): void {
    if (this.lessonForm.valid) this.lessonService.updateLesson(this.lessonForm.value, this.lesson.id)
      .subscribe(() => this.closeModal('accept'));
  }

  private _getLesson(lessonId: number): void {
    this.isLessonLoading = true;
    this.lessonService.getLesson(lessonId)
      .subscribe(lesson => {
        this.lesson = new Lesson(lesson);
        this.lessonForm.patchValue(lesson);
        this.onFormatChanges(lesson.conduct_type);
      })
      .add(() => this.isLessonLoading = false);
  }

  private _getGroup(): void {
    if (this.weekSchedule) this.groupService.getItem(this.weekSchedule.getScheduleGroupId())
      .subscribe(group => this.group = group);
  }

  public onFormatChanges(value: 'online' | 'offline' | 'unknown' | string) {
    switch (value) {
      case 'offline':
        this.lessonForm.get('housing').enable();
        this.lessonForm.get('room').enable();
        this.lessonForm.get('link').disable();
        break;
      case 'online':
        this.lessonForm.get('housing').disable();
        this.lessonForm.get('room').disable();
        this.lessonForm.get('link').enable();
        break;
      case 'unknown':
        this.lessonForm.get('housing').enable();
        this.lessonForm.get('room').enable();
        this.lessonForm.get('link').enable();
        break;
      default:
        this.lessonForm.get('housing').disable();
        this.lessonForm.get('room').disable();
        this.lessonForm.get('link').disable();
    }
  }
}
