import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ControlEntityService } from '@app/service/control-entity/control-entity.service';
import { ControlService } from '@app/service/control/control.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-control.component.scss'],
  providers: [ControlEntityService],
})
export class CreateControlComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_CONTROL;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public controlEntityService: ControlEntityService,
              private _popupService: PopupService,
              private _controlService: ControlService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}], {queryParams: this._route.snapshot.queryParams});
  }

  public createFaculty() {
    if (this.controlEntityService.form.invalid) return;

    this.isLoading = true;
    this._controlService.createItem(this.controlEntityService.form.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.controlEntityService.resetForm({group_semester: params.group_semester});
  }
}
