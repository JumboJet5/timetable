import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { accordionTransitionAnimation } from '@animations/accordion.animation';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['../../../core/stylesheet/default-form.scss', './accordion.component.scss'],
  animations: [accordionTransitionAnimation],
})
export class AccordionComponent implements OnInit {
  @Output() public isOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  private _isOpened = false;

  public get isOpened(): boolean {
    return this._isOpened;
  }

  @Input()
  public set isOpened(value: boolean) {
    this._isOpened = value;
    this.isOpenedChange.emit(value);
  }

  ngOnInit(): void {
  }

}
