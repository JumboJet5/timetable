import { Component, OnInit } from '@angular/core';
import { INavPanel } from '@interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public navPanels: INavPanel[] = [
    {title: 'Розклад пар', link: '/dashboard/lessons-schedule', hoverColor: '#43b5ff'},
    {title: 'Розклад контролів', link: '/dashboard/controls-schedule', hoverColor: '#82ff74'},
    {title: 'Університети', link: '/dashboard/universities', hoverColor: '#ff5a5a'},
    {title: 'Факультети', link: '/dashboard/faculties', hoverColor: '#ae86ff'},
    {title: 'Спеціальності', link: '/dashboard/specialties', hoverColor: '#4e52ff'},
    {title: 'Групи', link: '/dashboard/groups', hoverColor: '#4398ff'},
    {title: 'Корпуси', link: '/dashboard/housings', hoverColor: '#ffcb5d'},
    {title: 'Викладачі', link: '/dashboard/teachers', hoverColor: '#ff7f72'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
