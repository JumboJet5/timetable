import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/service/modal/popup.service';
import { UniversityService } from '@app/service/universitiy/university.service';
import { UniversityEntityService } from '@app/service/university-entity/university-entity.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-university',
  templateUrl: './create-university.component.html',
  styleUrls: [
    '../../../../core/stylesheet/default-form.scss',
    '../../../../core/stylesheet/modal.scss',
    './create-university.component.scss',
  ],
  providers: [UniversityEntityService],
})
export class CreateUniversityComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_UNIVERSITY;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public universityEntityService: UniversityEntityService,
              private _popupService: PopupService,
              private _universityService: UniversityService) { }

  public ngOnInit(): void {
    this._popupService.createChanel(this._chanelId);
  }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }

  public createUniversity() {
    this.isLoading = true;
    this._universityService.createUniversity(this.universityEntityService.form.value)
      .subscribe(university => this._popupService.sendMessage(this._chanelId, university))
      .add(() => this.closeModal());
  }
}
