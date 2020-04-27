import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacultyEntityService } from '@app/service/faculty-entity/faculty-entity.service';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-faculty-entity',
  templateUrl: './faculty-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './faculty-entity.component.scss'],
  providers: [FacultyEntityService],
})
export class FacultyEntityComponent {
  @Output() public save: EventEmitter<IFaculty> = new EventEmitter<IFaculty>();

  constructor(public facultyEntityService: FacultyEntityService) { }

  private _faculty: IFaculty;

  public get faculty(): IFaculty {
    return this._faculty;
  }

  @Input()
  public set faculty(value: IFaculty) {
    this._faculty = value;
    this.resetForm();
  }

  public resetForm(): void {
    this.facultyEntityService.resetForm(this.faculty);
  }
}
