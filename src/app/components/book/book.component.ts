import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    this.home = this.data.home;
  }

  calculateTotal(checkIn: string, checkOut: string): number {
    const checkInDate = moment(checkIn, 'MM-DD-YY');
    const checkOutDate = moment(checkOut, 'MM-DD-YY');
    const nrNights = checkOutDate.diff(checkInDate, 'days');

    console.log("check in", checkIn);
    console.log("check out", checkOut);
    console.log("home price", this.home.price);
    console.log("nrNights", nrNights);

    return nrNights * parseInt(this.home.price, 10);
  }
}
