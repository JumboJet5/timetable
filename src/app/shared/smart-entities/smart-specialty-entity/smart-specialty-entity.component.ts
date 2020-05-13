import { Component, Input } from '@angular/core';
import { SpecialtyEntityService } from '@app/service/specialty-entity/specialty-entity.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-smart-specialty-entity',
  templateUrl: './smart-specialty-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-specialty-entity.component.scss'],
  providers: [SpecialtyEntityService],
})
export class SmartSpecialtyEntityComponent {
  public isLoading = false;

  constructor(private specialtyService: SpecialtyService,
              public specialtyEntityService: SpecialtyEntityService) { }

  private _specialty: ISpecialty;

  public get specialty(): ISpecialty {
    return this._specialty;
  }

  @Input()
  public set specialty(value: ISpecialty) {
    this._specialty = value;
    this.reset();
  }

  public save() {
    if (this.specialtyEntityService.form.invalid || !this.specialty) return;

    this.isLoading = true;
    this.specialtyService.updateItem(this.specialty.id, this.specialtyEntityService.form.value)
      .subscribe(res => Object.assign(this.specialty, res))
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.specialtyEntityService.resetForm(this.specialty);
  }
}
