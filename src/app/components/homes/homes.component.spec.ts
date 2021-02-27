import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { Home } from '../../models/home.model';
import { HomesMock } from '../../services/homes.mock';
import { HomesService } from '../../services/homes.service';
import { HomesComponent } from './homes.component';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;

  beforeEach(async () => {
    const homesServiceStub: Partial<HomesService> = {
      getHomes$(): Observable<Home[]> {
        return of(HomesMock.homes);
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers: [
        { provide: HomesService, useValue: homesServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show homes', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const homeElems = fixture.nativeElement.querySelectorAll('[data-test="home"]');
      expect(homeElems.length).toBe(3);
    });
  }));

  it('should show home info', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const firstHomeElem = fixture.nativeElement.querySelector('[data-test="home"]');
      const homeTitleElem = firstHomeElem.querySelector('[data-test="title"]');
      const homeImageElem = firstHomeElem.querySelector('[data-test="image"]');
      const homeLocationElem = firstHomeElem.querySelector('[data-test="location"]');

      expect(homeTitleElem.innerText).toBe('Home 1');
      expect(homeImageElem.src.endsWith('assets/listing.jpg')).toBeTrue();
      expect(homeLocationElem.innerText).toBe('new york');
    });
  }));
});
