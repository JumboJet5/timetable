import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { ICourse, ICourseEntity } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Injectable()
export class CourseEntityService extends EntityFormService<ICourse, ICourseEntity> {
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
    super(formatService);

    this.form.valueChanges
      .subscribe(value => {
        if (this.univFilters.univ !== value.univ) {
          this.univFilters = this.formatService.getParamsCut(this.univDrop, this.form.value);
          this.facultyFilters = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
        } else if (this.facultyFilters.faculty !== value.faculty)
          this.facultyFilters = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
      });
  }

  public onLoadFaculty(faculty: IFaculty): void {
    this.formatService.onLoadFaculty(faculty, this.facControl, this.univControl);
  }

  public onLoadSpecialty(specialty: ISpecialty): void {
    this.formatService.onLoadSpecialty(specialty, this.specControl, this.facControl);
  }
}
