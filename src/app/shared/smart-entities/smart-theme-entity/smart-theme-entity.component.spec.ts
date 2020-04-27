import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartThemeEntityComponent } from 'src/app/shared/smart-entities/smart-theme-entity/smart-theme-entity.component';

describe('SmartThemeEntityComponent', () => {
  let component: SmartThemeEntityComponent;
  let fixture: ComponentFixture<SmartThemeEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartThemeEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartThemeEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
