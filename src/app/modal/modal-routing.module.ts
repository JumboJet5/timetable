import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonEditorComponent } from 'src/app/modal/lesson-editor/lesson-editor.component';

const routes: Routes = [
  {path: 'lesson/:lessonId', component: LessonEditorComponent},
  {path: 'lesson/', component: LessonEditorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
