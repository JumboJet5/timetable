import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { EntityFormService } from '@app/shared/classes/entity-form.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';


export abstract class CreateEntityModal<TItem extends object, TFormBody = TItem> implements OnInit {
  public isLoading = false;
  protected _chanelId: PopupChanelEnum;

  protected constructor(protected _route: ActivatedRoute,
                        protected _router: Router,
                        protected _popupService: PopupService,
                        protected _controlService: EntityCrudService<TItem>,
                        public controlEntityService: EntityFormService<TItem, TFormBody>) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}], {queryParams: this._route.snapshot.queryParams});
  }

  public createItem() {
    if (this.controlEntityService.form.invalid) return;

    this.isLoading = true;
    this._controlService.createItem(this.controlEntityService.form.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  protected abstract _applyParamsChange(params: Params): void ;
}
