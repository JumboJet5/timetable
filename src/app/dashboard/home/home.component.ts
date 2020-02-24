import { Component, OnInit } from '@angular/core';
import { INavPanel } from '@interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public navPanels: INavPanel[] = [
    {title: 'Розклад', link: '/dashboard/lessons-schedule/groupSlug', hoverColor: '#43b5ff'},
    {title: 'Університети', link: '/dashboard/universities', hoverColor: '#ff5a5a'},
    {title: '', link: '', hoverColor: '#ff5a5a'},
    {title: '', link: '', hoverColor: '#ff5a5a'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
