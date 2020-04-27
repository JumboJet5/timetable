import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['../../../../core/stylesheet/modal.scss', './modal-wrapper.component.scss'],
})
export class ModalWrapperComponent {
  @Input() public isLoading = false;

  constructor(private _router: Router) { }

  public closeModal(): void {
    this._router.navigate([{outlets: {modal: null}}]);
  }
}
