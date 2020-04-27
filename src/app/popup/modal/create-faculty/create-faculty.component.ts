import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyEntityService } from '@app/service/faculty-entity/faculty-entity.service';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-faculty.component.scss'],
  providers: [FacultyEntityService],
})
export class CreateFacultyComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_FACULTY;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public facultyEntityService: FacultyEntityService,
              private _popupService: PopupService,
              private _facultyService: FacultyService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
    this._applyParamsChange(this._route.snapshot.queryParams);
    this._route.queryParams
      .subscribe(params => this._applyParamsChange(params));
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }

  public createFaculty() {
    this.isLoading = true;
    this._facultyService.createFaculty(this.facultyEntityService.form.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.facultyEntityService.resetForm({univ: +params.univ});
  }
}
