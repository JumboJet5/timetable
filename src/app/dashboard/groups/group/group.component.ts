import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@app/service/group/group.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../../../core/stylesheet/default-form.scss', './group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy {
  public groupEntityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    short_name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^{., }]+$/)])),
    subgroups: new FormControl('', Validators.min(0)),
    slug: new FormControl('', Validators.pattern(/^[^{., }]+$/)),
    univ: new FormControl('', Validators.required),
  });
  private _groupSlug: string;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _groupService: GroupService) { }

  private _group: IGroup;

  public get group(): IGroup {
    return this._group;
  }

  public set group(value: IGroup) {
    this._group = value;
    this.groupEntityForm.reset(value);
    console.log(value, this.groupEntityForm.value);
  }

  ngOnInit(): void {
    this._route.params
      .pipe(takeUntil(this._unsubscribe))
      .pipe(filter(params => params.groupSlug !== this._groupSlug))
      .pipe(tap(params => this._groupSlug = params.groupSlug))
      .pipe(switchMap(() => this._groupService.getGroup(this._groupSlug)))
      .subscribe(res => this.group = res);
  }

  public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
    control = control || (formGroup ? formGroup.get(controlName) : undefined);
    return control && (control.valid || control.untouched);
  }

  public getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup ? formGroup.get(controlName) : undefined;
    if (this.isControlValid(formGroup, controlName, control)) return '';
    if (control.errors.required) return 'Обов`язкове поле';
    if (control.errors.pattern) return 'Поле не відповідає патерну';
    if (control.errors.min) return 'Недостатньо велике число';
    return 'Не валідне поле';
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
