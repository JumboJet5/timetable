import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from 'src/app/service/format/format.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.scss'],
})
export class LessonEditorComponent implements OnInit {
  public lesson: LessonInterface;
  public lessonEntry: string[][];
  public vacantWeeks: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formatService: FormatService,
              private lessonService: LessonService) { }

  private getVacantWeeks(associatedLessons: LessonInterface[]): number[] {
    return new Array(20).fill(true)
      .map((week, index) => !associatedLessons
        .some(lesson => this.isWeekNotVacant(lesson, index)) ? 1 : 0);
  }

  private isWeekNotVacant(associatedLesson: LessonInterface, index: number): boolean {
    const associatedLessonWeeks = associatedLesson.weeks.split('')
      .map(week => !!+week);

    console.log(index, associatedLesson, this.lesson)
    console.log(associatedLessonWeeks[index], !this.formatService.isSameName(associatedLesson, this.lesson),
      !this.formatService.isDifferentSubgroups(associatedLesson, this.lesson));
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
        const associatedLessons = (history.state.state as LessonInterface[])
          .filter(lesson => lesson.id !== lessonId);

        this.lessonService.getLesson(lessonId)
          .subscribe(lesson => this.lesson = lesson)
          .add(() => this.lessonEntry = Object.entries(this.lesson))
          .add(() => this.vacantWeeks = this.getVacantWeeks(associatedLessons).join(''));
      }
    }
  }

  public closeModal() {
    this.router.navigate([{outlets: {modal: null}}]);
  }
}
