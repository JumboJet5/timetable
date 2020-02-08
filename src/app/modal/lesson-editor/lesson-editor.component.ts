import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { IGroup, ITimetable, VacantWeekInfoInterface } from '@interfaces';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { Lesson } from 'src/core/classes/lesson';
import { WeekSchedule } from 'src/core/classes/week-schedule';
import { lessonForm } from 'src/core/const/form';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.scss', '../../../assets/stylesheet/default-form.scss'],
})
export class LessonEditorComponent implements OnInit {
  public vacantWeeks: VacantWeekInfoInterface[];
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

    ['lesson_time', 'day']
      .forEach(controlName => this.lessonForm.get(controlName).valueChanges
        .subscribe(() => this._initVacantWeeksList()));
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
    this._getSubgroupList();
    this._initVacantWeeksList();
  }

  public closeModal() {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public onCreate() {
    if (this.lessonForm.valid) this.scheduleService.createLesson(this._formatBody())
      .subscribe(() => this.closeModal());
  }

  public onUpdate() {
    if (this.lessonForm.valid) this.scheduleService.updateLesson(this._formatBody(), this.lesson.id)
      .subscribe(() => this.closeModal());
  }

  public changeWeekStatus(week: VacantWeekInfoInterface) {
    week.isUsed = !week.isUsed;
    this._setVacantWeekControl();
  }

  private _formatBody() {
    const body = {...this.lessonForm.value};
    body.weeks = this.vacantWeeks.map((week, i) => week && body.vacantWeeks.includes(i) ? 1 : 0).join('');
    delete body.vacantWeeks;
    return body;
  }

  private _getLesson(lessonId: number) {
    this.lessonService.getLesson(lessonId)
      .subscribe(lesson => {
        this.lesson = new Lesson(lesson);
        this.lessonForm.patchValue(lesson);
        this._initVacantWeeksList();
      });
  }

  private _getSubgroupList() {
    this.groupService.getGroup(this.weekSchedule.getScheduleGroupId())
      .subscribe(group => this.group = group);
  }

  private _initVacantWeeksList() {
    if (!!this.weekSchedule && this.lessonForm.get('day').valid && this.lessonForm.get('lesson_time').valid) {
      const {day, lesson_time} = this.lessonForm.value;
      this.vacantWeeks = this.weekSchedule.getVacantWeeks(this.lesson, +day, +lesson_time);
      this.vacantWeeks.forEach(week => week.isUsed = week.isUsed && week.isVacant);
      this._setVacantWeekControl();
    }
  }

  private _setVacantWeekControl() {
    const selectedWeeks = this.vacantWeeks
      .map((week, i) => week.isUsed ? i : undefined)
      .filter(item => item !== undefined);
    this.lessonForm.get('vacantWeeks').patchValue(selectedWeeks);
  }
}
