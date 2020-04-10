import { Component, Host, HostListener, OnInit } from '@angular/core';
import { AccordionComponent } from '@app/shared/accordion/accordion.component';

@Component({
  selector: 'app-accordion-header',
  templateUrl: './accordion-header.component.html',
  styleUrls: ['./accordion-header.component.scss'],
})
export class AccordionHeaderComponent implements OnInit {

  constructor(@Host() public parent: AccordionComponent) { }

  ngOnInit(): void {
  }

  @HostListener('click')
  public onClick() {
    if (this.parent) this.parent.isOpened = !this.parent.isOpened;
  }
}
