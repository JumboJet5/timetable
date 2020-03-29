import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGroupsemesterComponent } from '@app/popup/modal/create-groupsemester/create-groupsemester.component';
import { LessonEditorComponent } from '@app/popup/modal/lesson-editor/lesson-editor.component';

const routes: Routes = [
  {path: 'lesson/:groupSlug/:lessonId', component: LessonEditorComponent},
  {path: 'lesson/:groupSlug', redirectTo: ''},
  {path: 'add-lesson/:groupSlug/:day/:time/:groupsemesterId', component: LessonEditorComponent},
  {path: 'add-semester-to-group', component: CreateGroupsemesterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
