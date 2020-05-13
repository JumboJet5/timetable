import { Component, Input } from '@angular/core';
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
              public semesterEntityService: SemesterEntityService) {
    semesterEntityService.disableControls(['year']);
  }

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
    this.semesterService.updateItem(this.semester.id, this.semesterEntityService.getFormValue())
      .subscribe(res => Object.assign(this.semester, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.semesterEntityService.resetForm(this.semester);
    console.log(this.semesterEntityService.form);
  }
}
