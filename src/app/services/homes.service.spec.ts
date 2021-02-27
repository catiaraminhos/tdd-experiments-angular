import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomesMock } from './homes.mock';
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

  it('should return the list of homes', () => {
    const homesMock = HomesMock.homes;
    spyOn(httpClient, 'get').and.returnValue(of(homesMock));

    const getHomesResultSpy = jasmine.createSpy('getHomesResultSpy');
    homesService.getHomes$().subscribe(getHomesResultSpy);

    expect(getHomesResultSpy).toHaveBeenCalledWith(homesMock);

    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');
  });
});
