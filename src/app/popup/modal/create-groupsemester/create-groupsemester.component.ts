import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsemesterService } from '@app/service/groupsemester/groupsemester.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-groupsemester',
  templateUrl: './create-groupsemester.component.html',
  styleUrls: ['../../../../core/stylesheet/modal.scss', './create-groupsemester.component.scss'],
})
export class CreateGroupsemesterComponent implements OnInit {
  public addSemesterToGroupForm: FormGroup = new FormGroup({
    group: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    show_lessons_number: new FormControl(true),
  });
  private _chanelId: number = PopupChanelEnum.ADD_SEMESTER_TO_GROUP;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private groupsemesterService: GroupsemesterService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.addSemesterToGroupForm.patchValue(this.route.snapshot.queryParams);
    this.route.queryParams
      .subscribe(params => this.addSemesterToGroupForm.patchValue(params));
  }

  public closeModal(answer: 'accept' | 'cancel' = 'cancel'): void {
    this.router.navigate([{outlets: {modal: null}}], {state: {answer}});
  }

  public create() {
    if (this.addSemesterToGroupForm.invalid) return;
    this.groupsemesterService.createGroupsemester(this.addSemesterToGroupForm.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal());
  }
}
