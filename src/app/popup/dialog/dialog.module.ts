import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomDialogComponent } from '@app/popup/dialog/custom-dialog/custom-dialog.component';
import { DialogRoutingModule } from 'src/app/popup/dialog/dialog-routing.module';


@NgModule({
  declarations: [CustomDialogComponent],
  imports: [
    CommonModule,
    DialogRoutingModule
  ]
})
export class DialogModule {}
