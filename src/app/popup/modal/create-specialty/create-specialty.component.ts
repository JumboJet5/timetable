import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyEntityService } from '@app/service/specialty-entity/specialty-entity.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-specialty',
  templateUrl: './create-specialty.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-specialty.component.scss'],
  providers: [SpecialtyEntityService],
})
export class CreateSpecialtyComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_SPECIALTY;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public specialtyEntityService: SpecialtyEntityService,
              private _popupService: PopupService,
              private _specialtyService: SpecialtyService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._applyParamsChange(this._route.snapshot.queryParams);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }

  public createSpecialty() {
    this.isLoading = true;
    this._specialtyService.createSpecialty(this.specialtyEntityService.form.value)
      .subscribe(specialty => this._popupService.sendMessage(this._chanelId, specialty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.specialtyEntityService.resetForm({univ: +params.univ, faculty: +params.faculty});
  }
}
