import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@app/service/course/course.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { degreeMap } from '@const/collections';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ICourse } from 'src/core/interfaces/course.interface';
import { IFilterParams } from 'src/core/interfaces/request-param.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: [
    '../../../../core/stylesheet/loader.scss',
    './course.component.scss',
  ],
})
export class CourseComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public course: ICourse;
  public courseId: number;
  public degreeMap = degreeMap();
  public groupsFilters: IFilterParams;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _courseService: CourseService,
              private _groupService: GroupService,
              private _popupService: PopupService) { }

  ngOnInit(): void {
    this._getCourseByRoute();

    this._popupService.getChanel(PopupChanelEnum.CREATE_GROUP)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => this.groupsFilters = {...this.groupsFilters});
  }

  public saveCourse(course: ICourse): void {
    this.isLoading = true;
    this._courseService.updateItem(this.courseId, course)
      .subscribe(res => this.course = res)
      .add(() => this.isLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити курс?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._courseService.deleteItem(this.courseId)
        .subscribe(() => this._router.navigate(['dashboard', 'specialties', this.course.specialty])));
  }

  public createGroup() {
    this._popupService.openReactiveModal(['create-group'], {course: this.courseId});
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentCourse(): void {
    this.isLoading = true;
    this._courseService.getItem(this.courseId)
      .subscribe(course => this.course = course)
      .add(() => this.isLoading = false);
  }

  private _getCourseByRoute(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe),
        filter(params => +params.id !== this.courseId),
      )
      .subscribe(params => this._updateContent(+params.id));
  }

  private _updateContent(courseId: number): void {
    this.courseId = courseId;
    this.groupsFilters = {course: this.courseId};
    this._getCurrentCourse();
  }
}
