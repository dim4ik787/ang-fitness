import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAssignComponent } from './schedule-assign.component';

describe('ScheduleAssignComponent', () => {
  let component: ScheduleAssignComponent;
  let fixture: ComponentFixture<ScheduleAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleAssignComponent]
    });
    fixture = TestBed.createComponent(ScheduleAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
