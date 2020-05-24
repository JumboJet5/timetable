import { Input } from '@angular/core';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { IWithId } from 'src/core/interfaces/select-option.interface';

export class SmartItemEntity<TItem extends Partial<IWithId>, TFormBody extends Partial<IWithId> = TItem> {
  public isLoading = false;

  constructor(protected _entityCrudService: EntityCrudService<TItem>,
              public entityFormService: EntityFormService<TItem, TFormBody>) { }

  protected _item: TFormBody;

  public get item(): TFormBody {
    return this._item;
  }

  @Input()
  public set item(value: TFormBody) {
    this._item = value;
    this.reset();
  }

  public save() {
    if (this.entityFormService.form.invalid || !this.item) return;

    this.isLoading = true;
    this._entityCrudService.updateItem(this.item.id, this.entityFormService.form.value)
      .subscribe(res => Object.assign(this.item, res) && this.reset())
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.entityFormService.resetForm(this.item);
  }
}
