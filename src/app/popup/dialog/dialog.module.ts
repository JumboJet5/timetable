import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { CustomDialogComponent } from '@app/popup/dialog/custom-dialog/custom-dialog.component';
import { DialogRoutingModule } from 'src/app/popup/dialog/dialog-routing.module';


@NgModule({
  declarations: [CustomDialogComponent],
  imports: [
    CommonModule,
    DialogRoutingModule,
    MatButtonModule
  ]
})
export class DialogModule {}
