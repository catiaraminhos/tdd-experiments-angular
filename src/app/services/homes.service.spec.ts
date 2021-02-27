import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomesService } from './homes.service';

describe('HomesService', () => {
  let httpClient: HttpClient;
  let homesService: HomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    homesService = TestBed.inject(HomesService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(homesService).toBeTruthy();
  });

  it('should return the list of homes', () => {
    // Spy on and mock the HttpClient
    const homesMock = [
      {
        title: 'Home 1',
        image: 'assets/listing.jpg',
        location: 'new york'
      },
      {
        title: 'Home 2',
        image: 'assets/listing.jpg',
        location: 'boston'
      },
      {
        title: 'Home 3',
        image: 'assets/listing.jpg',
        location: 'chicago'
      }
    ];
    spyOn(httpClient, 'get').and.returnValue(of(homesMock));

    // Use our service to get homes
    const getHomesResultSpy = jasmine.createSpy('getHomesResultSpy');
    homesService.getHomes$().subscribe(getHomesResultSpy);

    // Verify that the service returned mocked data
    expect(getHomesResultSpy).toHaveBeenCalledWith(homesMock);

    // Verify that the service called the proper HTTP endpoint
    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');
  });
});
