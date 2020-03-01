import { Component, OnInit } from '@angular/core';
import { INavPanel } from 'src/core/interfaces/nav-panel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public navPanels: INavPanel[] = [
    {title: 'Розклад', link: '/dashboard/lessons-schedule', image: 'calendar_today'},
    {title: 'Групи', link: '/dashboard/groups', image: 'people_alt'},
    {title: 'Університети', link: '/dashboard/universities', image: 'account_balance'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
