import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '@app/service/format/format.service';
import { GroupService } from '@app/service/group/group.service';
import { Subject } from 'rxjs';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialty-entity',
  templateUrl: './specialty-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './specialty-entity.component.scss'],
})
export class SpecialtyEntityComponent implements OnDestroy {
  @Output() save: EventEmitter<ISpecialty> = new EventEmitter<ISpecialty>();
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specialtyEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.required),
    interface_type: new FormControl('', Validators.required),
    desc: new FormControl(''),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    faculty: this.facControl,
  });
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _formatService: FormatService,
              private _groupService: GroupService) { }

  private _specialty: ISpecialty;

  public get specialty(): ISpecialty {
    return this._specialty;
  }

  @Input()
  public set specialty(value: ISpecialty) {
    this._specialty = value;
    this.resetForm();
    this.specialtyEntityForm.valueChanges
      .subscribe(() => console.log(this.specialtyEntityForm));
  }

  public resetForm(): void {
    this.specialtyEntityForm.reset(this.specialty);
  }

  public onLoadFaculty(faculty: IFaculty) {
    if (!!faculty && faculty.id === this.facControl.value && faculty.univ !== this.univControl.value)
      this.univControl.patchValue(faculty.univ, {onlySelf: true});
    console.log(this.specialtyEntityForm.pristine);
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
