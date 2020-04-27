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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private groupsemesterService: GroupsemesterService,
              public groupsemesterEntityService: GroupsemesterEntityService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.groupsemesterEntityService.form.patchValue(this.route.snapshot.queryParams);
    this.route.queryParams
      .subscribe(params => this._applyQueryParams(params));
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.groupsemesterEntityService.form.invalid) return;

    this.isLoading = true;
    this.groupsemesterService.createGroupsemester(this.groupsemesterEntityService.getFormValue())
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  public createSemester() {
    const option = this.groupSelect.getSelectedOption();
    if (!!option) this.popupService.openReactiveModal(['create-semester'], {year: option.year});
  }

  private _applyQueryParams(params: Params) {
    this.groupsemesterEntityService.resetForm({group: +params.group});
  }
}
