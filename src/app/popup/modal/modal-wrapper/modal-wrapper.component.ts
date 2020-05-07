import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['../../../../core/stylesheet/modal.scss', './modal-wrapper.component.scss'],
})
export class ModalWrapperComponent {
  @Input() public isLoading = false;
  @Input() public withQueryParamsClose = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute) { }

  public closeModal(): void {
    const queryParams = this.withQueryParamsClose ? this._route.snapshot.queryParams : {};
    this._router.navigate([{outlets: {modal: null}}], {queryParams});
  }
}
