import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonTimeService } from '@app/service/lesson-time/lesson-time.service';
import { PopupService } from '@app/service/modal/popup.service';
import { PopupChanelEnum } from '@const/popup-chanel-enum';
import minMaxPair from 'src/core/validators/min-max-pair.validator';

@Component({
  selector: 'app-update-lessontime',
  templateUrl: './update-lessontime.component.html',
  styleUrls: [
    '../../../../core/stylesheet/modal.scss',
    '../../../../core/stylesheet/default-form.scss',
    './update-lessontime.component.scss',
  ],
})
export class UpdateLessontimeComponent implements OnInit {
  public createLessontimeForm: FormGroup = new FormGroup({
    faculty: new FormControl('', Validators.required),
    num: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    start: new FormControl(''),
    end: new FormControl(''),
    has_break: new FormControl(false, Validators.required),
    half_start: new FormControl({value: '', disabled: true}),
    half_end: new FormControl({value: '', disabled: true}),
  }, Validators.compose([
    minMaxPair('start', 'end', [Validators.required], [Validators.required]),
    minMaxPair('half_end', 'half_start', [Validators.required], [Validators.required]),
  ]));
  public isLoading = false;
  private _chanelId: number = PopupChanelEnum.UPDATE_LESSONTIME;
  private id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private lessonTimeService: LessonTimeService,
              private popupService: PopupService) { }

  public ngOnInit(): void {
    this.popupService.createChanel(this._chanelId);
    this.route.params.subscribe(() => this._applyParams());
  }

  public synchronizeDisableBreakRangeControls(hasBreak: boolean): void {
    const startBreak = this.createLessontimeForm.get('half_end');
    const endBreak = this.createLessontimeForm.get('half_start');

    if (!startBreak || !endBreak) return;

    startBreak.reset();
    endBreak.reset();
    if (hasBreak) {
      startBreak.enable();
      endBreak.enable();
    } else {
      startBreak.disable();
      endBreak.disable();
    }
  }

  public closeModal(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }

  public create() {
    if (this.createLessontimeForm.invalid) return;

    this.isLoading = true;
    this.lessonTimeService.updateLessonTime(this.id, this.createLessontimeForm.value)
      .subscribe(res => this.popupService.sendMessage(this._chanelId, res) && this.closeModal())
      .add(() => this.isLoading = false);
  }

  private _applyParams() {
    if (!this.route.snapshot.params.id) return;

    this.id = +this.route.snapshot.params.id;
    this.lessonTimeService.getLessonTime(this.id)
      .subscribe(lessonTime => {
        this.createLessontimeForm.reset(lessonTime);
        if (lessonTime.has_break) {
          this.createLessontimeForm.get('half_end').enable();
          this.createLessontimeForm.get('half_start').enable();
        }
      });
  }
}
