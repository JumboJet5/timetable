import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupsemesterEntityService } from '@app/service/groupsemester-entity/groupsemester-entity.service';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { PopupService } from '@app/service/modal/popup.service';
import { GroupSelectComponent } from '@app/shared/menu-select/group-select/group-select.component';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-groupsemester',
  templateUrl: './create-groupsemester.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-groupsemester.component.scss'],
  providers: [GroupsemesterEntityService],
})
export class CreateGroupsemesterComponent implements OnInit {
  @ViewChild(GroupSelectComponent) groupSelect: GroupSelectComponent;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.ADD_SEMESTER_TO_GROUP;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupsemesterService: GroupsemesterService,
              private _popupService: PopupService,
              public _groupsemesterEntityService: GroupsemesterEntityService) { }

  ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._groupsemesterEntityService.form.patchValue(this._route.snapshot.queryParams);
    this._route.queryParams
      .subscribe(params => this._applyQueryParams(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this._groupsemesterEntityService.form.invalid) return;

    this.isLoading = true;
    this._groupsemesterService.createGroupsemester(this._groupsemesterEntityService.getFormValue())
      .subscribe(res => this._popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  public createSemester() {
    const option = this.groupSelect.getSelectedOption();
    if (!!option) this._popupService.openReactiveModal(['create-semester'], {year: option.year});
  }

  private _applyQueryParams(params: Params) {
    this._groupsemesterEntityService.resetForm({group: +params.group});
  }
}
