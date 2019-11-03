import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.scss'],
})
export class LessonEditorComponent implements OnInit {
  public lesson: LessonInterface;
  public lessonEntry: string[][];
  public vacantWeeks: string;
  public lessonForm: FormGroup = new FormGroup({
    theme: new FormControl('', Validators.required),
    housing: new FormControl('', Validators.required),
    room: new FormControl('', Validators.required),
    format: new FormControl('', Validators.required),
    subgroup: new FormControl(''),
    teachers: new FormControl('', Validators.required),
  });
  public lessonFormats = [
    {id: 0, name: 'лекція'},
    {id: 1, name: 'семінар'},
    {id: 2, name: 'практика'},
    {id: 3, name: 'лабораторні'},
    {id: 4, name: 'інше'},
  ];
  public subgroups;
  public lessonsMap: Map<number, string> = new Map<number, string>(this.lessonFormats.map(i => [i.id, i.name]));
  public groupId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private scheduleService: ScheduleService,
              private lessonService: LessonService) { }

  private getVacantWeeks(associatedLessons: LessonInterface[]): number[] {
    return new Array(20).fill(true)
      .map((week, index) => !associatedLessons
        .some(lesson => this.isWeekNotVacant(lesson, index)) ? 1 : 0);
  }

  private isWeekNotVacant(associatedLesson: LessonInterface, index: number): boolean {
    const associatedLessonWeeks = associatedLesson.weeks.split('')
      .map(week => !!+week);

    return associatedLessonWeeks[index] && !this.formatService.isDifferentSubgroups(associatedLesson, this.lesson)
      && !this.formatService.isSameName(associatedLesson, this.lesson);
  }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    if (!history.state.state) {
      return this.closeModal();
    } else {
      const lessonId = +params.get('lessonId');
      if (params.has('lessonId')) {
        const associatedLessons = (history.state.state.associatedLessons as LessonInterface[])
          .filter(lesson => lesson.id !== lessonId);

        this.groupId = history.state.state.groupId;

        this.lessonService.getLesson(lessonId)
          .subscribe(lesson => this.lesson = lesson)
          .add(() => this.lessonForm.patchValue({...this.lesson}))
          .add(() => this.lessonEntry = Object.entries(this.lesson))
          .add(() => this.vacantWeeks = this.getVacantWeeks(associatedLessons).join(''));
      }

      if (this.groupId) {
        this.scheduleService.getGroup(this.groupId)
          .subscribe(group => this.subgroups = new Array(+group.subgroups + 1).fill('')
            .map((_, i) => i ? i : 'Всі'));
      }
    }
  }

  public loadThemes = (option: LoadPageInterface) => this.scheduleService.getThemes({...option, groupId: this.groupId});

  public loadTheme = (id: number) => this.scheduleService.getTheme(id);

  public loadHousings = (option: LoadPageInterface) => this.scheduleService.getHousings({...option, groupId: this.groupId});

  public loadHousing = (id: number) => this.scheduleService.getHousing(id);

  public loadRooms = (option: LoadPageInterface) => this.scheduleService.getRooms({...option, housingId: this.lessonForm.value.housing});

  public loadRoom = (id: number) => this.scheduleService.getRoom(id);

  public loadTeachers = (option: LoadPageInterface) => this.scheduleService.getTeachers({...option, groupId: this.groupId});

  public loadTeacher = (id: number) => this.scheduleService.getTeacher(id);

  public roomToSting = (room) => room ? room.num : '';

  public closeModal() {
    this.router.navigate([{outlets: {modal: null}}]);
  }
}
