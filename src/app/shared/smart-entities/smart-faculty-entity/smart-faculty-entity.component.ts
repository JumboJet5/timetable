import { Component, Input } from '@angular/core';
import { FacultyEntityService } from '@app/service/faculty-entity/faculty-entity.service';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-smart-faculty-entity',
  templateUrl: './smart-faculty-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-faculty-entity.component.scss'],
  providers: [FacultyEntityService],
})
export class SmartFacultyEntityComponent {
  public isLoading = false;

  constructor(private facultyService: FacultyService,
              public facultyEntityService: FacultyEntityService) { }

  private _faculty: IFaculty;

  public get faculty(): IFaculty {
    return this._faculty;
  }

  @Input()
  public set faculty(value: IFaculty) {
    this._faculty = value;
    this.reset();
  }

  public save() {
    if (this.facultyEntityService.form.invalid || !this.faculty) return;

    this.isLoading = true;
    this.facultyService.updateFaculty(this.faculty.id, this.facultyEntityService.form.value)
      .subscribe(res => Object.assign(this.faculty, res))
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.facultyEntityService.resetForm(this.faculty);
  }
}
