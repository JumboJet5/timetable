import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILessonTime } from 'src/core/interfaces/lesson-time.interface';
import minMaxPair from 'src/core/validators/min-max-pair.validator';

@Injectable()
export class LessontimeEntityService {
  public form: FormGroup = new FormGroup({
    faculty: new FormControl('', Validators.required),
    num: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    start: new FormControl(''),
    end: new FormControl(''),
    has_break: new FormControl(false, Validators.required),
    half_start: new FormControl(''),
    half_end: new FormControl(''),
  }, Validators.compose([
    minMaxPair('start', 'end', [Validators.required], [Validators.required]),
    minMaxPair('half_end', 'half_start', [Validators.required], [Validators.required]),
  ]));

  public synchronizeDisableBreakRangeControls(): void {
    const startBreak = this.form.get('half_end');
    const endBreak = this.form.get('half_start');

    if (!startBreak || !endBreak) return;

    if (this.form.value.has_break) {
      startBreak.enable();
      endBreak.enable();
    } else {
      startBreak.reset();
      endBreak.reset();
      startBreak.disable();
      endBreak.disable();
    }
  }

  public resetForm(lessontime: Partial<ILessonTime>): void {
    this.form.patchValue(lessontime);
    if (lessontime.faculty) this.form.get('faculty').disable({onlySelf: true});
    this.synchronizeDisableBreakRangeControls();
  }

  public getFormValue(): ILessonTime {
    this.form.get('faculty').enable();
    const result = this.form.value;
    if (this.form.value.faculty) this.form.get('faculty').disable({onlySelf: true});
    return result;
  }
}
