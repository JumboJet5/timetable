import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupEntityService } from '@app/service/group-entity/group-entity.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-group.component.scss'],
  providers: [GroupEntityService],
})
export class CreateGroupComponent implements OnInit { // todo write create entity super class
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_GROUP;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public groupEntityService: GroupEntityService,
              private _popupService: PopupService,
              private _groupService: GroupService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }

  public createFaculty() {
    this.isLoading = true;
    this._groupService.createItem(this.groupEntityService.form.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.groupEntityService.resetForm({univ: +params.univ, faculty: +params.faculty, specialty: +params.specialty, course: +params.course});
  }
}
