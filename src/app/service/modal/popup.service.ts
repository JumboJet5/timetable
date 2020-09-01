import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ICustomDialog } from '@interfaces';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable()
export class PopupService {
  private unsubscribe: Subject<void> = new Subject();
  private _dialogAnswerAccept: () => void;
  private _dialogAnswerCancel: () => void;
  private _modalAnswerAccept: () => void;
  private _modalAnswerCancel: () => void;

  constructor(private router: Router) { }

  public openDialog(data: ICustomDialog, onAccept: () => void = () => {}, onCancel: () => void = () => {}) {
    this.router.navigate([{outlets: {dialog: ['dialog', 'custom']}}], {state: {data}})
      .then(() => this.router.events
        .pipe(takeUntil(this.unsubscribe), filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.unsubscribe.next())
        .add(() => history.state.answer === 'accept' ? onAccept && onAccept() : onCancel && onCancel()));
  }

  public closeDialog(): void {
    if (this.router.url.includes('(dialog:dialog/custom'))
      this.router.navigate([{outlets: {dialog: null}}]);
  }

  public openModal(restUrl: (string | number)[],
                   onAccept: () => void = () => {},
                   onCancel: () => void = () => {},
                   state?: any) {
    this.router.navigate([{outlets: {modal: ['modal', ...restUrl]}}], {state: {state}});
    this._modalAnswerAccept = onAccept;
    this._modalAnswerCancel = onCancel;
  }

  public closeModal(answer: 'accept' | 'cancel' = 'cancel'): void {
    if (answer === 'accept' && !!this._modalAnswerAccept) this._modalAnswerAccept();
    else if (answer === 'cancel' && !!this._modalAnswerCancel) this._modalAnswerCancel();

    this._modalAnswerCancel = null;
    this._modalAnswerCancel = null;
    window.history.back();
  }
}
