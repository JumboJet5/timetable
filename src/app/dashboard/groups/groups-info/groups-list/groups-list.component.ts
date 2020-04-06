import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { degreeMap } from '@const/collections';
import { IGroup } from 'src/core/interfaces/group.interface';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  @Input() public groups: IGroup[] = [];
  @Input() public isLoading = false;
  @Output() public onScrollToBottom: EventEmitter<void> = new EventEmitter<void>();
  public degreeMap = degreeMap();

  constructor() { }

  ngOnInit(): void {
  }

}
