import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { TeacherEntityService } from '@app/service/teacher-entity/teacher-entity.service';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-teacher.component.scss'],
  providers: [TeacherEntityService],
})
export class CreateTeacherComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_TEACHER;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public teacherEntityService: TeacherEntityService,
              private _popupService: PopupService,
              private _teacherService: TeacherService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }

  public createTeacher() {
    this.isLoading = true;
    this._teacherService.createTeacher(this.teacherEntityService.form.value)
      .subscribe(teacher => this._popupService.sendMessage(this._chanelId, teacher))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.teacherEntityService.resetForm({univ: +params.univ});
  }
}
