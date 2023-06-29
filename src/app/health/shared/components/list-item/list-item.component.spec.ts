import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent<any>;
  let fixture: ComponentFixture<ListItemComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
    });
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
