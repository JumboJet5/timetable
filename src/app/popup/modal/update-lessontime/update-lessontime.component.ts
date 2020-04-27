import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { LessontimeEntityService } from '@app/service/lessontime-entity/lessontime-entity.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-update-lessontime',
  templateUrl: './update-lessontime.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './update-lessontime.component.scss'],
  providers: [LessontimeEntityService],
})
export class UpdateLessontimeComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.UPDATE_LESSONTIME;
  private id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public lessontimeEntityService: LessontimeEntityService,
              private lessonTimeService: LessonTimeService,
              private popupService: PopupService) { }

  public ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.params.subscribe(() => this._applyParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.lessontimeEntityService.form.invalid) return;

    this.isLoading = true;
    this.lessonTimeService.updateLessonTime(this.id, this.lessontimeEntityService.getFormValue())
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyParams() {
    if (!this.route.snapshot.params.id) return;

    this.id = +this.route.snapshot.params.id;
    this.lessonTimeService.getLessonTime(this.id)
      .subscribe(lessonTime => this.lessontimeEntityService.resetForm(lessonTime));
  }
}
