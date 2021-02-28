import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';

import { HomesService } from '../../services/homes.service';
import { HomesMock } from '../../services/homes.mock';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let homesServiceSpy: jasmine.SpyObj<HomesService>;

  const getElement = (selector: string) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ BookComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: HomesService, useFactory: () => spyOnClass(HomesService) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    homesServiceSpy = TestBed.inject(HomesService) as jasmine.SpyObj<HomesService>;
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    TestBed.inject(MAT_DIALOG_DATA).home = HomesMock.homes[0];
    fixture.detectChanges();
  });

  it('should show title', () => {
    expect(getElement('[data-test="title"]').textContent).toContain('Book ' + HomesMock.homes[0].title);
  });

  it('should show price', () => {
    expect(getElement('[data-test="price"').textContent).toContain('$' + HomesMock.homes[0].price + ' per night');
  });

  it('should show check in date field', () => {
    expect(getElement('[data-test="check-in"')).toBeTruthy();
  });

  it('should show check out date field', () => {
    expect(getElement('[data-test="check-out"')).toBeTruthy();
  });

  it('should show total', () => {
    const checkIn = getElement('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = getElement('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(getElement('[data-test="total"]').textContent).toContain('Total: $375');
  });

  it('should book home after clicking the Book button', () => {
    homesServiceSpy.bookHome$.and.returnValue(of(null));

    const checkIn = getElement('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = getElement('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    getElement('[data-test="book-btn"] button').click();

    expect(homesServiceSpy.bookHome$).toHaveBeenCalled();
  });
});
