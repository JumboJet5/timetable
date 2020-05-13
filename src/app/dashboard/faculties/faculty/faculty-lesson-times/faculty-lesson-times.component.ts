import { Component, Input, OnInit } from '@angular/core';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';

@Component({
  selector: 'app-faculty-lesson-times',
  templateUrl: './faculty-lesson-times.component.html',
  styleUrls: ['./faculty-lesson-times.component.scss'],
})
export class FacultyLessonTimesComponent implements OnInit {
  public lessonTimes: ILessonTime[];
  public isLoading = false;

  constructor(private _lessonTimeService: LessonTimeService,
              private _smartDetailsService: SmartDetailsService,
              private _popupService: PopupService) { }


  private _facultyId: number;

  @Input()
  public set facultyId(value: number) {
    this._facultyId = value;
    this._loadLessonTimes();
  }

  public ngOnInit(): void {
    this._popupService.getChanel(PopupChanelEnum.CREATE_LESSONTIME)
      .subscribe((lessonTime: ILessonTime) => this.lessonTimes.push(lessonTime));
  }

  public createLessonTime() {
    this._popupService.openReactiveModal(['create-lessontime'], {faculty: this._facultyId});
  }

  public deleteLessonTime(id: number) {
    const index = this.lessonTimes.findIndex(time => time.id === id);
    if (index < 0) return;

    this._popupService.openDialog({
        header: 'Вилучити розклад пари?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => (this.isLoading = true) && this._lessonTimeService.deleteItem(id)
        .subscribe(() => this.lessonTimes.splice(index, 1))
        .add(() => this.isLoading = false));
  }

  public openDetails(entity: ILessonTime) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.LESSONTIME};
  }

  private _loadLessonTimes(): void {
    this.isLoading = true;
    this._lessonTimeService.getItems({faculty: this._facultyId})
      .subscribe(res => this.lessonTimes = res.results)
      .add(() => this.isLoading = false);
  }
}
