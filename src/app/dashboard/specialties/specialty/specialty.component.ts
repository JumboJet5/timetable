import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@app/service/course/course.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { ThemeService } from '@app/service/theme/theme.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss'],
})
export class SpecialtyComponent implements OnInit, OnDestroy {
  public isEntityLoading = false;
  public isThemeLoading = false;
  public isLogoUpdating = false;
  public specialty: ISpecialty;
  public themes: ITheme[];
  private _unsubscribe: Subject<void> = new Subject();
  private _specialtyId: number;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _themeService: ThemeService,
              private _courseService: CourseService,
              private _groupService: GroupService,
              private _popupService: PopupService,
              private _specialtyService: SpecialtyService) { }

  ngOnInit(): void {
    this._getSpecialtyByRoute();
  }

  public saveSpecialty(specialty: ISpecialty): void {
    this.isEntityLoading = true;
    this._specialtyService.updateSpecialty(this._specialtyId, specialty)
      .subscribe(res => this.specialty = res)
      .add(() => this.isEntityLoading = false);
  }

  public saveImage(file: File) {
    this.isLogoUpdating = true;
    this._specialtyService.updateLogo(this.specialty.id, file)
      .subscribe(imgPath => this.specialty.img = imgPath)
      .add(() => this.isLogoUpdating = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити спеціальність?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._specialtyService.deleteSpecialty(this._specialtyId)
        .subscribe(() => this._router.navigate(['dashboard', 'specialties'])));
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentSpecialty(): void {
    this.isEntityLoading = true;
    this._specialtyService.getSpecialty(this._specialtyId)
      .subscribe(specialty => this.specialty = specialty)
      .add(() => this.isEntityLoading = false);
  }

  private _loadSpecialtyThemes(): void {
    this.isThemeLoading = false;
    this._themeService.getThemes({specialty: this._specialtyId})
      .subscribe(res => this.themes = res.results)
      .add(() => this.isThemeLoading = false);
  }

  private _getSpecialtyByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this._specialtyId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(specialtyId: number): void {
    this._specialtyId = specialtyId;
    this._loadSpecialtyThemes();
    this._getCurrentSpecialty();
  }
}
