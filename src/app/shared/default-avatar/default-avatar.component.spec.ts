import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAvatarComponent } from './default-avatar.component';

describe('DefaultAvatarComponent', () => {
  let component: DefaultAvatarComponent;
  let fixture: ComponentFixture<DefaultAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
