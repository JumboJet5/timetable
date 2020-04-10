import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { Subject } from 'rxjs';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialty-entity',
  templateUrl: './specialty-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './specialty-entity.component.scss'],
})
export class SpecialtyEntityComponent implements OnDestroy {
  @Output() public save: EventEmitter<ISpecialty> = new EventEmitter<ISpecialty>();
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
    univ: this.univControl, // trigger reactForm dirty property
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _domSanitizer: DomSanitizer,
              private _specialtyService: SpecialtyService) { }

  private _specialty: ISpecialty;

  public get specialty(): ISpecialty {
    return this._specialty;
  }

  @Input()
  public set specialty(value: ISpecialty) {
    this._specialty = value;
    this.resetForm();
  }
  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.specialtyEntityForm.get('img').patchValue(img);
    this.specialtyEntityForm.get('img').markAsDirty();
  }

  public resetForm(): void {
    this.specialtyEntityForm.reset({...this.specialty, univ: this.univControl.value});
    this.imageSrc = this.specialtyEntityForm.value.img;
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

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
