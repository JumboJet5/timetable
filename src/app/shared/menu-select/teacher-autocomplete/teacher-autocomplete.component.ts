import { Component, ElementRef, ViewChild } from '@angular/core';
import { TeacherService } from '@app/service/teacher/teacher.service';
import { TeacherSelectComponent } from '@app/shared/menu-select/teacher-select/teacher-select.component';

@Component({
  selector: 'app-teacher-autocomplete',
  templateUrl: './teacher-autocomplete.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss', './teacher-autocomplete.component.scss'],
  providers: [TeacherService],
})
export class TeacherAutocompleteComponent extends TeacherSelectComponent {
  @ViewChild('searchInput') search: ElementRef<HTMLInputElement>;
  public multiple = true;

  public isOptionHidden(value: number): boolean {
    return !!this.selectControl.value && this.selectControl.value.includes(value);
  }

  public onFocus() {
    this.search.nativeElement.focus();
  }

  public onDeleteOption(option: number): void {
    const currentValue = this.selectControl.value;
    if (currentValue && currentValue instanceof Array) this.selectControl.patchValue(currentValue.filter(
      item => item !== option));
  }
}
