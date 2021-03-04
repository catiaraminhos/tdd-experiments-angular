import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { spyOnClass } from 'jasmine-es6-spies';

import { DialogService } from '../../services/dialog.service';
import { HomesMock } from '../../services/homes.mock';
import { HomesService } from '../../services/homes.service';
import { HomesComponent } from './homes.component';
import { BookComponent } from '../book/book.component';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let homesServiceSpy: jasmine.SpyObj<HomesService>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;

  const getElement = (selector: string) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomesComponent],
      providers: [
        { provide: HomesService, useFactory: () => spyOnClass(HomesService) },
        { provide: DialogService, useFactory: () => spyOnClass(DialogService) }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dialogServiceSpy = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    homesServiceSpy = TestBed.inject(HomesService) as jasmine.SpyObj<HomesService>;
    homesServiceSpy.getHomes$.and.returnValue(of(HomesMock.homes));

    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show homes', () => {
    const homeElems = fixture.nativeElement.querySelectorAll('[data-test="home"]');
    expect(homeElems.length).toBe(3);
  });

  it('should show home info', () => {
    const homeTitleElem = getElement('[data-test="home"] [data-test="title"]');
    const homeImageElem = getElement('[data-test="home"] [data-test="image"]');
    const homeLocationElem = getElement('[data-test="home"] [data-test="location"]');

    expect(homeTitleElem.innerText).toBe('Home 1');
    expect(homeImageElem.src.endsWith('assets/listing.jpg')).toBeTrue();
    expect(homeLocationElem.innerText).toBe('new york');
  });

  it('should show Book button', () => {
    const bookButtonElem = getElement('[data-test="home"] [data-test="book-btn"]');
    expect(bookButtonElem).toBeTruthy();
  });

  it('should use dialog service to open a dialog when clicking on Book button', () => {
    const bookButton = getElement('[data-test="home"] [data-test="book-btn"] button');
    const dialogConfig = {
      width: '500px',
      data: {
        home: HomesMock.homes[0]
       }
    };

    bookButton.click();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(BookComponent, dialogConfig);
  });
});
