import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Home } from '../../models/home.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  home: Home = null;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    this.home = this.data.home;
  }

}
