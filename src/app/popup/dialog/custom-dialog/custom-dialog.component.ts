import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent implements OnInit {
  // public data: DefaultModalInterface;
  // private _answer: 'accept' | 'cancel' = 'cancel';
  //
  // constructor(private router: Router) {
  // }
  //
  public ngOnInit(): void {
    // this.data = history.state.data || this.closeModal();
  }
  //
  // public onCancel(): void {
  //   this.closeModal();
  // }
  //
  // public onAccept(): void {
  //   this._answer = 'accept';
  //   this.closeModal();
  // }
  //
  // private closeModal(): void {
  //   this.router.navigate([{outlets: {modals: null}}], {state: {answer: this._answer}});
  // }
}
