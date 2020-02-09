import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { IGroup, ITimetable } from '@interfaces';
import { FormatService } from '@app/service/format/format.service';
import { LessonService } from '@app/service/lesson/lesson.service';
import { ScheduleService } from '@app/service/schedule/schedule.service';
import { Lesson } from '@classes/lesson';
import { WeekSchedule } from '@classes/week-schedule';
import { lessonForm } from '@const/form';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['../../../../assets/stylesheet/modal.scss',  './lesson-editor.component.scss'],
})
export class LessonEditorComponent implements OnInit {
  public lessonForm: FormGroup = lessonForm();
  public group: IGroup;
  public weekSchedule: WeekSchedule;
  public lesson: Lesson;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private scheduleService: ScheduleService,
              private groupService: GroupService,
              private lessonService: LessonService) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    if (params.has('lessonId')) this._getLesson(+params.get('lessonId'));

    if (history.state.state) this.setDetailsFromState();
    else this.scheduleService.getTimetable(params.get('groupSlug'))
      .subscribe(res => this.setWeekSchedule(res));
  }

  public setDetailsFromState() {
    this.lessonForm.patchValue({
      day: history.state.state.day,
      lesson_time: history.state.state.time,
      group_semester: history.state.state.groupsemester,
    });
    this.setWeekSchedule(history.state.state.groupSchedule);
  }

  public setWeekSchedule(value: ITimetable): void {
    this.weekSchedule = new WeekSchedule(value);
    this._getGroup();
  }

  public closeModal(answer: 'accept' | 'cancel' = 'cancel') {
    this.router.navigate([{outlets: {modal: null}}], {state: {answer}});
  }

  public onCreate() {
    if (this.lessonForm.valid) this.scheduleService.createLesson(this.lessonForm.value)
      .subscribe(() => this.closeModal('accept'));
  }

  public onUpdate() {
    if (this.lessonForm.valid) this.scheduleService.updateLesson(this.lessonForm.value, this.lesson.id)
      .subscribe(() => this.closeModal('accept'));
  }

  private _getLesson(lessonId: number) {
    this.lessonService.getLesson(lessonId)
      .subscribe(lesson => {
        this.lesson = new Lesson(lesson);
        this.lessonForm.patchValue(lesson);
      });
  }

  private _getGroup() {
    this.groupService.getGroup(this.weekSchedule.getScheduleGroupId())
      .subscribe(group => this.group = group);
  }
}
