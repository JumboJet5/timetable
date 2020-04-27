import { Component, Input } from '@angular/core';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { SemesterEntityService } from '@app/service/semester-entity/semester-entity.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Component({
  selector: 'app-smart-semester-entity',
  templateUrl: './smart-semester-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-semester-entity.component.scss'],
  providers: [SemesterEntityService],
})
export class SmartSemesterEntityComponent {
  public isLoading = false;

  constructor(private semesterService: SemesterService,
              public semesterEntityService: SemesterEntityService,
              public dateFormatService: DateFormatService) { }

  private _semester: ISemester;

  public get semester(): ISemester {
    return this._semester;
  }

  @Input()
  public set semester(value: ISemester) {
    this._semester = value;
    this.reset();
  }

  public save() {
    if (this.semesterEntityService.form.invalid || !this.semester) return;

    this.isLoading = true;
    this.semesterService.updateSemester(this.semester.id, this.semesterEntityService.getFormValue())
      .subscribe(res => Object.assign(this.semester, res))
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.semesterEntityService.resetForm(this.semester);
  }
}
