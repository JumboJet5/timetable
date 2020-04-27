import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { UniversityService } from '@app/service/universitiy/university.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { IUniversity } from 'src/core/interfaces/university';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit, OnDestroy {
  public isEntityLoading = false;
  public university: IUniversity;
  public univId: number;
  public facultyFilters: IFilterParams;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService,
              private _popupService: PopupService,
              private _universityService: UniversityService) { }

  ngOnInit(): void {
    this._getFacultyByRoute();

    this._popupService.getChanel(PopupChanelEnum.CREATE_GROUP)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.facultyFilters = {...this.facultyFilters});
  }

  public saveUniversity(faculty: IUniversity): void {
    this.isEntityLoading = true;
    this._universityService.updateUniversity(this.univId, faculty)
      .subscribe(res => this.university = res)
      .add(() => this.isEntityLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити університет?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._universityService.deleteUniversity(this.univId)
        .subscribe(() => this._router.navigate(['dashboard', 'universities'])));
  }

  public createFaculty() {
    this._popupService.openReactiveModal(['create-faculty'], {univ: this.univId});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentFaculty(): void {
    this.isEntityLoading = true;
    this._universityService.getUniversity(this.univId)
      .subscribe(specialty => this.university = specialty)
      .add(() => this.isEntityLoading = false);
  }

  private _getFacultyByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this.univId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(univId: number): void {
    this.univId = univId;
    this.facultyFilters = {univ: univId};
    this._getCurrentFaculty();
  }
}
