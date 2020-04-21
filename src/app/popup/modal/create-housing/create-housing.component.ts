import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '@app/service/housing/housing.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: [
    '../../../../core/stylesheet/modal.scss',
    '../../../../core/stylesheet/default-form.scss',
    './create-housing.component.scss',
  ],
})
export class CreateHousingComponent implements OnInit {
  public univControl: FormControl = new FormControl('', Validators.required);
  public createBuildingForm: FormGroup = new FormGroup({
    floor: new FormControl('', Validators.min(1)),
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    address: new FormControl(''),
    location: new FormControl(''),
    univ: this.univControl,
  });
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_HOUSING;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private housingService: HousingService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams
      .subscribe(() => this._applyQueryParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
    control = control || (formGroup ? formGroup.get(controlName) : undefined);
    return control && (control.valid || control.untouched);
  }

  public getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup ? formGroup.get(controlName) : undefined;
    if (!control || this.isControlValid(formGroup, controlName, control)) return '';
    if (control.errors.required) return 'Обов`язкове поле';
    if (control.errors.pattern) return 'Поле не відповідає патерну';
    if (control.errors.min) return 'Недостатньо велике число';
    return 'Не валідне поле';
  }

  public create() {
    if (this.createBuildingForm.invalid) return;

    this.isLoading = true;
    this.createBuildingForm.get('univ').enable();
    this.housingService.createHousing(this.createBuildingForm.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
    this._applyQueryParams();
  }

  private _applyQueryParams() {
    if (!this.route.snapshot.queryParams.univ) return;

    this.createBuildingForm.patchValue({univ: +this.route.snapshot.queryParams.univ});
    this.createBuildingForm.get('univ').disable();
  }
}
