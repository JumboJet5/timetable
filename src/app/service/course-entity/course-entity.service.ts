import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { ICourseEntity } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Injectable()
export class CourseEntityService {
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl('', Validators.required);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    degree: new FormControl(''),
    specialty: this.specControl,
    faculty: this.facControl,
    univ: this.univControl, // trigger reactForm dirty property
  });
  public facultyDrop: (keyof IFilterParams)[] = ['univ', 'faculty'];
  public univDrop: (keyof IFilterParams)[] = ['univ'];
  public univFilters: IFilterParams = this.formatService.getParamsCut(this.univDrop, this.form.value);
  public facultyFilters: IFilterParams = this.formatService.getParamsCut(this.facultyDrop, this.form.value);

  constructor(public formatService: FormatService) {
    this.form.valueChanges
      .subscribe(value => {
        if (this.univFilters.univ !== value.univ) {
          this.univFilters = this.formatService.getParamsCut(this.univDrop, this.form.value);
          this.facultyFilters = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
        } else if (this.facultyFilters.faculty !== value.faculty)
          this.facultyFilters = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
      });
  }

  public resetForm(course: Partial<ICourseEntity>): void {
    this.form.reset(course);
  }

  public onLoadFaculty(faculty: IFaculty): void {
    this.formatService.onLoadFaculty(faculty, this.facControl, this.univControl);
  }

  public onLoadSpecialty(specialty: ISpecialty): void {
    this.formatService.onLoadSpecialty(specialty, this.specControl, this.facControl);
  }

  public getControlError(controlName: keyof ICourseEntity): string {
    return this.formatService.getControlError(this.form, controlName);
  }
}
