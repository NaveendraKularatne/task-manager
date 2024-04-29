import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewEditTaskComponent } from './add-view-edit-task.component';

describe('AddViewEditTaskComponent', () => {
  let component: AddViewEditTaskComponent;
  let fixture: ComponentFixture<AddViewEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddViewEditTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddViewEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
