import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { degreeMap } from '@const/collections';
import { ICourse } from 'src/core/interfaces/course.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  @Input() public courses: ICourse[] = [];
  @Input() public isLoading = false;
  @Output() public onScrollToBottom: EventEmitter<void> = new EventEmitter<void>();
  public degreeMap = degreeMap();

  constructor() { }

  ngOnInit(): void {
  }

}
