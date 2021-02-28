import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HomesMock } from '../../services/homes.mock';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  const getElement = (selector: string) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    TestBed.inject(MAT_DIALOG_DATA).home = HomesMock.homes[0];
    fixture.detectChanges();
  });

  it('should show title', () => {
    expect(getElement('[data-test="title"]').textContent).toContain(HomesMock.homes[0].title);
  });

  it('should show price', () => {
    expect(getElement('[data-test="price"').textContent).toContain(HomesMock.homes[0].price);
  });

  // should show check in date field

  // should check out date field

  // should show total

  // should book home after clicking the Book button
});
