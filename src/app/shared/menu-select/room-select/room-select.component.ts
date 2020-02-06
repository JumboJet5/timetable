import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RoomService } from 'src/app/service/room/room.service';
import { AsyncOptionsSelectComponent, optionServiceFactory } from '../loaded-options/async-options-select.component';


@Component({
  selector: 'app-room-select',
  templateUrl: '../loaded-options/async-options-select.component.html',
  styleUrls: ['../loaded-options/async-options-select.component.scss'],
  providers: [RoomService]
})
export class RoomSelectComponent extends AsyncOptionsSelectComponent<any> {
  constructor(public roomService: RoomService,
              protected formBuilder: FormBuilder) {
    super(optionServiceFactory<any>(id => roomService.getRoom(id),
      params => roomService.getRooms(params)), formBuilder);
    this.simplePlaceholder = 'Оберіть аудиторію';
    this.simplePlaceholder = 'Оберіть аудиторії';
    this.withSearch = true;
  }

  public getOptionText(id: number) {
    return this.getOptionById(id) ? this.getOptionById(id).num : '';
  }
}
