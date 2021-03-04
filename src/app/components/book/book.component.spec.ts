import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';

import { HomesService } from '../../services/homes.service';
import { HomesMock } from '../../services/homes.mock';
import { BookComponent } from './book.component';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let homesServiceSpy: jasmine.SpyObj<HomesService>;
  let matDialogSpy: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const getElement = (selector: string) => fixture.nativeElement.querySelector(selector);

  const setInputValue = (selector: string, value: string) => {
    const input = getElement(selector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule
      ],
      declarations: [ BookComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: HomesService, useFactory: () => spyOnClass(HomesService) },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    homesServiceSpy = TestBed.inject(HomesService) as jasmine.SpyObj<HomesService>;
    matDialogSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<BookComponent>>;
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
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
    setInputValue('[data-test="check-in"] input', '12/20/19');
    setInputValue('[data-test="check-out"] input', '12/23/19');

    fixture.detectChanges();

    expect(getElement('[data-test="total"]').textContent).toContain('Total: $375');
  });

  it('should show -- for total when there is no check in and no check out date', () => {
    fixture.detectChanges();

    expect(getElement('[data-test="total"]').textContent).toContain('Total: --');
  });

  it('should show -- for total when the dates are invalid', () => {
    setInputValue('[data-test="check-in"] input', '12/23/19');
    setInputValue('[data-test="check-out"] input', '12/20/19');

    fixture.detectChanges();

    expect(getElement('[data-test="total"]').textContent).toContain('Total: --');
  });

  it('should book home after clicking the Book button', () => {
    homesServiceSpy.bookHome$.and.returnValue(of(null));

    setInputValue('[data-test="check-in"] input', '12/20/19');
    setInputValue('[data-test="check-out"] input', '12/23/19');

    fixture.detectChanges();

    getElement('[data-test="book-btn"] button').click();

    expect(homesServiceSpy.bookHome$).toHaveBeenCalled();
  });

  it('should close the dialog and show notification after clicking Book button', () => {
    homesServiceSpy.bookHome$.and.returnValue(of(null));

    setInputValue('[data-test="check-in"] input', '12/20/19');
    setInputValue('[data-test="check-out"] input', '12/23/19');

    fixture.detectChanges();

    getElement('[data-test="book-btn"] button').click();
    expect(matDialogSpy.close).toHaveBeenCalled();
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});
