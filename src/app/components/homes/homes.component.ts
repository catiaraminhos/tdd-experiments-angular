import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Home } from 'src/app/models/home.model';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  homes$: Observable<Home[]> = of([]);

  constructor(private homesService: HomesService) { }

  ngOnInit(): void {
    this.homes$ = this.homesService.getHomes$();
  }

}
