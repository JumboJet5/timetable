import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { Subject } from 'rxjs';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-faculty-entity',
  templateUrl: './faculty-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './faculty-entity.component.scss'],
})
export class FacultyEntityComponent implements OnDestroy {
  @Output() public save: EventEmitter<IFaculty> = new EventEmitter<IFaculty>();
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
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _domSanitizer: DomSanitizer,
              private _specialtyService: SpecialtyService) { }

  private _faculty: IFaculty;

  public get faculty(): IFaculty {
    return this._faculty;
  }

  @Input()
  public set faculty(value: IFaculty) {
    this._faculty = value;
    this.resetForm();
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.facultyEntityForm.get('img').patchValue(img);
    this.facultyEntityForm.get('img').markAsDirty();
  }

  public resetForm(): void {
    this.facultyEntityForm.reset(this.faculty);
    this.imageSrc = this.facultyEntityForm.value.img;
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
