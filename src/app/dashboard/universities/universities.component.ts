import { Component, OnInit } from '@angular/core';
import { UniversityService } from '@app/service/universitiy/university.service';
import { IUniversity } from '@interfaces';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss']
})
export class UniversitiesComponent implements OnInit {
  public universities: IUniversity[] = [];

  constructor(private universityService: UniversityService) { }

  ngOnInit(): void {
    this.universityService.getUniversities({})
      .subscribe(res => this.universities = res.results);
  }

}
