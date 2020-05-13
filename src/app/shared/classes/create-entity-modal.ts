import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { EntityCrudService } from '@app/shared/classes/entity-crud.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

// export class CreateEntityModal<TItem extends object, EntityService extends EntityCrudService<TItem>, EntityFormService> implements OnInit {
  // public isLoading = false;
  // private _chanelId: PopupChanelEnum;
  //
  // constructor(private _route: ActivatedRoute,
  //             private _router: Router,
  //             public controlEntityService: EntityFormService,
  //             private _popupService: PopupService,
  //             private _controlService: EntityService) { }
  //
  // public ngOnInit(): void {
  //   this._popupService.createChanel(this._chanelId);
  //   this._route.queryParams
  //     .subscribe(params => this._applyParamsChange(params));
  // }
  //
  // public closeModal(): void {
  //   this._router.navigate([{outlets: {modal: null}}], {queryParams: this._route.snapshot.queryParams});
  // }
  //
  // public createFaculty() {
  //   if (this.controlEntityService.form.invalid) return;
  //
  //   this.isLoading = true;
  //   this._controlService.createItem(this.controlEntityService.form.value)
  //     .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
  //     .add(() => this.closeModal());
  // }
  //
  // private _applyParamsChange(params: Params): void {
  //   this.controlEntityService.resetForm({group_semester: params.group_semester});
  // }
// }
