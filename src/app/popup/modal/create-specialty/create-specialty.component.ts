import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-create-specialty',
  templateUrl: './create-specialty.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/modal.scss',
    './create-specialty.component.scss',
  ],
})
export class CreateSpecialtyComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl('', Validators.required);
  public specialtyEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    interface_type: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    faculty: this.facControl,
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_SPECIALTY;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _popupService: PopupService,
              private _domSanitizer: DomSanitizer,
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

  public getImagePath(img: File): void {
    this.imageSrc = this._domSanitizer.bypassSecurityTrustUrl(!!img && !!URL ? URL.createObjectURL(img) : '');
    this.specialtyEntityForm.patchValue({img});
  }

  public onLoadFaculty(faculty: IFaculty) {
    if (!!faculty && faculty.id === this.facControl.value && faculty.univ !== this.univControl.value)
      this.univControl.patchValue(faculty.univ, {onlySelf: true});
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

  public createSpecialty() {
    this.isLoading = true;
    this._specialtyService.createSpecialty(this.specialtyEntityForm.value)
      .subscribe(specialty => this._popupService.sendMessage(this._chanelId, specialty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.specialtyEntityForm.reset({univ: +params.univ, faculty: +params.faculty});
  }
}
