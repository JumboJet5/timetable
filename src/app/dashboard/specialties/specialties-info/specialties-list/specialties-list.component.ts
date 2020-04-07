import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISpecialty } from 'src/core/interfaces/specialty.interface';

@Component({
  selector: 'app-specialties-list',
  templateUrl: './specialties-list.component.html',
  styleUrls: ['./specialties-list.component.scss'],
})
export class SpecialtiesListComponent implements OnInit {
  @Input() public specialties: ISpecialty[] = [];
  @Input() public isLoading = false;
  @Output() public onScrollToBottom: EventEmitter<void> = new EventEmitter<void>();

  // public degreeMap = degreeMap();

  constructor() { }

  ngOnInit(): void {
  }

}
