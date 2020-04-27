import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { LessontimeEntityService } from '@app/service/lessontime-entity/lessontime-entity.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-lessontime',
  templateUrl: './create-lessontime.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-lessontime.component.scss'],
  providers: [LessontimeEntityService],
})
export class CreateLessontimeComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_LESSONTIME;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private lessonTimeService: LessonTimeService,
              public lessontimeEntityService: LessontimeEntityService,
              private popupService: PopupService) { }

  public ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams.subscribe(() => this._applyQueryParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.lessontimeEntityService.form.invalid) return;

    this.isLoading = true;
    this.lessonTimeService.createLessonTime(this.lessontimeEntityService.getFormValue())
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);

    this._applyQueryParams();
  }

  private _applyQueryParams() {
    this.lessontimeEntityService.resetForm({faculty: +this.route.snapshot.queryParams.faculty});
  }
}
