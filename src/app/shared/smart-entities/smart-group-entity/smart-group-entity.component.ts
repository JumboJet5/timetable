import { Component, Input } from '@angular/core';
import { GroupEntityService } from '@app/service/group-entity/group-entity.service';
import { GroupService } from '@app/service/group/group.service';
import { IGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-smart-group-entity',
  templateUrl: './smart-group-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-group-entity.component.scss'],
  providers: [GroupEntityService],
})
export class SmartGroupEntityComponent {
  @Input() public isCourseReadonly = true;
  public isLoading = false;

  constructor(private groupService: GroupService,
              public groupEntityService: GroupEntityService) { }

  private _group: IGroup;

  public get group(): IGroup {
    return this._group;
  }

  @Input()
  public set group(value: IGroup) {
    this._group = value;
    this.reset();
  }

  public save() {
    if (this.groupEntityService.form.invalid || !this.group) return;

    this.isLoading = true;
    this.groupService.updateGroup(this.group.id, this.groupEntityService.form.value)
      .subscribe(res => Object.assign(this.group, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.groupEntityService.resetForm(this.group);
  }
}
