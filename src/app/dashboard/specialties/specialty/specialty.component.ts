import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss'],
})
export class SpecialtyComponent implements OnInit, OnDestroy {
  public isEntityLoading = false;
  public specialty: ISpecialty;
  public specialtyId: number;
  private _unsubscribe: Subject<void> = new Subject();
  public coursesFilters: IFilterParams;
  public groupsFilters: IFilterParams;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService,
              private _popupService: PopupService,
              private _specialtyService: SpecialtyService) { }

  ngOnInit(): void {
    this._getSpecialtyByRoute();

    this._popupService.getChanel(PopupChanelEnum.CREATE_GROUP)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.groupsFilters = {...this.groupsFilters});

    this._popupService.getChanel(PopupChanelEnum.CREATE_COURSE)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.coursesFilters = {...this.coursesFilters});

  }

  public saveSpecialty(specialty: ISpecialty): void {
    this.isEntityLoading = true;
    this._specialtyService.updateSpecialty(this.specialtyId, specialty)
      .subscribe(res => this.specialty = res)
      .add(() => this.isEntityLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити спеціальність?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._specialtyService.deleteSpecialty(this.specialtyId)
        .subscribe(() => this._router.navigate(['dashboard', 'specialties'])));
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentSpecialty(): void {
    this.isEntityLoading = true;
    this._specialtyService.getSpecialty(this.specialtyId)
      .subscribe(specialty => this.specialty = specialty)
      .add(() => this.isEntityLoading = false);
  }

  private _getSpecialtyByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this.specialtyId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(specialtyId: number): void {
    this.specialtyId = specialtyId;
    this.groupsFilters = {specialty: this.specialtyId};
    this.coursesFilters = {specialty: this.specialtyId};
    this._getCurrentSpecialty();
  }

  public createGroup() {
    this._popupService.openReactiveModal(['create-group'], {specialty: this.specialtyId});
  }

  public createCourse() {
    this._popupService.openReactiveModal(['create-course'], {specialty: this.specialtyId});
  }
}
