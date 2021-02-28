import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Home } from '../../models/home.model';
import { DialogService } from '../../services/dialog.service';
import { HomesService } from '../../services/homes.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  homes$: Observable<Home[]> = of([]);

  constructor(private homesService: HomesService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.homes$ = this.homesService.getHomes$();
  }

  openDialog(): void {
    this.dialogService.open(BookComponent, {});
  }
}
