import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDialogComponent } from '@app/popup/dialog/custom-dialog/custom-dialog.component';


const routes: Routes = [
  {path: 'custom', component: CustomDialogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogRoutingModule {}
