import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormatService } from '@app/service/format/format.service';
import { RoomService } from 'src/app/service/room/room.service';
import { optionServiceFactory } from '../async-options-select/async-options-select.component';
import { AsyncSelectorWithFiltersComponent } from '../async-selector-with-filters/async-selector-with-filters.component';


@Component({
  selector: 'app-room-select',
  templateUrl: '../async-options-select/async-options-select.component.html',
  styleUrls: ['../async-options-select/async-options-select.component.scss'],
})
export class RoomSelectComponent extends AsyncSelectorWithFiltersComponent<any> {
  constructor(public roomService: RoomService,
              protected formBuilder: FormBuilder,
              protected formatService: FormatService) {
    super(optionServiceFactory<any>(id => roomService.getRoom(id),
      params => roomService.getRooms(params)), formBuilder, formatService);
    this.simplePlaceholder = 'Оберіть аудиторію';
    this.multiplePlaceholder = 'Оберіть аудиторії';
    this.withSearch = true;
  }

  public getOptionText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).num : '';
  }
}
