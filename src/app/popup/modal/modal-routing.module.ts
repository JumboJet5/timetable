import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHousingComponent } from '@app/popup/modal/create-housing/create-housing.component';
import { CreateFacultyComponent } from '@app/popup/modal/create-faculty/create-faculty.component';
import { CreateGroupsemesterComponent } from '@app/popup/modal/create-groupsemester/create-groupsemester.component';
import { CreateLessontimeComponent } from '@app/popup/modal/create-lessontime/create-lessontime.component';
import { CreateSemesterComponent } from '@app/popup/modal/create-semester/create-semester.component';
import { CreateSpecialtyComponent } from '@app/popup/modal/create-specialty/create-specialty.component';
import { LessonEditorComponent } from '@app/popup/modal/lesson-editor/lesson-editor.component';
import { UpdateLessontimeComponent } from '@app/popup/modal/update-lessontime/update-lessontime.component';

const routes: Routes = [
  {path: 'lesson/:groupSlug/:lessonId', component: LessonEditorComponent},
  {path: 'lesson/:groupSlug', redirectTo: ''},
  {path: 'add-lesson/:groupSlug/:day/:time/:groupsemesterId', component: LessonEditorComponent},
  {path: 'add-semester-to-group', component: CreateGroupsemesterComponent},
  {path: 'create-semester', component: CreateSemesterComponent},
  {path: 'create-lessontime', component: CreateLessontimeComponent},
  {path: 'update-lessontime/:id', component: UpdateLessontimeComponent},
  {path: 'create-specialty', component: CreateSpecialtyComponent},
  {path: 'create-faculty', component: CreateFacultyComponent},
  {path: 'create-housing', component: CreateHousingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRoutingModule {}
