import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialtyService } from '@app/service/specialty/specialty.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss'],
})
export class SpecialtyComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public specialty: ISpecialty;
  private _unsubscribe: Subject<void> = new Subject();
  private _specialtyId: number;

  constructor(private _route: ActivatedRoute,
              private _specialtyService: SpecialtyService) { }

  ngOnInit(): void {
    this._getSpecialtyByRoute();
  }

  public saveSpecialty(specialty: ISpecialty): void {
    this.isLoading = true;
    this._specialtyService.updateSpecialty(this._specialtyId, specialty)
      .subscribe(res => this.specialty = res)
      .add(() => this.isLoading = false);
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  public log() {
    console.log('here');
  }

  private _getSpecialtyByRoute(): void {
    this._route.params
      .pipe(takeUntil(this._unsubscribe))
      .pipe(filter(params => +params.id !== this._specialtyId))
      .pipe(tap(params => this._specialtyId = params.id))
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(() => this._specialtyService.getSpecialty(this._specialtyId)))
      .subscribe(res => {
        this.specialty = res;
        this.isLoading = false;
      });
  }
}
