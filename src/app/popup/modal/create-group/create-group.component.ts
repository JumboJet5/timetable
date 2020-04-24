import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/modal.scss',
    './create-group.component.scss',
  ],
})
export class CreateGroupComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl();
  public courseControl: FormControl = new FormControl(undefined, Validators.required);
  public yearControl: FormControl = new FormControl(undefined, Validators.required);
  public groupEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    subgroups: new FormControl('', Validators.min(0)),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: this.univControl,
    faculty: this.facControl,
    specialty: this.specControl,
    course: this.courseControl,
    year: this.yearControl,
  });
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_GROUP;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _popupService: PopupService,
              private _groupService: GroupService) { }

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

  public onLoadCourse(course: ICourse) {
    if (!!course && course.id === this.courseControl.value && course.specialty !== this.specControl.value)
      this.specControl.patchValue(course.specialty, {onlySelf: true});
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
    this._groupService.createGroup(this.groupEntityForm.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.groupEntityForm.reset({univ: +params.univ, faculty: +params.faculty, specialty: +params.specialty, course: +params.course});
  }
}
