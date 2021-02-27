import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Home } from '../models/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  constructor() { }

  getHomes$(): Observable<Home[]> {
    return of([]);
  }
}
