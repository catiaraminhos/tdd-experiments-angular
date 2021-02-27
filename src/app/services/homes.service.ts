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
}
