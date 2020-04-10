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
  @Input() public isOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

}
