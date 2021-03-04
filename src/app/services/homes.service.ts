import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Home } from '../models/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  constructor(private httpClient: HttpClient) { }

  getHomes$(): Observable<Home[]> {
    return this.httpClient.get<any>('assets/homes.json');
  }

  bookHome$(): Observable<any> {
    return this.httpClient.post<any>('https://run.mocky.io/v3/8b22d977-dbfe-404f-97ba-becd6d4d63bf', {});
  }
}
