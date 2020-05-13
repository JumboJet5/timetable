import { Component, Input } from '@angular/core';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { LessontimeEntityService } from '@app/service/lessontime-entity/lessontime-entity.service';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

@Component({
  selector: 'app-smart-lessontime-entity',
  templateUrl: './smart-lessontime-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-lessontime-entity.component.scss'],
  providers: [LessontimeEntityService],
})
export class SmartLessontimeEntityComponent {
  public isLoading = false;

  constructor(public lessontimeEntityService: LessontimeEntityService,
              private lessonTimeService: LessonTimeService) { }

  private _lessontime: ILessonTime;

  public get lessontime(): ILessonTime {
    return this._lessontime;
  }

  @Input()
  public set lessontime(value: ILessonTime) {
    this._lessontime = value;
    this.reset();
  }

  public save() {
    if (this.lessontimeEntityService.form.invalid || !this.lessontime) return;

    this.isLoading = true;
    this.lessonTimeService.updateItem(this.lessontime.id, this.lessontimeEntityService.getFormValue())
      .subscribe(res => Object.assign(this.lessontime, res))
      .add(() => this.isLoading = false);
  }

  public reset(): void {
    this.lessontimeEntityService.resetForm(this._lessontime);
  }
}
