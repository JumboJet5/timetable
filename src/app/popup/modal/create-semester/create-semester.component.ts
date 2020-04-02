import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatService } from '@app/service/date-format/date-format.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SemesterService } from '@app/service/semester/semester.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: [
    '../../../../core/stylesheet/modal.scss',
    '../../../../core/stylesheet/default-form.scss',
    './create-semester.component.scss',
  ],
})
export class CreateSemesterComponent implements OnInit {
  public createSemesterForm: FormGroup = new FormGroup({
    num: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    year: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    from: new FormControl(''),
    to: new FormControl(''),
  });
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_SEMESTER;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private semesterService: SemesterService,
              public dateFormatService: DateFormatService,
              private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.queryParams
      .subscribe(() => this._applyQueryParams());
    this.createSemesterForm.get('from').valueChanges
      .subscribe(value => this.createSemesterForm.get('start').patchValue(this.dateFormatService.getDateString(value)));
    this.createSemesterForm.get('to').valueChanges
      .subscribe(value => this.createSemesterForm.get('end').patchValue(this.dateFormatService.getDateString(value)));
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.createSemesterForm.invalid) return;

    this.isLoading = true;
    this.createSemesterForm.get('year').enable();
    this.semesterService.createSemester(this.createSemesterForm.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);

    this._applyQueryParams();
  }

  private _applyQueryParams() {
    if (!this.route.snapshot.queryParams.year) return;

    this.createSemesterForm.patchValue({year: +this.route.snapshot.queryParams.year});
    this.createSemesterForm.get('year').disable();
  }
}
