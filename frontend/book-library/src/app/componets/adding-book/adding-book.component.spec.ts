import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingBookComponent } from './adding-book.component';

describe('AddingBookComponent', () => {
  let component: AddingBookComponent;
  let fixture: ComponentFixture<AddingBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
