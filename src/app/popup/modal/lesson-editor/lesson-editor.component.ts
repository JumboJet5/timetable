import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
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
  styleUrls: ['../../../../assets/stylesheet/modal.scss', './lesson-editor.component.scss'],
})
export class LessonEditorComponent implements OnInit {
  public lessonForm: FormGroup = lessonForm();
  public group: IGroup;
  public weekSchedule: WeekSchedule;
  public lesson: Lesson;
  public isLessonLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private scheduleService: ScheduleService,
              private groupService: GroupService,
              private lessonService: LessonService) {}

  public ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.scheduleService.getTimetable(params.get('groupSlug'));
    this.scheduleService.getActualSchedule$()
      .subscribe(res => this.setWeekSchedule(res));

    if (params.has('lessonId')) this._getLesson(+params.get('lessonId'));
    if (params.has('day') && params.has('time')) this.lessonForm.patchValue({
      day: +params.get('day'),
      lesson_time: +params.get('time'),
    });
  }

  public setWeekSchedule(value: WeekSchedule): void {
    this.weekSchedule = value;
    this._getGroup();
  }

  public closeModal(answer: 'accept' | 'cancel' = 'cancel'): void {
    this.router.navigate([{outlets: {modal: null}}], {state: {answer}});
  }

  public onCreate(): void {
    if (this.lessonForm.valid) this.scheduleService.createLesson(this.lessonForm.value)
      .subscribe(() => this.closeModal('accept'));
  }

  public onUpdate(): void {
    if (this.lessonForm.valid) this.scheduleService.updateLesson(this.lessonForm.value, this.lesson.id)
      .subscribe(() => this.closeModal('accept'));
  }

  private _getLesson(lessonId: number): void {
    this.isLessonLoading = true;
    this.lessonService.getLesson(lessonId)
      .subscribe(lesson => {
        this.lesson = new Lesson(lesson);
        this.lessonForm.patchValue(lesson);
      })
      .add(() => this.isLessonLoading = false);
  }

  private _getGroup(): void {
    if (this.weekSchedule) this.groupService.getGroup(this.weekSchedule.getScheduleGroupId())
      .subscribe(group => this.group = group);
  }
}