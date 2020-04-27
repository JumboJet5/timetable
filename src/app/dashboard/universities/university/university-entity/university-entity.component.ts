import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UniversityEntityService } from '@app/service/university-entity/university-entity.service';
import { IUniversity } from 'src/core/interfaces/university';

@Component({
  selector: 'app-university-entity',
  templateUrl: './university-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './university-entity.component.scss'],
  providers: [UniversityEntityService],
})
export class UniversityEntityComponent {
  @Output() public save: EventEmitter<IUniversity> = new EventEmitter<IUniversity>();

  constructor(public universityEntityService: UniversityEntityService) { }

  private _university: IUniversity;

  public get university(): IUniversity {
    return this._university;
  }

  @Input()
  public set university(value: IUniversity) {
    this._university = value;
    this.resetForm();
  }

  public resetForm(): void {
    this.universityEntityService.resetForm(this.university);
  }
}
