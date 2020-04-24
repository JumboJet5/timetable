import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { Subject } from 'rxjs';
import { IUniversity } from 'src/core/interfaces/university';

@Component({
  selector: 'app-university-entity',
  templateUrl: './university-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './university-entity.component.scss'],
})
export class UniversityEntityComponent implements OnDestroy {
  @Output() public save: EventEmitter<IUniversity> = new EventEmitter<IUniversity>();
  public universityEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    img: new FormControl(null),
  });
  public imageSrc: SafeUrl | string;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _domSanitizer: DomSanitizer,
              private _specialtyService: SpecialtyService) { }

  private _university: IUniversity;

  public get university(): IUniversity {
    return this._university;
  }

  @Input()
  public set university(value: IUniversity) {
    this._university = value;
    this.resetForm();
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.universityEntityForm.get('img').patchValue(img);
    this.universityEntityForm.get('img').markAsDirty();
  }

  public resetForm(): void {
    this.universityEntityForm.reset(this.university);
    this.imageSrc = this.universityEntityForm.value.img;
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
