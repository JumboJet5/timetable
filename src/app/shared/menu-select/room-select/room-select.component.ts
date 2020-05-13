import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { RoomService } from 'src/app/service/room/room.service';
import { IRoom } from 'src/core/interfaces/room.interface';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';


@Component({
  selector: 'app-room-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class RoomSelectComponent extends AsyncSelectorWithFiltersComponent<IRoom> {
  constructor(public roomService: RoomService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<any>(id => roomService.getItem(id),
      params => roomService.getItems(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть аудиторію';
    this.multiplePlaceholder = 'Оберіть аудиторії';
    this.withSearch = true;
  }

  public getOptionText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).num : '';
  }
}
