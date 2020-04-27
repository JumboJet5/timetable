import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseEntityService } from '@app/service/course-entity/course-entity.service';
import { CourseService } from '@app/service/course/course.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './create-course.component.scss'],
  providers: [CourseEntityService],
})
export class CreateCourseComponent implements OnInit {
  @Input() public isLogoUpdating = false;
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.CREATE_COURSE;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public courseEntityService: CourseEntityService,
              private _popupService: PopupService,
              private _courseService: CourseService) { }

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
    this._courseService.createCourse(this.courseEntityService.form.value)
      .subscribe(faculty => this._popupService.sendMessage(this._chanelId, faculty))
      .add(() => this.closeModal());
  }

  private _applyParamsChange(params: Params): void {
    this.courseEntityService.resetForm({univ: +params.univ, faculty: +params.faculty, specialty: +params.specialty});
  }
}
