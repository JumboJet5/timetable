import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IFaculty } from 'src/core/interfaces/faculty.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
})
export class FacultyComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public faculty: IFaculty;
  public facultyId: number;
  public specialtyFilters: IFilterParams;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService,
              private _popupService: PopupService,
              private _facultyService: FacultyService) { }

  ngOnInit(): void {
    this._getFacultyByRoute();

    this._popupService.getChanel(PopupChanelEnum.CREATE_SPECIALTY)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.specialtyFilters = {...this.specialtyFilters});
  }

  public saveFaculty(faculty: IFaculty): void {
    this.isLoading = true;
    this._facultyService.updateItem(this.facultyId, faculty)
      .subscribe(res => this.faculty = res)
      .add(() => this.isLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити факультет?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._facultyService.deleteItem(this.facultyId)
        .subscribe(() => this._router.navigate(['dashboard', 'faculties'])));
  }

  public createSpecialty() {
    this._popupService.openReactiveModal(['create-specialty'], {faculty: this.facultyId});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentFaculty(): void {
    this.isLoading = true;
    this._facultyService.getItem(this.facultyId)
      .subscribe(specialty => this.faculty = specialty)
      .add(() => this.isLoading = false);
  }

  private _getFacultyByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this.facultyId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(facultyId: number): void {
    this.facultyId = facultyId;
    this.specialtyFilters = {faculty: this.facultyId};
    this._getCurrentFaculty();
  }
}
