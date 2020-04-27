import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpecialtyEntityService } from '@app/service/specialty-entity/specialty-entity.service';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialty-entity',
  templateUrl: './specialty-entity.component.html',
  styleUrls: ['../../../../../core/stylesheet/default-form.scss', './specialty-entity.component.scss'],
  providers: [SpecialtyEntityService],
})
export class SpecialtyEntityComponent {
  @Output() public save: EventEmitter<ISpecialty> = new EventEmitter<ISpecialty>();

  constructor(public specialtyEntityService: SpecialtyEntityService) { }

  private _specialty: ISpecialty;

  public get specialty(): ISpecialty {
    return this._specialty;
  }

  @Input()
  public set specialty(value: ISpecialty) {
    this._specialty = value;
    this.resetForm();
  }

  public resetForm(): void {
    this.specialtyEntityService.resetForm(this.specialty);
  }
}
