import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { FormatService } from '@app/service/format/format.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/modal.scss',
    './create-faculty.component.scss',
  ],
})
export class CreateFacultyComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public univControl: FormControl = new FormControl('', Validators.required);
  public facultyEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: this.univControl,
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_FACULTY;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _popupService: PopupService,
              private _domSanitizer: DomSanitizer,
              private _facultyService: FacultyService) { }

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
    this.facultyEntityForm.patchValue({img});
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

  public createFaculty() {
    this.isLoading = true;
    this._facultyService.createFaculty(this.facultyEntityForm.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.facultyEntityForm.reset({univ: +params.univ});
  }
}
