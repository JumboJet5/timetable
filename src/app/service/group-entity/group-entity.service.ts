import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IGroup, IGroupEntity } from 'src/core/interfaces/group.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Injectable()
export class GroupEntityService extends EntityFormService<IGroup, IGroupEntity> {
  public univControl: FormControl = new FormControl();
  public facControl: FormControl = new FormControl();
  public specControl: FormControl = new FormControl();
  public courseControl: FormControl = new FormControl(undefined, Validators.required);
  public yearControl: FormControl = new FormControl(undefined, Validators.required);
  public form: FormGroup = new FormGroup({
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

  public specialtyDrop: (keyof IFilterParams)[] = ['univ', 'faculty', 'specialty'];
  public facultyDrop: (keyof IFilterParams)[] = ['univ', 'faculty'];
  public univDrop: (keyof IFilterParams)[] = ['univ'];
  public univFilters: IFilterParams = this.formatService.getParamsCut(this.univDrop, this.form.value);
  public facultyFilters: IFilterParams = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
  public specialtyFilters: IFilterParams = this.formatService.getParamsCut(this.specialtyDrop, this.form.value);

  constructor(public formatService: FormatService) {
    super(formatService);

    this.form.valueChanges
      .subscribe(value => {
        if (this.univFilters.univ !== value.univ) {
          this.univFilters = this.formatService.getParamsCut(this.univDrop, this.form.value);
          this.facultyFilters = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
          this.specialtyFilters = this.formatService.getParamsCut(this.specialtyDrop, this.form.value);
        } else if (this.facultyFilters.faculty !== value.faculty) {
          this.facultyFilters = this.formatService.getParamsCut(this.facultyDrop, this.form.value);
          this.specialtyFilters = this.formatService.getParamsCut(this.specialtyDrop, this.form.value);
        } else if (this.specialtyFilters.specialty !== value.specialty)
          this.specialtyFilters = this.formatService.getParamsCut(this.specialtyDrop, this.form.value);
      });
  }

  public onLoadFaculty(faculty: IFaculty): void {
    this.formatService.onLoadFaculty(faculty, this.facControl, this.univControl);
  }

  public onLoadSpecialty(specialty: ISpecialty): void {
    this.formatService.onLoadSpecialty(specialty, this.specControl, this.facControl);
  }

  public onLoadCourse(course: ICourse): void {
    this.formatService.onLoadCourse(course, this.courseControl, this.specControl);
  }
}
