import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSectionComponent } from './schedule-section.component';

describe('ScheduleSectionComponent', () => {
  let component: ScheduleSectionComponent;
  let fixture: ComponentFixture<ScheduleSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleSectionComponent],
    });
    fixture = TestBed.createComponent(ScheduleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
