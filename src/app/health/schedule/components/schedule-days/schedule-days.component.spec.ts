import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDaysComponent } from './schedule-days.component';

describe('ScheduleDaysComponent', () => {
  let component: ScheduleDaysComponent;
  let fixture: ComponentFixture<ScheduleDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDaysComponent],
    });
    fixture = TestBed.createComponent(ScheduleDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
