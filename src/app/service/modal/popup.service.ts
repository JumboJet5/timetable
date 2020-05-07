import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICustomDialog, IRequestParams } from '@interfaces';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PopupService {
  private _chanelsMap: Map<number, Subject<any>> = new Map<number, Subject<any>>();
  private unsubscribe: Subject<void> = new Subject();

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  public openDialog(data: ICustomDialog, onAccept: () => void = () => {}, onCancel: () => void = () => {}) {
    this.router.navigate([{outlets: {dialog: ['dialog', 'custom']}}], {state: {data}, queryParams: this.route.snapshot.queryParams})
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
    this.router.navigate([{outlets: {modal: ['modal', ...restUrl]}}], {state: {state}})
      .then(() => this.router.events
        .pipe(takeUntil(this.unsubscribe), filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.unsubscribe.next())
        .add(() => history.state.answer === 'accept' ? onAccept && onAccept() : onCancel && onCancel()));
  }

  public openReactiveModal(restUrl: (string | number)[], queryParams: IRequestParams = {}) {
    this.router.navigate([{outlets: {modal: ['modal', ...restUrl]}}], {queryParams});
  }

  public collectTrash(): void {
    this._chanelsMap.forEach((value, key) => value && !value.observers.length && this._chanelsMap.delete(key));
  }

  public closeModal(): void {
    if (this.router.url.includes('(modal:modal'))
      this.router.navigate([{outlets: {modal: null}}]);
  }

  public createChanel(id: number): void {
    if (!this._chanelsMap.has(id)) this._chanelsMap.set(id, new Subject<any>());
  }

  public getChanel(id: number): Observable<any> {
    this.collectTrash();
    if (!this._chanelsMap.has(id)) this._chanelsMap.set(id, new Subject<any>());
    return this._chanelsMap.get(id).asObservable();
  }

  public closeChanel(id: number, message?: any): boolean {
    const chanel = this._chanelsMap.get(id);

    if (!chanel) return false;
    if (!!message) this.sendMessage(id, message);
    this._chanelsMap.get(id).complete();
    this._chanelsMap.delete(id);
    return true;
  }

  public sendMessage(id: number, message: any): boolean {
    const chanel = this._chanelsMap.get(id);

    if (!chanel) return false;
    chanel.next(message);
    return true;
  }
}
