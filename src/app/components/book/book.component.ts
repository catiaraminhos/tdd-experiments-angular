import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private homesService: HomesService,
    private matDialogRef: MatDialogRef<BookComponent>,
    private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.home = this.data.home;
  }

  calculateTotal(checkIn: string, checkOut: string): string {
    const checkInDate = moment(checkIn, 'MM-DD-YY');
    const checkOutDate = moment(checkOut, 'MM-DD-YY');
    const nrNights = checkOutDate.diff(checkInDate, 'days');
    const total = nrNights * parseInt(this.home.price, 10);

    if (total > 0) {
      return '$' + total;
    }

    return '--';
  }

  bookHome(): void {
    this.homesService.bookHome$().subscribe(() => {
      this.matDialogRef.close();
      this.matSnackBar.open('Home booked!', null, {
        duration: 2000
      });
    });
  }
}
