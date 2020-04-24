import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from '@app/service/course/course.service';
import { FormatService } from '@app/service/format/format.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/modal.scss',
    './create-course.component.scss',
  ],
})
export class CreateCourseComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl('', Validators.required);
  public courseEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    degree: new FormControl(''),
    specialty: this.specControl,
    faculty: this.facControl,
    univ: this.univControl, // trigger reactForm dirty property
  });
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_COURSE;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _popupService: PopupService,
              private _courseService: CourseService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._applyParamsChange(this._route.snapshot.queryParams);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public onLoadFaculty(faculty: IFaculty) {
    if (!!faculty && faculty.id === this.facControl.value && faculty.univ !== this.univControl.value)
      this.univControl.patchValue(faculty.univ, {onlySelf: true});
  }

  public onLoadSpecialty(specialty: ISpecialty) {
    if (!!specialty && specialty.id === this.specControl.value && specialty.faculty !== this.facControl.value)
      this.facControl.patchValue(specialty.faculty, {onlySelf: true});
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
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
    this._courseService.createCourse(this.courseEntityForm.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.courseEntityForm.reset({univ: +params.univ, faculty: +params.faculty, specialty: +params.specialty});
  }
}
