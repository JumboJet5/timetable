import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { PopupService } from '@app/service/modal/popup.service';
import { GroupSelectComponent } from '@app/shared/menu-select/group-select/group-select.component';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-groupsemester',
  templateUrl: './create-groupsemester.component.html',
  styleUrls: [
    '../../../../core/stylesheet/modal.scss',
    '../../../../core/stylesheet/default-form.scss',
    './create-groupsemester.component.scss',
  ],
})
export class CreateGroupsemesterComponent implements OnInit {
  @ViewChild(GroupSelectComponent) groupSelect: GroupSelectComponent;
  public addSemesterToGroupForm: FormGroup = new FormGroup({
    group: new FormControl('', Validators.required),
    group_slug: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    show_lessons_number: new FormControl(true),
  });
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.ADD_SEMESTER_TO_GROUP;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private groupsemesterService: GroupsemesterService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.addSemesterToGroupForm.patchValue(this.route.snapshot.queryParams);
    this.route.queryParams
      .subscribe(params => this._applyQueryParams(params));

    this.addSemesterToGroupForm.get('group_slug').valueChanges
      .subscribe(value => this._synchronizeGroupSlugAndId(value));
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.addSemesterToGroupForm.invalid) return;

    this.isLoading = true;
    this.groupsemesterService.createGroupsemester(this.addSemesterToGroupForm.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  public createSemester() {
    const option = this.groupSelect.getOptionById(this.addSemesterToGroupForm.get('group_slug').value);
    if (!!option) this.popupService.openReactiveModal(['create-semester'], {year: option.year});
  }

  private _applyQueryParams(params: Params) {
    if (!this.route.snapshot.queryParams) return;

    this.addSemesterToGroupForm.patchValue({group: +params.group, group_slug: params.group_slug});
    if (!!params.group_slug) this.addSemesterToGroupForm.get('group_slug').disable();
  }

  private _synchronizeGroupSlugAndId(slug: string): void {
    const option = this.groupSelect.getOptionById(slug);
    this.addSemesterToGroupForm.patchValue({group: !!option ? option.id : undefined});
  }
}
