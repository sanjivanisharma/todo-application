import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoitemsComponent } from './todoitems.component';

describe('TodoitemsComponent', () => {
  let component: TodoitemsComponent;
  let fixture: ComponentFixture<TodoitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoitemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
