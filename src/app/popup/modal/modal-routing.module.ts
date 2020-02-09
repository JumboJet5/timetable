import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonEditorComponent } from '@app/popup/modal/lesson-editor/lesson-editor.component';

const routes: Routes = [
  {path: 'lesson/:lessonId/:groupSlug', component: LessonEditorComponent},
  {path: 'lesson/:groupSlug', component: LessonEditorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
