import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@app/service/course/course.service';
import { GroupService } from '@app/service/group/group.service';
import { PopupService } from '@app/service/modal/popup.service';
import { degreeMap } from '@const/collections';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ICourse } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  public isEntityLoading = false;
  public course: ICourse;
  public courseId: number;
  public degreeMap = degreeMap();
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _courseService: CourseService,
              private _groupService: GroupService,
              private _popupService: PopupService) { }

  ngOnInit(): void {
    this._getCourseByRoute();
  }

  public saveCourse(course: ICourse): void {
    this.isEntityLoading = true;
    this._courseService.updateCourse(this.courseId, course)
      .subscribe(res => this.course = res)
      .add(() => this.isEntityLoading = false);
  }

  public delete() {
    this._popupService.openDialog({
        header: 'Вилучити курс?',
        body: 'Видалення несе невідворотній характер, та може спричинити нестабільну роботу системи.\n\rВи впевнані?',
      },
      () => this._courseService.deleteCourse(this.courseId)
        .subscribe(() => this._router.navigate(['dashboard', 'specialties', this.course.specialty])));
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private _getCurrentCourse(): void {
    this.isEntityLoading = true;
    this._courseService.getCourse(this.courseId)
      .subscribe(course => this.course = course)
      .add(() => this.isEntityLoading = false);
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
    this._getCurrentCourse();
  }
}