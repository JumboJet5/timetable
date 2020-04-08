import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGroupsemesterComponent } from '@app/popup/modal/create-groupsemester/create-groupsemester.component';
import { CreateLessontimeComponent } from '@app/popup/modal/create-lessontime/create-lessontime.component';
import { CreateSemesterComponent } from '@app/popup/modal/create-semester/create-semester.component';
import { CreateSpecialtyComponent } from '@app/popup/modal/create-specialty/create-specialty.component';
import { LessonEditorComponent } from '@app/popup/modal/lesson-editor/lesson-editor.component';

const routes: Routes = [
  {path: 'lesson/:groupSlug/:lessonId', component: LessonEditorComponent},
  {path: 'lesson/:groupSlug', redirectTo: ''},
  {path: 'add-lesson/:groupSlug/:day/:time/:groupsemesterId', component: LessonEditorComponent},
  {path: 'add-semester-to-group', component: CreateGroupsemesterComponent},
  {path: 'create-semester', component: CreateSemesterComponent},
  {path: 'create-lessontime', component: CreateLessontimeComponent},
  {path: 'create-specialty', component: CreateSpecialtyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
