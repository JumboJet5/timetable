import { Component, Input } from '@angular/core';
import { ControlEntityService } from '@app/service/control-entity/control-entity.service';
import { ControlService } from '@app/service/control/control.service';
import { IControl } from 'src/core/interfaces/control.interface';

@Component({
  selector: 'app-smart-control-entity',
  templateUrl: './smart-control-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-control-entity.component.scss'],
  providers: [ControlEntityService],
})
export class SmartControlEntityComponent {
  public isLoading = false;

  constructor(private controlService: ControlService,
              public controlEntityService: ControlEntityService) { }

  private _control: IControl;

  public get control(): IControl {
    return this._control;
  }

  @Input()
  public set control(value: IControl) {
    this._control = value;
    this.reset();
  }

  public save() {
    if (this.controlEntityService.form.invalid || !this.control) return;

    this.isLoading = true;
    this.controlService.updateControl(this.control.id, this.controlEntityService.form.value)
      .subscribe(res => Object.assign(this.control, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.controlEntityService.resetForm(this.control);
  }
}
