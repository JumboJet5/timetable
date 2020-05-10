import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterEntityService } from '@app/service/semester-entity/semester-entity.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-semester.component.scss'],
  providers: [SemesterEntityService],
})
export class CreateSemesterComponent implements OnInit {
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_SEMESTER;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private semesterService: SemesterService,
              public semesterEntityService: SemesterEntityService,
              public dateFormatService: DateFormatService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams
      .subscribe(() => this._applyQueryParams());
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}], {queryParams: this.route.snapshot.queryParams});
  }

  public create() {
    if (this.semesterEntityService.form.invalid) return;

    this.isLoading = true;
    this.semesterService.createSemester(this.semesterEntityService.getFormValue())
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyQueryParams() {
    this.semesterEntityService.resetForm({year: +this.route.snapshot.queryParams.year});
  }
}
