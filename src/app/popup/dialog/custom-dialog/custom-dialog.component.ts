import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomDialog } from '@interfaces';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['../../../../core/stylesheet/modal.scss', './custom-dialog.component.scss'],
})
export class CustomDialogComponent implements OnInit {
  public data: ICustomDialog;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.data = history.state.data || this.closeModal();
  }

  public closeModal(answer: 'accept' | 'cancel' = 'cancel'): void {
    this.router.navigate([{outlets: {dialog: null}}], {state: {answer}, queryParams: this.route.snapshot.queryParams});
  }
}
