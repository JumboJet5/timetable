import { Component, Input } from '@angular/core';
import { TeacherEntityService } from '@app/service/teacher-entity/teacher-entity.service';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { ITeacher } from 'src/core/interfaces/teacher.interface';

@Component({
  selector: 'app-smart-teacher-entity',
  templateUrl: './smart-teacher-entity.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './smart-teacher-entity.component.scss'],
  providers: [TeacherEntityService],
})
export class SmartTeacherEntityComponent {
  public isLoading = false;

  constructor(private teacherService: TeacherService,
              public teacherEntityService: TeacherEntityService) { }

  private _teacher: ITeacher;

  public get teacher(): ITeacher {
    return this._teacher;
  }

  @Input()
  public set teacher(value: ITeacher) {
    this._teacher = value;
    this.reset();
  }

  public save() {
    if (this.teacherEntityService.form.invalid || !this.teacher) return;

    this.isLoading = true;
    this.teacherService.updateItem(this.teacher.id, this.teacherEntityService.form.value)
      .subscribe(res => Object.assign(this.teacher, res))
      .add(() => this.isLoading = false);
  }

  public reset() {
    this.teacherEntityService.resetForm(this.teacher);
  }
}
