import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { ISemester } from 'src/core/interfaces/semester.interface';

@Component({
  selector: 'app-enabled-semesters',
  templateUrl: './enabled-semesters.component.html',
  styleUrls: ['../../../../../core/stylesheet/items-list.scss', './enabled-semesters.component.scss'],
})
export class EnabledSemestersComponent {
  @Output() public currGroupsemesterChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() public currGroupsemester: number;
  @Input() public groupsemesters: IGroupsemester[];
  private semestersMap: Map<number, ISemester> = new Map<number, ISemester>();

  @Input()
  public set semesters(value: ISemester[]) {
    this.semestersMap.clear();
    (value || []).forEach(semester => !!semester && this.semestersMap.set(semester.id, semester));
  }
}
