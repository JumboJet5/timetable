import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '@app/service/faculty/faculty.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IFaculty } from 'src/core/interfaces/faculty.interface';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
})
export class FacultyComponent implements OnInit, OnDestroy {
  public isEntityLoading = false;
  public faculty: IFaculty;
  public facultyId: number;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService,
              private _popupService: PopupService,
              private _facultyService: FacultyService) { }

  ngOnInit(): void {
    this._getFacultyByRoute();
  }

  public saveFaculty(faculty: IFaculty): void {
    this.isEntityLoading = true;
    this._facultyService.updateFaculty(this.facultyId, faculty)
      .subscribe(res => this.faculty = res)
      .add(() => this.isEntityLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити факультет?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._facultyService.deleteFaculty(this.facultyId)
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
    this.isEntityLoading = true;
    this._facultyService.getFaculty(this.facultyId)
      .subscribe(specialty => this.faculty = specialty)
      .add(() => this.isEntityLoading = false);
  }

  private _getFacultyByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this.facultyId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(specialtyId: number): void {
    this.facultyId = specialtyId;
    this._getCurrentFaculty();
  }
}
