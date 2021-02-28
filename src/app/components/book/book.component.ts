import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { HomesService } from 'src/app/services/homes.service';
import { Home } from '../../models/home.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  home: Home = null;

  checkIn: string;

  checkOut: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private homesService: HomesService) {
  }

  ngOnInit(): void {
    this.home = this.data.home;
  }

  calculateTotal(checkIn: string, checkOut: string): number {
    const checkInDate = moment(checkIn, 'MM-DD-YY');
    const checkOutDate = moment(checkOut, 'MM-DD-YY');
    const nrNights = checkOutDate.diff(checkInDate, 'days');

    return nrNights * parseInt(this.home.price, 10);
  }

  bookHome(): void {
    this.homesService.bookHome$().subscribe();
  }
}
