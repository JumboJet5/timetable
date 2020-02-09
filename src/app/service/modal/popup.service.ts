import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ICustomDialog } from '@interfaces';

@Injectable()
export class PopupService {
  private unsubscribe: Subject<void> = new Subject();

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

  public openModal(restUrl: string[], onAccept: () => void = () => {}, onCancel: () => void = () => {}, state?: any) {
    this.router.navigate([{outlets: {modal: ['modal', ...restUrl]}}], {state: {state}})
      .then(() => this.router.events
        .pipe(takeUntil(this.unsubscribe), filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.unsubscribe.next())
        .add(() => history.state.answer === 'accept' ? onAccept && onAccept() : onCancel && onCancel()));
  }

  public closeModal(): void {
    if (this.router.url.includes('(modal:modal'))
      this.router.navigate([{outlets: {modal: null}}]);
  }
}
